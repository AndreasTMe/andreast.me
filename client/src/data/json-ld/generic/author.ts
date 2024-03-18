import { Route } from "@data/routes.ts";
import { websiteMetadata } from "@data/website.ts";

export function generateAuthorJsonLD() {
    const siteUrl = import.meta.env.SITE;

    return {
        "@type": "Person",
        "@id": `${siteUrl}${Route.ABOUT}/#author`,
        url: `${siteUrl}${Route.ABOUT}`,
        name: websiteMetadata.author,
        // TODO: Add image
        // TODO: Add logo
        sameAs: [siteUrl]
    };
}
