class ReceiveItemApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      received_items: [],
    };
  }

  componentDidMount() {
    this.load_items_from_localstorage();
    document.getElementById("shipment-input").focus();
  }

  load_items_from_localstorage = () =>  {
    // Save items to LocalStorage before closing
    window.addEventListener('beforeunload', (e) => {
      this.save_items_to_localstorage();
    });

    this.setState({
      received_items: storage_obj.get_itemReceive(),
    });
  };

  save_items_to_localstorage = () => {
    storage_obj.set_itemReceive(this.state.received_items);
  };

  onSubmit_item = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    form.reset();
    document.getElementById("shipment-input").focus();
    console.log("submit", data);

    $.ajax({
      url: "./itemreceive",
      type: "POST",
      context: this,
      data: data,
      error: function(xhr, textStatus) {
        console.log(textStatus);
        window.alert("Error: item SKU does not exist");
      },
      success: function(return_data) {
        console.log(return_data);
        this.setState((state)=> {
          var new_items = [...state.received_items];
          new_items.push(return_data);
          return {
            received_items: new_items,
          };
        });
      }
    });
  };

  // Deletes item from state whether there was an error in request or not
  onClick_delete_item = (e) => {
    var item_id = e.target.getAttribute("item_id"),
        index = e.target.getAttribute("index");
    if (item_id) {
      $.ajax({
        url: "./itemreceive/" + e.target.getAttribute("item_id"),
        type: "DELETE",
        context: this,
        complete: function() {
          this.setState(state => {
            var new_items = [...state.received_items];
            new_items.splice(index, 1);
            return {
              received_items: new_items,
            };
          });
        }
      });
    }
    

  }

  render() {
    return (<div>
      <form onSubmit={this.onSubmit_item}>
        <div className="form-group">
          <label htmlFor="shipment-input">Shipment</label>
          <input type="text" name="shipmentCode" className="form-control" 
            id="shipment-input" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="item-sku-input">Item SKU</label>
          <input type="text" name="itemSku" className="form-control" 
            id="item-sku-input" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="quantity-input">Quantity</label>
          <input type="number" name="quantity" className="form-control" 
            id="quantity-input" required></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">SKU</th>
            <th scope="col">Shipment</th>
            <th scope="col">Quantity</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.received_items.map((item, index)=> {
            return (
              <tr key={item.id}>
                <td>{item.itemInfoResponse.itemName}</td>
                <td>{item.itemSku}</td>
                <td>{item.shipmentCode}</td>
                <td>{item.quantity}</td>
                <td>
                <button type="button" className="btn btn-sm btn-outline-danger"
                  item_id={item.id} index={index} title="Delete item"
                  onClick={this.onClick_delete_item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
                </td>
              </tr>);
          })}
        </tbody>
      </table>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <ReceiveItemApp />
  ), document.getElementById("content-container"));
}

loadReact();