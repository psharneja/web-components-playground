class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipText = "some dummy text";
    this._tooltipIcon;
this._tooltipVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
     div {
         font-weight: normal;
         background-color: black;
         color:white;
         position: absolute;
         z-index: 10;
         top:2.25rem;
         left; 0.75rem;
         padding; 0.15rem;
         border-radius: 3px;
         box-shadow; 1px 1px 6px rgba(0,0,0,0.26);
     }


     :host {
         position:relative;
     }


     :host(.crossword) {
         background-color: var(--color-primary, #gray);
         padding; 0.15rem;
     }
     
     :host-context(p.outer) {
         font-weight: bold;

     }
   

    ::slotted(.highlight) {
        border: 2px solid green;

    }
    .icon {
        background:black;
        color: white;
        padding: 0.15rem;
        text-align:center;
        border-radius:50%;


    }
    //css in master overrides the css for shadow slot;:slotted
    //when it has class crossword :host(.crossword)
    //when its inside an element ;host-context(p .classname)
    </style>
    <slot>something default here</slot>
    <span class="icon">(?)</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
     this._tooltipIcon = this.shadowRoot.querySelector("span");
     this._tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
     this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if(oldValue === newValue) {
          return;
      }
      if(name === 'text') {
          this._tooltipText = newValue;
      }


  }

  _showTooltip() {
      this._tooltipVisible = true;
      this._render();
    
  }

  static get observedAttributes() {
      return ['text'];
  }
  _hideTooltip() {
      this._tooltipVisible = false;
      this._render();
  }


  _render() {
      let tooltipContainer = this.shadowRoot.querySelector('div');
      if(this._tooltipVisible) {
        tooltipContainer = document.createElement("div");
        tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(tooltipContainer);
      } else {
          if(tooltipContainer){

              this.shadowRoot.removeChild(tooltipContainer);
          }

      }

  }
  disconnectedCallback() {
      this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
      this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);

  }
}

customElements.define("my-tooltip", Tooltip);
