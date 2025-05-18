import { createClient } from "@sanity/client";

export default createClient({
  projectId: "ete3gxd9",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-05-17",
});
