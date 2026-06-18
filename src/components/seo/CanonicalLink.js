"use client";

import { usePathname } from "next/navigation";
import { siteUrl } from "@/config/site";

export default function CanonicalLink() {
  const pathname = usePathname();
  return <link rel="canonical" href={siteUrl(pathname)} />;
}
