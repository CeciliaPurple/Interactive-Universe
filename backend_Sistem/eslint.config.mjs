import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      plugins: { js },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    extends: ["plugin:js/recommended"], // Usa a configuração recomendada do @eslint/js
  },
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{js,mjs,cjs,jsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);