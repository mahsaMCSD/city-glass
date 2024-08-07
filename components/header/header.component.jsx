import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SearchInput from "../search/search.component";
import DirectoryDropdown from "../dropdown/directory-dropdown/directory-dropdown.component";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import jwtDecode from "jwt-decode";
import { changeDefaultActiveKey, signout } from "../../redux/user/user.actions";
import { useRouter } from "next/router";
import { clearAllFilters } from "../../redux/product/product.action";
import ShoppingCart from "../shopping-cart/shopping-cart.component";
import FilterDirectory from "../filter-directory/filter-directory.component";
const dropdownStyle = {
  right: "100%",
  minWidth: "50rem !important",
  transform: "translateY(-5rem)",
};

const Header = ({ cartItemsCount }) => {
  const userToken = useSelector((state) => state.user.userToken)
  const [sideBarStyle, setSideBarStyle] = useState("menu")
  const [menuStatus, setMenuStatus] = useState("open")
  let user = null;
  if (userToken) {
    user = jwtDecode(userToken).user_claims;
  } else {
    user = null;
  }
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = () => {
    dispatch(signout());
  };
  const transferToProducts = () => {
    dispatch(clearAllFilters())
    window.location = "/products"
  };
  const handleSideClick = () => {
    switch (menuStatus) {
      case "open":
        setMenuStatus("close"),
          setSideBarStyle("menu active")
        break;
      case "close":
        setMenuStatus("open"),
          setSideBarStyle("menu")
        break;
    }
  }
  return (
    <React.Fragment>
      <div className={`${sideBarStyle} d-md-none d-lg-none`}>
        <nav>
          <ul className="navbar-nav me-auto col-md-12 d-flex flex-column">
            <li>
              <SearchInput />
            </li>
            <li>
              <a
                className={`menu-item btn btn-orange w-100 rounded-0`}
              >
                دسته بندی
              </a>
            </li>
            <li>
              <FilterDirectory />
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        {/* DESCKTOP HEADER */}
        <header className="header mb-5 d-none d-sm-block">
          <div className="top-header row">
            <a href="/" className="col-md-3 logo my-4">
              <img className="img-fluid" src="/image/Logo.png" alt="لوگو شهر گلس" />
            </a>
            <div className="col-md-9 d-flex justify-content-end align-items-center">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle className="btn-light" id="dropdown-profile">
                    <img width="30" src="/image/person.svg" alt="" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="headerdbd_profile user_menu bg-light"
                    style={{ minWidth: "22rem" }}
                  >
                    <Dropdown.Item
                      onClick={() => {
                        router.push("/profile");
                      }}
                      className="border-bottom px-0"
                    >
                      <div className="user_menu__user">
                        <img width="60" src="/image/circle.svg" alt="" />
                        <div className="details me-0 w-100">
                          <div id="profile-name">
                            <h3>
                              {user.first_name} {user.lastName}
                            </h3>
                          </div>
                          <div href="/profile" id="profile-footer">
                            <h6> مشاهده حساب کاربری &gt;</h6>
                          </div>
                        </div>
                      </div>
                      <div className="user_menu__account">
                        <div className="user_menu__account__item">
                          <span className="mx-2">{user.phone} </span>
                        </div>
                        <div
                          className="user_menu__account__item  half-opacity"
                          disabled
                        >
                          <span className="mx-2">باشگاه مشتریان شهرگلس</span>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        router.push("/carts");
                      }}
                      eventKey="order"
                      className="border-bottom"
                    >
                      <span className="me-2">
                        <img width="25" src="../image/order.svg" alt="" />
                      </span>
                      <span className="font-title-md">پیگیری سفارش های من</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        dispatch(changeDefaultActiveKey("address")),
                          router.push("/address");
                      }}
                      className="border-bottom"
                    >
                      <span className="me-2">
                        <img width="25" src="../image/location.svg" alt="" />
                      </span>
                      <span className="font-title-md">آدرس های منتخب</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="border-bottom half-opacity"
                      disabled
                    >
                      <span className="me-2">
                        <img width="25" src="../image/email.svg" alt="" />
                      </span>
                      <span className="font-title-md">پیام ها دریافتی</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <span className="me-2">
                        <img width="25" src="../image/exit.svg" alt="" />
                      </span>
                      <span onClick={() => logout()} className="font-title-md">
                        خروج از حساب کاربری
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <a
                  href="/auth"
                  type="button"
                  className="btn btn-outline-secondary w-15 rounded-0 me-2"
                >
                  ورود
                </a>
              )}

              <div className="divider"></div>
              <ShoppingCart cartItemsCount={cartItemsCount} />
            </div>
          </div>
          <div className="main-header">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <div className="w-100">
                  <ul className="navbar-nav me-auto col-md-12 d-flex flex-row">
                    <li className="nav-item col-md-2 me-2">
                      <DirectoryDropdown />
                    </li>
                    <li className="nav-item col-md-2 me-2">
                      <button
                        onClick={transferToProducts}
                        type="button"
                        className="btn btn-pink w-100 rounded-0"
                      >
                        <img
                          src="/image/shopping-cart-wt.svg"
                          width="32"
                          height="19"
                          alt="35"
                        />
                        فروشگاه
                      </button>
                    </li>
                    <li className="nav-item col-md-6 me-2">
                      <SearchInput />
                      <ul className="list-group list-group-horizontal border-less">
                        <li className="list-group-item rounded-0 font-weight-bold">
                          <img
                            src="/image/mini-logo.svg"
                            width="32"
                            height="19"
                            alt="35"
                          />سرویس شهرگلس
                        </li>
                        <li className="list-group-item rounded-0 font-weight-bold">
                          تخفیفات و پیشنهادات
                        </li>
                        <li className="list-group-item rounded-0 font-weight-bold">
                          محصولات جدید
                        </li>
                        <li className="list-group-item rounded-0 clip-path-left font-weight-bold">
                          سوالی دارید؟
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item col-md-2">
                      <a
                        href="/branch"
                        type="button"
                        className="btn btn-secondary w-100 rounded-0"
                      >
                        پنل شعب و همکاران
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div onClick={handleSideClick} className={menuStatus === "close" ? 'close-side-opened' : '' }></div>
        {/* MOBILE HEADER */}
        <header className="row bg-white top-0 d-md-none d-lg-none position-fixed z-index-5 w-100 mb-5 p-0 border-bottom border-bottom-gray">
          <div className="header">
            <div className="mb-header my-3 d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <button onClick={handleSideClick} className="btn">
                  <img src="/image/justify.svg" alt="" />
                </button>

                <button onClick={handleSideClick} className="btn d-flex"><img className="w-50" src="/image/search.svg" alt="" /></button>
              </div>

              <a href="/" className="">
                <img width="100" className="img-fluid" src="/image/Logo.png" alt="لوگو شهر گلس" />
              </a>
              <div className="d-flex justify-content-end align-items-center">
                {user ? (
                  <button className="btn">
                    <img width="30" src="/image/person.svg" alt="" />
                  </button>
                ) : (
                  <a
                    href="/auth"
                    type="button"
                    className="btn btn-outline-secondary w-15 rounded-0 me-2"
                  >
                    ورود
                  </a>
                )}

                <div className="divider"></div>
                <ShoppingCart cartItemsCount={cartItemsCount} />
              </div>


            </div>

          </div>
        </header>


      </div>
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
});
export default connect(mapStateToProps)(Header);
