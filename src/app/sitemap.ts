import type { MetadataRoute } from "next";
import { divisions } from "@/content/divisions";

const baseUrl = "https://www.barreau-energies.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/a-propos", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const divisionRoutes = divisions.map((d) => ({
    url: `${baseUrl}/${d.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...divisionRoutes];
}
