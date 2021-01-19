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

  create_warehouse = (data) => {
    $.ajax({
      url: "./warehouses",
      type: "POST",
      // context: this,
      contentType: "application/json;",
      data: JSON.stringify(data),
      context: this,
      success: function(warehouse) {
        console.log(warehouse);
        this.setState((state) => {
          var new_warehouse = [warehouse,];
          for (let i=0; i<state.warehouses.length; i++) {
            new_warehouse.push(state.warehouses[i]);
          }
          return {warehouses: new_warehouse,};
        });
      },
    });
  }

  onClick_add_warehouse = () => {
    this.modalMenu.current.show_menu("create_warehouse", {}, this.create_warehouse);
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
        <tbody>
          {this.state.warehouses.map((warehouse) => {
            return (
              <tr key={warehouse.id}>
                <td>{warehouse.name}</td>
                <td>{warehouse.city}</td>
                <td>{warehouse.state}</td>
                <td>{warehouse.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalMenu ref={this.modalMenu} />
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<WarehouseApp />), document.getElementById("content-container"));
}

loadReact();