var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationTable = function (_React$Component) {
  _inherits(LocationTable, _React$Component);

  function LocationTable(props) {
    _classCallCheck(this, LocationTable);

    var _this = _possibleConstructorReturn(this, (LocationTable.__proto__ || Object.getPrototypeOf(LocationTable)).call(this, props));

    _this.show_menu = function () {
      _this.modalMenu.current.show_menu("create_location", function (data) {
        console.log(data);
      });
    };

    _this.modalMenu = React.createRef();
    return _this;
  }

  _createClass(LocationTable, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { className: "btn btn-primary",
            onClick: this.show_menu
          },
          "Create"
        ),
        React.createElement(ModalMenu, { ref: this.modalMenu })
      );
    }
  }]);

  return LocationTable;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(LocationTable, null)
  ), document.getElementById("content-container"));
}

loadReact();