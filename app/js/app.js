/**
 * This is the main app code for the template
 * WARNING: this file should not be edited
 *
 * @author Tim De Paepe<tim.depaepe@arteveldehs.be>
 */

App = {

 /**
  * This function stays on top, it wil initialize the app
  */
 init: () => {
    // set the title of the document
    App.setDocumentTitle(`${data.general.firstName} ${data.general.lastName} | ${data.general.class} | Artevelde University College Ghent`);

    App.addLink({
       parent: document.getElementById('assignment1'),
       text: 'dit is een test',
       href: data.assignment1.pdfUrl,
       title: 'ttttt',
       className: 'myClass'
    });
 },

 /**
  * This will check if an object is an HTML5 element
  * source: https://stackoverflow.com/questions/4754088/how-to-check-if-object-is-a-dom-element/4754104
  */
 isElement: (obj) => obj instanceof Element,

 /**
  * Adds an anchor element to a given parameter
  */
 addLink: ({ parent, text, href, title, className, target='_self' }) => {
    // check incoming variables
    if(!App.isElement(parent)) return;

    // create a new anchor element
    const a = document.createElement('a');

    // set the text to click on and add this to the anchor element
    var linkText = document.createTextNode(text);
    a.appendChild(linkText);

    // set some anchor properties
    if(href) a.href = href;
    if(className) a.className = className;
    if(title) a.title = title;
    if(target) a.target = target;

    // append the anchor to our given parent element
    parent.appendChild(a);
 },

 /**
  * Sets the title of the HTML document
  */
 setDocumentTitle: (title) => document.title = title
}

// when window is loaded, init the app
window.addEventListener('load', App.init);