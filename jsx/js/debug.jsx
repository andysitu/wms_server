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
  createDummyWarehouses = () => {
    console.log(this.getRandomLetters(10));
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