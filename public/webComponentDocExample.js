class MyComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    const styleProperties = JSON.parse(this?.attributes?.wixconfig?.value || '{}');
    this.setAttribute('style', 'display:block')
    this.innerHTML = `
      <div style="
        background: ${styleProperties?.data?.stripBackground || 'transparent'};
        border-bottom: ${styleProperties?.data?.bottomBorderWidth || 0}px solid ${styleProperties?.data?.bottomBorderColor || 'black'};
        border-top: ${styleProperties?.data?.topBorderWidth || 0}px solid ${styleProperties?.data?.topBorderColor || 'black'};
        width: 100%;
        padding-left: 4px;"
        >
        <div style="display: inline-flex;
            align-items: center;
            justify-content: center;
            height: inherit;
            flex-direction: column;
            width: 100%;
          ">
            <h1>This is a Web Component demo</h1>
        </div>
        <div>
          ${styleProperties?.data?.headerText && styleProperties?.data?.headerText !== ""  ?  
            `<span style="
            font-size: ${styleProperties?.data?.headerFontSize || 10}px; 
            color: ${styleProperties?.data?.headerFontColor || 'black'}; 
            font-weight: ${styleProperties?.data?.headerFontWeight || 100};
            font-family: ${styleProperties?.data?.headerFontFamily || 'Lato'};
            ">
              ${styleProperties?.data?.headerText}
            </span>` : ''
          }
          <h2 style="color: ${styleProperties?.data?.thumbnailsColor || 'black'};">Thumbnails Color</h2>
        </div>
        <div style="
          padding-left: ${styleProperties?.data?.horizontalPadding || 0}px; 
          display: flex;
          align-self: start; 
        ">
          <h1>Change horizontal padding</h1>
        </div>
      </div>
    `;
  }
}

customElements.define('my-own-component', MyComponent);