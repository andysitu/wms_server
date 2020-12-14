class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
      submit_handler: null,
    };
  }
  show_menu = (menu_type, submit_handler= null) => {
    // Create a blank form to reset it, and then create actual menu
    this.setState({
      menu_type: menu_type,
      submit_handler: submit_handler,
    }, () => {
      $("#modalMenu").modal("show");
    });
  };

  componentDidMount() {
    // Blank out menu when it's hidden
    $("#modalMenu").on("hidden.bs.modal", () => {
      this.setState({menu_type: "none"});
    });
  }

  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "create_location") {
      return (
      <div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-control" name="loc" required></input>
        </div>
        <div className="form-group">
          <label>Area</label>
          <input type="text" className="form-control" name="area" required></input>
        </div>
        <div className="form-group">
          <label>Row</label>
          <input type="number" className="form-control" name="row" required></input>
        </div>
        <div className="form-group">
          <label>Column</label>
          <input type="number" className="form-control" name="column" required></input>
        </div>
        <div className="form-group">
          <label>Level</label>
          <input type="number" className="form-control" name="level" required></input>
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
    var data = this.get_data();
    if (this.state.submit_handler) {
      this.state.submit_handler(data);
    }
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