export { OrderMenu }

class OrderMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  createShipmentRows = () => {
    if (this.props.menu_type == "createShipment") {
      return (
        <div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="mm-cost-input">Transport Cost</label>
              <input type="number" name="transportCost" id="mm-cost-input"
                step="0.01" min="0" className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="mm-tracking">Tracking</label>
              <input type="text" name="tracking" id="mm-tracking"
              className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="mm-pickup-date">Pickup Date</label>
              <input type="date" name="pickupDate" id="mm-pickup-date"
              className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="mm-arrival-date">Arrival Date</label>
              <input type="date" name="arrivalDate" id="mm-arrival-date"
              className="form-control" />
            </div>
          </div>
        </div>
      );
    }
    return null;    
  }

  // Item order 
  CreateReceiverMenu() {
    const shipStatus = this.props.menu_type == "shipOrder" ||
                        this.props.menu_type == "createShipment";
    const orderName = shipStatus ? this.props.data.orderName : "",
          description = shipStatus ? this.props.data.description : "",
          address1 = shipStatus ? this.props.data.address1 : "",
          address2 = shipStatus ? this.props.data.address2 : "",
          city = shipStatus ? this.props.data.city : "",
          state = shipStatus ? this.props.data.state : "",
          zip = shipStatus ? this.props.data.zip : "",
          contactName = shipStatus ? this.props.data.contactName : "",
          phone = shipStatus ? this.props.data.phone : "",
          email = shipStatus ? this.props.data.email : "",
          companyName = shipStatus ? this.props.data.companyName : "",
          transportName = shipStatus ? this.props.data.transportName : "";
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-name-input">Order Name</label>
            <input type="text" name="orderName" id="mm-name-input" 
              defaultValue={orderName}
              className="form-control" required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-desc-input">Description</label>
            <input type="text" name="description" id="mm-desc-input" 
              defaultValue={description} className="form-control" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-company-input">Company Name</label>
            <input type="text" name="companyName" id="mm-company-input" 
              defaultValue={companyName} className="form-control" required/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-contact-input">Contact</label>
            <input type="text" name="contactName" id="mm-contact-input" 
              defaultValue={contactName} className="form-control" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr1-input">Address 1</label>
          <input type="text" name="address1" id="mm-addr1-input"
            defaultValue={address1} className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr2-input">Address 2</label>
          <input type="text" name="address2" id="mm-addr2-input" 
            defaultValue={address2} className="form-control" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-city-input">City</label>
            <input type="text" className="form-control" id="mm-input-city" 
              defaultValue={city} name="city" required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-state-input">State</label>
            <input type="text" id="mm-state-input" className="form-control"
              defaultValue={state} name="state" required />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="mm-zip-input">Zip</label>
            <input type="text" className="form-control" id="mm-zip-input"
              defaultValue={zip} name="zip" required />
          </div>
        </div>
        <div className="form-row"></div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="mm-phone-input">Phone</label>
            <input type="text" name="phone" id="mm-phone-input" 
              defaultValue={phone} className="form-control" required/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-phone-input">Email</label>
            <input type="text" name="email" id="mm-email-input" 
              defaultValue={email} className="form-control" required/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-transport-input">Transport Name</label>
            <input type="text" name="transportName" id="mm-transport-input" 
              defaultValue={transportName} className="form-control" />
          </div>
        </div>
        {this.createShipmentRows()}
      </div>);
  }

  render() {
    return(
    <div>
      {this.CreateReceiverMenu()}
    </div>)
  }
}