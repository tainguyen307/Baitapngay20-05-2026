export const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/400x300";

  if (path.startsWith("http")) return path;

  return `http://localhost:8080${path}`;
};