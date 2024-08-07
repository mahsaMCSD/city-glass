import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { createOrder } from "../../redux/order/order.action";
import { changeDefaultActiveKey } from "../../redux/user/user.actions";
import API_URL from "../../configurations/environment";
import Metadata from "../../components/seo/metadata";
const CheckoutPage = ({ cartItems, total, token }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const userToken = useSelector((state) => state.user.userToken);
  let shippingAddressLength = "";
  shippingAddress !== null && shippingAddress !== undefined
    ? (shippingAddressLength = Object.keys(shippingAddress).length)
    : null;
  const tAddress = shippingAddress.filter((address) => {
    return address.is_default == true;
  });

  const orderCreate = useSelector((state) => state.order);
  const { success, order } = orderCreate;
  const dispatch = useDispatch();
  const router = useRouter();
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({ ...cartItems, orderItems: cartItems }));
  };
  useEffect(() => {
    if (success) {
      router.push(`${API_URL}/payments?token=${order.token}`);
    }
  }, [dispatch, order, router, success]);

  return (
    <React.Fragment>
      <Metadata title="شهرگلس - سبد خرید" />
      <div className="container mx-auto mb-mt-7" style={{ maxWidth: "100rem" }}>
        {/* ORDER DETAIL */}
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((cartItem, id) => (
              <CheckoutItem key={id} cartItem={cartItem} />
            ))}
          </div>

          <div className="col-md-4">
            <div className="card bg-light border-light">
              <div className="card-body">
                <form>
                  <div className="form-group row">
                    <label htmlFor="price" className="col-md-9 col-form-label">
                      قیمت کالاها
                    </label>
                    <label htmlFor="price" className="col-md-3 col-form-label">
                      <span>{total}</span>
                      <span className="text-secondary">تومان</span>
                    </label>
                  </div>

                  <div className="devider-border w-90 m-auto my-3"></div>
                  <div className="form-group row">
                    <label
                      htmlFor="totalPrice"
                      className="col-md-8 col-form-label"
                    >
                      <h5>جمع سفارش شما</h5>
                    </label>

                    <label htmlFor="price" className="col-md-4 col-form-label">
                      <button
                        type="button"
                        className="btn btn-orange w-100 rounded-0"
                      >
                        {total} تومان
                      </button>
                    </label>
                  </div>
                  <div className="devider-border w-90 m-auto my-3"></div>
                  <div className="form-group text-right">
                    <label
                      htmlFor="totalPrice"
                      className="col-md-8 col-form-label"
                    >
                      <h5 className="fw-normal">آدرس تحویل سفارش</h5>
                    </label>
                    {shippingAddressLength > 0 && userToken ? (
                      <>
                        <textarea
                          className="bg-white border-light col-md-11 m-2 text-right"
                          rows="4"
                          value={`${tAddress[0].province} - ${tAddress[0].city} - ${tAddress[0].district} - ${tAddress[0].postal_address}`}
                          readOnly
                        ></textarea>
                        <p
                          onClick={() => {
                            dispatch(changeDefaultActiveKey("address"));
                            router.push("/address");
                          }}
                          className="text-secondary float-left cursor-pointer"
                        >
                          <img width="16" src="/image/edit.svg" alt="" /> تغییر
                          یا ویرایش آدرس
                        </p>
                      </>
                    ) : (
                      <div className="card mb-4 border-less">
                        <div className="card-body m-auto d-flex">
                          <a
                            onClick={
                              userToken
                                ? () => {
                                    dispatch(changeDefaultActiveKey("address")),
                                      router.push("/address");
                                  }
                                : () => router.push("/auth")
                            }
                            className="cursor-pointer text-decoration-none text-center text-muted"
                          >
                            <img src="/image/pin.png" />

                            <p>افزودن آدرس</p>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <a
                    className="text-decoration-none"
                    href={token === null ? "/auth" : "/checkout"}
                  >
                    <button
                      type="button"
                      className="btn btn-pink nav-link w-100 rounded-0"
                      onClick={placeOrderHandler}
                    >
                      ادامه فرآیند خرید
                    </button>
                  </a>
                  <p className="text-secondary mt-2">
                    شما می‌توانید فاکتور خرید را پس از تحویل سفارش از بخش جزییات
                    سفارش در حساب کاربری خود دریافت کنید
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
