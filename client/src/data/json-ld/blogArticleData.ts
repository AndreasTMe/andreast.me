import { Route } from "@data/routes.ts";
import { generateWebsiteJsonLD } from "@data/json-ld/generic/website";
import { generateAuthorJsonLD } from "@data/json-ld/generic/author";
import { getPropertyName } from "@utils/object.ts";

import type { BlogArticleMetadata } from "@models/blog.ts";

export function generateBlogArticleJsonLD(
    articleMetadata: BlogArticleMetadata
) {
    const siteUrl = import.meta.env.SITE;
    const blogUrl = `${siteUrl}${Route.BLOG}`;

    const schema = [
        {
            "@context": "https://schema.org",
            "@graph": [
                generateWebPageJsonLD(articleMetadata, siteUrl, blogUrl),
                generateBreadcrumbListJsonLD(siteUrl, blogUrl),
                generateMainEntityJsonLD(articleMetadata, siteUrl, blogUrl),
                generateWebsiteJsonLD(),
                generateAuthorJsonLD()
            ]
        }
    ];

    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function generateWebPageJsonLD(
    articleMetadata: BlogArticleMetadata,
    siteUrl: string,
    blogUrl: string
) {
    return {
        "@type": "WebPage",
        "@id": blogUrl,
        url: blogUrl,
        name: articleMetadata.title,
        description: articleMetadata.description,
        datePublished: articleMetadata.createdDate,
        dateModified:
            articleMetadata.lastModifiedDate ?? articleMetadata.createdDate,
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
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "BlogPosting"
            }
        ]
    };
}

function generateMainEntityJsonLD(
    articleMetadata: BlogArticleMetadata,
    siteUrl: string,
    blogUrl: string
) {
    const blogArticleUrl = `${blogUrl}/${articleMetadata.slug}`;
    const blogCategoriesUrl = `${blogUrl}/${getPropertyName(articleMetadata, (a) => a.categories)}`;

    return {
        "@type": "BlogPosting",
        "@id": `${blogArticleUrl}/#article`,
        mainEntityOfPage: blogArticleUrl,
        headline: articleMetadata.title,
        name: articleMetadata.title,
        description: articleMetadata.description,
        datePublished: articleMetadata.createdDate,
        dateModified:
            articleMetadata.lastModifiedDate ?? articleMetadata.createdDate,
        inLanguage: "en-GB",
        author: {
            "@id": `${siteUrl}${Route.ABOUT}/#author`
        },
        publisher: {
            "@id": `${siteUrl}${Route.ABOUT}/#author`
        },
        image: {
            "@type": "ImageObject",
            "@id": articleMetadata.image.src,
            url: articleMetadata.image.src,
            width: articleMetadata.image.width,
            height: articleMetadata.image.height
        },
        isPartOf: {
            "@id": blogArticleUrl
        },
        url: blogArticleUrl,
        about: [
            articleMetadata.categories.map((category) => ({
                "@type": "Thing",
                "@id": `${blogCategoriesUrl}/${category}`,
                name: category
            }))
        ],
        wordCount: articleMetadata.wordCount,
        keywords: articleMetadata.categories
    };
}
