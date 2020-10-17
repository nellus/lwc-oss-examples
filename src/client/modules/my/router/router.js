import { LightningElement } from 'lwc';

export default class Router extends LightningElement {
    constructor() {
        super();
        window.addEventListener('popstate', this.handleChangeState.bind(this));
        window.addEventListener('clicklink', this.handleChangeState.bind(this));
    }

    connectedCallback() {
        var currentPath = localStorage.getItem('currentPath');
        if (currentPath != null) window.history.pushState('', '', currentPath);
    }

    renderedCallback() {
        let routes = this.querySelectorAll('my-route');
        var currentPath = localStorage.getItem('currentPath');
        console.log('@@@ currentPath ', currentPath);
        console.log('@@@ window ', window.location.href);
        // let actualPath = window.location.pathname;
        let actualPath;
        if (currentPath != null && window.location.href !== currentPath)
            actualPath = currentPath;
        else actualPath = window.location.pathname;
        console.log('@@@ path init ', actualPath);
        console.log('@@@ routes init ', routes);
        routes.forEach((r) => {
            if (r.path === actualPath) r.isVisible = true;
            else r.isVisible = false;
        });
    }

    handleChangeState(evt) {
        var path;
        console.log('@@@ history ', window.history);
        console.log('@@@ window ', window.location.href);
        console.log('@@@ pathname ', window.location.pathname);
        if (evt.detail !== undefined) {
            path =
                evt.detail.to !== '/'
                    ? window.location.origin + evt.detail.to
                    : window.location.origin;
            let routes = this.querySelectorAll('my-route');
            console.log('@@@ routes ', routes);
            if (routes != null) {
                routes.forEach((r) => {
                    if (r.path === evt.detail.to) r.isVisible = true;
                    else r.isVisible = false;
                });

                console.log('@@@ evt.detail.to f ' + evt.detail.to);
                console.log('@@@ routes final ', routes);
            } else console.log('no route found');
        } else {
            path = window.location.origin;
            if (window.localStorage.getItem('prevPath') != null)
                path = window.localStorage.getItem('prevPath');
            // window.location.pathname = window.location.origin
            let routes = this.querySelectorAll('my-route');
            console.log('@@@ routes ', routes);
            if (routes != null) {
                routes.forEach((r) => {
                    if (
                        window.localStorage.getItem('prevPath').includes(r.path)
                    )
                        r.isVisible = true;
                    else r.isVisible = false;
                });

                console.log('@@@ routes final ', routes);
            } else console.log('no route found');
        }
        console.log('@@@ pathname ', window.location.pathname);
        console.log('@@@ path ', path);

        window.localStorage.setItem('currentPath', path);
        window.localStorage.setItem('prevPath', window.location.href);
        console.log('@@@ prevPath ', window.localStorage.getItem('prevPath'));
        window.history.pushState('page', 'page', path);
    }
}
