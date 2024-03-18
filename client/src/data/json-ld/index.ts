import { generateHomeJsonLD } from "./homeData";
import { generateAboutJsonLD } from "./aboutData";
import { generateBlogJsonLD } from "./blogData";
import { generateBlogArticleJsonLD } from "./blogArticleData";

export const jsonLD = {
    home: generateHomeJsonLD,
    about: generateAboutJsonLD,
    blog: generateBlogJsonLD,
    blogArticle: generateBlogArticleJsonLD
};
