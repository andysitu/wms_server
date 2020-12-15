var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalMenu = function (_React$Component) {
  _inherits(ModalMenu, _React$Component);

  function ModalMenu(props) {
    _classCallCheck(this, ModalMenu);

    var _this = _possibleConstructorReturn(this, (ModalMenu.__proto__ || Object.getPrototypeOf(ModalMenu)).call(this, props));

    _this.show_menu = function (menu_type) {
      var submit_handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // Create a blank form to reset it, and then create actual menu
      _this.setState({
        menu_type: menu_type,
        submit_handler: submit_handler
      }, function () {
        $("#modalMenu").modal("show");
      });
    };

    _this.create_menu = function () {
      if (_this.state.menu_type == "none") {
        return React.createElement("div", null);
      } else if (_this.state.menu_type == "create_location") {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Area"
            ),
            React.createElement("input", { type: "text", className: "form-control", min: "0", name: "area", required: true })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Location"
            ),
            React.createElement("input", { type: "text", className: "form-control", min: "0", name: "loc", required: true })
          ),
          React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
              "div",
              { className: "form-group col-sm-6" },
              React.createElement(
                "label",
                null,
                "Start Row"
              ),
              React.createElement("input", { type: "number", className: "form-control", min: "0", name: "row_start", required: true })
            ),
            React.createElement(
              "div",
              { className: "form-group col-sm-6" },
              React.createElement(
                "label",
                null,
                "End Row"
              ),
              React.createElement("input", { type: "number", className: "form-control", min: "0", name: "row_end", required: true })
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Column"
            ),
            React.createElement("input", { type: "number", className: "form-control", min: "0", name: "column", required: true })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Level"
            ),
            React.createElement("input", { type: "number", className: "form-control", min: "0", name: "level", required: true })
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Shelf"
            ),
            React.createElement("input", { type: "number", className: "form-control", min: "0", name: "shelf", required: true })
          )
        );
      }
    };

    _this.get_data = function () {
      var data = {};
      if (_this.state.additional_data) {
        for (var k in _this.state.additional_data) {
          data[k] = _this.state.additional_data[k];
        }
      }
      var formData = new FormData($("#modalmenu-form")[0]);

      if (_this.state.type == "create_workitem") {
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

    _this.onSubmit = function (e) {
      e.preventDefault();
      var data = _this.get_data();
      if (_this.state.submit_handler) {
        _this.state.submit_handler(data);
      }
      $("#modalMenu").modal("hide");
    };

    _this.state = {
      menu_type: "none",
      submit_handler: null
    };
    return _this;
  }

  _createClass(ModalMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // Blank out menu when it's hidden
      $("#modalMenu").on("hidden.bs.modal", function () {
        _this2.setState({ menu_type: "none" });
      });
    }
  }, {
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