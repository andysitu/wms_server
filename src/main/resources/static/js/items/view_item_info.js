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
        success: function success(item_data) {
          console.log(item_data);
        }
      });
    };

    _this.onClick_createItemInfo = function () {
      _this.modalMenu.current.show_menu("create_item_info", {}, _this.create_itemInfo);
    };

    _this.onClick_deleteItemInfo = function (e) {
      console.log(e.target);
      var result = window.confirm("Are you sure you want to delete ?");
      console.log(result);
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
            this.state.itemInfos.map(function (itemInfo, index) {
              return React.createElement(ItemInfoRow, { data: itemInfo });
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

var ItemInfoRow = function (_React$Component2) {
  _inherits(ItemInfoRow, _React$Component2);

  function ItemInfoRow() {
    _classCallCheck(this, ItemInfoRow);

    return _possibleConstructorReturn(this, (ItemInfoRow.__proto__ || Object.getPrototypeOf(ItemInfoRow)).apply(this, arguments));
  }

  _createClass(ItemInfoRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        { key: "itemInfo-" + this.props.data.id },
        React.createElement(
          "td",
          null,
          this.props.data.itemName
        ),
        React.createElement(
          "td",
          null,
          this.props.data.description
        ),
        React.createElement(
          "td",
          null,
          this.props.data.weight
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
            { type: "button", className: "btn btn-sm btn-outline-danger" },
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

  return ItemInfoRow;
}(React.Component);