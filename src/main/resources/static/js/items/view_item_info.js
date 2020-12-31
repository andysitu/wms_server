var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemInfoApp = function (_React$Component) {
  _inherits(ItemInfoApp, _React$Component);

  function ItemInfoApp(props) {
    _classCallCheck(this, ItemInfoApp);

    var _this = _possibleConstructorReturn(this, (ItemInfoApp.__proto__ || Object.getPrototypeOf(ItemInfoApp)).call(this, props));

    _this.onClick_search = function () {
      var search_type = document.getElementById("item-search1-type-select").value,
          search_value = document.getElementById("search-bar1-input").value;
      var that = _this;
      $.ajax({
        url: "./item_info?type=" + search_type + "&value=" + search_value,
        type: "GET",
        success: function success(data) {
          console.log(data);
          that.setState({ itemInfos: data });
        }
      });
    };

    _this.create_itemInfo = function (data) {
      $.ajax({
        url: "../item_info",
        type: "POST",
        data: data,
        success: function success(data) {
          console.log(data);
        }
      });
    };

    _this.onClick_createItemInfo = function () {
      _this.modalMenu.current.show_menu("create_item_info", {}, _this.create_itemInfo);
    };

    _this.state = {
      itemInfos: []
    };
    _this.modalMenu = React.createRef();
    return _this;
  }

  _createClass(ItemInfoApp, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("input", { className: "form-control", type: "text", id: "search-bar1-input" }),
          React.createElement(
            "select",
            { className: "custom-select", id: "item-search1-type-select" },
            React.createElement(
              "option",
              { value: "name" },
              "Name"
            )
          ),
          React.createElement(
            "button",
            { className: "btn btn-outline-secondary",
              onClick: this.onClick_search
            },
            "Search"
          )
        ),
        React.createElement(
          "table",
          { className: "table" },
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
                "Description"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Weight"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            this.state.itemInfos.map(function (itemInfo) {
              return React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  null,
                  itemInfo.itemName
                ),
                React.createElement(
                  "td",
                  null,
                  itemInfo.description
                ),
                React.createElement(
                  "td",
                  null,
                  itemInfo.weight
                )
              );
            })
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            {
              onClick: this.onClick_createItemInfo
            },
            "+"
          )
        ),
        React.createElement(ModalMenu, { ref: this.modalMenu })
      );
    }
  }]);

  return ItemInfoApp;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(ItemInfoApp, null), document.getElementById("content-container"));
}

loadReact();