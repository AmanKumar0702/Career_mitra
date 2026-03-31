import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        if (!credentials?.email || !credentials?.password) return null;
        // Basic input length validation
        if (credentials.email.length > 254 || credentials.password.length > 128) return null;
        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase().trim() });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
          role: user.role,
        };
      } catch (err) {
        console.error("[NextAuth] authorize error:", err);
        return null;
      }
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existing = await User.findOne({ email: user.email });
          if (!existing) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            });
          } else {
            // Update image if changed
            if (user.image && existing.image !== user.image) {
              await User.findOneAndUpdate({ email: user.email }, { image: user.image });
            }
          }
        } catch (err) {
          console.error("[NextAuth] Google signIn error:", err);
          return false;
        }
      }

      // Update streak on every sign-in
      try {
        await connectDB();
        const today = new Date().toDateString();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser && dbUser.lastActiveDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const wasYesterday = dbUser.lastActiveDate === yesterday.toDateString();
          const newStreak = wasYesterday ? (dbUser.streak || 0) + 1 : 1;
          await User.findOneAndUpdate(
            { email: user.email },
            { lastActiveDate: today, streak: newStreak }
          );
        }
      } catch { /* non-critical */ }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "student";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
