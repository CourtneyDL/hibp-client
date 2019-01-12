require('babel-register')();

const { JSDOM } = require('jsdom');
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;

const exposedProperties = ['window', 'navigator', 'document'];

const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

configure({ adapter: new Adapter() });

global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const documentRef = document;