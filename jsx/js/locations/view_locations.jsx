class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
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

  get_locations() {
    $.ajax({
      type: "GET",
      url: "./locations",
      success: function(data) {
        console.log(data);
      }
    });
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

function loadReact() {
  ReactDOM.render((
    <div>
      <LocationTable />
    </div>
  ), document.getElementById("content-container"));
}

loadReact();