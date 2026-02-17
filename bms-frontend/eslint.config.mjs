import eslintPluginPrettier from "eslint-plugin-prettier";

const config = [
  {
    ignores: ["node_modules", ".next"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "error",
      "no-console": "warn",
      eqeqeq: "error",
      curly: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];

export default config;
