// class MyComponent extends HTMLElement {
//   constructor() {
//     // Always call super first in constructor
//     super();
//   }
//   connectedCallback() {
//     setTimeout(() => {
//       console.log("before");
//       this.dispatchEvent(new CustomEvent('web-component-event'));
//       console.log("after");
//     }, 500)
//     debugger;
//     this.dispatchEvent(new CustomEvent('web-component-event'));
//     const wixconfig = JSON.parse(this?.attributes?.wixconfig?.value || '{}');
//     // current instanceId
//     const instanceId = wixconfig?.instanceId || '';
//     console.log("sapir")
//     console.log({wixconfig})
//     this.setAttribute('style', 'display:block')
//     this.innerHTML = `
//       <div style="display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-direction: column;
//           width: 100%;
//           height: 100vh;
//           background: #f0f8ff;
//         ">
//           <h1>This is a Web Component demo sapir</h1>
//       </div>
//     `;
//   }
// }

// customElements.define('my-component', MyComponent);

(function(){
  console.log("blabla");
  alert("bla");
})()