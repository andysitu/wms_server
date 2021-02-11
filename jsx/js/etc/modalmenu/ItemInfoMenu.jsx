export { ItemInfoMenu }

/**
 * Needs in props: 
 *  menu_type, 
 *  data [itemName, description, weight, width, height, length, itemCategoryId],
 *  categories
 */
class ItemInfoMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      data: {},
    }
    this.get_itemCategories();
  }

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

  onChange_itemCategory = (e) => {
    this.setState(prev_state => {
      this.state.data.itemCategoryId = e.target.value;
      return {data: this.state.data};
      });
  }

  render() {
    var edit_status = this.props.menu_type == "edit_item_info";
    var item_name   = edit_status ? this.props.data.itemName : "",
        description = edit_status ? this.props.data.description : "",
        weight      = edit_status ? this.props.data.weight : "",
        width       = edit_status ? this.props.data.width : "",
        height      = edit_status ? this.props.data.height : "",
        length      = edit_status ? this.props.data.length : "",
        itemCategoryId    = this.props.data.itemCategoryId;
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
              defaultValue={width} placeholder="Width" step="0.1" min="0.1"/>
          </div>
          <div className="col-4">
            <input type="number" name="length" className="form-control" 
              defaultValue={length} placeholder="Length" step="0.1" min="0.1"/>
          </div>
          <div className="col-4">
            <input type="number" name="height" className="form-control" 
              defaultValue={height} placeholder="Height" step="0.1" min="0.1"/>
          </div>
        </div>
      </div>
    </div>);
  }
}