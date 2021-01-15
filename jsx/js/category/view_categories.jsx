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
      url: "./categories",
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

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scole="col">Name</th>
              <th scole="col">Created</th>
              <th scole="col">Modified</th>
              <th scole="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.itemCategories.map((itemCategory) => {
              return (
                <tr key={itemCategory.id}>
                  <td>{itemCategory.name}</td>
                  <td>{itemCategory.createdDate}</td>
                  <td>{itemCategory.lastModifiedDate}</td>
                  <td></td>
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