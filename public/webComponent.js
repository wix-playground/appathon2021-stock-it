const appId = '42683fdd-cbe6-43a7-a75d-92b70d37e7cd';
let productId;
let productName;
const outOfStock = 'out of stock';
let showCustomElement = false;
let currentInstanceId;

class MyComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
  connectedCallback() {
    const wixconfig = JSON.parse(this?.attributes?.wixconfig?.value || '{}');
    // current instanceId
    currentInstanceId = wixconfig?.instanceId || '';
    console.log({ wixconfig });
    const {
      title = 'no value',
      button = 'no button text',
      backgroundColor,
      borderColor,
      borderWidth = 0,
      emailPlaceholder = 'Enter email',
    } = wixconfig?.data || {};
    this.setAttribute('style', 'display:block');
    this.innerHTML = true
      ? `
      <div style="display: flex;
          box-sizing: border-box;
          justify-content: flex-start;
          flex-direction: column;
          width: 100%;
          background-color: ${
            backgroundColor?.color
              ? this.rgbaColorToRgbColor(backgroundColor.color)
              : '#fff'
          };
          border: ${borderWidth}px solid ${
          borderColor?.color
            ? this.rgbaColorToRgbColor(borderColor.color)
            : '#fff'
        }
        ">
          <h2 style="margin-bottom: 10px;">${title}</h2>
          <div style="display: flex;width: 100%;justify-content: space-between;">
              <input id="email-input" placeholder="${emailPlaceholder}"" type="text" id="email" name="email">
              <button id="send-button" style="border: 1px solid black; padding: 5px;" type="button" >${button}</button>
          </div>
      </div>
    `
      : '';
    this.runScript();
    document
      .querySelector('#send-button')
      ?.addEventListener('click', this.onButtonClick);
  }
  runScript() {
    const registerListener = () => {
      window.wixDevelopersAnalytics?.register?.(appId, (eventName, data) => {
        switch (eventName) {
          case 'ViewContent':
            const { id, dimension3: stockStatus, name } = data;
            productId = id;
            productName = name;
            console.log({ eventName, data });
            showCustomElement = stockStatus === outOfStock;
            this.connectedCallback();
            break;
        }
      });
    };

    window.wixDevelopersAnalytics
      ? registerListener()
      : window.addEventListener(
          'wixDevelopersAnalyticsReady',
          registerListener,
        );
  }
  // async sendData(visitorEmail, productId) {
  //   const rawResponse = await fetch(
  //     'https://b61d-31-168-255-162.ngrok.io/registerToOOSProduct',
  //     {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         productId,
  //         email: visitorEmail,
  //       }),
  //     },
  //   );
  //   const content = await rawResponse.json();
  //   console.log({ content });
  // }
  async onButtonClick() {
    const visitorEmail = document.querySelector('#email-input').value;
    console.log({
      visitorEmail,
      productId,
      currentInstanceId,
      productName,
    });
    const rawResponse = await fetch(
      'https://b61d-31-168-255-162.ngrok.io/registerToOOSProduct',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          email: visitorEmail,
          productName,
        }),
      },
    );
    // const content = await rawResponse.json();
    console.log({ rawResponse });
  }
  rgbaColorToRgbColor(rgbaColor) {
    return rgbaColor.replace('a', '').split(',').slice(0, 3).join(',') + ')';
  }
}

customElements.define('my-own-component', MyComponent);
