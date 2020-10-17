import { LightningElement } from 'lwc';

export default class Router extends LightningElement {
    // b_history = [];

    constructor() {
        super();
        window.addEventListener('popstate', this.handleChangeState.bind(this));
        window.addEventListener('clicklink', this.handleClickLink.bind(this));
    }

    // renderedCallback(){
    //     let routes = this.querySelectorAll('my-route');
    //     let isRouteMatched = false;
    //     // console.log('@@@ evt.detail ' , evt.detail);
    //     // if(evt.detail === undefined){
    //     console.log('@@@ connected ' , window.sessionStorage.getItem('__path'));
    //     let matchedPath;
    //         routes.forEach(r => {
    //             console.log('@@@ r.path ' , r.path);
    //             if(r.path === window.sessionStorage.getItem('__path')){
    //                 r.isVisible = true;
    //                 isRouteMatched = true;
    //                 matchedPath = r.path;
    //             } else if(r.path === window.location.pathname && r.path !== '/'){
    //                 r.isVisible = true;
    //                 isRouteMatched = true;
    //                 matchedPath = r.path;
    //             } else
    //                 r.isVisible = false;
    //         });
    //         console.log('@@@ window.location.pathname ' , window.location.pathname);
    //         console.log('@@@ session ' , window.sessionStorage.getItem('__path'));

    //         console.log('@@@ matchedPath ' , matchedPath);
    //         console.log('@@@ isRouteMatched ' , isRouteMatched);
    //         //If isRouteMatched set the url
    //         if(isRouteMatched){
    //             // window.sessionStorage.setItem('__prevPath', window.location.pathname)
    //             window.history.pushState({}, '', matchedPath);
    //             window.sessionStorage.setItem('__path', matchedPath);
    //         } else { //Set the notFound
    //             // window.sessionStorage.setItem('__prevPath', window.location.pathname)
    //             window.history.pushState({}, '', '/NotFound');
    //             routes.forEach(r => { if(r.isNotFound) r.isVisible = true; });
    //             window.sessionStorage.setItem('__path', '/NotFound');
    //         }
    // }

    // renderedCallback(){
    //     // this.handleReloa
    //     // this.handleChangeState({});
    // }

    renderedCallback() {
        console.log('@@@ rendered ', window.history.state);
        if (window.sessionStorage.getItem('__path') !== null)
            this.matchRoute(window.sessionStorage.getItem('__path'), true);
        else this.setupDefaultRoute();
    }

    setupDefaultRoute() {
        this.querySelectorAll('my-route').forEach((r) => {
            r.isVisible = r.path === '/';
        });
    }

    handleChangeState() {
        console.log('@@@ handlechange');
        window.sessionStorage.setItem('__path', window.location.pathname);
        // this.b_history.push(window.location.pathname);
        this.matchRoute(window.location.pathname, false);
        // window.sessionStorage.setItem('__prevpath', window.sessionStorage.getItem('__prevpath'));
        // window.history.pushState({}, '', window.sessionStorage.getItem('__prevpath'));
        // this.matchRoute(window.location.pathname);
    }

    handleClickLink(evt) {
        // window.sessionStorage.setItem('__prevpath', window.location.pathname);
        this.matchRoute(evt.detail.to, true);
        // this.b_history.push(evt.detail.to);
    }

    matchRoute(path, needsPushState) {
        let routes = this.querySelectorAll('my-route');
        let isRouteMatched = false;
        console.log('@@@ path matchRoute ', path);
        routes.forEach((r) => {
            if (r.path === path) {
                r.isVisible = true;
                isRouteMatched = true;
            } else r.isVisible = false;
        });

        console.log('@@@ isRouteMatched ', isRouteMatched);
        //If isRouteMatched set the url
        if (isRouteMatched) {
            if (needsPushState)
                window.history.pushState(
                    { path: path, prevpath: window.location.pathname },
                    '',
                    path
                );
            window.sessionStorage.setItem('__path', path);
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
            window.sessionStorage.setItem('__path', '/NotFound');
        }
    }

