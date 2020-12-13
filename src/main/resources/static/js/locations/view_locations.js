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
      _this.modalMenu.current.show_menu("create_location");
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

var ModalMenu = function (_React$Component2) {
  _inherits(ModalMenu, _React$Component2);

  function ModalMenu(props) {
    _classCallCheck(this, ModalMenu);

    var _this2 = _possibleConstructorReturn(this, (ModalMenu.__proto__ || Object.getPrototypeOf(ModalMenu)).call(this, props));

    _this2.show_menu = function (menu_type) {
      _this2.setState({ menu_type: "none" });
      _this2.setState({ menu_type: menu_type });
      $("#modalMenu").modal("show");
    };

    _this2.create_menu = function () {
      if (_this2.state.menu_type == "none") {
        return React.createElement("div", null);
      } else if (_this2.state.menu_type == "create_location") {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Location"
            ),
            React.createElement("input", { type: "text", className: "form-control", name: "loc" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Area"
            ),
            React.createElement("input", { type: "text", className: "form-control", name: "area" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Row"
            ),
            React.createElement("input", { type: "number", className: "form-control", name: "row" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Column"
            ),
            React.createElement("input", { type: "number", className: "form-control", name: "column" })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Level"
            ),
            React.createElement("input", { type: "number", className: "form-control", name: "level" })
          )
        );
      }
    };

    _this2.get_data = function () {
      var data = {};
      if (_this2.state.additional_data) {
        for (var k in _this2.state.additional_data) {
          data[k] = _this2.state.additional_data[k];
        }
      }
      var formData = new FormData($("#modalmenu-form")[0]);

      if (_this2.state.type == "create_workitem") {
        formData.set("handleit", formData.get("handleit") == "on" ? true : false);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = formData.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          data[key] = formData.get(key);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return data;
    };

    _this2.onSubmit = function (e) {
      e.preventDefault();
      console.log("submit");
      var data = _this2.get_data();
      console.log(data);
      $("#modalMenu").modal("hide");
    };

    _this2.state = {
      menu_type: "none"
    };
    return _this2;
  }

  _createClass(ModalMenu, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "modal", tabIndex: "-1", role: "dialog", id: "modalMenu" },
        React.createElement(
          "div",
          { className: "modal-dialog", role: "document" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "h5",
                { className: "modal-title" },
                "Title"
              ),
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal" },
                React.createElement(
                  "span",
                  { "aria-hidden": "true" },
                  "\xD7"
                )
              )
            ),
            React.createElement(
              "form",
              { onSubmit: this.onSubmit, id: "modalmenu-form" },
              React.createElement(
                "div",
                { className: "modal-body" },
                this.create_menu()
              ),
              React.createElement(
                "div",
                { className: "modal-footer" },
                React.createElement(
                  "button",
                  { type: "submit", className: "btn btn-primary" },
                  "Submit"
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
                  "Close"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ModalMenu;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(LocationTable, null)
  ), document.getElementById("content-container"));
}

loadReact();