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

  onClick_delete_warehouse = (e) => {
    var index = e.target.getAttribute("index"),
        warehouse_id = e.target.getAttribute("warehouse_id");
    var result = window.confirm(`Are you sure you want to delete ${
      this.state.warehouses[index].name}?`);
    if (result) {
      $.ajax({
        url: "./warehouses/" + warehouse_id,
        type: "DELETE",
        context: this,
        success: function() {
          this.setState((state) => {
            var new_warehouse = [];
            for (let i=0; i<state.warehouses.length; i++) {
              if (String(state.warehouses[i].id) != warehouse_id) {
                new_warehouse.push(state.warehouses[i]);
              }
            }
            return {warehouses: new_warehouse,};
          });
        }
      });
    }
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
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.warehouses.map((warehouse, index) => {
            return (
              <tr key={warehouse.id}>
                <td>{warehouse.name}</td>
                <td>{warehouse.city}</td>
                <td>{warehouse.state}</td>
                <td>{warehouse.country}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-outline-danger btn-with-svgs"
                    warehouse_id={warehouse.id} index={index}
                    onClick={this.onClick_delete_warehouse}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                      className="bi bi-trash" viewBox="0 0 16 16" style={{"pointerEvents": "none"}}>
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </td>
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