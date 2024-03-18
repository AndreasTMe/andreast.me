import { Route } from "@data/routes";
import { websiteMetadata } from "@data/website";

export function generateWebsiteJsonLD() {
    const siteUrl = import.meta.env.SITE;

    return {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: websiteMetadata.title,
        description: websiteMetadata.description,
        publisher: {
            "@id": `${siteUrl}${Route.ABOUT}/#author`
        },
        inLanguage: "en-GB"
    };
}
