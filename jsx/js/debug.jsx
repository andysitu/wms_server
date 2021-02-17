const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMSET = "0123456789";

class DebugApp extends React.Component {
  getRandomLetters(length) {
    let s = ""
    for(let  i=0; i< length; i++) {
      s += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return s;
  }
  getRandomInt(length) {
    let s = ""
    for(let  i=0; i< length; i++) {
      s += NUMSET.charAt(Math.floor(Math.random() * NUMSET.length));
    }
    return parseInt(s);
  }
  showSuccess = () => {
    window.alert("done");
  }
  createDummyWarehouses = () => {
    let data = {
      name: this.getRandomLetters(10),
      description: this.getRandomLetters(10),
      address1: this.getRandomLetters(10),
      address2: this.getRandomLetters(10),
      city: this.getRandomLetters(6),
      state: this.getRandomLetters(2),
      zip: String(this.getRandomInt(6)),
      phone: String(this.getRandomInt(9)),
      code: this.getRandomLetters(5),
    };
    $.ajax({
      url: "./warehouses",
      type: "POST",
      // context: this,
      contentType: "application/json;",
      data: JSON.stringify(data),
      context: this,
      success: function(warehouse) {
        console.log(warehouse);
        this.showSuccess();
      },
    });
  };

  render() {
    return (<div>
      <button type="button"
        onClick={this.createDummyWarehouses}>Create Warehouses</button>
    </div>)
  }
}

(function loadReact() {
  ReactDOM.render((<DebugApp />), document.getElementById("content-container"));
})();