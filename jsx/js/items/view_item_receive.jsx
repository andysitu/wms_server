class ItemReceiveApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.load_data();
  }

  load_data = () => {
    $.ajax({
      url: "./itemreceive",
      type: "GET",
      context: this,
      success: function(data) {
        console.log(data);
        this.setState({
          items: data,
        })
      }
    });
  };

  onClick_delete = (e) => {
    var index = e.target.getAttribute("index"),
        id = e.target.getAttribute("id");
    var result = window.confirm(`Are you sure you want to delete ${
      this.state.items[index].itemInfoResponse.itemName}?`);
    if (result) {
      $.ajax({
        url: "./itemreceive/" + id,
        type: "DELETE",
        context: this,
        success: function() {
          this.setState((state) => {
            var new_items = [...this.state.items];
            new_items.splice(index, 1);
            return {
              items: new_items,
            };
          })
        }
      });
    }
  };

  onClick_search = (property, value) => {
    console.log(property, value);
    $.ajax({
      url: `./itemreceive?property=${property}&value=${value}`, 
      type: "GET",
      context: this,
      success: function(data) {
        console.log(data);
      }
    })
  }

  render() {
    return (<div>
      <div>
        <TableSearchBar onClick_search={this.onClick_search} search_type="item_receive"/>
      </div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scole="col">Item Name</th>
            <th scole="col">Shipment</th>
            <th scole="col">Quantity</th>
            <th scole="col">Date</th>
            <th scole="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.itemInfoResponse.itemName}</td>
                <td>{item.shipmentCode}</td>
                <td>{item.quantity}</td>
                <td></td>
                <td>
                  <button type="button" id={item.id} index={index}
                    onClick={this.onClick_delete}
                  >Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <ItemReceiveApp />
  ), document.getElementById("content-container"));
}

loadReact();