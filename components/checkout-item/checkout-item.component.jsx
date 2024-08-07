import React from "react";
import { connect } from "react-redux";
import API_URL from "../../configurations/environment";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name,_id, cover, price, quantity } = cartItem;
  return (
    <div className="card bg-light border-light">
      <div className="row no-gutters">
        <div className="col-md-4 col-5">
          <img
            className="card-img p-4 w-75 mb-width-100"
            src={
              `${API_URL}/products/${_id}/cover?type=thumb`
            }
            alt=""
          />
        </div>
        <div className="col-md-8 col-7">
          <div className="card-body d-flex flex-column h-100">
            <h5 className="">{name}</h5>
            <p className="card-text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              مورد استفاده قرار گیرد.
            </p>
            <div className="row mt-auto">
              <div className="col-md-9">
                <div className="btn-toolbar align-items-center">
                  <div
                    className="btn-group-vertical me-1"
                    role="group"
                    aria-label="Counter group"
                  >
                    <button
                      type="button"
                      className="btn btn-pink mb-1"
                      onClick={() => addItem(cartItem)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-pink"
                      disabled={quantity <= 1 ? true : false}
                      onClick={() => removeItem(cartItem)}
                    >
                      -
                    </button>
                  </div>
                  <div
                    className="btn-group btn-group-lg me-2 w-15"
                    style={{ height: "5rem" }}
                    role="group"
                    aria-label="Counter show group"
                  >
                    <button type="button" className="btn btn-pink">
                      <h3 className="mb-0">{quantity}</h3>
                    </button>
                  </div>
                  <span>
                    <img src="/image/delete.svg" alt="" />
                  </span>
                  <span
                    className="text-secondary cursor-pointer"
                    onClick={() => clearItem(cartItem)}
                  >
                    حذف محصول از سبد خرید
                  </span>
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center">
                <span>{price}</span>
                <span className="text-secondary">تومان</span>
              </div>
            </div>
          </div>
        </div>
        <div className="devider-border w-90 m-auto"></div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
