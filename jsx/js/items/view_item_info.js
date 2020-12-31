class ItemInfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfos: [],
    }
    this.modalMenu = React.createRef();
  }
  onClick_search = () => {
    var search_type = document.getElementById("item-search1-type-select").value,
        search_value = document.getElementById("search-bar1-input").value;
    var that = this;
    $.ajax({
      url: "./item_info?type=" + search_type + "&value=" + search_value,
      type: "GET",
      success: function(data) {
        console.log(data);
        that.setState({itemInfos: data});
      }
    });
  };

  create_itemInfo = (data) => {
    $.ajax({
      url: "../item_info",
      type: "POST",
      data: data,
      success: function(data) {
        console.log(data);
      },
    });
  };

  onClick_createItemInfo = () => {
    this.modalMenu.current.show_menu(
      "create_item_info", {}, this.create_itemInfo);
  };

  render() {
    return (<div>
      <div className="input-group">
        <input className="form-control" type="text" id="search-bar1-input"></input>
        <select className="custom-select" id="item-search1-type-select">
          <option value="name">Name</option>
        </select>
        <button className="btn btn-outline-secondary"
          onClick={this.onClick_search}
        >Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Description</th>
            <th scope="col">Weight</th>
          </tr>
        </thead>
        <tbody>
          {this.state.itemInfos.map((itemInfo) => {
            return (<tr>
              <td>{itemInfo.itemName}</td>
              <td>{itemInfo.description}</td>
              <td>{itemInfo.weight}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <div>
        <button
          onClick={this.onClick_createItemInfo}
        >+</button>
      </div>

      <ModalMenu ref={this.modalMenu} />
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <ItemInfoApp />
  ), document.getElementById("content-container"));
}

loadReact();