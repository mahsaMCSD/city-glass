import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { Col, Nav } from "react-bootstrap";

import {
  changeDefaultActiveKey,
  getProfile,
  signout,
} from "../../redux/user/user.actions";

<Head>
  <title>پروفایل</title>
</Head>;
const SideBar = (props) => {
  const user = useSelector((state) => state.user.userInfo);
  const userToken = useSelector((state) => state.user.userToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const [defaultActiveKey, setDefaultActiveKey] = useState(
    props.currentComponent
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = (route) => {
    router.push(`/${route}`);
  };
  useEffect(() => {
    dispatch(getProfile(userToken,refreshToken));
  }, []);
  const logout = () => {
    dispatch(signout());
  };
  return (
    <React.Fragment>
      <Col sm={2}>
        <Nav
          variant="pills"
          className="flex-column user_menu headerdbd_profile bg-light profile-tabs"
        >
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                handleClick("profile");
              }}
              className={`nav_link border-bottom ${
                defaultActiveKey === "profile" ? "active" : null
              }`}
            >
              <div className="user_menu__user">
                <img width="60" src="/image/circle.svg" alt="" />
                <div className="details me-0 w-100">
                  <div id="profile-name">
                    {user !== undefined ? <h3>{user.first_name}</h3> : null}
                  </div>
                </div>
              </div>
              <div className="user_menu__account">
                <div className="user_menu__account__item">
                  <span className="mx-2">
                    {user !== undefined ? user.phone : null}
                  </span>
                </div>
                <div className="user_menu__account__item half-opacity" disabled>
                  <span className="mx-2">باشگاه مشتریان شهرگلس</span>
                </div>
              </div>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                handleClick("carts");
              }}
              className={`nav_link border-bottom ${
                defaultActiveKey === "order" ? "active" : null
              }`}
            >
              <span className="me-2">
                <img width="25" src="/image/order.svg" alt="" />
              </span>
              <span className="font-title-md">پیگیری سفارش های من</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                handleClick("address");
              }}
              className={`nav_link border-bottom ${
                defaultActiveKey === "address" ? "active" : null
              }`}
            >
              <span className="me-2">
                <img width="25" src="/image/location.svg" alt="" />
              </span>
              <span className="font-title-md">آدرس های منتخب</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`nav_link border-bottom half-opacity${
                defaultActiveKey === "message" ? "active" : null
              }`}
              disabled
            >
              <span className="me-2">
                <img width="25" src="/image/email.svg" alt="" />
              </span>
              <span className="font-title-md">پیام ها دریافتی</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => logout()} className="nav_link border-bottom">
              <span className="me-2">
                <img width="25" src="/image/exit.svg" alt="" />
              </span>
              <span className="font-title-md">خروج از حساب کاربری</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </React.Fragment>
  );
};
export default SideBar;
