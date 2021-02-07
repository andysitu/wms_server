import { LocationRow } from './locationrow.js'
import { ModalMenu } from "../etc/modalmenu/ModalMenu.js"

class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
    this.state = {
      warehouses: [],
      areas: [],
      locations: [],
      selected_area: "",
      selected_warehouse: "",
    }
    this.prev_clicked_index = null;
    this.prev_clicked_checked = null;
    this.set_warehouses();
  }

  create_location = (data) => {
    if (!this.state.selected_warehouse || this.state.selected_warehouse.length == 0) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "./warehouses/" + this.state.selected_warehouse + "/locations",
      contentType: "application/json",
      context: this,
      data: JSON.stringify(data),
      success: function(new_locations) {
        this.setState(
          {locations: this.state.locations.concat(new_locations)},
          () => {
            if (new_locations.length > 0) {
              this.add_area_to_state(
                new_locations[0].area_id, new_locations[0].area);
            }
          });
      },
    });
  };

  show_create_loc_menu = () => {
    if (this.state.warehouses.length == 0 || 
        this.state.selected_warehouse == "") {
      window.alert("Please create/select a warehouse first.");
      return;
    }
    var warehouse_name, warehouse_code,
        warehouses = this.state.warehouses;
    for (var i=0; i<warehouses.length; i++) {
      if (warehouses[i].id == this.state.selected_warehouse) {
        warehouse_name = warehouses[i].name;
        warehouse_code = warehouses[i].code;
        break;
      }
    }
    if (!warehouse_name) {
      window.alert("Error: please reselect warehouse");
    }
    var data = {
      warehouse_name: warehouse_name,
      warehouse_id: this.state.selected_warehouse,
      warehouse_code: warehouse_code
    }
    this.modalMenu.current.show_menu("create_location", data, this.create_location);
  };

  add_area_to_state = (area_id, area_string) => {
    var areas = this.state.areas;
    for (let area of areas) {
      if (area.id == area_id || area.area == area_string) {
        return ;
      }
    }
    this.setState(prev_state => {
      if (prev_state.areas.length == 0) {
        return {
          areas: areas.concat({id: area_id, area: area_string}),
          selected_area: area_id,
        };
      } else {
        return { areas: areas.concat({id: area_id, area: area_string}) };
      }
      
    })
  };
  set_warehouses = () => {
    $.ajax({
      url: './warehouses',
      type: 'GET',
      context: this,
      success: function(warehouses) {
        this.setState(state => {
          if (warehouses.length > 0) {
            return {
              warehouses: warehouses,
              selected_warehouse: warehouses[0].id,
            }
          } else {
            return {
              warehouses: warehouses,
              selected_warehouse: "",
            }
          }
        }, () => {
          if (warehouses.length > 0) {
            this.load_areas_by_warehouse();
          }
        });
      }
    });
  };

  onChange_area = (e) => {
    this.setState({
      selected_area: e.target.value,
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

  onClick_show_barcodes = () => {
    var checkboxes = document.querySelectorAll(".row-checkbox:checked");
    var locations = [],
        index;
    if (checkboxes.length == 0)
      return;
    for (let cbox of checkboxes) {
      index = cbox.getAttribute("row_index");
      locations.push(this.state.locations[index].locationCode);
    }
    this.show_barcodes(locations);
  }

  show_barcodes = (location_list) => {
    this.modalMenu.current.show_menu("create_barcode", {barcode_strings: location_list,});
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

    var url = (area === "all" || area == "") ? 
              "./locations" : "../locations/area/" + area;
    $.ajax({
      type: "GET",
      url: url,
      context: this,
      success: function(locations) {
        this.setState({
          locations: locations,
        }, () => { console.log(this.state.locations); });
      }
    });
  };

  // Loads area by warehouse id set by state.selected_warehouse
  load_areas_by_warehouse = () => {
    $.ajax({
      url: "./warehouses/" + this.state.selected_warehouse + "/areas",
      type: "GET",
      context: this,
      success: function(areas) {
        this.setState({
            areas: areas,
            selected_area: (areas.length>0) ? areas[0].id : "",
        });
      },
    });
  }

  onChange_warehouse = (e) => {
    this.setState({
      selected_warehouse: e.target.value,
    }, this.load_areas_by_warehouse);
  }

  create_area_options =() =>  {
    return (
      <select onChange={this.onChange_area}
          className="form-control"
          value={this.state.selected_area}>
        {this.state.areas.map((area) => {
          return (
            <option value={area.id} key={"area-" + area.id}
            >{area.area}</option>
          );
        })}
        <option value="all">All</option>
      </select>);
  };
  
  create_warehouse_option = () => {
    return (
      <select className="form-control" value={this.state.selected_warehouse}
        onChange={this.onChange_warehouse}>
        {this.state.warehouses.map((warehouse) => {
          return (<option value={warehouse.id} key={"woption-"+warehouse.id}>
            {warehouse.name + "-" + warehouse.code}
          </option>);
        })}
      </select>);
  };

  render () {
    return (<div>
      <h1>Locations</h1>
      <div className="row justify-content-between">
        <div>
          <button className="btn btn-sm btn-primary" title="Create location"
              onClick={this.show_create_loc_menu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
          <button type="button" className="btn btn-sm btn-outline-dark" 
              onClick={this.onClick_show_barcodes} title="Show barcodes window">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
              <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
            </svg>
          </button>
        </div>
        <div className="col-7 form-group row">
          <div className="col-6  form-row row">
            <label className="col-form-label col-sm-4">Warehouse: </label>
            <div className="col-sm-8">
              {this.create_warehouse_option()}
            </div>
          </div>
          <div className="col-5 form-row row">
            <label className="col-form-label col-sm-3">Area: </label>
            <div className="col-sm-9">
              {this.create_area_options()}
            </div>
          </div>
          <button type="button" className="col btn btn-sm btn-outline-secondary"
            onClick={this.onClick_show_area}>
            Show
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-sm btn-outline-primary"
            onClick={this.onClick_delete_area}
          >Delete Area</button>
        </div>
      </div>

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
            <th scope="col">Code</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.locations.map((location, index) => {
            return (
              <LocationRow key={location.id} 
                index={index}
                location={location}
                show_barcodes={this.show_barcodes}
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



function loadReact() {
  ReactDOM.render((
    <div>
      <LocationTable />
    </div>
  ), document.getElementById("content-container"));
}

loadReact();