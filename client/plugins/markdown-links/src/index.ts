import { processHtmlLinks } from "./processHtmlLinks";
import { processMarkdownLinks } from "./processMarkdownLinks";

const processLinks = {
    remark: processMarkdownLinks,
    rehype: processHtmlLinks
};

export default processLinks;
