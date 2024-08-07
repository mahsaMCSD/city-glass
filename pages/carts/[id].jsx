import React, { useEffect } from "react";
import moment from "jalali-moment";
import { Row, Col } from "react-bootstrap";
import Head from "next/head";
import SideBar from "../../components/sideBar/sideBar.component";
import { useSelector, useDispatch } from "react-redux";
import { cartDetail } from "../../redux/order/order.action";
import API_URL from "../../configurations/environment";
import Metadata from "../../components/seo/metadata";
const OrderDetail = () => {
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order.orderDetail);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };
  let orderStatus = "";
  useEffect(() => {
    dispatch(cartDetail());
  }, []);
  return (
    <React.Fragment>
      <Metadata title="شهرگلس - جزییات سفارش" />;
      <div className="container mx-auto">
        {/* ORDER DETAIL */}
        <Row className="mb-5">
          <SideBar currentComponent={"order"} />

          <Col sm={8}>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <img width="25" src="../image/order.svg" alt="" />
              <h5 className="card-title mb-4"> جزییات سفارشات</h5>
            </div>
            <div className="row">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="p-4">
                      کد سفارش: {orderDetail ? orderDetail.order_id : null}
                    </td>
                    <td className="p-4">
                      تحویل گیرنده:{" "}
                      {orderDetail && orderDetail.shipping_address !== undefined
                        ? orderDetail.shipping_address.receiver
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      مبلغ کل: {orderDetail ? orderDetail.total_price : null}{" "}
                      تومان. تخفیف:
                      {orderDetail ? orderDetail.discount_amount : null} تومان
                    </td>
                    <td className="p-4">
                      شماره تماس:{" "}
                      {orderDetail && orderDetail.shipping_address !== undefined
                        ? orderDetail.shipping_address.receiver_phone
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      تاریخ ثبت سفارش:{" "}
                      {orderDetail !== undefined
                        ? moment(orderDetail.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")
                        : ""}
                    </td>
                    <td className="p-4">روش ارسال:</td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      روش پرداخت:{" "}
                      {orderDetail && orderDetail
                        ? orderDetail.payment_type
                        : null}
                    </td>
                    <td className="p-4">تاریخ ارسال: </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      وضعیت سفارش: {orderStatus ? orderStatus : null}
                    </td>
                    <td className="p-4">
                      آدرس ارسال:{" "}
                      {orderDetail && orderDetail.shipping_address !== undefined
                        ? orderDetail.shipping_address.postal_address
                        : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3">
              <img width="25" src="../image/order.svg" alt="" />
              <h5 className="card-title my-4"> اقلام سفارش</h5>
            </div>
            <table className="table table-hover text-center">
              <thead>
                <tr className="table-secondary">
                  <th className="p-4" scope="col">
                    <h5>عکس</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>نام</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>تعداد</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>قیمت (تومان)</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>تخفیف (تومان)</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>مجموع</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetail &&
                  orderDetail.orders.map((order, idx) => {
                    return (
                      <tr key={idx}>
                        <td scope="row">
                          {order.cover_thumb ? (
                            order.cover_thumb
                          ) : (
                            <img
                              width="auto"
                              height="100"
                              src={`${API_URL}/products/${order.product._id}/cover?type=thumb`}
                            />
                          )}
                        </td>
                        <td className="p-4 align-middle" scope="row">
                          {order.product.name}
                        </td>

                        <td className="p-4 align-middle" scope="row">
                          {order.quantity}
                        </td>
                        <td className="p-4 align-middle" scope="row">
                          {numberWithCommas(order.price)}
                        </td>
                        <td className="p-4 align-middle" scope="row">
                          {order.discount_amount}
                        </td>
                        <td className="p-4 align-middle" scope="row">
                          {numberWithCommas(order.quantity * order.price)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Col>
          <Col sm={2} className="h-100 overflow-hidden">
            <img
              style={{ width: "100%" }}
              className="img-fluid"
              src="/image/shahrglass-order-banner.svg"
              alt=""
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default OrderDetail;
