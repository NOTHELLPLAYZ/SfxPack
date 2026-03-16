// Initialize theme before React renders to prevent flash
const theme = localStorage.getItem("theme") || "dark";
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
