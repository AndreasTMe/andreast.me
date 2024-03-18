export const websiteMetadata = {
    title: "Andreas T. - Software Development",
    description:
        "A blog with articles about web development, game development, and software architecture. Andreas T. is a software developer who loves exploring technologies and sharing his knowledge with the community.",
    logo: "Andreas T.",
    datePublished: "", // TODO: Add date
    author: {
        name: "Andreas Tsimpanogiannis"
    },
    image: {
        src: "/images/default.jpg",
        alt: "Andreas T. Blog"
    }
} as const;

export const websiteLocalStorage = {
    themeKey: "andreas-t-blog-theme"
} as const;

export const aboutPageMetadata = {
    title: "About - Andreas T.",
    description:
        "Hey, I am Andreas, a musician turned software developer with a passion for web development, game development, and software architecture.",
    datePublished: "" // TODO: Add date
} as const;

export const blogPageMetadata = {
    title: "Blog - Andreas T.",
    description:
        "A collection of articles about software development and other related and unrelated stuff I find interesting.",
    datePublished: "" // TODO: Add date
} as const;
