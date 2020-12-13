class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
  }

  show_menu = () => {
    this.modalMenu.current.show_menu("create_location");
  }

  render () {
    return (<div>
      <button className="btn btn-primary"
        onClick={this.show_menu}
      >Create</button>

      <ModalMenu ref={this.modalMenu}/>
    </div>);
  }
}

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
    };
  }
  show_menu = (menu_type) => {
    this.setState({menu_type: "none"});
    this.setState({menu_type: menu_type});
    $("#modalMenu").modal("show");
  };
  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "create_location") {
      return (
      <div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-control" name="loc"></input>
        </div>
        <div className="form-group">
          <label>Area</label>
          <input type="text" className="form-control" name="area"></input>
        </div>
        <div className="form-group">
          <label>Row</label>
          <input type="number" className="form-control" name="row"></input>
        </div>
        <div className="form-group">
          <label>Column</label>
          <input type="number" className="form-control" name="column"></input>
        </div>
        <div className="form-group">
          <label>Level</label>
          <input type="number" className="form-control" name="level"></input>
        </div>
      </div>);
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
    console.log("submit");
    var data = this.get_data();
    console.log(data);
    $("#modalMenu").modal("hide");
  };
  render() {
    return (<div className="modal" tabIndex="-1" role="dialog" id="modalMenu">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Title</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={this.onSubmit} id="modalmenu-form">
            <div className="modal-body">
              {this.create_menu()}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
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