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
          console.log(data);
          data.forEach(function (element) {
            that.add_ref(element);
          });
          that.setState({ itemInfos: data });
        }
      });
    };

    _this.show_itemInfo_barcode = function (barcodes) {
      _this.modalMenu.current.show_menu("create_barcode", { barcode_strings: barcodes });
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
          var _React$createElement;

          return React.createElement(ItemInfoRow, (_React$createElement = { key: "itemInifo-" + itemInfo.id,
            ref: itemInfo.ref,
            deleteItemInfo: _this2.deleteItemInfo,
            editItemInfo: _this2.editItemInfo,
            row_index: index,
            data: itemInfo,
            itemName: itemInfo.itemName
          }, _defineProperty(_React$createElement, "editItemInfo", _this2.editItemInfo), _defineProperty(_React$createElement, "show_itemInfo_barcode", _this2.show_itemInfo_barcode), _React$createElement));
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
            { className: "col-sm-10 col-md-5 input-group" },
            React.createElement("input", { className: "form-control", type: "text", id: "search-bar1-input", autoFocus: true }),
            React.createElement(
              "select",
              { className: "custom-select col-4", id: "item-search1-type-select" },
              React.createElement(
                "option",
                { value: "sku" },
                "SKU"
              ),
              React.createElement(
                "option",
                { value: "name" },
                "Name"
              ),
              React.createElement(
                "option",
                { value: "description" },
                "Description"
              ),
              React.createElement(
                "option",
                { value: "category" },
                "Category"
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
                "Category"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "[w, l, h]"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "SKUs"
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
      data: _this3.props.data ? _this3.props.data : {},
      show_itemSkus: false
    }, _this3.onClick_editItemInfo = function () {
      _this3.props.editItemInfo(_this3.props.row_index);
    }, _this3.onClick_deleteItemInfo = function () {
      var result = window.confirm("Are you sure you want to delete ?");
      if (result) {
        _this3.props.deleteItemInfo(_this3.props.row_index, _this3.props.data.id);
      }
    }, _this3.update_data = function (new_data) {
      _this3.setState({ data: new_data });
    }, _this3.onClick_add_itemSkuss = function () {
      var sku = window.prompt("SKU/ itemSku number?"),
          that = _this3;
      if (sku != null && sku.length > 5) {
        $.ajax({
          url: "../item_info/" + _this3.state.data.id + "/itemskus",
          type: "POST",
          data: {
            sku: sku
          },
          success: function success(returnData) {
            that.setState(function (prev_state) {
              prev_state.data.itemskus.push(returnData);

              return {
                data: prev_state.data
              };
            });
          }
        });
      }
    }, _this3.onClick_delete_itemInfo_itemSku = function (e) {
      var id = e.target.getAttribute("itemsku_id"),
          sku = e.target.getAttribute("itemsku"),
          that = _this3;
      if (e.target.getAttribute("itemsku_id")) {
        var result = window.confirm("Are you sure you want to delete sku " + sku + "?");
        if (result) {
          $.ajax({
            url: "../item_info/" + _this3.state.data.id + "/itemskus/" + id,
            type: "DELETE",
            success: function success(data) {
              that.setState(function (prev_state) {
                for (var i = 0; i < prev_state.data.itemskus.length; i++) {
                  if (prev_state.data.itemskus[i].id == id) {
                    prev_state.data.itemskus.splice(i, 1);
                    return {
                      data: prev_state.data
                    };
                  }
                }
              });
            }
          });
        }
      }
    }, _this3.onClick_expand_itemSkus = function () {
      _this3.setState({ show_itemSkus: !_this3.state.show_itemSkus });
    }, _this3.onClick_show_barcode = function (e) {
      _this3.props.show_itemInfo_barcode([e.target.getAttribute("sku")]);
      // this.modalMenu.current.show_menu("create_barcode", {barcode_strings: locations,});
    }, _this3.create_itemSku_div = function (itemSku) {
      return React.createElement(
        "span",
        { key: itemSku.id },
        itemSku.sku,
        React.createElement(
          "button",
          { type: "button", className: "btn btn-sm btn-outline-dark btn-with-svgs",
            sku: itemSku.sku,
            onClick: _this3.onClick_show_barcode },
          React.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-upc", viewBox: "0 0 16 16" },
            React.createElement("path", { d: "M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" })
          )
        ),
        React.createElement(
          "button",
          { type: "button", className: "btn btn-sm btn-outline-danger btn-with-svgs",
            itemsku_id: itemSku.id, itemsku: itemSku.sku,
            onClick: _this3.onClick_delete_itemInfo_itemSku },
          React.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-trash", viewBox: "0 0 16 16" },
            React.createElement("path", { d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" }),
            React.createElement("path", { fillRule: "evenodd", d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" })
          )
        )
      );
    }, _this3.create_itemSku_divs = function () {
      if (_this3.state.data.itemskus && _this3.state.data.itemskus.length > 1) {
        if (_this3.state.show_itemSkus) {
          return React.createElement(
            "div",
            { className: "expanded-itemSkus-div" },
            _this3.state.data.itemskus.map(function (itemSku) {
              return React.createElement(
                "div",
                { key: "div-" + itemSku.id },
                _this3.create_itemSku_div(itemSku)
              );
            }),
            React.createElement(
              "div",
              { onClick: _this3.onClick_expand_itemSkus, className: "itemSkus-btn-container" },
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-chevron-up", viewBox: "0 0 16 16" },
                React.createElement("path", { fillRule: "evenodd", d: "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" })
              )
            )
          );
        } else {
          return React.createElement(
            "div",
            { className: "reduced-itemSkus-div" },
            _this3.create_itemSku_div(_this3.state.data.itemskus[0]),
            React.createElement(
              "span",
              { onClick: _this3.onClick_expand_itemSkus, className: "itemSkus-btn-container" },
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-chevron-down", viewBox: "0 0 16 16" },
                React.createElement("path", { fillRule: "evenodd", d: "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" })
              )
            )
          );
        }
      } else if (_this3.state.data.itemskus && _this3.state.data.itemskus.length == 1) {
        return React.createElement(
          "div",
          null,
          _this3.create_itemSku_div(_this3.state.data.itemskus[0])
        );
      }
      return React.createElement("div", null);
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
          this.state.data.itemCategoryName
        ),
        React.createElement(
          "td",
          null,
          this.state.data.width + " " + this.state.data.length + " " + this.state.data.height
        ),
        React.createElement(
          "td",
          null,
          this.create_itemSku_divs()
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
            { type: "button", className: "btn btn-sm btn-outline-dark",
              onClick: this.onClick_add_itemSkuss },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-upc", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" })
            )
          ),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-sm btn-outline-dark" },
            React.createElement(
              "svg",
              { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", "class": "bi bi-box-seam", viewBox: "0 0 16 16" },
              React.createElement("path", { d: "M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" })
            )
          )
        )
      );
    }
  }]);

  return ItemInfoRow;
}(React.Component);