    // connectedCallback() {
    //     // let sessionPath = window.sessionStorage.getItem('actualPath', window.location.pathname);
    //     // let routes = this.querySelectorAll('my-route');
    //     // console.log('@@@ routes');
    //     // console.log('@@@ sessionPath ' , sessionPath);
    //     // if(sessionPath !== null){
    //     //     let routeMatched = false;
    //     //     let matchedPath;
    //     //     routes.forEach((r) => {
    //     //         if (r.path === sessionPath) {
    //     //             r.isVisible = true;
    //     //             routeMatched = true;
    //     //             matchedPath = r.path;
    //     //         } else r.isVisible = false;
    //     //     });

    //     //     //If no route is matched, show the not found page
    //     //     console.log('@@@ routeMatched ' , routeMatched);
    //     //     if (!routeMatched)
    //     //         routes.find((r) => {
    //     //             return r.isNotFoundPage;
    //     //         }).isVisible = true;
    //     //     else
    //     //         window.history.pushState('','', window.location.origin + matchedPath);
    //     // }
    // }

    // renderedCallback() {
    //     let routes = this.querySelectorAll('my-route');
    //     let sessionPath = window.sessionStorage.getItem('actualPath');
    //     // let h = this;
    //     let routeMatched = false;
    //     let matchedPath;
    //     console.log('@@@ window.pathname ', window.location.pathname);
    //     let path;
    //     if(window.location.pathname !== sessionPath)
    //         path = window.location.pathname;
    //     else
    //         path = sessionPath;
    //     // let path = sessionPath || window.location.pathname;
    //     console.log('@@@ path ' , path);
    //     routes.forEach((r) => {
    //         if (r.path === path) {
    //             r.isVisible = true;
    //             routeMatched = true;
    //             matchedPath = r.path;
    //         } else r.isVisible = false;
    //     });

    //     //If no route is matched, show the not found page
    //     console.log('@@@ routeMatched ' , routeMatched);
    //     if (!routeMatched){
    //         let notFound = routes.find((r) => {
    //             return r.isNotFoundPage;
    //         })/*.isVisible = true;*/
    //         notFound.isVisible = true;
    //         path = notFound.path;
    //         matchedPath = path;
    //     }
    //     // else
    //     window.sessionStorage.setItem('actualPath', path);
    //     window.history.pushState('','', window.location.origin + matchedPath);

    // }

    // handleChangeState(evt) {
    //     let routes = this.querySelectorAll('my-route');
    //     // let path = window.location.pathname;
    //     let routeMatched = false;
    //     let matchedPath;
    //     let path;
    //     console.log('@@@ pushstate ' , evt.detail);
    //     if(evt.detail !== undefined)
    //         path = evt.detail.to;
    //     else if (window.sessionStorage.getItem('actualPath') !== null)
    //         path = window.sessionStorage.getItem('actualPath');
    //     else
    //         path = window.location.pathname;

    //     console.log('@@@ changePush ' , path);
    //     routes.forEach((r) => {
    //         if (r.path === path) {
    //             r.isVisible = true;
    //             routeMatched = true;
    //             matchedPath = r.path;
    //         } else r.isVisible = false;
    //     });

    //     //If no route is matched, show the not found page
    //     console.log('@@@ routeMatched ' , routeMatched);
    //     if (!routeMatched){
    //         let notFound = routes.find((r) => {
    //             return r.isNotFoundPage;
    //         })/*.isVisible = true;*/
    //         notFound.isVisible = true;
    //         path = notFound.path;
    //         matchedPath = path;
    //     }
    //     // else
    //     window.sessionStorage.setItem('actualPath', path);
    //     window.history.pushState('','', window.location.origin + matchedPath);

    // }

    // updateUrl(evt){
    //     window.sessionStorage.setItem('__path', evt.detail.to);
    //     console.log('@@@ evt.detail.to ' , evt.detail.to );
    //     window.history.pushState({ path: evt.detail.to },'lwc app', evt.detail.to);
    //     this.handleChangeState(evt);
    // }
}
