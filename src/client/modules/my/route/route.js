import { LightningElement, api } from 'lwc';

export default class App extends LightningElement {
    //Url Path
    @api path;
    //Render the slot inside the route
    @api isVisible;
}
