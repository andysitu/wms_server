class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
  }

  show_menu = () => {
    this.modalMenu.current.show_menu("create_location", (data)=> {
      console.log(data);
      $.ajax({
        type: "POST",
        url: "./locations",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(responseData) {
          console.log(responseData);
        }
      });
      // const xhr = new XMLHttpRequest();

      // xhr.open('POST', '/locations')
      // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xhr.addEventListener('load', function(e){
      //   // const taskdata = JSON.parse(this.responseText);
      //   // taskcharts.graph(graph_type, taskdata);
      //   console.log(his.responseText);
      // });
      // xhr.send(JSON.stringify(data));
    });
  };

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