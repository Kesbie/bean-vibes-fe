const config = {
  plugins: {
    "@tailwindcss/postcss": {
      darkMode: ["class"],
      content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}"
      ],
      prefix: "",
      theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px"
          }
        },
        extend: {
          colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
              DEFAULT: "hsl(var(--primary))",
              foreground: "hsl(var(--primary-foreground))"
            },
            secondary: {
              DEFAULT: "hsl(var(--secondary))",
              foreground: "hsl(var(--secondary-foreground))"
            },
            destructive: {
              DEFAULT: "hsl(var(--destructive))",
              foreground: "hsl(var(--destructive-foreground))"
            },
            muted: {
              DEFAULT: "hsl(var(--muted))",
              foreground: "hsl(var(--muted-foreground))"
            },
            accent: {
              DEFAULT: "hsl(var(--accent))",
              foreground: "hsl(var(--accent-foreground))"
            },
            popover: {
              DEFAULT: "hsl(var(--popover))",
              foreground: "hsl(var(--popover-foreground))"
            },
            card: {
              DEFAULT: "hsl(var(--card))",
              foreground: "hsl(var(--card-foreground))"
            },
            // Coffee-themed custom colors
            coffee: {
              50: "#fef9f3",
              100: "#fef3e6",
              200: "#fce4c0",
              300: "#f9d19a",
              400: "#f4ae4e",
              500: "#ef8e02",
              600: "#d78002",
              700: "#b36b02",
              800: "#8f5601",
              900: "#754701",
              950: "#3f2601"
            },
            latte: {
              50: "#fdf8f6",
              100: "#f2e8e5",
              200: "#eaddd7",
              300: "#e0cec7",
              400: "#d2bab0",
              500: "#bfa094",
              600: "#a18072",
              700: "#977669",
              800: "#846358",
              900: "#43302b"
            },
            cream: {
              50: "#fffdf7",
              100: "#fffaed",
              200: "#fff2d1",
              300: "#ffe8b5",
              400: "#fed57d",
              500: "#fec245",
              600: "#e5af3e",
              700: "#bf9234",
              800: "#99752a",
              900: "#7d6022"
            },
            mocha: {
              50: "#f7f3f0",
              100: "#e8ddd6",
              200: "#d1bfb0",
              300: "#b8a089",
              400: "#9c8067",
              500: "#7a634c",
              600: "#5d4c3a",
              700: "#4a3d30",
              800: "#3d3228",
              900: "#322a23"
            }
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)"
          },
          fontFamily: {
            sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
            handwriting: ["Kalam", "cursive"]
          },
          keyframes: {
            "accordion-down": {
              from: { height: "0" },
              to: { height: "var(--radix-accordion-content-height)" }
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: "0" }
            },
            "coffee-steam": {
              "0%, 100%": {
                transform: "translateY(0) rotate(0deg) scale(1)",
                opacity: "0.7"
              },
              "25%": {
                transform: "translateY(-8px) rotate(5deg) scale(1.1)",
                opacity: "1"
              },
              "50%": {
                transform: "translateY(-16px) rotate(-3deg) scale(0.9)",
                opacity: "0.8"
              },
              "75%": {
                transform: "translateY(-12px) rotate(2deg) scale(1.05)",
                opacity: "0.9"
              }
            },
            "bounce-gentle": {
              "0%, 100%": {
                transform: "translateY(0)",
                animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
              },
              "50%": {
                transform: "translateY(-4px)",
                animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
              }
            },
            wiggle: {
              "0%, 100%": { transform: "rotate(0deg)" },
              "25%": { transform: "rotate(3deg)" },
              "75%": { transform: "rotate(-3deg)" }
            },
            float: {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-6px)" }
            },
            glow: {
              "0%, 100%": { boxShadow: "0 0 5px rgba(239, 142, 2, 0.5)" },
              "50%": { boxShadow: "0 0 20px rgba(239, 142, 2, 0.8)" }
            }
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "coffee-steam": "coffee-steam 3s ease-in-out infinite",
            "bounce-gentle": "bounce-gentle 2s infinite",
            wiggle: "wiggle 0.5s ease-in-out",
            float: "float 3s ease-in-out infinite",
            glow: "glow 2s ease-in-out infinite alternate"
          },
          backgroundImage: {
            "coffee-gradient":
              "linear-gradient(135deg, #ef8e02 0%, #d78002 50%, #b36b02 100%)",
            "latte-gradient":
              "linear-gradient(135deg, #f2e8e5 0%, #eaddd7 50%, #e0cec7 100%)",
            "cream-gradient":
              "linear-gradient(135deg, #fffaed 0%, #fff2d1 50%, #ffe8b5 100%)",
            "warm-gradient":
              "linear-gradient(135deg, #fef9f3 0%, #fef3e6 50%, #fce4c0 100%)"
          },
          boxShadow: {
            coffee: "0 4px 20px -2px rgba(239, 142, 2, 0.25)",
            "coffee-lg": "0 10px 40px -4px rgba(239, 142, 2, 0.3)",
            warm: "0 4px 20px -2px rgba(191, 160, 148, 0.25)",
            cozy: "0 8px 32px -4px rgba(239, 142, 2, 0.15)",
            "inner-warm": "inset 0 2px 4px 0 rgba(239, 142, 2, 0.1)"
          },
          backdropBlur: {
            coffee: "16px"
          },
          spacing: {
            18: "4.5rem",
            88: "22rem",
            128: "32rem"
          }
        }
      },
      plugins: [
        require("tailwindcss-animate"),
        // Custom plugin cho coffee utilities
        function ({ addUtilities, theme }) {
          const newUtilities = {
            ".text-gradient-coffee": {
              "background-image":
                "linear-gradient(135deg, #ef8e02 0%, #d78002 50%, #b36b02 100%)",
              "background-clip": "text",
              "-webkit-background-clip": "text",
              color: "transparent",
              "-webkit-text-fill-color": "transparent"
            },
            ".text-gradient-warm": {
              "background-image":
                "linear-gradient(135deg, #f4ae4e 0%, #ef8e02 50%, #d78002 100%)",
              "background-clip": "text",
              "-webkit-background-clip": "text",
              color: "transparent",
              "-webkit-text-fill-color": "transparent"
            },
            ".glass-coffee": {
              background: "rgba(254, 249, 243, 0.8)",
              "backdrop-filter": "blur(16px)",
              border: "1px solid rgba(239, 142, 2, 0.2)"
            },
            ".glass-dark": {
              background: "rgba(67, 48, 43, 0.8)",
              "backdrop-filter": "blur(16px)",
              border: "1px solid rgba(239, 142, 2, 0.3)"
            }
          };
          addUtilities(newUtilities, ["responsive", "hover"]);
        }
      ]
    }
  }
};

export default config;
