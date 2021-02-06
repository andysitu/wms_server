import { TableSearchBar } from "../etc/TableSearchBar.js";

export { InventoryTableOrder }

class InventoryTableOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInventory: [],
    }

    if (this.editOptions) {
      this.loadItemInventory();
    }
    this.tablesearchbar = React.createRef();
  }

  loadItemInventory = () => {
    $.ajax({
      url: "./iteminventory",
      type: "GET",
      context: this,
      success: function(items) {
        console.log(items);
        this.setState({
          itemInventory: items,
        });
      }
    });
  };

  onClick_search = (search_type, search_value) => {
    $.ajax({
      url: `/iteminventory?property=${search_type}&value=${search_value}`,
      type: "GET",
      context: this,
      success: function(itemList) {
        this.setState({ itemInventory: itemList });
      },
    });
  };

  render() {
    return (<div>
      <TableSearchBar onClick_search={this.onClick_search} search_type={"item_inventory"}/>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Item Name</th>
            <th scope="col">SKU</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipment Code</th>
            <th scope="col">Location</th>
            <th scope="col">Created Date</th>
            { this.editOptions ? <th scope="col">Options</th> : null}
            
          </tr>
        </thead>
        <tbody>
          {this.state.itemInventory.map((item, index) => {
            return (
            <tr key={item.id}>
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
          })}
        </tbody>
      </table>
    </div>);
  }
}