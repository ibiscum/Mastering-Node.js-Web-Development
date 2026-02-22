import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import ts from "typescript";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      tsconfigRootDir: import.meta.dirname,
    },
  },
  tseslint.configs.recommended,
]);
