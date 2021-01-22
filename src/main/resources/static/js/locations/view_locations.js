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
          for (var i = 0; i < new_locations.length; i++) {
            that.convert_location(new_locations[i]);
          }
          that.setState({ locations: that.state.locations.concat(new_locations) }, function () {
            if (new_locations.length > 0) {
              that.add_area_to_state(new_locations[0].area_id, new_locations[0].area);
            }
          });
        }
      });
    };

    _this.show_create_loc_menu = function () {
      _this.modalMenu.current.show_menu("create_location", {}, _this.create_location);
    };

    _this.add_area_to_state = function (area_id, area_string) {
      var areas = _this.state.areas;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = areas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var area = _step.value;

          if (area.id == area_id || area.area == area_string) {
            return;
          }
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

      _this.setState(function (prev_state) {
        if (prev_state.areas.length == 0) {
          return {
            areas: areas.concat({ id: area_id, area: area_string }),
            selected_area: area_id
          };
        } else {
          return { areas: areas.concat({ id: area_id, area: area_string }) };
        }
      });
    };

    _this.set_warehouses = function () {
      $.ajax({
        url: './warehouses',
        type: 'GET',
        context: _this,
        success: function success(warehouses) {
          this.setState(function (state) {
            if (warehouses.length > 0) {
              return {
                warehouses: warehouses,
                selected_warehouse: warehouses[0].id
              };
            } else {
              return {
                warehouses: warehouses,
                selected_warehouse: ""
              };
            }
          });
        }
      });
    };

    _this.onChange_area = function (e) {
      _this.setState({
        selected_area: e.target.value
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

    _this.show_barcodes = function (location_string) {
      var checkboxes = document.querySelectorAll(".row-checkbox:checked");
      var locations = [],
          index;
      if (checkboxes.length == 0) return;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = checkboxes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var cbox = _step2.value;

          index = cbox.getAttribute("row_index");
          locations.push(_this.state.locations[index].location_string);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      _this.modalMenu.current.show_menu("create_barcode", { barcode_strings: locations });
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

    _this.onClick_row_checkbox = function (e) {
      var cur_row = parseInt(e.target.getAttribute("row_index"));
      if (_this.prev_clicked_index != null && e.shiftKey && cur_row != _this.prev_clicked_index) {
        // e.preventDefault();
        var start, end, box;
        if (cur_row > _this.prev_clicked_index) {
          var _ref = [_this.prev_clicked_index, cur_row];
          start = _ref[0];
          end = _ref[1];
        } else {
          var _ref2 = [_this.prev_clicked_index, cur_row];
          end = _ref2[0];
          start = _ref2[1];
        }

        for (var i = start; i < end + 1; i++) {
          box = document.getElementById("row-checkbox-" + i);
          if (box.checked != _this.prev_clicked_checked) {
            box.click();
          }
        }
      }
      _this.prev_clicked_index = parseInt(e.target.getAttribute("row_index"));
      _this.prev_clicked_checked = e.target.checked;
    };

    _this.remove_area = function (index) {
      var area_string = _this.state.areas.splice(index, 1)[0].area;
      // First remove from area select element
      _this.setState({
        areas: _this.state.areas
      }, function () {
        // Next remove from locations
        var new_locations = [];
        for (var i = 0; i < _this.state.locations.length; i++) {
          if (_this.state.locations[i].area != area_string) {
            new_locations.push(_this.state.locations[i]);
          }
        }
        _this.setState({
          locations: new_locations
        });
      });
    };

    _this.onClick_delete_area = function () {
      if (_this.state.selected_area === "none" || _this.state.selected_area === "all") {
        return;
      }
      var area_name, index, id;
      for (var i = 0; i < _this.state.areas.length; i++) {
        if (_this.state.areas[i].id == _this.state.selected_area) {
          index = i;
          id = _this.state.areas[i].id;
          area_name = _this.state.areas[i].area;
        }
      }
      var result = window.confirm("Are you sure you want to delete area \n      " + area_name + " and all its locations?");
      if (result) {
        var that = _this;
        $.ajax({
          url: "../areas/" + _this.state.selected_area,
          method: "DELETE",
          success: function success(response) {
            if (that.state.areas[index].id == id) {
              that.remove_area(index);
            }
          }
        });
      }
    };

    _this.onClick_show_area = function () {
      var area = _this.state.selected_area;
      if (area === "none") {
        return;
      }

      var url = area === "all" || area == "" ? "./locations" : "../locations/area/" + area;
      $.ajax({
        type: "GET",
        url: url,
        context: _this,
        success: function success(locations) {
          var _this2 = this;

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = locations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var l = _step3.value;

              this.convert_location(l);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          this.setState({
            locations: locations
          }, function () {
            console.log(_this2.state.locations);
          });
        }
      });
    };

    _this.load_areas_by_warehouse = function () {
      $.ajax({
        url: "./warehouses/" + _this.state.selected_warehouse + "/areas",
        type: "GET",
        context: _this,
        success: function success(areas) {
          this.setState({
            areas: areas,
            selected_area: areas.length > 0 ? areas[0].id : ""
          });
        }
      });
    };

    _this.onChange_warehouse = function (e) {
      _this.setState({
        selected_warehouse: e.target.value
      }, _this.load_areas_by_warehouse);
    };

    _this.create_area_options = function () {
      return React.createElement(
        "select",
        { onChange: _this.onChange_area,
          className: "form-control",
          value: _this.state.selected_area },
        _this.state.areas.map(function (area) {
          return React.createElement(
            "option",
            { value: area.id, key: "area-" + area.id
            },
            area.area
          );
        }),
        React.createElement(
          "option",
          { value: "all" },
          "All"
        )
      );
    };

    _this.create_warehouse_option = function () {
      return React.createElement(
        "select",
        { className: "form-control", value: _this.state.selected_warehouse,
          onChange: _this.onChange_warehouse },
        _this.state.warehouses.map(function (warehouse) {
          return React.createElement(
            "option",
            { value: warehouse.id, key: "woption-" + warehouse.id },
            warehouse.name + "-" + warehouse.code
          );
        })
      );
    };

    _this.modalMenu = React.createRef();
    _this.state = {
      warehouses: [],
      areas: [],
      locations: [],
      selected_area: "",
      selected_warehouse: ""
    };
    _this.prev_clicked_index = null;
    _this.prev_clicked_checked = null;
    _this.set_warehouses();
    return _this;
  }

  _createClass(LocationTable, [{
    key: "convert_location",


    // Changes location object to formatted data
    value: function convert_location(l) {
      l.location_string = l.area + "-" + l.row + "-" + l.bay + "-" + l.level + "-" + l.shelf;
    }

    // New Objects created are not deep copies (only use Object.assign)


    // Loads area by warehouse id set by state.selected_warehouse

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Locations"
        ),
        React.createElement(
          "div",
          { className: "row justify-content-between" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { className: "btn btn-sm btn-primary", title: "Create location",
                onClick: this.show_create_loc_menu },
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-plus", viewBox: "0 0 16 16" },
                React.createElement("path", { fillRule: "evenodd", d: "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" })
              )
            ),
            React.createElement(
              "button",
              { type: "button", className: "btn btn-sm btn-outline-dark",
                onClick: this.show_barcodes, title: "Show barcodes window" },
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-upc", viewBox: "0 0 16 16" },
                React.createElement("path", { d: "M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-7 form-group row" },
            React.createElement(
              "div",
              { className: "col-6  form-row row" },
              React.createElement(
                "label",
                { className: "col-form-label col-sm-4" },
                "Warehouse: "
              ),
              React.createElement(
                "div",
                { className: "col-sm-8" },
                this.create_warehouse_option()
              )
            ),
            React.createElement(
              "div",
              { className: "col-5 form-row row" },
              React.createElement(
                "label",
                { className: "col-form-label col-sm-3" },
                "Area: "
              ),
              React.createElement(
                "div",
                { className: "col-sm-9" },
                this.create_area_options()
              )
            ),
            React.createElement(
              "button",
              { type: "button", className: "col btn btn-sm btn-outline-secondary",
                onClick: this.onClick_show_area },
              "Show"
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { type: "button", className: "btn btn-sm btn-outline-primary",
                onClick: this.onClick_delete_area
              },
              "Delete Area"
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
                "Row"
              ),
              React.createElement(
                "th",
                { scope: "col" },
                "Bay"
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
            this.state.locations.map(function (location, index) {
              return React.createElement(LocationRow, { key: location.id,
                index: index,
                location: location,
                show_barcode: _this3.show_barcode,
                onClick_row_checkbox: _this3.onClick_row_checkbox,
                delete_location: _this3.delete_location
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

function loadReact() {
  ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(LocationTable, null)
  ), document.getElementById("content-container"));
}

loadReact();