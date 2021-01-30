class PutawayApp extends React.Component {
  onSubmit_searchForm = (e) => {
    e.preventDefault();
  };

  render() {
    return (
    <div>
      <form onSubmit={this.onSubmit_searchForm}>
        <div className="form-group">
          <label htmlFor="">Shipment Code</label>
          <input type="text" className="form-control" name="shipmentCode"></input>
        </div>
        <div className="form-group">
          <label htmlFor="">Item SKU</label>
          <input type="text" className="form-control" name="itemSku"></input>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<PutawayApp />), document.getElementById("content-container"));
}

loadReact();