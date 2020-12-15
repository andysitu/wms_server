var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationTable = function (_React$Component) {
  _inherits(LocationTable, _React$Component);

  function LocationTable(props) {
    _classCallCheck(this, LocationTable);

    var _this = _possibleConstructorReturn(this, (LocationTable.__proto__ || Object.getPrototypeOf(LocationTable)).call(this, props));

    _this.create_location = function (data) {
      var that = _this;
      $.ajax({
        type: "POST",
        url: "./locations",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function success(new_locations) {
          that.setState({ locations: that.state.locations.concat(new_locations) });
        }
      });
    };

    _this.show_create_loc_menu = function () {
      _this.modalMenu.current.show_menu("create_location", {}, _this.create_location);
    };

    _this.get_locations = function () {
      var that = _this;
      $.ajax({
        type: "GET",
        url: "./locations",
        success: function success(locations) {
          that.setState({
            locations: locations
          });
        }
      });
    };

    _this.delete_location = function (location_id) {
      var that = _this;
      $.ajax({
        type: "DELETE",
        url: "./locations/" + location_id,
        success: function success(data) {
          var new_locations = [],
              l = that.state.locations;
          for (var i = 0; i < l.length; i++) {
            if (l[i].id != location_id) new_locations.push(Object.assign({}, l[i]));
          }
          that.setState({ locations: new_locations });
        }
      });
    };

    _this.show_barcode = function (location_string) {
      _this.modalMenu.current.show_menu("create_barcode", { location: location_string });
    };

    _this.onChange_top_checkbox = function (e) {
      var is_checked = e.target.checked;
      var checkboxes = document.getElementsByClassName("row-checkbox");
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked != is_checked) {
          checkboxes[i].click();
        }
      }
    };

    _this.modalMenu = React.createRef();
    _this.state = {
      locations: []
    };
    _this.get_locations();
    return _this;
  }
  // New Objects created are not deep copies (only use Object.assign)


  _createClass(LocationTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { className: "btn btn-sm btn-primary", onClick: this.show_create_loc_menu },
          React.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-plus", viewBox: "0 0 16 16" },
            React.createElement("path", { fillRule: "evenodd", d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
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
                React.createElement("input", { type: "checkbox", onChange: this.onChange_top_checkbox })
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Area"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Loc"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Row"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Column"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Level"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Shelf"
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
            this.state.locations.map(function (location) {
              return React.createElement(LocationRow, { key: location.id,
                location: location,
                show_barcode: _this2.show_barcode,
                delete_location: _this2.delete_location
              });
            })
          )
        ),
        React.createElement(ModalMenu, { ref: this.modalMenu })
      );
    }
  }]);

  return LocationTable;
}(React.Component);

var LocationRow = function (_React$Component2) {
  _inherits(LocationRow, _React$Component2);

  function LocationRow(props) {
    _classCallCheck(this, LocationRow);

    var _this3 = _possibleConstructorReturn(this, (LocationRow.__proto__ || Object.getPrototypeOf(LocationRow)).call(this, props));

    _this3.onClick_delete_btn = function () {
      var result = window.confirm("Are you sure you want to delete " + _this3.get_location_string() + "?");
      if (result) {
        _this3.props.delete_location(_this3.state.location.id);
      }
    };

    _this3.onClick_show_barcode = function () {
      _this3.props.show_barcode(_this3.get_location_string());
    };

    _this3.onChange_checkbox = function (e) {
      console.log(e.target);
      var $tr = $(e.target).closest("tr");
      if (e.target.checked) {
        $tr.addClass("checked-row");
      } else {
        $tr.removeClass("checked-row");
      }
    };

    _this3.state = {
      location: _this3.props.location
    };
    return _this3;
  }

  _createClass(LocationRow, [{
    key: "get_location_string",
    value: function get_location_string() {
      var l = this.state.location;
      return l.area + "." + l.loc + "." + l.row + "." + l.column + "." + l.level + "." + l.shelf;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        { key: this.state.location.id },
        React.createElement(
          "td",
          null,
          React.createElement("input", { type: "checkbox", className: "row-checkbox",
            onChange: this.onChange_checkbox })
        ),
        React.createElement(
          "td",
          null,
          this.state.location.area
        ),
        React.createElement(
          "td",
          null,
          this.state.location.loc
        ),
        React.createElement(
          "td",
          null,
          this.state.location.row
        ),
        React.createElement(
          "td",
          null,
          this.state.location.column
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
          ),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-dark", onClick: this.onClick_show_barcode },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-upc", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" })
            )
          )
        )
      );
    }
  }]);

  return LocationRow;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(LocationTable, null)
  ), document.getElementById("content-container"));
}

loadReact();