export const formatDateTime = (timestamp: string): string => {
  const now = new Date();
  let date = now;
  if (timestamp) date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
