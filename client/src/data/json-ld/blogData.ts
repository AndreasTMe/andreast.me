import { Route } from "@data/routes";
import { blogPageMetadata } from "@data/website";
import { generateWebsiteJsonLD } from "@data/json-ld/generic/website";
import { generateAuthorJsonLD } from "@data/json-ld/generic/author";

import type { BlogArticleMetadata } from "@models/blog";

export function generateBlogJsonLD(articleMetadata: BlogArticleMetadata[]) {
    const siteUrl = import.meta.env.SITE;
    const blogUrl = `${siteUrl}${Route.BLOG}`;

    const schema = [
        {
            "@context": "https://schema.org",
            "@graph": [
                generateWebPageJsonLD(siteUrl, blogUrl),
                generateBreadcrumbListJsonLD(siteUrl, blogUrl),
                generateMainEntityJsonLD(articleMetadata, siteUrl, blogUrl),
                generateWebsiteJsonLD(),
                generateAuthorJsonLD()
            ]
        }
    ];

    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function generateWebPageJsonLD(siteUrl: string, blogUrl: string) {
    return {
        "@type": "WebPage",
        "@id": blogUrl,
        url: blogUrl,
        name: blogPageMetadata.title,
        description: blogPageMetadata.description,
        datePublished: blogPageMetadata.datePublished,
        dateModified: new Date().toLocaleDateString("en-GB"),
        inLanguage: "en-GB",
        isPartOf: {
            "@id": `${siteUrl}/#website`
        },
        breadcrumb: {
            "@id": `${blogUrl}/#breadcrumb`
        },
        mainEntity: {
            "@id": `${blogUrl}/#mainEntity`
        },
        potentialAction: [
            {
                "@type": "ReadAction",
                target: [blogUrl]
            }
        ]
    };
}

function generateBreadcrumbListJsonLD(siteUrl: string, blogUrl: string) {
    return {
        "@type": "BreadcrumbList",
        "@id": `${blogUrl}/#breadcrumb`,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog"
            }
        ]
    };
}

function generateMainEntityJsonLD(
    articleMetadata: BlogArticleMetadata[],
    siteUrl: string,
    blogUrl: string
) {
    return {
        "@type": "Blog",
        "@id": `${blogUrl}/#mainEntity`,
        url: blogUrl,
        name: blogPageMetadata.title,
        description: blogPageMetadata.description,
        publisher: {
            "@id": `${siteUrl}${Route.ABOUT}/#author`
        },
        blogPost: articleMetadata.map((article) => ({
            "@type": "BlogPosting",
            "@id": `${blogUrl}/${article.slug}`,
            url: `${blogUrl}/${article.slug}`,
            headline: article.title,
            description: article.description,
            datePublished: article.createdDate,
            dateModified: article.lastModifiedDate ?? article.createdDate,
            author: {
                "@id": `${siteUrl}${Route.ABOUT}/#author`
            },
            image: {
                "@type": "ImageObject",
                "@id": article.image.src,
                url: article.image.src,
                width: article.image.width,
                height: article.image.height
            },
            keywords: [
                article.categories
                    .map((category) => `"${category}"`)
                    .join(",\n")
            ]
        }))
    };
}
