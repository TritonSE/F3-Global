/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  printWidth: 100,
  arrowParens: "always",
  endOfLine: "lf",

  // Uncomment plugin for sorting Tailwind classes if using Tailwind CSS
  // Make sure to install the plugin first with `npm install -D prettier-plugin-tailwindcss`
  // plugins: ["prettier-plugin-tailwindcss"],
  // tailwindFunctions: ["clsx", "cn", "classnames", "twMerge", "twJoin"],
};
