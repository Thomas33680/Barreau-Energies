import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/simulateur", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/realisations", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/avis", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/zone-intervention", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/mentions-legales", changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
