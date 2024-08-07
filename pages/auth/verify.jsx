import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/user/user.actions";
import Metadata from "../../components/seo/metadata";

const Verify = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const router = useRouter();
  useEffect(() => {
    const mobileNumber = localStorage.getItem("mobileNumber");
    setMobileNumber(mobileNumber);
  }, []);
  const updateMobile = () => {
    router.push("/auth");
  };
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signin(mobileNumber, confirmCode));
    router.push("/");
  };
  return (
    <React.Fragment>
      <Metadata title="شهرگلس - ورود با کد تایید" />;
      <div className="content-box sign-in p-5 mt-5">
        <div className="col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h3 className="">تاییدیه شماره ثبت شده </h3>
              <div className="devider-border mt-3 mb-3 mx-2 w-95"></div>
              <form onSubmit={handleSubmit}>
                <label className="mb-3 font16" htmlFor="exampleInputEmail1">
                  شماره موبایل{" "}
                </label>
                <div className="form-group row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control bg-light border-dashed"
                      id="mobileNumber"
                      aria-describedby="mobileNumber"
                      value={mobileNumber}
                      required
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <img width="16" src="/image/edit.svg" alt="" />
                    <span
                      onClick={updateMobile}
                      className="col-md-6 cursor-pointer"
                    >
                      تغییر یا ویرایش شماره
                    </span>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="my-3 font16" htmlFor="exampleInputEmail1">
                    کد تاییدیه{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light border-dashed"
                    id="confirmCode"
                    aria-describedby="confirmCode"
                    value={confirmCode}
                    required
                    onChange={(e) => setConfirmCode(e.target.value)}
                    placeholder="کد تاییده ارسال شده به شماره ثبت شده را وارد کنید"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary btn-lg w-100"
                >
                  ورود شهر گلس
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

export default Verify;
