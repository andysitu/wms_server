class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
    this.state = {
      locations: [],
    }
    this.get_locations();
  }

  show_menu = () => {
    this.modalMenu.current.show_menu("create_location", (data)=> {
      $.ajax({
        type: "POST",
        url: "./locations",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(responseData) {
          console.log(responseData);
        }
      });
    });
  };

  get_locations = () => {
    var that = this;
    $.ajax({
      type: "GET",
      url: "./locations",
      success: function(locations) {
        console.log(locations);
        that.setState({
          locations: locations,
        });
      }
    });
  }

  render () {
    return (<div>
      <button className="btn btn-primary"
        onClick={this.show_menu}
      >Create</button>

      <table>
        <thead>
          <tr>
            <th>Area</th>
            <th>Loc</th>
            <th>Row</th>
            <th>Column</th>
            <th>Level</th>
            <th>Shelf</th>
          </tr>
        </thead>
        <tbody>
          {this.state.locations.map((location) => {
            return (
              <tr key={location.id}>
                <td>{location.area}</td>
                <td>{location.loc}</td>
                <td>{location.row}</td>
                <td>{location.column}</td>
                <td>{location.level}</td>
                <td>{location.shelf}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalMenu ref={this.modalMenu}/>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <div>
      <LocationTable />
    </div>
  ), document.getElementById("content-container"));
}

loadReact();