import { LightningElement } from 'lwc';

export default class Router extends LightningElement {
    constructor() {
        super();
        window.addEventListener('popstate', this.handleChangeState.bind(this));
        window.addEventListener('clicklink', this.handleChangeState.bind(this));
    }

    connectedCallback() {}

    renderedCallback() {
        let routes = this.querySelectorAll('my-route');
        // let h = this;
        let routeMatched = false;
        console.log('@@@ window.pathname ', window.location.pathname);
        let path = window.location.pathname;
        routes.forEach((r) => {
            if (r.path === path) {
                r.isVisible = true;
                routeMatched = true;
            } else r.isVisible = false;
        });

        //If no route is matched, show the not found page
        if (!routeMatched)
            routes.find((r) => {
                return r.isNotFoundPage;
            }).isVisible = true;
    }

    handleChangeState(evt) {
        let routes = this.querySelectorAll('my-route');
        // let path = window.location.pathname;
        let routeMatched = false;
        let path = evt.detail.to;
        routes.forEach((r) => {
            if (r.path === path) {
                r.isVisible = true;
                routeMatched = true;
            } else r.isVisible = false;
        });

        //If no route is matched, show the not found page
        if (!routeMatched)
            routes.find((r) => {
                return r.isNotFoundPage;
            }).isVisible = true;
        // var path;
        // console.log('@@@ history ', window.history);
        // console.log('@@@ window ', window.location.href);
        // console.log('@@@ pathname ', window.location.pathname);
        // if (evt.detail !== undefined) {
        //     path =
        //         evt.detail.to !== '/'
        //             ? window.location.origin + evt.detail.to
        //             : window.location.origin;
        //     let routes = this.querySelectorAll('my-route');
        //     console.log('@@@ routes ', routes);
        //     if (routes != null) {
        //         routes.forEach((r) => {
        //             if (r.path === evt.detail.to) r.isVisible = true;
        //             else r.isVisible = false;
        //         });

        //         console.log('@@@ evt.detail.to f ' + evt.detail.to);
        //         console.log('@@@ routes final ', routes);
        //     } else console.log('no route found');
        // } else {
        //     path = window.location.origin;
        //     if (window.localStorage.getItem('prevPath') != null)
        //         path = window.localStorage.getItem('prevPath');
        //     // window.location.pathname = window.location.origin
        //     let routes = this.querySelectorAll('my-route');
        //     console.log('@@@ routes ', routes);
        //     if (routes != null) {
        //         routes.forEach((r) => {
        //             if (
        //                 window.localStorage.getItem('prevPath').includes(r.path)
        //             )
        //                 r.isVisible = true;
        //             else r.isVisible = false;
        //         });

        //         console.log('@@@ routes final ', routes);
        //     } else console.log('no route found');
        // }
        // console.log('@@@ pathname ', window.location.pathname);
        // console.log('@@@ path ', path);

        // window.localStorage.setItem('currentPath', path);
        // window.localStorage.setItem('prevPath', window.location.href);
        // console.log('@@@ prevPath ', window.localStorage.getItem('prevPath'));
        // window.history.pushState('page', 'page', path);
    }
}
