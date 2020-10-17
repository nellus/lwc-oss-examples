import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    // constructor(){
    //     super();
    //     window.addEventListener('beforeunload', this.handlePageReload.bind(this));
    // }

    connectedCallback() {
        fetch('/api/v1/endpoint')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log('@@@ json ', json);
            })
            .catch((err) => {
                console.log('@@@ err ', err);
            });
    }

    clickBtn() {
        this.dispatchEvent(
            new CustomEvent('clicklink', {
                bubbles: true,
                composed: true,
                detail: { to: 'path1' }
            })
        );
    }

    handlePageReload(evt) {
        evt.preventDefault();
        // evt.stopPropagation();
        console.log('@@@ AAA');
        window.location.href = window.location.origin;
        // return event.returnValue = '';
        evt.returnValue = '';
    }
}
