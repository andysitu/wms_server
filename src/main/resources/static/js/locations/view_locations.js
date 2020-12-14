var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        var that = _this;
        $.ajax({
          type: "POST",
          url: "./locations",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function success(responseData) {
            var locations = [].concat(_toConsumableArray(that.state.locations));
            locations.push(responseData);
            that.setState({ locations: locations });
          }
        });
      });
    };

    _this.get_locations = function () {
      var that = _this;
      $.ajax({
        type: "GET",
        url: "./locations",
        success: function success(locations) {
          console.log(locations);
          that.setState({
            locations: locations
          });
        }
      });
    };

    _this.modalMenu = React.createRef();
    _this.state = {
      locations: []
    };
    _this.get_locations();
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
                null,
                "Area"
              ),
              React.createElement(
                "th",
                null,
                "Loc"
              ),
              React.createElement(
                "th",
                null,
                "Row"
              ),
              React.createElement(
                "th",
                null,
                "Column"
              ),
              React.createElement(
                "th",
                null,
                "Level"
              ),
              React.createElement(
                "th",
                null,
                "Shelf"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            this.state.locations.map(function (location) {
              return React.createElement(LocationRow, { key: location.id, location: location });
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

    var _this2 = _possibleConstructorReturn(this, (LocationRow.__proto__ || Object.getPrototypeOf(LocationRow)).call(this, props));

    _this2.state = {
      location: _this2.props.location
    };
    return _this2;
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