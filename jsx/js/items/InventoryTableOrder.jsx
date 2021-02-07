import { TableSearchBar } from "../etc/TableSearchBar.js";

export { InventoryTableOrder }

class InventoryTableOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInventory: [],
      reservedItems: {}, // [item_id] : [itemData]
      
    }

    this.tablesearchbar = React.createRef();
  }

  componentDidMount() {
    this.setOrderTableHeight();
  }

  setOrderTableHeight() {
    const inventory_wrapper = document.getElementById("inventory-wrapper");
    const navbar = document.getElementById("top-navbar-menu");
    const header_wrapper = document.getElementById("order-header");
    
    let result_height = 
      window.innerHeight - inventory_wrapper.offsetHeight 
        - navbar.offsetHeight - header_wrapper.offsetHeight - 10;
    result_height = Math.max(result_height, 320);

    document.getElementById("order-container").style.height =
      result_height + "px";
  }

  onClick_search = (search_type, search_value) => {
    $.ajax({
      url: `/iteminventory?property=${search_type}&value=${search_value}`,
      type: "GET",
      context: this,
      success: function(itemList) {
        let filteredList = [];
        itemList.forEach((item)=> {
          if (!(item.id in this.state.reservedItems)) {
            // Set maxAvailable here (for input element in reserved items)
            item.maxAvailable = item.quantity;
            filteredList.push(item);
          }
        });
        this.setState({ itemInventory: filteredList });
      },
    });
  };

  moveInventoryItem =(index) => {
    this.setState(state => {
      let newItemInventory = [...state.itemInventory];
      let newReservedItems = {...state.reservedItems};
      let item = newItemInventory.splice(item,1)[0];

      newReservedItems[item.id] = item;
      return {
        itemInventory: newItemInventory,
        reservedItems: newReservedItems,
      };
    });
  };

  moveReservedItem = (id) => {
    this.setState(state => {
      let newItemInventory = [...state.itemInventory];
      let newReservedItems = {...state.reservedItems};
      let item = newReservedItems[id];

      delete newReservedItems[id];
      newItemInventory.push(item);
      return {
        itemInventory: newItemInventory,
        reservedItems: newReservedItems,
      };
    });
  };

  onClick_row = (e) => {
    let element = e.target;
    if (element.classList.contains("skip-move")) {
      if (element.tagName == "INPUT") {
        element.select();
      }
      return;
    }
    e.preventDefault();
    
    // Search up to 5 nodes for parent TR
    for (let i=0; i<5; i++) {
      if (element.tagName == "TR") {
        break;
      }
      element = element.parentNode
    }
    
    if (element.getAttribute("item_type")=="inventory") {
      this.moveInventoryItem(
        element.getAttribute("index")
      );
    } else {
      this.moveReservedItem(
        element.getAttribute("id")
      );
    }
  };

  createItemHeaderRow = () => {
    return (<tr>
      <th scope="col"></th>
      <th scope="col">Item Name</th>
      <th scope="col">SKU</th>
      <th scope="col">Available</th>
      <th scope="col">Reserved</th>
      <th scope="col">Shipment Code</th>
      <th scope="col">Location</th>
      <th scope="col">Created Date</th>
    </tr>);
  };

  onChange_reservedItemQuantity = (e) => {
    const item_id = e.target.getAttribute("item_id"),
          value = e.target.value;
    this.setState(state => {
      const newReservedItems = {...state.reservedItems};
      newReservedItems[item_id].quantity = value;

      return {
        reservedItems: newReservedItems
      };
    });
  };

  createItemRow = (item_type, item, index) => {
    let availableItemInput = (item_type == "reserved") ?
    (<td className="skip-move">
      <input type="number" className="skip-move"
        onChange={this.onChange_reservedItemQuantity}
        item_id={item.id}
        max={item.maxAvailable} min="0"
        value={item.quantity}></input>
    </td>) :
    (<td>{item.quantity}</td>)
    return (
    <tr key={item_type + "_" +item.id} 
      item_type={item_type} id={item.id}
      onClick={this.onClick_row} index={index}>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{item.itemName}</td>
      <td>{item.itemSku}</td>
      {availableItemInput}
      <td>{item.reservedQuantity}</td>
      <td>{item.shipmentCode}</td>
      <td>{item.locationCode}</td>
      <td>{item.createdDate}</td>
    </tr>);
  };

  render() {
    let itemReservedList = Object.values(this.state.reservedItems);
    return (<div>
      <div id="inventory-wrapper">
        <h2>Inventory Items</h2>
        <TableSearchBar onClick_search={this.onClick_search} search_type={"item_inventory"}/>
        <div style={{height: "320px", overflow: "auto"}}>
          <table className="table table-sm">
            <thead>
              {this.createItemHeaderRow()}
            </thead>
              <tbody>
                {this.state.itemInventory.map((item, index) => {
                  return this.createItemRow("inventory", item, index);
                })}
              </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 id="order-header">Order</h2>
      </div>
      <div id="order-container">
        <table className="table table-sm">
          <thead>
            {this.createItemHeaderRow()}
          </thead>
          <tbody>
            {itemReservedList.map((item, index) => {
              return this.createItemRow("reserved", item, index);
            })}
          </tbody>
        </table>
      </div>
    </div>);
  }
}