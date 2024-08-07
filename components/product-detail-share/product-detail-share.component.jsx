import React from "react";
import { useDispatch } from "react-redux";
import Metadata from "../seo/metadata"
import API_URL from "../../configurations/environment"
import Directory from "../../components/content-icon/content-icon.component"
import {addItem} from "../../redux/cart/cart.actions"
const ProductDetailShare=({collection,loading,loadingChange})=>{
  const dispatch=useDispatch();
  return(
<React.Fragment>
      {collection !== undefined &&
      collection !== null &&
      collection._id !== undefined ? (
        <div className="container mx-auto" style={{ maxWidth: "100rem" }}>
          <Metadata
            title={`شهرگلس - ${collection.name} خرید محافظ صفحه نمایش ${collection.brand.category}`}
            seoImg={`${API_URL}/products/${collection._id}/cover?type=cover`}
          />
          <div className="row">
            <div className="col-md-5">
              <img
                className="d-block w-100 mb-5"
                src={`${API_URL}/products/${collection._id}/cover?type=cover`}
                alt=""
              />
            </div>
            <div className="col-md-7">
              <div className="content-box pr-5">
                <div className="title mb-3">
                  <h1 className="fw-normal">{collection.name}</h1>
                  <h2 className="">{collection.brand.category}</h2>
                  <h2 className=""> قیمت: {collection.retail_price} تومان </h2>
                </div>
                <div className="title-detail">
                  <div className="d-block mb-4">
                    <img width="16" src="/image/check-round.svg" alt="" />{" "}
                    <span className="text-secondary">وضعیت:</span>
                    <span>
                      {" "}
                      {collection.is_active ? "موجود در فروشگاه" : "ناموجود"}
                    </span>
                  </div>
                  <div className="d-block mb-4">
                    <span className="text-secondary"> تگ فروشگاهی : </span>
                    <span className="me-5">{collection.tag}</span>
                    <span className="text-secondary">
                      دسته بندی :
                      {collection.category.map((cat, i) => (
                        <span key={i} className="me-1">
                          {(i ? "- " : "") + cat.category}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="d-block">
                    <span className="text-secondary"> اشتراک گذاری : </span>
                  </div>
                </div>
                <div className="devider-border mt-3 mb-3"></div>
                <div className="desc">
                  <h5>{collection.description}</h5>

                  <div
                    className="btn-toolbar mt-5 add-tocart-context justify-content-center"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                  >
                    <div
                      className="btn-group-vertical col-md-9 me-2"
                      role="group"
                      aria-label="Counter group"
                    >
                      <button
                        type="button"
                        className="btn btn-orange"
                        disabled={loading}
                        onClick={() => {
                          loadingChange();
                          dispatch(addItem(collection));
                        }}
                      >
                        {" "}
                        <img
                          width="32"
                          height="19"
                          src={
                            loading
                              ? "/image/Spinner-wt-cart.svg"
                              : "/image/shopping-cart.svg"
                          }
                        />
                        افزودن به سبد خرید
                      </button>
                    </div>

                    <div
                      className="btn-group me-2"
                      role="group"
                      aria-label="Second group"
                    >
                      <button type="button" className="btn btn-pink">
                        <img
                          className="img-fluid"
                          src="/image/search-wt.svg"
                          alt=""
                        />
                      </button>
                    </div>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Second group"
                    >
                      <button type="button" className="btn btn-pink">
                        <img
                          className="img-fluid"
                          src="/image/heart.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="devider-border mt-5 mb-4"></div>
                <div className="content-box">
                  <h5 className="">انتخاب سریع محصولات دیگر برای موبایل شما</h5>
                  <select
                    className="form-select mb-2"
                    aria-label="Default select example"
                    defaultValue="انتخاب: لنز/کاور پشت/محافظ صفحه نمایش"
                  >
                    <option>انتخاب: لنز/کاور پشت/محافظ صفحه نمایش</option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue="انتخاب محصول مورد نظرتان"
                  >
                    <option>انتخاب محصول مورد نظرتان</option>
                  </select>
                </div>
              */}
              </div>
            </div>
          </div>
          {/* SECURITY CUSTOMER */}
          <div className="security_customer my-5 half-opacity">
            {/* <ContentIcon /> */}
          </div>
          {/* MORE DESC */}

          {/* SIMILAR PRODUCTS */}
          {/* <div className="content-box mb-5">
            <h3 className="text-center mb-5">محصولات مشابه</h3>
            <div className="row py-5 px-2">
              <Directory />
            </div>
          </div> */}
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </React.Fragment>   
  )
 
}
export default ProductDetailShare;

