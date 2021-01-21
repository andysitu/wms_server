var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WarehouseApp = function (_React$Component) {
  _inherits(WarehouseApp, _React$Component);

  function WarehouseApp(props) {
    _classCallCheck(this, WarehouseApp);

    var _this = _possibleConstructorReturn(this, (WarehouseApp.__proto__ || Object.getPrototypeOf(WarehouseApp)).call(this, props));

    _this.load_warehouses = function () {
      $.ajax({
        url: '/warehouses',
        type: "GET",
        context: _this,
        success: function success(warehouse_data) {
          console.log(warehouse_data);
          this.setState({
            warehouses: warehouse_data
          });
        }
      });
    };

    _this.create_warehouse = function (data) {
      $.ajax({
        url: "./warehouses",
        type: "POST",
        // context: this,
        contentType: "application/json;",
        data: JSON.stringify(data),
        context: _this,
        success: function success(warehouse) {
          console.log(warehouse);
          this.setState(function (state) {
            var new_warehouse = [warehouse];
            for (var i = 0; i < state.warehouses.length; i++) {
              new_warehouse.push(state.warehouses[i]);
            }
            return { warehouses: new_warehouse };
          });
        }
      });
    };

    _this.onClick_add_warehouse = function () {
      _this.modalMenu.current.show_menu("create_warehouse", {}, _this.create_warehouse);
    };

    _this.onClick_delete_warehouse = function (e) {
      var index = e.target.getAttribute("index"),
          warehouse_id = e.target.getAttribute("warehouse_id");
      var result = window.confirm("Are you sure you want to delete " + _this.state.warehouses[index].name + "?");
      if (result) {
        $.ajax({
          url: "./warehouses/" + warehouse_id,
          type: "DELETE",
          context: _this,
          success: function success() {
            storage_obj.clear_warehouse_if_id(warehouse_id);
            this.setState(function (state) {
              var new_warehouse = [];
              for (var i = 0; i < state.warehouses.length; i++) {
                if (String(state.warehouses[i].id) != warehouse_id) {
                  new_warehouse.push(state.warehouses[i]);
                }
              }
              return { warehouses: new_warehouse };
            });
          }
        });
      }
    };

    _this.onClick_edit_warehouse = function (e) {
      var index = e.target.getAttribute("index"),
          warehouse_id = e.target.getAttribute("warehouse_id"),
          data = Object.assign({}, _this.state.warehouses[index]);
      data.warehouse_id = warehouse_id;
      _this.modalMenu.current.show_menu("edit_warehouse", data, function (data) {
        $.ajax({
          url: "warehouses/" + warehouse_id,
          type: "PATCH",
          data: data,
          context: _this,
          success: function success(new_warehouse) {
            this.setState(function (state) {
              var new_warehouses = [].concat(_toConsumableArray(state.warehouses));
              new_warehouses[index] = new_warehouse;
              return { warehouses: new_warehouses };
            });
          }
        });
      });
    };

    _this.onClick_set_default_warehouse = function (e) {
      var warehouse_id = e.target.getAttribute('warehouse_id');
      storage_obj.set_warehouse(warehouse_id);
      _this.setState({
        default_warehouse: warehouse_id
      });
    };

    _this.create_default_btn = function (warehouse) {
      if (_this.state.default_warehouse && _this.state.default_warehouse == warehouse.id) {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-check2", viewBox: "0 0 16 16" },
            React.createElement("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
          )
        );
      } else {
        return React.createElement(
          "button",
          { className: "btn btn-sm btn-outline-primary",
            onClick: _this.onClick_set_default_warehouse,
            warehouse_id: warehouse.id
          },
          React.createElement(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16",
              style: { "pointerEvents": "none" },
              fill: "currentColor", className: "bi bi-check2", viewBox: "0 0 16 16" },
            React.createElement("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
          )
        );
      }
    };

    _this.state = {
      warehouses: [],
      default_warehouse: storage_obj.get_warehouse()
    };
    _this.load_warehouses();
    _this.modalMenu = React.createRef();
    return _this;
  }

  _createClass(WarehouseApp, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Warehouses"
        ),
        React.createElement(
          "div",
          { className: "m-1" },
          React.createElement(
            "button",
            { className: "btn btn-sm btn-primary",
              onClick: this.onClick_add_warehouse
            },
            "+"
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
                "Default"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Name"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Code"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "City"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "State"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Country"
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
            this.state.warehouses.map(function (warehouse, index) {
              return React.createElement(
                "tr",
                { key: warehouse.id },
                React.createElement(
                  "td",
                  null,
                  _this2.create_default_btn(warehouse)
                ),
                React.createElement(
                  "td",
                  null,
                  warehouse.code
                ),
                React.createElement(
                  "td",
                  null,
                  warehouse.name
                ),
                React.createElement(
                  "td",
                  null,
                  warehouse.city
                ),
                React.createElement(
                  "td",
                  null,
                  warehouse.state
                ),
                React.createElement(
                  "td",
                  null,
                  warehouse.country
                ),
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    "button",
                    { type: "button", className: "btn btn-sm btn-outline-warning",
                      warehouse_id: warehouse.id, index: index, title: "Edit warehouse",
                      onClick: _this2.onClick_edit_warehouse },
                    React.createElement(
                      "svg",
                      { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor",
                        style: { "pointerEvents": "none" }, className: "bi bi-pencil-square", viewBox: "0 0 16 16" },
                      React.createElement("path", { d: "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" }),
                      React.createElement("path", { fillRule: "evenodd", d: "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" })
                    )
                  ),
                  React.createElement(
                    "button",
                    { type: "button", className: "btn btn-sm btn-outline-danger btn-with-svgs",
                      warehouse_id: warehouse.id, index: index, title: "Delete warehouse",
                      onClick: _this2.onClick_delete_warehouse },
                    React.createElement(
                      "svg",
                      { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor",
                        className: "bi bi-trash", viewBox: "0 0 16 16", style: { "pointerEvents": "none" } },
                      React.createElement("path", { d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" }),
                      React.createElement("path", { fillRule: "evenodd", d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" })
                    )
                  )
                )
              );
            })
          )
        ),
        React.createElement(ModalMenu, { ref: this.modalMenu })
      );
    }
  }]);

  return WarehouseApp;
}(React.Component);

function loadReact() {
  ReactDOM.render(React.createElement(WarehouseApp, null), document.getElementById("content-container"));
}

loadReact();