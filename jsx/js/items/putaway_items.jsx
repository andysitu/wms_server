class PutawayApp extends React.Component {
  onSubmit_searchForm = (e) => {
    e.preventDefault();
  };

  render() {
    return (
    <div>
      <form onSubmit={this.onSubmit_searchForm}>
        <div className="form-group row">
          <div className="col-5">
            <label htmlFor="">Shipment Code</label>
            <input type="text" className="form-control" name="shipmentCode"></input>
          </div>
          <div className="col-5">
            <label htmlFor="">Item SKU</label>
            <input type="text" className="form-control" name="itemSku"></input>
          </div>  
        </div>
        <button type="submit">Search</button>
      </form>

      <div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Shipment Code</th>
              <th scope="col">Item Name</th>
              <th scope="col">SKU</th>
              <th scope="col">Quantity</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody id="itemReceive-table"></tbody>
        </table>
      </div>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<PutawayApp />), document.getElementById("content-container"));
}

loadReact();