import { Route } from "@data/routes";
import { aboutPageMetadata } from "@data/website";
import { generateWebsiteJsonLD } from "@data/json-ld/generic/website";
import { generateAuthorJsonLD } from "@data/json-ld/generic/author";

export function generateAboutJsonLD() {
    const siteUrl = import.meta.env.SITE;
    const aboutUrl = `${siteUrl}${Route.ABOUT}`;

    const schema = [
        {
            "@context": "https://schema.org",
            "@graph": [
                generateWebPageJsonLD(siteUrl, aboutUrl),
                generateBreadcrumbListJsonLD(siteUrl, aboutUrl),
                generateWebsiteJsonLD(),
                generateAuthorJsonLD()
            ]
        }
    ];

    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function generateWebPageJsonLD(siteUrl: string, aboutUrl: string) {
    return {
        "@type": "WebPage",
        "@id": aboutUrl,
        url: aboutUrl,
        name: aboutPageMetadata.title,
        description: aboutPageMetadata.description,
        datePublished: aboutPageMetadata.datePublished,
        dateModified: new Date().toLocaleDateString("en-GB"),
        inLanguage: "en-GB",
        isPartOf: {
            "@id": `${siteUrl}/#website`
        },
        breadcrumb: {
            "@id": `${aboutUrl}/#breadcrumb`
        },
        potentialAction: [
            {
                "@type": "ReadAction",
                target: [aboutUrl]
            }
        ]
    };
}

function generateBreadcrumbListJsonLD(siteUrl: string, aboutUrl: string) {
    return {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}/#breadcrumb`,
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
                name: "About"
            }
        ]
    };
}
