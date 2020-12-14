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
        $.ajax({
          type: "POST",
          url: "./locations",
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function success(responseData) {
            console.log(responseData);
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
              return React.createElement(
                "tr",
                { key: location.id },
                React.createElement(
                  "td",
                  null,
                  location.area
                ),
                React.createElement(
                  "td",
                  null,
                  location.loc
                ),
                React.createElement(
                  "td",
                  null,
                  location.row
                ),
                React.createElement(
                  "td",
                  null,
                  location.column
                ),
                React.createElement(
                  "td",
                  null,
                  location.level
                ),
                React.createElement(
                  "td",
                  null,
                  location.shelf
                )
              );
            })
          )
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