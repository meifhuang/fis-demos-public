import { heroui } from "@heroui/react";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        "fira-sans": ["var(--font-fira-sans)", "sans-serif"],
        "open-sans": ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        "blue-light": {
          extend: "light", // <- Correctly extend the light theme
          colors: {
            background: "#FFFFFF", // Light background
            foreground: "#111827", // Dark foreground (text)
            primary: {
              50: "#EFF6FF",
              100: "#DBEAFE",
              200: "#BFDBFE",
              300: "#93C5FD",
              400: "#60A5FA",
              500: "#3B82F6", // Mid-tone blue
              600: "#2563EB",
              700: "#1D4ED8",
              800: "#1E40AF",
              900: "#1E3A8A",
              DEFAULT: "#3B82F6", // Default maps to 500
              foreground: "#FFFFFF", // Text on top of the primary color (white)
            },
            focus: "#60A5FA", // A slightly lighter blue for focus rings
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
