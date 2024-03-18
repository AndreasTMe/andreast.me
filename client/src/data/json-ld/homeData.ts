import { Route } from "@data/routes";
import { websiteMetadata } from "@data/website";
import { generateWebsiteJsonLD } from "@data/json-ld/generic/website";
import { generateAuthorJsonLD } from "@data/json-ld/generic/author";

export function generateHomeJsonLD() {
    const siteUrl = import.meta.env.SITE;

    const schema = [
        {
            "@context": "https://schema.org",
            "@graph": [
                generateWebPageJsonLD(siteUrl),
                generateBreadcrumbListJsonLD(siteUrl),
                generateWebsiteJsonLD(),
                generateAuthorJsonLD()
            ]
        }
    ];

    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function generateWebPageJsonLD(siteUrl: string) {
    return {
        "@type": "WebPage",
        "@id": siteUrl,
        url: siteUrl,
        name: websiteMetadata.title,
        description: websiteMetadata.description,
        datePublished: websiteMetadata.datePublished,
        dateModified: new Date().toLocaleDateString("en-GB"),
        inLanguage: "en-GB",
        isPartOf: {
            "@id": `${siteUrl}/#website`
        },
        about: {
            "@id": `${siteUrl}${Route.ABOUT}/#author`
        },
        breadcrumb: {
            "@id": `${siteUrl}/#breadcrumb`
        },
        potentialAction: [
            {
                "@type": "ReadAction",
                target: [siteUrl]
            }
        ]
    };
}

function generateBreadcrumbListJsonLD(siteUrl: string) {
    return {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home"
            }
        ]
    };
}
