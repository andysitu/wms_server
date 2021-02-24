export { OrderMenu }

class OrderMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  createItemOrder() {
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-name-input">Order Name</label>
            <input type="text" name="orderName" id="mm-name-input" 
              className="form-control" required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-desc-input">Description</label>
            <input type="text" name="description" id="mm-desc-input" 
              className="form-control" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-company-input">Company Name</label>
            <input type="text" name="companyName" id="mm-company-input" 
              className="form-control" required/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-contact-input">Contact</label>
            <input type="text" name="contactName" id="mm-contact-input" 
              className="form-control" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr1-input">Address 1</label>
          <input type="text" name="address1" id="mm-addr1-input" 
            className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr2-input">Address 2</label>
          <input type="text" name="address2" id="mm-addr2-input" 
            className="form-control" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-city-input">City</label>
            <input type="text" className="form-control" id="mm-input-city" 
              name="city" required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-state-input">State</label>
            <input type="text" id="mm-state-input" className="form-control" 
              name="state" required />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="mm-zip-input">Zip</label>
            <input type="text" className="form-control" id="mm-zip-input"
              name="zip" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-phone-input">Phone</label>
            <input type="text" name="phone" id="mm-phone-input" 
              className="form-control" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-transport-input">Transport Name</label>
            <input type="text" name="transportName" id="mm-transport-input" 
              className="form-control" required />
          </div>
        </div>
      </div>);
  }

  render() {
    return(
    <div>
      {this.createItemOrder()}
    </div>)
  }
}