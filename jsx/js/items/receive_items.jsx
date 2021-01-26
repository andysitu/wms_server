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
      <table>
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Shipment</th>
            <th scope="col">Quantity</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.received_items.map((item)=> {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.shipment}</td>
                <td>{item.quantity}</td>
                <td></td>
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