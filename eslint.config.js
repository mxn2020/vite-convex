import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                document: "readonly",
                window: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                fetch: "readonly",
                URL: "readonly",
                HTMLElement: "readonly",
                HTMLInputElement: "readonly",
                Response: "readonly",
                Request: "readonly",
                FormData: "readonly",
                Event: "readonly",
                process: "readonly",
                import: "readonly",
            },
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "no-console": "warn",
        },
    },
    {
        ignores: [
            "node_modules/",
            "dist/",
            "src/__tests__/",
        ],
    },
];
