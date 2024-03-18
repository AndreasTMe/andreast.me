import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { Route } from "@data/routes";
import { websiteMetadata } from "@data/website";

export async function GET(context) {
    const blog = await getCollection("blog");
    return rss({
        title: websiteMetadata.title,
        description: websiteMetadata.description,
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.createdDate,
            description: post.data.description,
            link: `${Route.BLOG}/${post.slug}/`,
            customData: `
                <categories>${post.data.categories.join(", ")}</categories>
            `
        })),
        stylesheet: "/rss/styles.xsl"
    });
}
