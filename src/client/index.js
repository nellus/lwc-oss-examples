import { createElement } from 'lwc';
import MyApp from 'my/app';

window.history.pushState('', '', window.location.origin);
console.log('@@@ window ', window.history);

const app = createElement('my-app', { is: MyApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
