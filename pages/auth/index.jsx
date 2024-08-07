import React, { useState, setState } from "react";
import { useRouter } from "next/router";
import { sendMobile } from "../../services/userService";
import Metadata from "../../components/seo/metadata";

const SignUp = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("mobileNumber", mobileNumber);
    router.push("/auth/verify");
    sendMobile(mobileNumber).then(setMobileNumber(""));
  };
  return (
    <React.Fragment>
      <Metadata title="شهرگلس - ورود" />;
      <div className="content-box sign-in p-5 mt-5">
        <div className="col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h3 className="">نام نویسی در فروشگاه شهرگلس </h3>
              <div className="devider-border mt-3 mb-3 mx-2 w-95"></div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="mb-3 font16" htmlFor="mobileNumber">
                    شماره موبایل{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light border-dashed"
                    id="mobileNumber"
                    name="mobileNumber"
                    aria-describedby="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    placeholder="شماره تلفن همراه خود را وارد کنید"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary btn-lg w-100"
                >
                  ورود به شهر گلس
                </button>
              </form>
            </div>
            <div className="col-md-4 mr-5 visible-md">
              <img className="img-fluid" src="/image/sign-up-img.svg" alt="" />
            </div>
          </div>
          {/* <footer className="position-absolute bottom-0 text-center mb-5 col-md-7">
          <p className="text-secondary">
            استفاده از مطالب فروشگاه اینترنتی شهرگلس فقط برای مقاصد غیرتجاری و
            با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت شهر گلس
            می‌باشد.{" "}
          </p>
          <br></br>
          <p className="text-secondary">
            .تمامی حقوق مادی و معنوی این سایت محفوظ است{" "}
          </p>
        </footer> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
