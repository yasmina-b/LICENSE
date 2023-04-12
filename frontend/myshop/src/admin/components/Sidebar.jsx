import "../styles/Sidebar.css";
import AddAttributeValues from "./AddAttributeValue";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import AddProductAttribute from "./AddProductAttribute";
import AddSubcategory from "./AddSubcategory";
import AddVariant from "./AddVariant";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle-first">MENU</h3>
          <ul className="sidebarList">
            <li className="sidebarTitle">USERS & USER ORDERS</li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">CATEGORIES & SUBCATEGORIES</h3>
          <ul className="sidebarList">
            <li>
              <AddCategory />
            </li>
            <li>
              <AddSubcategory />
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">PRODUCTS</h3>
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">LIST OF PRODUCTS</li> */}
            <li>
              <AddProduct />
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">PRODUCT ATTRIBUTE</h3>
          <ul className="sidebarList">
            <li>
              <AddProductAttribute />
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">PRODUCT ATTRIBUTE VALUES</h3>
          <ul className="sidebarList">
            <li>
              <AddAttributeValues />
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">PRODUCT CONFIGURATION</h3>
          <ul className="sidebarList">
            <li>
              <AddVariant />
            </li>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">USER ORDERS</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">LIST OF ORDERS</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
