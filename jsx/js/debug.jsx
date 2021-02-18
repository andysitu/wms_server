const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMSET = "0123456789";
const CHARNUMSET = CHARSET + NUMSET;

class DebugApp extends React.Component {
  getRandomWordsInts(length) {
    let s = ""
    for(let  i=0; i< length; i++) {
      s += CHARNUMSET.charAt(Math.floor(Math.random() * CHARNUMSET.length));
    }
    return s;
  }
  getRandomLetters(length) {
    let s = ""
    for(let  i=0; i< length; i++) {
      s += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return s;
  }
  getRandomInt(length) {
    let s = ""
    for(let  i=0; i< length; i++) {
      s += NUMSET.charAt(Math.floor(Math.random() * NUMSET.length));
    }
    return parseInt(s);
  }
  showSuccess = () => {
    window.alert("done");
  }

  createWarehouseLocations = () => {
    this.createDummyWarehouses((warehouse) => {
      console.log("w", warehouse);
      this.createDummyLocations(warehouse.id);
    });
  }
  createDummyWarehouses = (callback) => {
    let data = {
      name: this.getRandomLetters(10),
      description: this.getRandomLetters(10),
      address1: this.getRandomLetters(10),
      address2: this.getRandomLetters(10),
      city: this.getRandomLetters(6),
      state: this.getRandomLetters(2),
      zip: String(this.getRandomInt(6)),
      phone: String(this.getRandomInt(9)),
      code: this.getRandomWordsInts(3),
    };
    $.ajax({
      url: "./warehouses",
      type: "POST",
      // context: this,
      contentType: "application/json;",
      data: JSON.stringify(data),
      context: this,
      success: function(warehouse) {
        if (callback) {
          console.log(callback);
          callback(warehouse);
        }
      },
    });
  };
  createDummyLocations(warehouseId) {
    let data = {
      area: this.getRandomLetters(2),
      row_start: 1,
      row_end: 2,
      bay_start: 1,
      bay_end: 2,
      level_start: 1,
      level_end: 1,
      shelf_start: 1,
      shelf_end: 1,
    };
    $.ajax({
      type: "POST",
      url: "./warehouses/" + warehouseId + "/locations",
      contentType: "application/json",
      context: this,
      data: JSON.stringify(data),
      success: function(new_locations) {
        this.showSuccess();
      },
    });
  }

  render() {
    return (<div>
      <button type="button"
        onClick={this.createWarehouseLocations}>Create Warehouse + Locations</button>
    </div>)
  }
}

(function loadReact() {
  ReactDOM.render((<DebugApp />), document.getElementById("content-container"));
})();