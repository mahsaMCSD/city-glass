import Link from "next/link";
import React from "react";
import styles from "./footer.module.scss";
const Footer = () => (
  <footer>
    {/* FOOTER */}
    <div className="container-fluid p-0">
      {/* TOP FOOTER */}
      <div className={styles.map}>
        <div className="container" style={{ height: "inherit" }}>
          <div
            className="content-box p-5 d-flex align-items-center justify-content-center mx-5"
            style={{ height: "inherit" }}
          >
            <h4 className="right-10rem me-2 fw-normal">
              آدرس فروشگاه شهر گلس به وسعت یک شهر{" "}
            </h4>
            <a target="_blank" href="https://goo.gl/maps/ASWnZXfBXVmpyCEA6" type="button" className="btn btn-orange rounded-0">
              مسیریابی
            </a>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className={`${styles.footer_main} bg-dark text-white`}>
        <div className="container">
          <div className="row p-5">
            <div className="col-md-7">
              <h3 className="mb-3 fw-normal">
                بیا تا باهم در تبادل اطلاعات آخرین اخبار و محصولات باشیم
              </h3>
              <h5 className="mx-5 fw-normal">
                اخبار و محصولات جدید شهر گلس مستقیم به ایمیلت ارسال میشه
              </h5>
              <form className="d-flex p-3 px-0 pb-0">
                <input
                  className="form-control rounded-0 bg-dark text-white w-75"
                  type="text"
                  placeholder="ایمیل خود را وارد نمایید"
                  aria-label="NewsLetter"
                />
                <button className="btn btn-outline-light btn-lg" type="submit">
                  اشتراک خبرنامه
                </button>
              </form>
              <h6 className="fw-normal mb-4 mt-2">
                حریم خصوصی شما همیشه طبق قوانین گوگل حفظ میشود
              </h6>
              <ul
                className={`${styles.footer_list} list-group list-group-horizontal border-less ${styles.menu_footer_list}`}
              >

                <a className="text-decoration-none" href="/about"><li className="list-group-item p-0 px-2">درباره ما</li></a>

                <Link               
                  href={{
                    pathname: '/contact',
                    query:{dep:'امور مشتریان'}
                  }}
                >
                  <li className="list-group-item p-0 px-2 cursor-pointer">
                    ارتباط امور مشتریان
                  </li>
                </Link>
                <Link
                  href={{
                    pathname: '/contact',
                    query:{dep:'فروشگاه'}
                  }}
                >
                  <li className="list-group-item p-0 px-2 cursor-pointer">
                  ارتباط با واحد فروشگاه
                  </li>
                </Link>
                <Link
                  href={{
                    pathname: '/contact',
                    query:{dep:'انتقادات و پیشنهادات'}
                  }}
                >
                  <li className="list-group-item p-0 px-2 cursor-pointer">
                  انتقادات و پیشنهادات
                  </li>
                </Link>
               
                <a className="text-decoration-none" href="/products"><li className="list-group-item p-0 px-2">فروشگاه شهر گلس</li></a>
                <a className="text-decoration-none" href="https://blog.shahr-glass.ir/"><li className="list-group-item p-0 px-2">وبلاگ</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item p-0 px-2">تماس با ما</li></a>
              </ul>
            </div>
            <div className="col-md-2 d-none d-sm-block">
              <h3 className="mb-2 fw-normal">خدمات ما</h3>
              <ul
                className={`${styles.footer_list} list-group border-less bg-dark footer-list`}
              >
                <a className="text-decoration-none" href="/about"><li className="list-group-item px-0">درباره ما</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item px-0">ارتباط امور مشتریان</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item px-0">ارتباط با واحد فروشگاه</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item px-0">
                  صندوق شکایات و پیشنهادات
                </li>
                </a>
              </ul>
            </div>
            <div className="col-md-3 d-none d-sm-block">
              <h3 className="mb-2 fw-normal">محافظ صفحه نمایش</h3>
              <ul
                className={`${styles.footer_list} list-group border-less bg-dark footer-list`}
              >
                <a className="text-decoration-none" href="/about"><li className="list-group-item px-0">درباره ما</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item px-0">ارتباط امور مشتریان</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item px-0">ارتباط با واحد فروشگاه</li></a>
                <a className="text-decoration-none" href="/contact"><li className="list-group-item px-0">
                  صندوق شکایات و پیشنهادات
                </li>
                </a>
              </ul>
            </div>
          </div>
          <div className="content-box text-center">
            {/* FOOTER SOCIAL MEDIA */}

            <ul
              className={`${styles.footer_list} list-group list-group-horizontal footer-list border-less justify-content-center`}             
            >
              <li className="list-group-item col-md-2">

                <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=181141&amp;Code=uzbjELFCvPNLTGQv9VsQ"
                >
                  <img
                    referrerPolicy="origin"
                    src="/image/enamad.png"
                    id="uzbjELFCvPNLTGQv9VsQ"
                    style={{ height: "100%", width: "100%" }}
                  />
                </a>
              </li>
              <li className="list-group-item col-md-2">
                <img
                  className="img-fluid"
                  src="/image/sadad.jpeg"
                  alt=""
                  style={{ height: "auto", width: "100%" }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
