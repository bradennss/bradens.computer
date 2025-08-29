import { MetadataRoute } from "next";
import { listFilesystem } from "~/data/filesystem";

export default function sitemap(): MetadataRoute.Sitemap {
  return listFilesystem().map((item) => ({
    url: item.path,
  }));
}
