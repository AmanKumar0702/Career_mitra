import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const now = new Date();
  const routes = [
    { url: base, priority: 1.0 },
    { url: `${base}/learn`, priority: 0.9 },
    { url: `${base}/tests`, priority: 0.9 },
    { url: `${base}/career`, priority: 0.9 },
    { url: `${base}/jobs`, priority: 0.9 },
    { url: `${base}/resume`, priority: 0.8 },
    { url: `${base}/leaderboard`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.7 },
    { url: `${base}/dashboard`, priority: 0.6 },
    { url: `${base}/terms`, priority: 0.4 },
    { url: `${base}/privacy`, priority: 0.4 },
    { url: `${base}/auth/login`, priority: 0.5 },
    { url: `${base}/auth/signup`, priority: 0.5 },
  ];
  return routes.map((r) => ({ ...r, lastModified: now, changeFrequency: "weekly" as const }));
}
