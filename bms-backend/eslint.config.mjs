import eslintPluginPrettier from "eslint-plugin-prettier";

const config = [
  {
    ignores: ["node_modules", "dist"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "error",
      "no-console": "warn",
      "eqeqeq": "error",
      "curly": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-floating-promises": "error"
    }
  }
];

export default config;
