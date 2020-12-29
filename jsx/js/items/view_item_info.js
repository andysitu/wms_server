class ItemInfoApp extends React.Component {
  onClick_search = () => {
    var search_type = document.getElementById("item-search1-type-select").value,
        search_value = document.getElementById("search-bar1-input").value;
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
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <div>
      <ItemInfoApp />
    </div>
  ), document.getElementById("content-container"));
}

loadReact();