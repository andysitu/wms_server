class CategoryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCategories: [],
    };
    this.load_categories();
  }
  load_categories = () => {
    $.ajax({
      url: "./item_categories",
      type: "GET",
      context: this,
      success: function(data) {
        console.log(data);
        this.setState({
          itemCategories: data,
        });
      },
    });
  }

  onClick_editItemCategory = (e) => {
    var index = e.target.getAttribute("index"),
        name = window.prompt(`New name for ${this.state.itemCategories[index].name}?`);
    if (!name) {
      return;
    } else if (name.length == 0) {
      window.alert("Name given was blank");
    } else if (this.state.itemCategories[index].id != e.target.getAttribute("itemcategory_id")) {
      window.alert("Error in matching the IDs");
    } else {
      $.ajax({
        url: "./item_categories/" + e.target.getAttribute("itemcategory_id"),
        type: "PATCH",
        data: {
          name: name,
        },
        context: this,
        success: function(data) {
          this.setState((prev_state) => {
            prev_state.itemCategories[index] = data;
            return {
              itemCategories: prev_state.itemCategories,
            };
          });
        },
      });
    }
  };
  onClick_deleteItemCategory = (e) => {
    var index = e.target.getAttribute("index"),
        name = this.state.itemCategories[index].name;
    let result = window.confirm(`Are you sure want to delete Category ${name}?`);
    if (result) {
      $.ajax({
        url: "./item_categories/" + e.target.getAttribute("itemcategory_id"),
        type: "DELETE",
        context: this,
        success: function() {
          this.setState((prev_state) => {
            prev_state.itemCategories.splice(index, 1);
            return {
              itemCategories: prev_state.itemCategories,
            };
          });
        }
      })
    }
    
  };

  render() {
    return (
      <div>
        <h1>Item Categories</h1>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scole="col">Name</th>
              <th scole="col">Created</th>
              <th scole="col">Modified</th>
              <th scole="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.itemCategories.map((itemCategory, index) => {
              return (
                <tr key={itemCategory.id}>
                  <td>{itemCategory.name}</td>
                  <td>{itemCategory.createdDate}</td>
                  <td>{itemCategory.lastModifiedDate}</td>
                  <td>
                  <button type="button" className="btn btn-sm btn-outline-warning"
                      onClick={this.onClick_editItemCategory} 
                      itemcategory_id={itemCategory.id}
                      index={index}>
                    <svg xmlns="http://www.w3.org/2000/svg"  style={{"pointerEvents": "none"}}
                      width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-danger"
                      onClick={this.onClick_deleteItemCategory} 
                      itemcategory_id={itemCategory.id}
                      index={index}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{"pointerEvents": "none"}}
                      width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
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
      </div>);
  }
}

function loadReact() {
  ReactDOM.render((<CategoryApp />), document.getElementById("content-container"));
}

loadReact();