const appId = '42683fdd-cbe6-43a7-a75d-92b70d37e7cd';
let idOfViewedProduct;

class MyComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    const wixconfig = JSON.parse(this?.attributes?.wixconfig?.value || '{}');
    console.log({ wixconfig });
    const {
      title = 'no value',
      button = 'no button text',
      backgroundColor,
      borderColor,
      borderWidth = 0,
    } = wixconfig?.data || {};
    this.setAttribute('style', 'display:block');
    this.innerHTML = `
      <div style="display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          padding: 10px 0;
          background-color: ${
            backgroundColor?.color
              ? this.rgbaColorToRgbColor(backgroundColor.color)
              : '#fff'
          };
          border: ${borderWidth}px solid ${
      borderColor?.color ? this.rgbaColorToRgbColor(borderColor.color) : '#fff'
    }
        ">
          <h2 style="margin-bottom: 10px;">${title}</h2>
          <div style="display: flex;width: 55%;justify-content: space-between;">
              <input id="email-input" placeholder="your email" type="text" id="email" name="email">
              <button id="send-button" style="border: 1px solid black; padding: 5px;" type="button" >${button}</button>
          </div>
      </div>
    `;
    this.runScript();
    document
      .querySelector('#send-button')
      .addEventListener('click', this.onButtonClick);
  }
  runScript() {
    window.wixDevelopersAnalytics?.register?.(appId, (eventName, data) => {
      switch (eventName) {
        case 'productPageLoaded':
          const { productId } = data;
          idOfViewedProduct = productId;
          break;
      }
    });
  }
  onButtonClick() {
    const visitorEmail = document.querySelector('#email-input').value;
    console.log({ visitorEmail, idOfViewedProduct });
  }
  rgbaColorToRgbColor(rgbaColor) {
    return rgbaColor.replace('a', '').split(',').slice(0, 3).join(',') + ')';
  }
}

customElements.define('my-own-component', MyComponent);
