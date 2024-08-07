import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList } from "../../services/orderService";
import moment from "jalali-moment";
import Pagination from "../../components/common/pagination";
import { Row, Col } from "react-bootstrap";
import { getProfile } from "../../redux/user/user.actions";
import SideBar from "../../components/sideBar/sideBar.component";
import Link from "next/link";
import AlertMessage from "../../components/alert/alert.component";
import Metadata from "../../components/seo/metadata";
import { paginate } from './../../configurations/utils/paginate';
const Carts = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);

  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {

    dispatch(getProfile(userToken, refreshToken));

  }, []);
  let urlSearchParams="";
  let bankStatus="";
  useEffect(() => {
    fetchOrderList(userToken, refreshToken).then((orderList) => {
      setOrderList(orderList);
    });
    urlSearchParams = new URLSearchParams(window.location.search);
    bankStatus=urlSearchParams.get("status");
  }, []);
  const norderList = paginate(orderList, currentPage, pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  let totalCount = orderList&&orderList.length;


  return (
    <React.Fragment>
      <Metadata title="شهرگلس - سفارشات من" />;
      <div className="container mx-auto">
        {/* ORDER DETAIL */}
        <Row className="mb-5">
          <SideBar currentComponent={"order"} />
          <Col sm={8}>
            <AlertMessage
              colorAlert={
                bankStatus === "failed"
                  ? "danger"
                  : bankStatus === "succeeded"
                  ? "success"
                  : null
              }
              contentAlert={
                bankStatus === "failed"
                  ? "عملیات پرداخت موفقیت آمیز نبود در صورت کسر وجه تا 24 ساعت از طریق بانک برگشت وجه انجام خواهد پذیرفت"
                  : bankStatus === "succeeded"
                  ? "عملیات پرداخت موفقیت آمیز بود"
                  : null
              }
            />

            <div className="d-flex align-items-center justify-content-center mb-3">
              <img width="25" src="../image/order.svg" alt="" />
              <h5 className="card-title mt-2">سفارشات</h5>
            </div>
            <table className="table table-hover text-center">
              <thead>
                <tr className="table-secondary">
                  <th className="p-4" scope="col">
                    <h5>ردیف</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>شماره سفارش</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>تاریخ سفارش</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>مبلغ تراکنش (تومان)</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>وضعیت سفارش</h5>
                  </th>
                  <th className="p-4" scope="col">
                    <h5>جزییات</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {norderList.map((order, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="p-4" scope="row">
                        {currentPage * pageSize + Number(idx + 1) - 10}
                      </td>
                      <td className="p-4" scope="row">
                        {order.order_id}
                      </td>
                      <td className="p-4">
                        {moment(order.created_at, "YYYY/MM/DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                      </td>
                      <td className="p-4" scope="row">
                        {numberWithCommas(order.total_price)}
                      </td>
                      <td className="p-4" scope="row">
                        {order.status}
                      </td>
                      <td className="p-4 cursor-pointer" scope="row">
                        <Link href={"/carts/" + order._id}>
                          <img src="/image/iconmonstr-eye-thin.svg" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
export default Carts;
