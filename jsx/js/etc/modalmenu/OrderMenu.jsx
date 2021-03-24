export { OrderMenu }

class OrderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: (this.props.data && this.props.data.id) ? this.props.data.id : 
            Math.floor(Math.random() * Math.floor(100))
    }
  }

  createShipmentRows = () => {
    if (this.props.menu_type == "createShipment" || this.props.menu_type == "editShipment") {
      let editStatus = (this.props.menu_type == "editShipment");
      let tracking, transportCost, pickupDate, arrivalDate;
      if (editStatus) {
        tracking = this.props.data.tracking;
        transportCost = this.props.data.transportcost;
      }
      const id = this.state.id;
      return (
        <div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor={"mm-cost-input-" + id}>Transport Cost</label>
              <input type="number" name="transportCost" id={"mm-cost-input-" + id}
                defaultValue={transportCost}
                step="0.01" min="0" className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor={"mm-cost-tracking-" + id}>Tracking</label>
              <input type="text" name="tracking" id={"mm-cost-tracking-" + id}
                defaultValue={tracking} className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor={"mm-pickup-date-" + id}>Pickup Date</label>
              <input type="date" name="pickupDate" id={"mm-pickup-date-" + id}
              className="form-control" />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor={"mm-arrival-date-" + id}>Arrival Date</label>
              <input type="date" name="arrivalDate" id={"mm-arrival-date-" + id}
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
                        this.props.menu_type == "createShipment" ||
                        this.props.menu_type == "editShipment" ||
                        this.props.menu_type == "editOrder";
    const id = this.state.id;
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
            <label htmlFor={"mm-name-input-" + id}>Order Name</label>
            <input type="text" name="orderName" id={"mm-name-input-" + id}
              defaultValue={orderName}
              className="form-control" required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor={"mm-desc-input-" + id}>Description</label>
            <input type="text" name="description" id={"mm-desc-input-" + id}
              defaultValue={description} className="form-control" required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor={"mm-company-input-" + id}>Company Name</label>
            <input type="text" name="companyName" id={"mm-company-input-" + id}
              defaultValue={companyName} className="form-control" required/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor={"mm-contact-input-" + id}>Contact</label>
            <input type="text" name="contactName" id={"mm-contact-input-" + id}
              defaultValue={contactName} className="form-control" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor={"mm-addr1-input-" + id}>Address 1</label>
          <input type="text" name="address1" id={"mm-addr1-input-" + id}
            defaultValue={address1} className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor={"mm-addr2-input-" + id}>Address 2</label>
          <input type="text" name="address2" id={"mm-addr2-input-" + id}
            defaultValue={address2} className="form-control" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor={"mm-city-input-" + id}>City</label>
            <input type="text" className="form-control" id={"mm-city-input-" + id}
              defaultValue={city} name="city" required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor={"mm-state-input-" + id}>State</label>
            <input type="text" id={"mm-state-input-" + id} className="form-control"
              defaultValue={state} name="state" required />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor={"mm-zip-input-" + id}>Zip</label>
            <input type="text" className="form-control" id={"mm-zip-input-" + id}
              defaultValue={zip} name="zip" required />
          </div>
        </div>
        <div className="form-row"></div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor={"mm-phone-input-" + id}>Phone</label>
            <input type="text" name="phone" id={"mm-phone-input-" + id}
              defaultValue={phone} className="form-control" required/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor={"mm-email-input-" + id}>Email</label>
            <input type="text" name="email" id={"mm-email-input-" + id}
              defaultValue={email} className="form-control" required/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor={"mm-transport-input-" + id}>Transport Name</label>
            <input type="text" name="transportName" id={"mm-transport-input-" + id}
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