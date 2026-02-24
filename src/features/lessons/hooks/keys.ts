export const lessonsKeys = {
  // Base key for entity
  all: ["lessons"] as const,

  // Key for main list
  list: () => [...lessonsKeys.all, "list"] as const,

  // Key for a single detail view (optional, but good practice)
  detail: (id: string | number) => [...lessonsKeys.all, "detail", id] as const,
};
