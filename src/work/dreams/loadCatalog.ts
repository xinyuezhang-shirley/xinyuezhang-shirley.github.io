import { dreamsData } from "@/work/dreams/dreams-data";
import type { DreamsCatalog } from "@/work/dreams/types";
import catalogJson from "@/content/dreams/catalog.json";

/** Prefer generated catalog; fall back fields from dreams-data. */
export const dreamsCatalog = catalogJson as DreamsCatalog;

export const dreamCount = dreamsData.dreamCount;
export const dreamSubtitle = dreamsData.subtitle;
