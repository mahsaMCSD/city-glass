import Head from "next/head";
import Link from "next/link";
import CarouselMain from "../components/carousel/carousel-main/carousel-main.component";
import MainSlogan from "../components/slogan/main-slogan.component";
import VerticalCarouselSwipper from "../components/carousel/vertical-carousel/directory-vertical-carousel/vertical-carousel-swiper.component";
import { Tab, Nav } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import SearchInput from "../components/search/search.component";
import Directory from "../components/directory/directory.component";
import VideoCaption from "../components/video/video.component";
import VideoItem from "../components/video/video-item.component";
import CarouselProductDirectory from "../components/carousel/carousel-product-directory/carousel-product-directory.component";
import SocialMediaDirectory from "../components/social-media/social-media-directory.component";
import BlogDirectory from "../components/blog/blog-directory.component";
import Metadata from "../components/seo/metadata";
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from "../redux/cart/cart.selectors";
import { connect } from "react-redux";
import ShoppingCart from "../components/shopping-cart/shopping-cart.component";
const containerWidthStyle = { maxWidth: "100rem" };
const tabHeightStyle = { height: "35rem" };
const height40 = { height: "40rem" };
const Home = ({ cartItemsCount }) => (
  <div>
    <Metadata
      title="فروشگاه شهرگلس - خرید محافظ صفحه نمایش گوشی تبلت و ساعت"
    />
    <link rel="icon" href="/favicon.ico" />
    <main>
      <div className="container mx-auto mb-padding-8" style={containerWidthStyle}>
        <CarouselMain />
        <MainSlogan />
      </div>
      {/* GAMIFICATION */}
      <div className="container-fluid p-5 bg-light gamification hidden">
        <div className="container px-5">
          <h5 className="fw-normal mb-5 main-title">
            {" "}
            با کلیک بر روی دستگاه منتخب خود به فروشگاه تخصصی محصولات دستگاه خود
            بروید ...
          </h5>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="row">
              <div className="col-md-2 col-sm-3 col-xs-3">
                <VerticalCarouselSwipper />
              </div>
              <div className="col-md-10 col-sm-9">
                <div className="row">
                  <div className="col-md-6">
                    <Tab.Content style={tabHeightStyle}>
                      <Tab.Pane eventKey="first">
                        <img width="380" src="/image/apple-watch.png" alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <img
                          className="img-fluid"
                          width="180"
                          src="/image/iphone.svg"
                          alt=""
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <img
                          className="img-fluid"
                          width="380"
                          src="/image/ipad.svg"
                          alt=""
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-2 d-flex">
                        <ul className="circle-big nav nav-pills">
                          <li className="circle one">
                            <a
                              className="active"
                              data-toggle="pill"
                              href="#el1"
                            ></a>
                          </li>
                          <li className="circle two">
                            <a data-toggle="pill" href="#el2"></a>
                          </li>
                          <li className="circle three">
                            <a data-toggle="pill" href="#el3"></a>
                          </li>
                          <li className="circle four">
                            <a data-toggle="pill" href="#el4"></a>
                          </li>
                          <li className="circle five">
                            <a data-toggle="pill" href="#el5"></a>
                          </li>
                          <li className="circle six">
                            <a data-toggle="pill" href="#el6"></a>
                          </li>
                          <li className="circle seven">
                            <a data-toggle="pill" href="#el7"></a>
                          </li>
                        </ul>
                      </div>

                      <div className="col-md-10 pt">
                        <div className="tab-content">
                          <div
                            id="el1"
                            className="tab-pane fade in active show"
                          >
                            <h3 className="font-weight-bold">
                              مقاوم در برار خط و خش
                            </h3>
                            <p>
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna aliquyam erat, sed diam
                              voluptua. At vero eos
                            </p>
                          </div>
                          <div id="el2" className="tab-pane fade">
                            <h3>Menu 1</h3>
                            <p>Some content in menu 1.</p>
                          </div>
                          <div id="el3" className="tab-pane fade">
                            <h3>Menu 2</h3>
                            <p>Some content in menu 2.</p>
                          </div>
                          <div id="el4" className="tab-pane fade">
                            <h3>Menu 2</h3>
                            <p>Some content in menu 2.</p>
                          </div>
                          <div id="el5" className="tab-pane fade">
                            <h3>Menu 2</h3>
                            <p>Some content in menu 2.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* SELECT DEVICE */}
              <div className="col-md-8 mt-5 mr-20">
                <div className="border-devider-horizental border-width-100 mb-3">
                  <span className="px-3 position-relative right-5rem bg-light">
                    نوع دستگاه خودرا انتخاب کنید
                  </span>
                </div>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="first"
                      className="btn btn-lg bg-less-dark rounded-0 active text-white"
                    >
                      WATCH
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="second"
                      className="btn btn-lg rounded-0 bg-less-dark text-white"
                    >
                      IPHONE
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="third"
                      className="btn btn-lg rounded-0 bg-less-dark text-white"
                    >
                      TABLET
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <form className="d-flex">
                      <input
                        className="form-control rounded-0 border-0 bg-less-dark text-white w-60"
                        type="text"
                        placeholder="مدل دستگاه شما"
                        aria-label="NewsLetter"
                      />
                      <button
                        className="btn bg-less-dark border-o btn-lg text-white w-100"
                        type="submit"
                      >
                        APPLE IPHONE 12PRO
                      </button>
                    </form>
                  </Nav.Item>
                </Nav>

                <p className="text-left">آیا دستگاه دیگری را مد نظر دارید؟</p>
              </div>
            </div>
          </Tab.Container>
        </div>
      </div>
      <div className="container mt-5">
        {/* SEARCH */}
        <nav className="navbar navbar-expand-lg">
          <ul className="navbar-nav me-auto col-md-12 d-flex flex-row">
            <li className="nav-item col-md-4 col-6 me-2">
              <button
                type="button"
                className="btn btn-orange text-dark btn-lg nav-link w-100 rounded-0"
              >
                فروشگاهی به وسعت یک شهر
              </button>
            </li>
            <li className="nav-item col-md-7 col-6 me-2">
              <SearchInput />
            </li>
            <li className="nav-item col-md-1 d-none d-sm-block">
              <ShoppingCart cartItemsCount={cartItemsCount} />

            </li>
          </ul>
        </nav>

        <div className="d-flex">
          {/* BANNER */}
          <div className="col-md-4 me-2 d-none d-sm-block">
            <img
              className="img-fluid"
              src="/image/shahrglass glass.png"
              alt=""
            />
          </div>
          {/* DIRECTORY PART */}
          <div className="col-md-8 col-xs-12">
            <div className="row">
              <Directory />
              <div className="col-md-12">
                <VideoCaption />
              </div>
            </div>
          </div>
        </div>
        {/* VIDEO */}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <VideoItem embedId={"oqO5g"} padding={"45"} />
            </div>
            <div className="col-md-6">
              <VideoItem embedId={"B5LCV"} padding={"45"} />
            </div>
          </div>
        </div>
        <Link href="/products">
          <button
            type="button"
            className="btn btn-pink w-15 rounded-0 m-5 me-0 mb-width-200"
          >
            <img
              src="/image/shopping-cart-wt.svg"
              width="32"
              height="19"
              alt="35"
            />
            فروشگاه
          </button>
        </Link>
        {/* SHOP PRODUCT CAROUSEL */}
        <CarouselProductDirectory />
      </div>
      {/* SOCIAL MEDIA */}
      <div className="container-fluid p-0 bg-light">
        <div className="container p-5">
          <div className="row m-0">
            <div className="col-md-6">
              <div className="row">
                <SocialMediaDirectory />
              </div>
            </div>
            <div className="col-md-6">
              <div className="content-box p-5">
                <h1 className="display-6 mb-4 fw-normal color-orange">
                  برای خبرهای جذاب ما رادر صفحات مجازی دنبال کنید
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos
                </p>

                <ul className="list-group list-group-horizontal border-less float-left">
                  <a
                    target="_blank"
                    href="https://www.aparat.com/shahr.glass"
                    className="p-1"
                  >
                    <img width="30" src="/image/youtube.svg" alt="" />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/shahr.glass/"
                    className="p-1"
                  >
                    <img width="30" src="/image/instagram.svg" alt="" />
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SERVICES */}
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="context-box mt-20 mb-margin-0">
              <h1 className="display-6 mb-4 fw-normal mb-margin-0">خدمات شهر گلس</h1>

              <ul className="list-group border-less mb-5 mb-margin-bottom-0">
                <li className="list-group-item d-flex justify-content-start align-items-center px-0 mb-3">
                  <img
                    width="25"
                    className="me-5"
                    src="/image/check-round.svg"
                    alt=""
                  />
                  <span className="text-right">بیمه ی شهر گلس</span>
                </li>
                <li className="list-group-item d-flex justify-content-start align-items-center px-0 mb-3">
                  <img
                    width="25"
                    className="me-5"
                    src="/image/check-round.svg"
                    alt=""
                  />
                  <span className="text-right">گارنتی مدت دار</span>
                </li>
                <li className="list-group-item d-flex justify-content-start align-items-center px-0">
                  <img
                    width="25"
                    className="me-5"
                    src="/image/check-round.svg"
                    alt=""
                  />
                  <span className="text-right">نصب در محل</span>
                </li>
              </ul>

            </div>
          </div>
          <div className="col-md-9 d-none d-sm-block">
            {/* SERVICE CAROUSEl */}
            <Carousel controls={false}>
              <Carousel.Item style={height40}>
                <img
                  className="position-relative top-2rem z-index-3 right-20rem"
                  width="150"
                  src="/image/iphone.svg"
                  alt=""
                />
                <img
                  className="position-absolute bottom-0 mb-botton-3 z-index-5 right-30rem"
                  width="100"
                  src="/image/apple-watch.svg"
                  alt=""
                />
                <img
                  className="position-absolute left-5rem z-index-1 mb-width-400"
                  width="500"
                  src="/image/ipad.svg"
                  alt=""
                />
              </Carousel.Item>
              {/* <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <img
                    className=""
                    width="500"
                    src="/image/delivery.svg"
                    alt=""
                  />
                </div>
              </Carousel.Item>
           */}
            </Carousel>
          </div>
        </div>
        {/* NEWEST PRODUCTS */}
        <div className="content-box p-5">
          <div className="box-title p-0">
            <h1 className="display-6 mb-2 fw-normal">مقالات جدید</h1>
          </div>
          <p className="font-weight-light">به همراه آموزش نصب</p>

          <div className="row">
            <BlogDirectory />
          </div>
        </div>
      </div>
    </main>
  </div>
);
const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount,
});
export default connect(mapStateToProps)(Home);
