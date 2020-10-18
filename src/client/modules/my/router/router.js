import { LightningElement } from 'lwc';

export default class Router extends LightningElement {
    constructor() {
        super();
        window.addEventListener('popstate', this.handleChangeState.bind(this));
        window.addEventListener('clicklink', this.handleClickLink.bind(this));
    }

    renderedCallback() {
        this.matchRoute(
            window.sessionStorage.getItem('__path') !== null
                ? window.sessionStorage.getItem('__path')
                : window.location.pathname,
            true
        );
    }

    setupDefaultRoute() {
        this.querySelectorAll('my-route').forEach((r) => {
            r.isVisible = r.path === '/';
        });
    }

    handleChangeState() {
        window.sessionStorage.setItem('__path', window.location.pathname);
        this.matchRoute(window.location.pathname, false);
    }

    handleClickLink(evt) {
        this.matchRoute(evt.detail.to, true);
    }

    matchRoute(path, needsPushState) {
        let routes = this.querySelectorAll('my-route');
        let isRouteMatched = false;
        routes.forEach((r) => {
            if (r.path === path) {
                r.isVisible = true;
                isRouteMatched = true;
            } else r.isVisible = false;
        });

        //If isRouteMatched set the url
        if (isRouteMatched) {
            if (needsPushState) {
                window.history.pushState(
                    { path: path, prevpath: window.location.pathname },
                    '',
                    path
                );
                window.sessionStorage.setItem(
                    '__path',
                    window.location.pathname
                );
            }
        } else {
            //Set the notFound
            window.history.pushState(
                { path: '/NotFound', prevpath: window.location.pathname },
                '',
                '/NotFound'
            );
            routes.find((r) => {
                return r.isNotFound;
            }).isVisible = true;
            window.sessionStorage.setItem('__path', window.location.pathname);
        }
    }
}
