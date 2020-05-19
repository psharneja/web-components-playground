class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipcontainer;
    this._tooltipText = "some dummy text";
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
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("my-tooltip", Tooltip);
