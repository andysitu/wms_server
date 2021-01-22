class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
      submit_handler: null,
      data: {},
      categories: [],
      title: null,
    };
  }

  get_title = (menu_type) => {
    var strings = menu_type.split("_");

    for (let i=0; i<strings.length; i++) {
      strings[i] = strings[i][0].toUpperCase() + strings[i].slice(1)
    }
    return strings.join(" ");
  }
  
  show_menu = (menu_type, data, submit_handler=null) => {
    // Get Item Categories for Item Info
    if (menu_type == "create_item_info" || menu_type == "edit_item_info") {
      this.get_itemCategories();
    }
    // Create a blank form to reset it, and then create actual menu
    this.setState({
        menu_type: menu_type,
        submit_handler: submit_handler,
        data: data,
        title: this.get_title(menu_type),
      }, () => {
      if (menu_type == "create_barcode") {
        // Set the barcode after img element is set
        for (let i=0; i < this.state.data.barcode_strings.length; i++) {
          JsBarcode("#barcode_" + i, data.barcode_strings[i], {
            width: 1.5,
            fontSize: 20,
            fontOptions: "bold"
          });
        }
      }
      $("#modalMenu").modal("show");
    });
  };

  componentDidMount() {
    // Blank out menu when it's hidden
    $("#modalMenu").on("hidden.bs.modal", () => {
      this.setState({menu_type: "none", data: {}});
    });
  }

  complete_and_check_data = (data) => {
    if (this.state.menu_type == "create_location") {
      // Complete the end values if they're blank
      data.bay_end = data.bay_end ? data.bay_end : data.bay_start;
      data.level_end = data.level_end ? data.level_end : data.level_start;
      data.row_end = data.row_end ? data.row_end : data.row_start;
      data.shelf_end = data.shelf_end ? data.shelf_end : data.shelf_start;

      // Check that the end values are greater than then start values
      return (parseInt(data.bay_start) > parseInt(data.bay_end) || 
          parseInt(data.level_start) > parseInt(data.level_end) ||
          parseInt(data.row_start) > parseInt(data.row_end) || 
          parseInt(data.shelf_start) > parseInt(data.shelf_end)) 
        ? false : true
    } else {
      return true;
    }
  };
  // Print all the barcodes shown in the menu in new window
  onClick_print_barcode = () => {
    var new_window = window.open('', 'Print Barcode', "_blank");
    new_window.document.write('<html><head><title>Print</title></head><body>');
    new_window.document.write(document.getElementById("barcode-container").innerHTML);
    new_window.document.write("</body></html>");
    new_window.print();
    new_window.close();
    // new_window.onload = function() {window.print();}
  }
  // Save multiple barcodes into png file
  onClick_save_barcode = () => {
    let imgs = document.getElementsByClassName("barcode-img");
    var link, index;
    for (let i=0; i<imgs.length; i++) {
      index = imgs[i].getAttribute("index");
      link = document.createElement("a");
      link.setAttribute("href", imgs[i].src);
      link.setAttribute("download", this.state.data.barcode_strings[index].replaceAll(".", "-") + ".png");
      link.click();
    }
  }

  onClick_add_itemCategory = () => {
    var category_name = window.prompt("Category name?");
    if (category_name == null || category_name.length == 0) {
      window.alert("Format of the category name is incorrect");
      return;
    }
    for (var i=0;i<this.state.categories.length;i++) {
      if (this.state.categories[i].name.toUpperCase() == category_name.toUpperCase()) {
        window.alert(`A category with the name ${category_name} already exists.`);
        return;
      }
    }
    var that = this;
    $.ajax({
      url: "../item_categories",
      type: "POST",
      data: {
        name: category_name
      },
      success: function(category) {
        that.setState(prev_state => {
          var categories = [...prev_state.categories, category],
              data = {
                ...prev_state.data, 
                itemCategoryId: category.id
              };

          return {
            categories: categories,
            data: data,
          };
        });
      }
    });
  };

  get_itemCategories = () => {
    var that = this;
    $.ajax({
      url: "../item_categories",
      type: "GET",
      success: function(data) {
        that.setState({
          categories: data,
        });
      },
    })
  }

  onChange_itemCategory = (e) => {
    this.setState(prev_state => {
      this.state.data.itemCategoryId = e.target.value;
      return {data: this.state.data};
      });
  }

  create_item_info_menu = () => {
    var edit_status = this.state.menu_type == "edit_item_info";
    var item_name   = edit_status ? this.state.data.itemName : "",
        description = edit_status ? this.state.data.description : "",
        weight      = edit_status ? this.state.data.weight : "",
        width       = edit_status ? this.state.data.width : "",
        height      = edit_status ? this.state.data.height : "",
        length      = edit_status ? this.state.data.length : "",
        itemCategoryId    = this.state.data.itemCategoryId;
    return (<div>
      <div className="form-group">
        <label htmlFor="item-name-input">Item Name</label>
        <input type="text" className="form-control" 
          name="name" id="item-name-input"
          defaultValue={item_name} required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="item-description-input">Description</label>
        <input type="text" className="form-control" 
          name="description" id="item-description-input"
          defaultValue={description} required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="item-weight-input">Weight</label>
        <input type="number" className="form-control" 
          name="weight" id="item-weight-input"
          min="0" step="0.01" required
          defaultValue={weight} required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="">Category</label>
        <button type="button" className=""
          onClick={this.onClick_add_itemCategory}>+</button>
        <select className="form-control" size="4" name="itemCategory"
          value={itemCategoryId} onChange={this.onChange_itemCategory}>
          <option value="">None</option>
          {this.state.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>);
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">Dimensions</label>
        <div className="form-row">
          <div className="col-4">
            <input type="number" name="width" className="form-control" 
              defaultValue={width} placeholder="Width" />
          </div>
          <div className="col-4">
            <input type="number" name="length" className="form-control" 
              defaultValue={length} placeholder="Length" />
          </div>
          <div className="col-4">
            <input type="number" name="height" className="form-control" 
              defaultValue={height} placeholder="Height" />
          </div>
        </div>
      </div>
    </div>);
  }

  create_warehouse_menu = () => {
    var edit_status = this.state.menu_type == "edit_warehouse";
    var name        = edit_status ? this.state.data.name : "",
        description = edit_status ? this.state.data.description : "",
        address1    = edit_status ? this.state.data.address1 : "",
        address2    = edit_status ? this.state.data.address2 : "",
        city        = edit_status ? this.state.data.city : "",
        state       = edit_status ? this.state.data.state : "",
        zip         = edit_status ? this.state.data.zip : "",
        phone       = edit_status ? this.state.data.phone : "",
        code        = edit_status ? this.state.data.code : "";
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-name-input">Name</label>
            <input type="text" name="name" id="mm-name-input" 
              className="form-control" defaultValue={name} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-desc-input">Description</label>
            <input type="text" name="description" id="mm-desc-input" 
              className="form-control" defaultValue={description} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr1-input">Address 1</label>
          <input type="text" name="address1" id="mm-addr1-input" 
            className="form-control" defaultValue={address1} required />
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr2-input">Address 2</label>
          <input type="text" name="address2" id="mm-addr2-input" 
            className="form-control" defaultValue={address2} />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-city-input">City</label>
            <input type="text" className="form-control" id="mm-input-city" 
              name="city" defaultValue={city} required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-state-input">State</label>
            <input type="text" id="mm-state-input" className="form-control" 
              name="state" defaultValue={state} required />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="mm-zip-input">Zip</label>
            <input type="text" className="form-control" id="mm-zip-input"
              name="zip" defaultValue={zip} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-phone-input">Phone</label>
            <input type="text" name="phone" id="mm-phone-input" 
              className="form-control" defaultValue={phone} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-code-input">Warehouse Code</label>
            <input type="text" name="code" id="mm-code-input" 
              className="form-control" defaultValue={code} required />
          </div>
        </div>
      </div>);
  };

  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "create_location") {
      return (<CreateLocationMenu 
                warehouse_name={this.state.data.warehouse_name}
                warehouse_code={this.state.data.warehouse_code} />);
    } else if (this.state.menu_type == "create_item_info"
        || this.state.menu_type == "edit_item_info") {
      return this.create_item_info_menu();
    } else if (this.state.menu_type == "create_barcode") {
      return (<div>
        <div>
          <button type="button" className="btn btn-outline-primary"
            onClick={this.onClick_print_barcode}>Print</button>
          <button type="button" className="btn btn-outline-secondary"
            onClick={this.onClick_save_barcode}>Save</button>
        </div>

        <div id="barcode-container">
          {this.state.data.barcode_strings.map(
            (location_string, index) => {
              return (
                <div key={"barcode_div_" + index}>
                  <img key={"barcode_img_" + index} className="barcode-img"
                    id={"barcode_"+index} index={index} />
                </div>);
            })
          }
        </div>
      </div>);
    } else if (this.state.menu_type == "create_warehouse" ||
        this.state.menu_type == "edit_warehouse") {
      return this.create_warehouse_menu();
    } else {
      return ;
    }
  };

  get_data = () => {
    var data = {};
    if (this.state.additional_data) {
      for (var k in this.state.additional_data) {
        data[k] = this.state.additional_data[k];
      }
    }
    var formData = new FormData($("#modalmenu-form")[0]);

    if (this.state.type=="create_workitem") {
      formData.set("handleit", formData.get("handleit") == "on" ? true:false); 
    }

    for (var key of formData.keys()) {
      data[key] = formData.get(key);
    }
    return data;
  };

  onSubmit = (e) => {
    e.preventDefault();
    var data = this.get_data();

    var result = this.complete_and_check_data(data);
    if (result) {
      if (this.state.submit_handler) {
        this.state.submit_handler(data);  
      }
      $("#modalMenu").modal("hide");
    } else {
      window.alert("Please check that the end values are greater than the start values");
    }
  };
  
  render() {
    var footer;
    if (this.state.submit_handler) {
      footer = (
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      );
    } else {
      footer = (
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      );
    }
    return (<div className="modal" tabIndex="-1" role="dialog" id="modalMenu">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.state.title}</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={this.onSubmit} id="modalmenu-form">
            <div className="modal-body">
              {this.create_menu()}
            </div>
            
            {footer}
          </form>
        </div>
      </div>
    </div>);
  }
}

class CreateLocationMenu extends React.Component {
  render() {
    return (<div>
      <h3>Warehouse: {this.props.warehouse_name}-{this.props.warehouse_code}</h3>
      <div className="form-group">
        <label>Area</label>
        <input type="text" className="form-control" min="0" name="area" required></input>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Row</label>
          <input type="number" className="form-control" min="0" name="row_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Row</label>
          <input type="number" className="form-control" min="0" name="row_end"></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Bay</label>
          <input type="number" className="form-control" min="0" name="bay_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Bay</label>
          <input type="number" className="form-control" min="0" name="bay_end"></input>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Level</label>
          <input type="number" className="form-control" min="0" name="level_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Level</label>
          <input type="number" className="form-control" min="0" name="level_end"></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Shelf</label>
          <input type="number" className="form-control" min="0" name="shelf_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Shelf</label>
          <input type="number" className="form-control" min="0" name="shelf_end"></input>
        </div>
      </div>                                                                                                                                                                                                                                                                                                                          
    </div>);
  }
}