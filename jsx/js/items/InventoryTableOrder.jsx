import { TableSearchBar } from "../etc/TableSearchBar.js";

export { InventoryTableOrder }

class InventoryTableOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInventory: [],
      reservedItems: {},
      
    }

    this.tablesearchbar = React.createRef();
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
            filteredList.push(item);
          }
        });
        this.setState({ itemInventory: filteredList });
      },
    });
  };

  reservedItem =(index) => {
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

  onClick_row = (e) => {
    e.preventDefault();
    let element = e.target;
    // Search up to 5 nodes for parent TR
    for (let i=0; i<5; i++) {
      if (element.tagName == "TR") {
        break;
      }
      element = element.parentNode
    }
    if (element.getAttribute("type")=="inventory") {
      const index = element.getAttribute("index");
      this.reservedItem(index);
    }
  };

  createItemHeaderRow = () => {
    return (<tr>
      <th scope="col"></th>
      <th scope="col">Item Name</th>
      <th scope="col">SKU</th>
      <th scope="col">Quantity</th>
      <th scope="col">Shipment Code</th>
      <th scope="col">Location</th>
      <th scope="col">Created Date</th>
      
    </tr>);
  }
  createItemRow = (type, item, index) => {
    return (
    <tr key={type + "_" +item.id} 
      type={type}
      onClick={this.onClick_row} index={index}>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{item.itemName}</td>
      <td>{item.itemSku}</td>
      <td>{item.quantity}</td>
      <td>{item.shipmentCode}</td>
      <td>{item.locationCode}</td>
      <td>{item.createdDate}</td>
    </tr>);
  };

  render() {
    let itemReservedList = Object.values(this.state.reservedItems);
    return (<div>
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

      <h2>Order</h2>
      <div style={{height: "320px", overflow: "auto"}}>
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