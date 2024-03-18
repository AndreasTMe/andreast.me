<script lang="ts">
    import Toggle from "@components/shared/client/Toggle.svelte";
    import { websiteLocalStorage } from "@data/website";

    const themeKey = websiteLocalStorage.themeKey;
    const dark = "dark";

    let theme = localStorage.getItem(themeKey) as typeof dark | "" ?? "";
</script>

<Toggle
    toggled={theme === dark}
    leftIcon={{id: "ph:sun-bold", size: "1.5rem"}}
    rightIcon={{id: "ph:moon-bold", size: "1.5rem"}}
    on:toggle={() => {
        if (theme === dark) {
            document.documentElement.classList.remove(dark);
            if (document.documentElement.classList.length === 0) {
                document.documentElement.removeAttribute("class");
            }

            theme = "";
        } else {
            document.documentElement.classList.add(dark);

            theme = dark;
        }

        localStorage.setItem(themeKey, theme);
    }}
/>