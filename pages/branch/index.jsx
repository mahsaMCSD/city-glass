import React, { useState, setState } from "react";
import { useRouter } from "next/router";
import { sendMobile } from "../../services/userService";
import Metadata from "../../components/seo/metadata";

const BranchSignUp = () => {
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
            <Metadata title="شهرگلس - ثبت نام نمایندگان" />;
            <div className="container-fluid p-0 bg-light">
                <div className="container py-3">
                    <p className="text-secondary">کاربر گرامی؛ چنانچه صاحب فروشگاه و خدمات تلفن تلفن همراه هستید برای همکاری با
                        مجموعه شهر گلس فرم زیر را پر کنید </p>
                    <div className="row">
                        <div className="col-md-6">                                                           
                                    <div className="card border-white">
                                        <div className="card-body">
                                            <h3 className="">اطلاعات کسب و کار شما</h3>
                                            <div className="devider-border mt-3 mb-3 mx-2 w-95"></div>
                                            <form>
                                                <div className="form-group mb-3">
                                                    <label className="mb-3" htmlFor="jobCategory">گروه شغلی</label>
                                                    <input type="text" className="form-control bg-light border-white rounded"
                                                        id="jobCategory" placeholder="" aria-describedby="jobCategory" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="mb-3" htmlFor="jobCategory">نام مجموعه <i className="color-pink">*</i></label>
                                                    <input type="text" className="form-control bg-light border-white rounded"
                                                        id="jobCategory" placeholder="نام کسب و کار خود را کامل وارد کنید" aria-describedby="jobCategory" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="mb-3" htmlFor="jobCategory">تلفن ثابت <i className="color-pink">*</i>
                                                    </label>
                                                    <input type="text" className="form-control bg-light border-white rounded"
                                                        id="jobCategory" placeholder="تلفن ثابت خود را کامل وارد کنید" aria-describedby="jobCategory" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="mb-3" htmlFor="jobCategory">تلفن همراه
                                                    </label>
                                                    <input type="text" className="form-control bg-light border-white rounded"
                                                        id="jobCategory" placeholder="تلفن همراه خود را کامل وارد کنید" aria-describedby="jobCategory" />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label className="mb-3" htmlFor="jobCategory">آدرس محل کسب و کار <i className="color-pink">*</i></label>
                                                    <textarea className="form-control bg-light border-white rounded" placeholder="آدرس کسب و کار خود را جهت دسترسی راحت مخاطب لطفا کامل وارد کنید" name="" id=""
                                                        cols="30" rows="5"></textarea>
                                                </div>
                                                <button type="submit" className="btn-sign-up btn btn-orange btn-lg w-100 py-0 pe-0 d-flex justify-content-between align-items-center my-4"><span>نام نویسی درشهر گلس</span><img src="../image/pink-arrow-button.svg"/></button>
                                            </form>
                                        </div>
                                    </div>
                               
                               
                            
                        </div>
                        <a target="_blank" href="https://goo.gl/maps/tCiKj1i7cBirkToE6" className="col-md-6 overflow-hidden" style={{height:'49.6rem'}}>
                         <img src="../image/map.png"/>
                        </a>
                    </div>
                 
                </div>
            </div>


        </React.Fragment>
    );
};

export default BranchSignUp;
