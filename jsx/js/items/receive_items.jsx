class ReceiveItemApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_received_items: [],
    }
  }

  componentDidMount() {
    document.getElementById("shipment-input").focus();
  }

  onSubmit_item = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    $.ajax({
      
    })
    form.reset();
    document.getElementById("shipment-input").focus();
    console.log("submit", data);

    $.ajax({
      url: "./itemreceive",
      type: "POST",
      context: this,
      data: data,
      success: function(return_data) {
        console.log(return_data);
      }
    })

    // this.setState((state)=> {
    //   var new_items = [...state.session_received_items];
    //   new_items.push(data);
    //   return {
    //     session_received_items: new_items,
    //   }
    // });
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
          {this.state.session_received_items.map((item)=> {
            return (
              <tr>
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