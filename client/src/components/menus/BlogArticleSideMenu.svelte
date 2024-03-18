<script lang="ts">
    import MenuItem from "./BlogArticleSideMenuItem.svelte";
    import ToC from "@components/menus/BlogArticleSideMenuTOC.svelte";
    import type { HeadingTree } from "@models/markdown";

    export let title: string;
    export let url: string;
    export let headingTree: HeadingTree[];

    const encodedTitle = encodeURI(title);
    const encodedUrl = encodeURI(url);

    const linkedinUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl;
    const twitterUrl = "https://twitter.com/intent/tweet?url=" + encodedUrl + "&text=" + encodedTitle;
    const redditUrl = "https://reddit.com/submit?url=" + encodedUrl + "&title=" + encodedTitle;
    const facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl + "&display=page";
    const rssUrl = "/rss.xml";

    let isTocOpen = false;

    document.addEventListener("click", (event) => {
        if (isTocOpen) {
            const target = event.target as HTMLElement;
            if (!target.closest(".toc") && !target.closest(".menu-container")) {
                isTocOpen = false;
            }
        }
    });

    const copyDefaultIcon = "mdi:link-variant";
    const copySuccessIcon = "mdi:check";
    let copyIcon = copyDefaultIcon;

    function handleCopyLink() {
        if (copyIcon === copySuccessIcon) {
            return;
        }

        navigator.clipboard.writeText(url);

        copyIcon = copySuccessIcon;
        setTimeout(() => {
            copyIcon = copyDefaultIcon;
        }, 2000);
    }

    function handleScrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", window.location.pathname + window.location.search);
        isTocOpen = false;
    }
</script>

<style lang="postcss">
    .menu-container {
        @apply fixed top-[50%] right-0 -translate-x-1/4 -translate-y-1/2 z-50
        rounded-md bg-primary-color/20
        transition-[right_color_background-color] duration-200 ease-out
        shadow-[2px_2px_4px_0_hsla(var(--default-shadow),0.4)];
    }

    .menu-container:hover {
        @apply right-1 bg-primary-color/100;
    }

    .menu-container menu {
        @apply p-1 flex flex-col justify-center items-center gap-0.5
        border-1 border-solid rounded-md border-background-opposite-color/10;
    }

    .menu-container menu hr {
        @apply my-1 bg-background-opposite-color/20;
    }

    .toc {
        @apply fixed top-[50%] right-20 -translate-y-1/2 z-10
        ml-auto pl-4 pr-16 py-4 rounded-md bg-primary-color/100
        transition-transform duration-200 ease-out
        shadow-[2px_2px_6px_0_hsla(var(--default-shadow),0.4)]
        dark:shadow-[2px_2px_4px_0_hsla(var(--default-shadow),0.4)];
    }

    .toc[aria-hidden="true"] {
        @apply right-0 translate-x-full;
    }
</style>

<div>
    <div class="menu-container">
        <menu>
            <MenuItem
                icon="mdi:table-of-contents"
                flip="horizontal"
                on:click={() => (isTocOpen = !isTocOpen)}
            />

            <hr />

            <MenuItem
                href={linkedinUrl}
                icon="mdi:linkedin"
                alt="Share on LinkedIn"
                isLink
                isExternal
                isNewTab
            />
            <MenuItem
                href={twitterUrl}
                icon="mdi:twitter"
                alt="Share on Twitter"
                isLink
                isExternal
                isNewTab
            />
            <MenuItem
                href={redditUrl}
                icon="mdi:reddit"
                alt="Share on Reddit"
                isLink
                isExternal
                isNewTab
            />
            <MenuItem
                href={facebookUrl}
                icon="mdi:facebook"
                alt="Share on Facebook"
                isLink
                isExternal
                isNewTab
            />
            <MenuItem
                href={rssUrl}
                icon="mdi:rss"
                alt="Subscribe to RSS feed"
                isLink
                isNewTab
            />
            <MenuItem
                icon={copyIcon}
                iconClass={copyIcon === copySuccessIcon
                    ? "rounded bg-accent-color/80 animate-[fadeOut_2.5s_ease-in-out]"
                    : "transition-[opacity] duration-200 ease-out"}
                alt="Copy article link"
                on:click={handleCopyLink}
            />

            <hr />

            <MenuItem
                icon="mdi:chevron-up"
                alt="Back to top"
                on:click={handleScrollToTop}
            />
        </menu>
    </div>

    <div role="dialog" class="toc" aria-hidden={!isTocOpen}>
        <h4 class="pb-2">Table of Contents</h4>

        <ToC tree={headingTree} />
    </div>
</div>
