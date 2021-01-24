class ReceiveItemApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("shipment-input").focus();
  }

  render() {
    return (<div>
      <form>
        <div className="form-group">
          <label htmlFor="shipment-input">Shipment</label>
          <input type="text" class="form-control" id="shipment-input"></input>
        </div>
        <div className="form-group">
          <label htmlFor="item-sku-input">Item SKU</label>
          <input type="text" class="form-control" id="item-sku-input"></input>
        </div>
        <div className="form-group">
          <label htmlFor="quantity-input">Quantity</label>
          <input type="number" class="form-control" id="quantity-input"></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Shipment</th>
            <th scope="col">Location</th>
            <th scope="col">Quantity</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
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