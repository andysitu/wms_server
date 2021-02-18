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

  viewLocations = () => {
    $.ajax({
      type: "GET",
      url: "/locations",
      success: function(data) {
        console.log(data);
      }
    });
  }

  createDummyItemInfos = () => {
    let total = 5;
    for (let i=1; i<=total; i++) {
      setTimeout(()=>{
        let data = {
          description: this.getRandomLetters(10),
          height: this.getRandomInt(1),
          length: this.getRandomInt(1),
          width: this.getRandomInt(1),
          weight: this.getRandomInt(2),
          itemSku: this.getRandomWordsInts(5),
          name: this.getRandomLetters(6),
        };
        const count = i;
        $.ajax({
          url: "/iteminfo",
          type: "POST",
          data: data,
          success: function() {
            if (count == total) {
              window.alert("done");
            }
          }
        });
      }, i*200);
    }
  }

  createDummyItemReceive = () => {
    $.ajax({
      url: "/iteminfo",
      type: "GET",
      context: this,
      success: function(iteminfos) {
        let total = 5;
        for (let i=1; i<=total; i++) {
          setTimeout(()=>{
            // Continue finding itemInfo until it has an SKU
            let index;
            let itemSku;
            for (let j=0; j<20; j++) {
              index = Math.floor(Math.random() * iteminfos.length);
              if (!iteminfos[index].itemskus || 
                  iteminfos[index].itemskus.length == 0) {
                continue;
              } else {
                itemSku = iteminfos[index].itemskus[0].sku;
                break;
              }
            }
            if (itemSku == null) {
              return;
            }
            // console.log(iteminfos[index]);
            let data = {
              shipmentCode: this.getRandomLetters(4),
              quantity: this.getRandomInt(3),
              itemSku: itemSku,
            };
            const count = i;
            $.ajax({
              url: "/itemreceive",
              type: "POST",
              data: data,
              success: function() {
                if (count == total) {
                  window.alert("done");
                }
              }
            });
          }, i*200);
        }
      }
    });
  };

  render() {
    return (<div>
    <div>
      <button type="button"
        onClick={this.createWarehouseLocations}>Create Warehouse + Locations</button>
      </div>
      <div>
        <button type="button" onClick={this.viewLocations}>View Locations</button>
      </div>
      <div>
        <button type="button" onClick={this.createDummyItemInfos}>Create 5 ItemInfos</button>
      </div>      
      <div>
        <button type="button" onClick={this.createDummyItemReceive}>Create 5 ItemReceives</button>
      </div>
    </div>)
  }
}

(function loadReact() {
  ReactDOM.render((<DebugApp />), document.getElementById("content-container"));
})();