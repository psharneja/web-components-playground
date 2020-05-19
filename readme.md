autonomous elements
extended built-in elements

********

lifecycle
****
element created -> constructor----basic initializations
****
elmnt attached -> connectedcallback----DOM initializations
****
elmnt detached -> disconnectedCallback----cleanupwork
****
attribute update -> attributeChangedCallback----update data+dom
****
****


attributes
  static get observedAttributes() {
      
  }