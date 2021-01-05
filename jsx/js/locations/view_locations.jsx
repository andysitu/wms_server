class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
    this.state = {
      areas: [],
      locations: [],
      selected_area: "none",
    }
    this.prev_clicked_index = null;
    this.prev_clicked_checked = null;
    this.set_areas();
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
        for (var i=0; i< new_locations.length; i++) {
          that.convert_location(new_locations[i]);
        }
        that.setState(
          {locations: that.state.locations.concat(new_locations)},
          () => {
            if (new_locations.length > 0) {
              that.add_area_to_state(
                new_locations[0].area_id, new_locations[0].area);
            }
          });
      },
    });
  };

  show_create_loc_menu = () => {
    this.modalMenu.current.show_menu("create_location", {}, this.create_location);
  };

  // Changes location object to formatted data
  convert_location(l) {
    l.location_string = `${l.area}-${l.row}-${l.bay}-${l.level}-${l.shelf}`;
  }
  add_area_to_state = (area_id, area_string) => {
    var areas = this.state.areas;
    for (let area of areas) {
      if (area.id == area_id || area.area == area_string) {
        return ;
      }
    }
    this.setState({
      areas: areas.concat({id: area_id, area: area_string})
    })
  }
  set_areas = () => {
    var that = this;
    $.ajax({
      url: "../areas",
      type: "GET",
      success: function(data) {
        that.setState({
          areas: data,
        })
      },
    });
  }

  create_area_options =() =>  {
    return (
      <select onChange={this.onChange_area}
          value={this.state.selected_area}>
        <option value="none">None</option>
        {this.state.areas.map((area) => {
          return (
            <option value={area.id} key={"area-" + area.id}
            >{area.area}</option>
          );
        })}
      </select>);
  }

  onChange_area = (e) => {
    this.setState({
      selected_area: e.target.value,
    });
  }

  get_locations = () => {
    var that = this;
    $.ajax({
      type: "GET",
      url: "./locations",
      success: function(locations) {
        for(let l of locations) {
          that.convert_location(l);
        }
        that.setState({
          locations: locations,
        }, () => { console.log(that.state.locations); });
      }
    });
  }
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

  show_barcodes = (location_string) => {
    var checkboxes = document.querySelectorAll(".row-checkbox:checked");
    var locations = [],
        index;
    if (checkboxes.length == 0)
      return;
    for (let cbox of checkboxes) {
      index = cbox.getAttribute("row_index");
      locations.push(this.state.locations[index].location_string);
    }
    this.modalMenu.current.show_menu("create_barcode", {location_strings: locations,});
  };

  onChange_top_checkbox = (e) => {
    var is_checked = e.target.checked;
    var checkboxes = document.getElementsByClassName("row-checkbox");
    for (let i=0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked != is_checked) {
        checkboxes[i].click();
      }
    }
  }

  onClick_row_checkbox = (e) => {
    var cur_row = parseInt(e.target.getAttribute("row_index"));
    if (this.prev_clicked_index != null && e.shiftKey && 
          cur_row != this.prev_clicked_index) {
      // e.preventDefault();
      var start, end, box;
      if (cur_row > this.prev_clicked_index) {
        [start, end] = [this.prev_clicked_index, cur_row];
      } else {
        [end, start] = [this.prev_clicked_index, cur_row];
      }
      
      for (let i=start; i < end+1; i++) {
        box = document.getElementById("row-checkbox-" + i);
        if (box.checked != this.prev_clicked_checked) {
          box.click();
        }
      }
    }
    this.prev_clicked_index = parseInt(e.target.getAttribute("row_index"));
    this.prev_clicked_checked = e.target.checked;
  }
  remove_area = (index) => {
    var area_string = this.state.areas.splice(index, 1)[0].area;
    // First remove from area select element
    this.setState({
      areas: this.state.areas,
    }, () => { // Next remove from locations
      var new_locations = []
      for (var i=0; i<this.state.locations.length; i++) {
        if (this.state.locations[i].area != area_string) {
          new_locations.push(this.state.locations[i]);
        }
      }
      this.setState({
        locations: new_locations,
      });
    });
  }

  onClick_delete_area = () => {
    if (this.state.selected_area === "none"
        || this.state.selected_area === "all"
    ) {
      return;
    }
    var area_name, index, id;
    for (var i=0; i<this.state.areas.length; i++) {
      if (this.state.areas[i].id == this.state.selected_area) {
        index = i;
        id = this.state.areas[i].id
        area_name = this.state.areas[i].area;
      } 
    }
    var result = window.confirm(`Are you sure you want to delete area 
      ${area_name} and all its locations?`);
    if (result) {
      var that = this;
      $.ajax({
        url: "../areas/" + this.state.selected_area,
        method: "DELETE",
        success: function(response) {
          if (that.state.areas[index].id == id) {
            that.remove_area(index);
          }
        },
      });
    }
  }

  onClick_show_area = () => {
    var area = this.state.selected_area;
    if (area === "none") {
      return;
    }
    var that = this;
    $.ajax({
      url: "../locations/area/" + area,
      method: "GET",
      success: function(locationsData) {
        that.setState({
          locations: locationsData
        });
      },
    });
  };

  render () {
    return (<div>
      <button className="btn btn-sm btn-primary" onClick={this.show_create_loc_menu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
      <button type="button" className="btn btn-sm btn-outline-dark" 
          onClick={this.show_barcodes}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
          <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
        </svg>
      </button>
      <span>
        Area: {this.create_area_options()}

        <button type="button" className="btn btn-sm btn-outline-secondary"
          onClick={this.onClick_show_area}>
          Show
        </button>

        <button type="button" className="btn btn-sm btn-outline-primary"
          onClick={this.onClick_delete_area}
        >Delete Area</button>
      </span>
      

      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" onChange={this.onChange_top_checkbox} />
            </th>
            <th scope="col">Area</th>
            <th scope="col">Row</th>
            <th scope="col">Bay</th>
            <th scope="col">Level</th>
            <th scope="col">Shelf</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.locations.map((location, index) => {
            return (
              <LocationRow key={location.id} 
                index={index}
                location={location}
                show_barcode={this.show_barcode}
                onClick_row_checkbox={this.onClick_row_checkbox}
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

  onClick_delete_btn = () => {
    var result = window.confirm(
      `Are you sure you want to delete ${this.state.location.location_string}?`);
    if (result) {
      this.props.delete_location(this.state.location.id);
    }
  };

  onClick_checkbox = (e) => {
    this.props.onClick_row_checkbox(e);
  }
  onChange_checkbox = (e) => {
    var $tr = $(e.target).closest("tr");
    if (e.target.checked) {
      $tr.addClass("checked-row");
    } else {
      $tr.removeClass("checked-row");
    }
  }
  
  render() {
    return (
    <tr key={this.state.location.id}>
      <td><input type="checkbox" className="row-checkbox" row_index={this.props.index}
            id={"row-checkbox-"+this.props.index} 
            onClick={this.onClick_checkbox}
            onChange={this.onChange_checkbox}
            ></input></td>
      <td>{this.state.location.area}</td>
      <td>{this.state.location.row}</td>
      <td>{this.state.location.bay}</td>
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