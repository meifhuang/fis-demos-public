export const lessonsKeys = {
  // Base key for entity
  all: ["lessons"] as const,

  // Key for main list
  list: () => [...lessonsKeys.all, "list"] as const,
};
