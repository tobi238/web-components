var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CounterElement = /** @class */ (function (_super) {
    __extends(CounterElement, _super);
    function CounterElement() {
        var _this = _super.call(this) || this;
        // Initialise the counter value
        _this.counter = 0;
        // We attach an open shadow root to the custom element
        var shadowRoot = _this.attachShadow({
            mode: 'open'
        });
        // We define some inline styles using a template string
        var styles = "\n          :host {\n              position: relative;\n              font-family: sans-serif;\n          }\n\n          #counter-increment, #counter-decrement {\n              width: 60px;\n              height: 30px;\n              margin: 20px;\n              background: none;\n              border: 1px solid black;\n          }\n\n          #counter-value {\n              font-weight: bold;\n          }\n      ";
        // We provide the shadow root with some HTML
        shadowRoot.innerHTML = "\n          <style>" + styles + "</style>\n          <h3>Counter</h3>\n          <slot name='counter-content'>Button</slot>\n          <button id='counter-increment'> - </button>\n          <span id='counter-value'>; 0 </span>;\n          <button id='counter-decrement'> + </button>\n      ";
        // We can query the shadow root for internal elements
        // in this case the button
        _this.incrementButton = _this.shadowRoot.querySelector('#counter-increment');
        _this.decrementButton = _this.shadowRoot.querySelector('#counter-decrement');
        _this.counterValue = _this.shadowRoot.querySelector('#counter-value');
        // We can bind an event which references one of the class methods
        _this.incrementButton.addEventListener("click", _this.decrement.bind(_this));
        _this.decrementButton.addEventListener("click", _this.increment.bind(_this));
        return _this;
    }
    CounterElement.prototype.increment = function () {
        this.counter++;
        this.invalidate();
    };
    CounterElement.prototype.decrement = function () {
        this.counter--;
        this.invalidate();
    };
    // Call when the counter changes value
    CounterElement.prototype.invalidate = function () {
        this.counterValue.innerHTML = this.counter;
    };
    return CounterElement;
}(HTMLElement));
// This is where the actual element is defined for use in the DOM
customElements.define('counter-element', CounterElement);
//# sourceMappingURL=CounterElement.js.map