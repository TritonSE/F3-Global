import antfu from "@antfu/eslint-config";

export default antfu({
  ignores: [
    ".next/",
    "**/.next/**/",
    "build/",
    "**/build/**/",
    "dist/",
    "**/dist/**/",
    "out/",
    "**/out/**/",
    "public/",
    "**/public/**/",
    "**/next.config.js",
    "**/vite.config.ts",
    "**/vite-env.d.ts",
  ],

  // Disables stylistic rules to avoid conflicts with Prettier
  stylistic: false,

  // Enables type aware rules
  typescript: {
    tsconfigPath: "tsconfig.json",
    overrides: {
      // Avoid bugs
      "ts/no-shadow": ["error", { ignoreTypeValueShadow: true }],
      "ts/no-unsafe-unary-minus": "error",
      "ts/no-unused-expressions": "error",

      // Stylistic
      "ts/consistent-type-definitions": ["warn", "type"],
      "ts/no-use-before-define": "warn",
      "ts/prefer-readonly": "warn",
      "ts/prefer-regexp-exec": "warn",
    },
  },

  rules: {
    // Avoid bugs
    "unused-imports/no-unused-imports": [
      "warn",
      {
        varsIgnorePattern: "^_",
      },
    ],
    "array-callback-return": "error",
    eqeqeq: "error",
    "no-await-in-loop": "error",
    "no-constant-binary-expression": "error",
    "no-constructor-return": "error",
    "no-constant-condition": [
      "error",
      {
        checkLoops: false,
      },
    ],
    "no-promise-executor-return": "error",
    "no-self-compare": "error",
    "no-template-curly-in-string": "error",

    // Stylistic.
    "node/prefer-global/process": ["error", "always"],
    "object-shorthand": ["warn", "properties"],
    "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
    "perfectionist/sort-imports": [
      "warn",
      {
        groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
        newlinesBetween: "always",
      },
    ],
    "perfectionist/sort-named-imports": ["warn"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "no-case-declarations": "off",

    // Disabled because of too many false positives.
    "ts/strict-boolean-expressions": "off",
    "ts/no-unnecessary-condition": "off",
    "ts/switch-exhaustiveness-check": "off",
    "ts/return-await": "off", // Has parsing bug with nested async functions
    "jsdoc/check-param-names": "off",
  },
});
