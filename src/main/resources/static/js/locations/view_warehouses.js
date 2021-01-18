var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WarehouseApp = function (_React$Component) {
  _inherits(WarehouseApp, _React$Component);

  function WarehouseApp(props) {
    _classCallCheck(this, WarehouseApp);

    var _this = _possibleConstructorReturn(this, (WarehouseApp.__proto__ || Object.getPrototypeOf(WarehouseApp)).call(this, props));

    _this.load_warehouses = function () {
      $.ajax({
        url: '/warehouses',
        type: "GET",
        context: _this,
        success: function success(warehouse_data) {
          console.log(warehouse_data);
          this.setState({
            warehouses: warehouse_data
          });
        }
      });
    };

    _this.onClick_add_warehouse = function () {
      console.log("add");
    };

    _this.state = {
      warehouses: []
    };
    _this.load_warehouses();
    _this.modalMenu = React.createRef();
    return _this;
  }

  _createClass(WarehouseApp, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "m-1" },
          React.createElement(
            "button",
            { className: "btn btn-sm btn-primary",
              onClick: this.onClick_add_warehouse
            },
            "+"
          )
        ),
        React.createElement(
          "table",
          { className: "table table-sm" },
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
                "City"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "State"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Country"
              )
            )
          )
        ),
        React.createElement(ModalMenu, { ref: this.modalMenu })
      );
    }
  }]);

  return WarehouseApp;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(WarehouseApp, null), document.getElementById("content-container"));
}

loadReact();