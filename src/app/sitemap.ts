import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/login",
  "/register",
  "/dashboard",
  "/map",
  "/upload",
  "/analytics",
  "/municipal-dashboard",
  "/admin",
  "/settings",
  "/profile",
  "/notifications",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.7,
  }));
}
