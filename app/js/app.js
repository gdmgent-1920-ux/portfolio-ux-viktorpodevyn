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
   // the assignment numbers
   const assignmentNumbers = [ 1, 2, 3, 4, 5 ];

   // create the users name
   const name = `${data.general.firstName} ${data.general.lastName}`;
   const group = `${data.general.class}`;
   const studentNumber = `${data.general.studentnumber}`;

   // set the title of the document
   AppView.setDocumentTitle(`${name} | ${group} | Artevelde University College Ghent`);
   document.querySelector('.heading-name').innerHTML = `${name}, ${group}`;
   document.querySelector('.student-number').innerHTML = `${studentNumber}`;

   // create the buttons for each assignment and add them to the DOM
   assignmentNumbers.forEach((number) => {
    AppView.appendButtonsForAssignment(
      document.querySelector(`.assignment${number} .work-buttons-container`),
      data[`assignment${number}`].buttons)
   });

   // init the mobile navigation
   App.initMobileNavigation();

   // init the scrolling behaviour
   App.initScrolling();
 },

 initMobileNavigation: () => {
   // get the mobile menu
   const mobileMenu = document.querySelector('.mobile-menu');

   // set the event handler
   mobileMenu.addEventListener('click', () => {
      if(document.querySelector('.header-menu').classList.contains('open')) AppView.closeMobileNavigation();
      else AppView.openMobileNavgation();
   });
 },


 initScrolling: () => {
    document.querySelectorAll('.nav-link').forEach((element) => {
      // get the element to scroll to
      const navigateTo = element.dataset.navigateto;

      // validate
      if(typeof(navigateTo) === "undefined") return;

      // settings
      const behavior = "smooth";
      const block = "center";
      const inline = "nearest";

      // scroll to the container if we click the link
      element.addEventListener('click', (e) => {
         // preven default behaviour
         e.preventDefault();

         // close mobile view if needed
         if(document.querySelector('.header-menu').classList.contains('open')) AppView.closeMobileNavigation();

         // scroll to position
         document.querySelector(`.${navigateTo}`).scrollIntoView({ behavior, block, inline });
      });
    });
 }

}

/**
 * The logic for the view for the app
 */
AppView = {

  /**
   * Sets the title of the HTML document
   */
   setDocumentTitle: (title) => document.title = title,

   /**
    * Open the mobile navigation menu
    */
   openMobileNavgation: () => {
      document.querySelector('.app').classList.add('fixed');
      document.querySelector('.mobile-menu').classList.add('mobile');
      document.querySelector('.header-menu').classList.add('open');
   },

   /**
    * Close the mobile navigation menu
    */
   closeMobileNavigation: () => {
      document.querySelector('.app').classList.remove('fixed');
      document.querySelector('.mobile-menu').classList.remove('mobile');
      document.querySelector('.header-menu').classList.remove('open');
   },

   /**
    * Add buttons (given in JSON { text, title, href} to an assignment container)
    */
   appendButtonsForAssignment: ((parent, buttons) => {
      // validate the incoming variables
      if(typeof(buttons) === "undefined" || buttons.length <= 0) return;

      // loop over the buttons data and add them to the view
      buttons.forEach((button) => {
         // get the data, safely
         const text = typeof(button.text) === "undefined" ? "" : button.text;
         const title = typeof(button.title) === "undefined" ? "" : button.title;
         const href = typeof(button.href) === "undefined" ? "" : button.href;
         const target = typeof(button.text) === "undefined" ? "_self" : button.target;

         // append the button
         AppView.appendButton({ parent, text, title, href, target });
      });
   }),

   /**
    * Render a button
    */
   appendButton: ({ parent, text, href, title, target='_self' }) => {
       // check incoming variables
       if(!AppTools.isElement(parent)) return;

       // create a new anchor element
       const a = document.createElement('a');

       // set the text to click on and add this to the anchor element
       var linkText = document.createTextNode(text);
       a.appendChild(linkText);

       // set the button class
       a.className = 'button';

       // set some anchor properties
       if(href) a.href = href;
       if(title) a.title = title;
       if(target) a.target = target;

       // append the anchor to our given parent element
       parent.appendChild(a);
   }

}

/**
 * Some tools to make life more comfortable
 */
AppTools = {

  /**
   * This will check if an object is an HTML5 element
   * source: https://stackoverflow.com/questions/4754088/how-to-check-if-object-is-a-dom-element/4754104
   */
   isElement: (obj) => obj instanceof Element,

}

// when window is loaded, init the app
window.addEventListener('load', App.init);