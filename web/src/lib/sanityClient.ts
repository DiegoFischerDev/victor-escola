import {createClient} from "@sanity/client";

export const sanityClient = createClient({
  projectId: "zd7drlu2",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

