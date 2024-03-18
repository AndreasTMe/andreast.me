import { defineConfig } from "astro/config";
import svelte, { vitePreprocess } from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

import markdownImages from "@andreast/markdown-images";
import markdownLinks from "@andreast/markdown-links";
import markdownLists from "@andreast/markdown-lists";

const assetsDir = "_assets";

// https://astro.build/config
export default defineConfig({
    site: "https://www.andreast.me",
    output: "static",
    build:{
        assets: assetsDir,
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: `${assetsDir}/entry.[hash].mjs`,
                    chunkFileNames: `${assetsDir}/chunks/chunk.[hash].mjs`,
                    assetFileNames: (asset) => {
                        if (asset.name.endsWith(".css")) {
                            return `${assetsDir}/style.[hash].css`;
                        }
                        return `${assetsDir}/asset.[hash][extname]`;
                    }
                }
            }
        }
    },
    integrations: [
        svelte({
            preprocess: vitePreprocess()
        }),
        icon(),
        expressiveCode(),
        tailwind(),
        sitemap(),
        robotsTxt({
            sitemap: true
        }),
        compress()
    ],
    image: {
        remotePatterns: [
            {
                protocol: "https"
            }
        ]
    },
    markdown: {
        remarkPlugins: [
            [
                markdownImages,
                {
                    classes: {
                        image: "rounded",
                        link: "at-enhanced-link"
                    }
                }
            ],
            [
                markdownLinks.remark,
                {
                    link: [
                        {
                            type: "text",
                            className: "at-enhanced-link"
                        },
                        {
                            type: "button",
                            className: "at-button-link at-box-shadow-transition",
                            variants: ["primary", "secondary", "accent"]
                        }
                    ]
                }
            ],
            [
                markdownLists,
                {
                    orderedListTypes: ["1", "a", "i"],
                    unorderedListTypes: ["disc", "circle", "square"]
                }
            ]
        ],
        rehypePlugins: [
            [markdownLinks.rehype, { domain: "andreast.me" }]
        ],
        remarkRehype: {
            footnoteLabel: "Notes/References",
            footnoteLabelProperties: {
                className: ["footnote-label"]
            },
            footnoteBackContent: "↩",
            footnoteBackLabel: "Back to content",
            footnoteLabelTagName: "h4",
            clobberPrefix: "footnote-",
            passThrough: [],
            allowDangerousHtml: true,
            handlers: {}
        },
        syntaxHighlight: false,
        gfm: true,
        smartypants: true
    }
});