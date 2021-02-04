class InventoryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInventory: [],
    };

    this.loadItemInventory();
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

  onClick_deleteItem = (e) => {
    const id = e.target.getAttribute("id"),
          index = e.target.getAttribute("index");
    $.ajax({
      url: "/iteminventory/" + id,
      type: "DELETE",
      context: this,
      success: function(data) {
        console.log(data);
      },
      complete: function() {
        this.setState(state => {
          let newList = [...state.itemInventory];
          newList.splice(index, 1);
          return {itemInventory: newList};
        });
      }
    });
  };

  render() {
    return (<div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">SKU</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipment Code</th>
            <th scope="col">Location</th>
            <th scope="col">Created Date</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.itemInventory.map((item, index) => {
            return (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.itemSku}</td>
              <td>{item.quantity}</td>
              <td>{item.shipmentCode}</td>
              <td>{item.locationCode}</td>
              <td>{item.createdDate}</td>
              <td>
                <button type="button" className="btn btn-sm"
                  onClick={this.onClick_deleteItem}
                  id={item.id} index={index}
                >Delete</button>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>);
  }
}

class ItemInventoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInventory: [],
    };

    this.loadItemInventory();
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

  onClick_deleteItem = (e) => {
    const id = e.target.getAttribute("id"),
          index = e.target.getAttribute("index");
    $.ajax({
      url: "/iteminventory/" + id,
      type: "DELETE",
      context: this,
      success: function(data) {
        console.log(data);
      },
      complete: function() {
        this.setState(state => {
          let newList = [...state.itemInventory];
          newList.splice(index, 1);
          return {itemInventory: newList};
        });
      }
    });
  };

  render() {
    return (<div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">SKU</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipment Code</th>
            <th scope="col">Location</th>
            <th scope="col">Created Date</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.itemInventory.map((item, index) => {
            return (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.itemSku}</td>
              <td>{item.quantity}</td>
              <td>{item.shipmentCode}</td>
              <td>{item.locationCode}</td>
              <td>{item.createdDate}</td>
              <td>
                <button type="button" className="btn btn-sm"
                  onClick={this.onClick_deleteItem}
                  id={item.id} index={index}
                >Delete</button>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<InventoryApp />), document.getElementById("content-container"));
}

loadReact();