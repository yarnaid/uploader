import { FilterType } from "../../types.ts";

export function formatTags(data: any) {
  return data.tags
    ? Object.entries(data.tags)
        .filter(([key, v]) => v !== undefined && key.length > 0)
        .map(([key, value]: [string, FilterType]) => ({
          name: key,
          values: value.map((v: any) => v.value),
        }))
    : [];
}
