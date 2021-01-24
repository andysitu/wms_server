var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReceiveItemApp = function (_React$Component) {
  _inherits(ReceiveItemApp, _React$Component);

  function ReceiveItemApp(props) {
    _classCallCheck(this, ReceiveItemApp);

    return _possibleConstructorReturn(this, (ReceiveItemApp.__proto__ || Object.getPrototypeOf(ReceiveItemApp)).call(this, props));
  }

  _createClass(ReceiveItemApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.getElementById("shipment-input").focus();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          null,
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { htmlFor: "shipment-input" },
              "Shipment"
            ),
            React.createElement("input", { type: "text", "class": "form-control", id: "shipment-input" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { htmlFor: "item-sku-input" },
              "Item SKU"
            ),
            React.createElement("input", { type: "text", "class": "form-control", id: "item-sku-input" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { htmlFor: "quantity-input" },
              "Quantity"
            ),
            React.createElement("input", { type: "number", "class": "form-control", id: "quantity-input" })
          ),
          React.createElement(
            "button",
            { type: "submit" },
            "Submit"
          )
        ),
        React.createElement(
          "table",
          null,
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                { scope: "col" },
                "Name"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Shipment"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Location"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Quantity"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Options"
              )
            )
          )
        )
      );
    }
  }]);

  return ReceiveItemApp;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(ReceiveItemApp, null), document.getElementById("content-container"));
}

loadReact();