// svelte.config.js
import preprocess from 'svelte-preprocess';
import adapter from "@sveltejs/adapter-static";
import svelteMd from "vite-plugin-svelte-md";
import markdown_abbr from "markdown-it-abbr";
import markdown_container from "markdown-it-container";
import markdown_deflist from "markdown-it-deflist";
import markdown_emoji from "markdown-it-emoji";
import markdown_footnote from "markdown-it-footnote";
import markdown_ins from "markdown-it-ins";
import markdown_mark from "markdown-it-mark";
import markdown_sub from "markdown-it-sub";
import markdown_sup from "markdown-it-sup";

const deploy_path = "/markdown-doc-gen";
const deploy_host = "https://alankrantas.github.io";
const dev = process.env.NODE_ENV === "development";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: preprocess(),

	extensions: [".svelte", ".md"],

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: "build",
			assets: "build",
			fallback: "index.html",
			precompress: true
		}),

		prerender: {
			// This can be false if you"re using a fallback (i.e. SPA mode)
			default: false,
		},

		paths: {
			// YOUR github repository name
			base: dev ? "" : deploy_path,
			assets: dev ? "" : deploy_host + deploy_path,
		},

		vite: {
			plugins: [
				svelteMd({
					headEnabled: true,
					markdownItOptions: {
						html: true,        // Enable HTML tags in source
						xhtmlOut: true,        // Use "/" to close single tags (<br />).
						// This is only for full CommonMark compatibility.
						breaks: true,        // Convert "\n" in paragraphs into <br>
						langPrefix: "language-",  // CSS language prefix for fenced blocks. Can be
						// useful for external highlighters.
						linkify: true,       // Autoconvert URL-like text to links

						// Enable some language-neutral replacement + quotes beautification
						typographer: true,

						// Double + single quotes replacement pairs, when typographer enabled,
						// and smartquotes on. Could be either a String or an Array.
						//
						// For example, you can use "«»„“" for Russian, "„“‚‘" for German,
						// and ["«\xA0", "\xA0»", "‹\xA0", "\xA0›"] for French (including nbsp).
						quotes: "“”‘’",

						// Highlighter function. Should return escaped HTML,
						// or "" if the source string is not changed and should be escaped externaly.
						// If result starts with <pre... internal wrapper is skipped.
						highlight: function (/*str, lang*/) { return ""; }
					},
					markdownItUses: [
						markdown_abbr,
						markdown_deflist,
						markdown_emoji,
						markdown_footnote,
						markdown_ins,
						markdown_mark,
						markdown_sub,
						markdown_sup,
						[markdown_container, "warning"],
					],
					wrapperClasses: "markdown-body",
				}),
			],
		},
	}
};

export default config;