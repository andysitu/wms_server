var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
          data.forEach(function (element) {
            that.add_ref(element);
          });
          that.setState({ itemInfos: data });
        }
      });
    };

    _this.update_itemInfoRow = function (index) {
      _this.state.itemInfos[index].ref.current.update_data(_this.state.itemInfos[index]);
    };

    _this.editItemInfo = function (row_index) {
      var that = _this;
      _this.modalMenu.current.show_menu("edit_item_info", _this.state.itemInfos[row_index], function (data) {
        $.ajax({
          url: "../item_info/" + _this.state.itemInfos[row_index].id,
          type: "PATCH",
          data: data,
          success: function success(new_data) {
            that.setState(function (prevState) {
              var new_itemInfos = prevState.itemInfos;
              Object.assign(new_itemInfos[row_index], new_data);
            }, function () {
              that.update_itemInfoRow(row_index);
            });
          }
        });
      });
    };

    _this.create_itemInfo = function (data) {
      var that = _this;
      $.ajax({
        url: "../item_info",
        type: "POST",
        data: data,
        success: function success(item_data) {
          that.add_ref(item_data);
          that.setState({
            itemInfos: [].concat(_toConsumableArray(that.state.itemInfos), [item_data])
          });
        }
      });
    };

    _this.onClick_createItemInfo = function () {
      _this.modalMenu.current.show_menu("create_item_info", {}, _this.create_itemInfo);
    };

    _this.deleteItemInfo = function (row_index, itemInfo_id) {
      var that = _this;
      $.ajax({
        url: "../item_info/" + itemInfo_id,
        type: "DELETE",
        success: function success(return_data) {
          that.state.itemInfos.splice(row_index, 1);
          that.setState({
            itemInfos: that.state.itemInfos
          });
        }
      });
    };

    _this.state = {
      itemInfos: []
    };
    _this.modalMenu = React.createRef();
    return _this;
  }

  _createClass(ItemInfoApp, [{
    key: "add_ref",
    value: function add_ref(element) {
      element.ref = React.createRef();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var rows = [];
      if (this.state.itemInfos.length > 0) {
        rows = this.state.itemInfos.map(function (itemInfo, index) {
          return React.createElement(ItemInfoRow, _defineProperty({ key: "itemInifo-" + itemInfo.id,
            ref: itemInfo.ref,
            deleteItemInfo: _this2.deleteItemInfo,
            editItemInfo: _this2.editItemInfo,
            row_index: index,
            data: itemInfo,
            itemName: itemInfo.itemName
          }, "editItemInfo", _this2.editItemInfo));
        });
      }
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row justify-content-between" },
          React.createElement(
            "div",
            { className: "col-1" },
            React.createElement(
              "button",
              { onClick: this.onClick_createItemInfo },
              "+"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-6 col-md-4 input-group" },
            React.createElement("input", { className: "form-control", type: "text", id: "search-bar1-input" }),
            React.createElement(
              "select",
              { className: "custom-select", id: "item-search1-type-select" },
              React.createElement(
                "option",
                { value: "name" },
                "Name"
              ),
              React.createElement(
                "option",
                { value: "description" },
                "Description"
              )
            ),
            React.createElement(
              "button",
              { className: "btn btn-outline-secondary",
                onClick: this.onClick_search },
              "Search"
            )
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
                "Descriptions"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Weight"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Dimensions (w, l, h)"
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
            rows
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
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, ItemInfoRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = ItemInfoRow.__proto__ || Object.getPrototypeOf(ItemInfoRow)).call.apply(_ref, [this].concat(args))), _this3), _this3.state = {
      data: _this3.props.data
    }, _this3.onClick_editItemInfo = function () {
      _this3.props.editItemInfo(_this3.props.row_index);
    }, _this3.onClick_deleteItemInfo = function () {
      var result = window.confirm("Are you sure you want to delete ?");
      if (result) {
        _this3.props.deleteItemInfo(_this3.props.row_index, _this3.props.data.id);
      }
    }, _this3.update_data = function (new_data) {
      _this3.setState({ data: new_data });
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(ItemInfoRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        { key: "itemInfo-" + this.state.data.id },
        React.createElement(
          "td",
          null,
          this.state.data.itemName
        ),
        React.createElement(
          "td",
          null,
          this.state.data.description
        ),
        React.createElement(
          "td",
          null,
          this.state.data.weight
        ),
        React.createElement(
          "td",
          null,
          this.state.data.width + " " + this.state.data.length + " " + this.state.data.height
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-warning",
              onClick: this.onClick_editItemInfo },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-pencil-square", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" }),
              React.createElement("path", { fillRule: "evenodd", d: "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" })
            )
          ),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-danger",
              onClick: this.onClick_deleteItemInfo },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-trash", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" }),
              React.createElement("path", { fillRule: "evenodd", d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" })
            )
          ),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-dark" },
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

  return ItemInfoRow;
}(React.Component);