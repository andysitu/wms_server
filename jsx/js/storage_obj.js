var storage_obj = {
  warehouse_property: "default_warehouse_id",
  itemReceive_property: "itemReceive",
  itemPutaway_property: "itemPutaway",
  get_warehouse() {
    return window.localStorage.getItem(this.warehouse_property);
  },
  set_warehouse(warehouse_id) {
    window.localStorage.setItem(this.warehouse_property, warehouse_id);
  },
  clear_warehouse_if_id(warehouse_id) {
    var w_id = this.get_warehouse();
    if (warehouse_id == w_id) {
      window.localStorage.removeItem(this.warehouse_property);
    }
  },
  get_itemReceive() {
    var result = JSON.parse(window.localStorage.getItem(this.itemReceive_property));
    if (result == null) {
      return [];
    }
    return result;
  },
  set_itemReceive(itemReceive) {
    window.localStorage.setItem(
      this.itemReceive_property,
      JSON.stringify(itemReceive)
    );
  },
  get_itemPutaway() {
    var result = JSON.parse(window.localStorage.getItem(this.itemPutaway_property));
    if (result == null) {
      return [];
    }
    return result;
  },
  set_itemPutaway(itemsPutaway) {
    window.localStorage.setItem(
      this.itemPutaway_property,
      JSON.stringify(itemsPutaway)
    );
  },
}