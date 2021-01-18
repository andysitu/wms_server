class WarehouseApp extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick_add_warehouse = () => {
    console.log("add");
  };

  render() {
    return(<div>
      <button className="btn btn-sm btn-primary"
        onClick={this.onClick_add_warehouse}
      >+</button>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
      </table>
    </div>)
  }
}

function loadReact() {
  ReactDOM.render((<WarehouseApp />), document.getElementById("content-container"));
}

loadReact();