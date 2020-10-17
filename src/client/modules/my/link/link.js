import { LightningElement, api } from 'lwc';

export default class App extends LightningElement {
    @api to;

    connectedCallback() {
        this.template.addEventListener(
            'onclick',
            this.handleClickLink.bind(this)
        );
    }

    handleClickLink() {
        this.dispatchEvent(
            new CustomEvent('clicklink', {
                bubbles: true,
                composed: true,
                detail: { to: this.to }
            })
        );
    }

    // get computedTo() {
    //     if (this.to.charAt(0) !== '/') return '/' + this.to;
    //     return this.to;
    // }
}
