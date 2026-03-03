/**
 * App configuration — these values are replaced per-app during scaffolding.
 */
export const APP_CONFIG = {
    slug: import.meta.env.VITE_APP_SLUG || "template-app",
    title: import.meta.env.VITE_APP_TITLE || "Template App",
    description: import.meta.env.VITE_APP_DESCRIPTION || "A shiny new app in the Mehdi Verse.",
    layoutStyle: (import.meta.env.VITE_LAYOUT_STYLE as "sidebar" | "header") || "sidebar",
    sidebarPosition: (import.meta.env.VITE_SIDEBAR_POSITION as "left" | "right") || "left",
};
