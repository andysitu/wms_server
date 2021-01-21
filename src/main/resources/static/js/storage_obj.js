var storage_obj = {
  warehouse_property: "default_warehouse_id",
  get_warehouse: function get_warehouse() {
    return window.localStorage.getItem(this.warehouse_property);
  },
  set_warehouse: function set_warehouse(warehouse_id) {
    window.localStorage.setItem(this.warehouse_property, warehouse_id);
  },
  clear_warehouse_if_id: function clear_warehouse_if_id(warehouse_id) {
    var w_id = this.get_warehouse();
    if (warehouse_id == w_id) {
      window.localStorage.removeItem(this.warehouse_property);
    }
  }
};