var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReceiveItemApp = function (_React$Component) {
  _inherits(ReceiveItemApp, _React$Component);

  function ReceiveItemApp(props) {
    _classCallCheck(this, ReceiveItemApp);

    var _this = _possibleConstructorReturn(this, (ReceiveItemApp.__proto__ || Object.getPrototypeOf(ReceiveItemApp)).call(this, props));

    _this.onSubmit_item = function (e) {
      e.preventDefault();
      var form = e.target;
      var data = Object.fromEntries(new FormData(form).entries());

      form.reset();
      document.getElementById("shipment-input").focus();
      _this.setState(function (state) {
        var new_items = [].concat(_toConsumableArray(state.session_received_items));
        new_items.push(data);
        return {
          session_received_items: new_items
        };
      });
    };

    _this.state = {
      session_received_items: []
    };
    return _this;
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
          { onSubmit: this.onSubmit_item },
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { htmlFor: "shipment-input" },
              "Shipment"
            ),
            React.createElement("input", { type: "text", name: "shipment", className: "form-control", id: "shipment-input" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { htmlFor: "item-sku-input" },
              "Item SKU"
            ),
            React.createElement("input", { type: "text", name: "itemSku", className: "form-control", id: "item-sku-input" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { htmlFor: "quantity-input" },
              "Quantity"
            ),
            React.createElement("input", { type: "number", name: "quantity", className: "form-control", id: "quantity-input" })
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
                "Item Name"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Shipment"
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
          ),
          React.createElement(
            "tbody",
            null,
            this.state.session_received_items.map(function (item) {
              return React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  null,
                  item.name
                ),
                React.createElement(
                  "td",
                  null,
                  item.shipment
                ),
                React.createElement(
                  "td",
                  null,
                  item.quantity
                ),
                React.createElement("td", null)
              );
            })
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