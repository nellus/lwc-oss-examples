import { LightningElement } from 'lwc';
// import { createStore } from '@lwce/store';

export default class Router extends LightningElement {
    constructor() {
        super();
        window.addEventListener('popstate', this.handleChangeState.bind(this));
        window.addEventListener('clicklink', this.handleChangeState.bind(this));
        window.addEventListener('beforeunload', this.unloadHandler.bind(this));
        window.addEventListener('onload', this.reloadPage.bind(this));
        // window.addEventListener('unload', this.unloadHandler.bind(this));
        // window.addEventListener('pagehide', this.reloadPage.bind(this));
        window.addEventListener('pushstate', this.handlePushState.bind(this));
    }

    connectedCallback() {
        var currentPath = localStorage.getItem('currentPath');
        console.log('@@@ currentPath ', currentPath);
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

    unloadHandler(evt) {
        // evt.returnValue = undefined;
        window.location.href = window.location.origin;
        console.log('@@@ origin ', window.location.origin);
        window.location.href = 'http://localhost:3001';
        console.log('@@@ href final ', window.location.href);
        evt.returnValue = 'abc';
        // return evt.returnValue;
        return '';
        // return;
    }

    handlePushState(evt) {
        console.log('@@@ pushstae ', evt);
    }

    reloadPage(evt) {
        console.log('@@@ reload ', evt);
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
            // window.location.pathname = window.location.origin
        }
        console.log('@@@ pathname ', window.location.pathname);
        console.log('@@@ path ', path);

        window.localStorage.setItem('currentPath', path);

        window.history.pushState('page2', 'Title', path);
    }
}
