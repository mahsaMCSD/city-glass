import React from "react";
import ShoppingCart from "../shopping-cart/shopping-cart.component";
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
const FooterStatic = ({cartItemsCount}) => {
  return (
    <footer className="container-fluid bg-white d-md-none d-lg-none position-fixed z-index-5 p-0 border-top border-top-gray bottom-0">
      <div className="static-footer w-90 mx-auto mt-2">
        <div className="mb-footer d-flex justify-content-around align-items-center">
          <a href="/products" className="d-grid text-decoration-none">
            <img className="m-auto" width="30" src="/image/store-icon.svg" alt="" />
            <span>فروشگاه</span>
          </a>
          <div className="d-grid">
            <img className="m-auto" width="30" src="/image/filter-icon.svg" alt="" />
            <span>فیلترها</span>
          </div>
          <div className="d-grid">
            <ShoppingCart cartItemsCount={cartItemsCount} />
            <span>سبد خرید</span>

          </div>
          <a href="/profile" className="d-grid text-decoration-none">
        
            <img className="m-auto" width="30" src="/image/person.svg" alt="" />
            <span>حساب کارب..</span>
          </a>

        </div>

      </div>
    </footer>
  )
};
const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
});
export default connect(mapStateToProps)(FooterStatic);

