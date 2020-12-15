class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();p
    this.state = {
      locations: [],
    }
    this.get_locations();
  }

  create_location = (data) => {
    const that = this;
    $.ajax({
      type: "POST",
      url: "./locations",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function(new_locations) {
        that.setState({locations: that.state.locations.concat(new_locations),});
      }
    });
  };

  show_create_loc_menu = () => {
    this.modalMenu.current.show_menu("create_location", {}, this.create_location);
  };

  get_locations = () => {
    var that = this;
    $.ajax({
      type: "GET",
      url: "./locations",
      success: function(locations) {
        that.setState({
          locations: locations,
        });
      }
    });
  };
  // New Objects created are not deep copies (only use Object.assign)
  delete_location = (location_id) => {
    var that = this;
    $.ajax({
      type: "DELETE",
      url: "./locations/" + location_id,
      success: function(data) {
        var new_locations = [],
            l = that.state.locations;
        for (let i=0; i<l.length; i++) {
          if (l[i].id != location_id)
            new_locations.push(Object.assign({}, l[i]));
        }
        that.setState({locations: new_locations});
      },
    });
  };

  show_barcode = (location_string) => {
    console.log(location_string);
    this.modalMenu.current.show_menu("create_barcode", {location: location_string,});
  };

  render () {
    return (<div>
      <button className="btn btn-sm btn-primary" onClick={this.show_create_loc_menu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>

      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Loc</th>
            <th scope="col">Row</th>
            <th scope="col">Column</th>
            <th scope="col">Level</th>
            <th scope="col">Shelf</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.locations.map((location) => {
            return (
              <LocationRow key={location.id} 
                location={location}
                show_barcode={this.show_barcode}
                delete_location={this.delete_location}
                />
            );
          })}
        </tbody>
      </table>

      <ModalMenu ref={this.modalMenu}/>
    </div>);
  }
}

class LocationRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
    }
  }

  get_location_string () {
    var l = this.state.location;
    return `${l.area}.${l.loc}.${l.row}.${l.column}.${l.level}.${l.shelf}`;
  }

  onClick_delete_btn = () => {
    var result = window.confirm(
      `Are you sure you want to delete ${this.get_location_string()}?`);
    if (result) {
      this.props.delete_location(this.state.location.id);
    }
  };

  onClick_show_barcode = () => {
    this.props.show_barcode( this.get_location_string() );
  };
  
  render() {
    return (
    <tr key={this.state.location.id}>
      <td>{this.state.location.area}</td>
      <td>{this.state.location.loc}</td>
      <td>{this.state.location.row}</td>
      <td>{this.state.location.column}</td>
      <td>{this.state.location.level}</td>
      <td>{this.state.location.shelf}</td>
      <td>
        <button type="button" className="btn btn-sm btn-outline-warning">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={this.onClick_delete_btn}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={this.onClick_show_barcode}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
          <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
        </svg>
        </button>
      </td>
    </tr>);
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