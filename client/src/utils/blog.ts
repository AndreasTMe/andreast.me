import { formatDate } from "./date.ts";
import { Route } from "@data/routes.ts";

import type { MarkdownHeading } from "astro";
import type { BlogArticle, BlogCalendar, BlogCategory } from "@models/blog.ts";
import type { HeadingTree } from "@models/markdown.ts";

export function groupArticles(
    articles: BlogArticle[]
): [string, BlogArticle[]][] {
    return Object.entries(
        articles
            .sort((a, b) => {
                return (
                    b.data.createdDate.getTime() - a.data.createdDate.getTime()
                );
            })
            .reduce(
                (articles, article) => {
                    if (article.data.createdDate > new Date()) {
                        return articles;
                    }

                    const date = formatDate(
                        article.data.createdDate,
                        "MMM yyyy"
                    );

                    articles[date] = articles[date]
                        ? [...(articles[date] as []), article]
                        : [article];

                    return articles;
                },
                {} as { [key: string]: BlogArticle[] }
            )
    );
}

export function getCategories(articles: BlogArticle[]): BlogCategory[] {
    return Object.entries(
        articles.reduce(
            (acc, article) => {
                article.data.categories.forEach((category) => {
                    if (acc[category]) {
                        acc[category] = acc[category] + 1;
                    } else {
                        acc[category] = 1;
                    }
                });

                return acc;
            },
            {} as { [key: string]: number }
        )
    ).map(([name, count]) => ({
        name: name,
        count: count,
        active: false
    }));
}

export function getCalendar(articles: BlogArticle[]): BlogCalendar {
    const calendar: BlogCalendar = [];

    articles.forEach((article) => {
        const year = article.data.createdDate.getFullYear();

        let yearIndex = calendar.findIndex((entry) => entry.order === year);

        if (yearIndex === -1) {
            calendar.push({
                value: String(year),
                order: year,
                isExpanded: false,
                children: []
            });

            yearIndex = calendar.length - 1;
        }

        const month = article.data.createdDate.getMonth();

        let monthIndex = calendar[yearIndex].children!.findIndex(
            (entry) => entry.order === month
        );

        if (monthIndex === -1) {
            calendar[yearIndex].children!.push({
                value: formatDate(article.data.createdDate, "MMMM"),
                order: month,
                isExpanded: false,
                children: []
            });

            monthIndex = calendar[yearIndex].children!.length - 1;
        }

        calendar[yearIndex].children![monthIndex].children!.push({
            value: article.data.title,
            order: article.data.createdDate.getDate(),
            isExpanded: false,
            href: `${Route.BLOG}/${article.slug}`
        });
    });

    calendar
        ?.sort((a, b) => b.order - a.order)
        .forEach((year) => {
            year.children
                ?.sort((a, b) => b.order - a.order)
                .forEach((month) => {
                    month.children?.sort((a, b) => b.order - a.order);
                });
        });

    return calendar;
}

export function createHeadingTree(
    headings: MarkdownHeading[],
    filter?: (value: MarkdownHeading) => unknown
): HeadingTree[] {
    const result: HeadingTree[] = [];
    const stack: HeadingTree[] = [];

    if (filter) {
        headings = headings.filter(filter);
    }

    headings.forEach((heading) => {
        const node = {
            value: heading,
            children: []
        };

        while (
            stack.length > 0 &&
            stack[stack.length - 1].value.depth >= heading.depth
        ) {
            stack.pop();
        }

        if (stack.length > 0) {
            stack[stack.length - 1].children.push(node);
        } else {
            result.push(node);
        }

        stack.push(node);
    });

    return result;
}
