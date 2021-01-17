var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationRow = function (_React$Component) {
  _inherits(LocationRow, _React$Component);

  function LocationRow(props) {
    _classCallCheck(this, LocationRow);

    var _this = _possibleConstructorReturn(this, (LocationRow.__proto__ || Object.getPrototypeOf(LocationRow)).call(this, props));

    _this.onClick_delete_btn = function () {
      var result = window.confirm("Are you sure you want to delete " + _this.state.location.location_string + "?");
      if (result) {
        _this.props.delete_location(_this.state.location.id);
      }
    };

    _this.onClick_checkbox = function (e) {
      _this.props.onClick_row_checkbox(e);
    };

    _this.onChange_checkbox = function (e) {
      var $tr = $(e.target).closest("tr");
      if (e.target.checked) {
        $tr.addClass("checked-row");
      } else {
        $tr.removeClass("checked-row");
      }
    };

    _this.state = {
      location: _this.props.location
    };
    return _this;
  }

  _createClass(LocationRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        { key: this.state.location.id },
        React.createElement(
          "td",
          null,
          React.createElement("input", { type: "checkbox", className: "row-checkbox", row_index: this.props.index,
            id: "row-checkbox-" + this.props.index,
            onClick: this.onClick_checkbox,
            onChange: this.onChange_checkbox
          })
        ),
        React.createElement(
          "td",
          null,
          this.state.location.area
        ),
        React.createElement(
          "td",
          null,
          this.state.location.row
        ),
        React.createElement(
          "td",
          null,
          this.state.location.bay
        ),
        React.createElement(
          "td",
          null,
          this.state.location.level
        ),
        React.createElement(
          "td",
          null,
          this.state.location.shelf
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-warning" },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-pencil-square", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" }),
              React.createElement("path", { fillRule: "evenodd", d: "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" })
            )
          ),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-danger", onClick: this.onClick_delete_btn },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-trash", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" }),
              React.createElement("path", { fillRule: "evenodd", d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" })
            )
          )
        )
      );
    }
  }]);

  return LocationRow;
}(React.Component);