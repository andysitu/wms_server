class WarehouseApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouses: [],
    };
    this.load_warehouses();
    this.modalMenu = React.createRef();
  }

  load_warehouses = () => {
    $.ajax({
      url: '/warehouses',
      type: "GET",
      context: this,
      success: function(warehouse_data) {
        console.log(warehouse_data);
        this.setState({
          warehouses: warehouse_data,
        });
      },
    })
  }

  onClick_add_warehouse = () => {
    console.log("add");
  };

  render() {
    return(<div>
      <div className="m-1">
        <button className="btn btn-sm btn-primary"
          onClick={this.onClick_add_warehouse}
        >+</button>
      </div>
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

      <ModalMenu ref={this.modalMenu} />
    </div>)
  }
}

function loadReact() {
  ReactDOM.render((<WarehouseApp />), document.getElementById("content-container"));
}

loadReact();