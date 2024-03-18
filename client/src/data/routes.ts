export enum Route {
    HOME = "/",
    ABOUT = "/about",
    BLOG = "/blog",
    CONTACT = "/contact",
    POLICIES = "/policies"
}

type RouteData = {
    label: string;
    private?: boolean;
    hideInMainNav?: boolean;
    hideInFooter?: boolean;
};

type Routes = {
    [key: string]: RouteData;
};

export const routes: Routes = {
    [Route.HOME]: {
        label: "Home",
        hideInFooter: true
    },
    [Route.ABOUT]: {
        label: "About"
    },
    [Route.BLOG]: {
        label: "Blog"
    },
    [Route.CONTACT]: {
        label: "Contact",
        private: import.meta.env.PROD
    },
    [Route.POLICIES]: {
        label: "Policies",
        hideInMainNav: true,
        hideInFooter: true
    }
} as const;
