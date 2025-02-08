import type {Metadata} from "next";
import {metadataCreator} from "@/utils/metadata";

export const metadata: Metadata = metadataCreator('404', '404 Error - Page Not Found. Discover the unexpected! This page doesn\'t exist, but explore my site to find what you\'re looking for.' )

export default function Page() {
  return (
      <h1>not found</h1>
  );
}
