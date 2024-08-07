import React, { useEffect, useState } from "react";
import ContentIcon from "../../components/content-icon/content-icon.component";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import FilterDirectory from "../../components/filter-directory/filter-directory.component";
import {
  fetchCollections,
  fetchCategories,
} from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCollections,
  saveMainQuery,
} from "../../redux/product/product.action";
import Metadata from "../../components/seo/metadata";
import { CLEAR_PAGENUMBER } from "../../redux/pagination/pagination.types";

const ShopPage = () => {
  const [categories, setCategories] = useState([]);
  const pageNumber = useSelector((state) => state.pagination.pageNumber);
  const collections = useSelector((state) => state.product.collections);
  const searchFilterQuery = useSelector((state) => state.product.searchFilterQuery);
  const [isBoxVisible, setIsBoxVisible] = useState(true);
  const [brandFilterList, setBrandFilterList] = useState([]);
  const [deviceFilterList, setDeviceFilterList] = useState([]);
  const [modelFilterList, setModelFilterList] = useState([]);
  const dispatch = useDispatch();
  let mainQuery = useSelector((state) => state.product.mainQuery);

  useEffect(() => {
    fetchCategories().then((categories) => setCategories(categories));
    setIsBoxVisible(false);

  }, []);
  const handleChangeCategory = (event) => {
    dispatch({ type: CLEAR_PAGENUMBER })
    let brandFilterQuery = "";
    let deviceFilterQuery = "";
    let modelFilterQuery = "";
    let andFilters = [];
    let index;
    let name = event.target.name;
    if (event.target.checked) {
      switch (name) {
        case "brand":
          brandFilterList.push(`brand:"${event.target.value}"`);
          break;
        case "device":
          deviceFilterList.push(`device:"${event.target.value}"`);
          break;
        case "model":
          modelFilterList.push(`category:"${event.target.value}"`);
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case "brand":
          index = brandFilterList.indexOf(event.target.value);
          brandFilterList.splice(index, 1);
          break;
        case "device":
          index = deviceFilterList.indexOf(event.target.value);
          deviceFilterList.splice(index, 1);
          break;
        case "model":
          index = modelFilterList.indexOf(event.target.value);
          modelFilterList.splice(index, 1);
          break;
        default:
          break;
      }
    }
    setBrandFilterList(brandFilterList);
    setModelFilterList(modelFilterList);
    setDeviceFilterList(deviceFilterList);

    if (brandFilterList.length > 0) {
      brandFilterQuery = brandFilterList.join(" or ");
    }
    if (modelFilterList.length > 0) {
      modelFilterQuery = modelFilterList.join(" or ");
    }
    if (deviceFilterList.length > 0) {
      deviceFilterQuery = deviceFilterList.join(" or ");
    }
    andFilters.push(searchFilterQuery, brandFilterQuery, modelFilterQuery, deviceFilterQuery);
    andFilters = andFilters.filter((element) => {
      return element.length > 0;
    });
    mainQuery = andFilters.join(" and ");

    dispatch(saveMainQuery(mainQuery));
    pageNumber == 0 ?
      fetchCollections(mainQuery, pageNumber).then((data) => {
        dispatch(saveCollections(data.collections))
      }
      )
      : ""
  };
  return (
    <div>
      <Metadata title={`شهرگلس - محصولات`} />;
      <main>
        <div className="container-fluid p-0 cg-shop-banner mb-mt-7">
          <div className="card">
            <img
              className="img-fluid card-image"
              height="200"
              src="/image/banner.jpg"
              alt=""
            />
            <div className="card-img-overlay col-md-6">
              <h1 className="display-6 mb-4 font-weight-bold">شهر گلس تنوعی به وسعت یک شهر</h1>
              <p className="card-text">زمان یکی از با ارزش ترین سرمایه های انسانی است که باید از آن به بهترین نحو ممکن استفاده شود. اهمیت زمان آنقدر برای بشر شناخته شده بود که همواره سعی داشته و دارد، تا برای رسیدن به اهداف خود کوتاه ترین مسیر را انتخاب کند. مسیری که او را زودتر به هدف مورد نظر خود برساند.</p>
            </div>

          </div>

        </div>
        <div className="container">
          {/* SECURITY CUSTOMER */}
          <div className="security_customer my-5">
            <ContentIcon />
          </div>
          {/* PRODUCT LIST */}
          <div className="content-box d-flex p-5 px-0 col-md-6 loadingObserve">
            <h5 className="col-md-5">
              محصولات شهر گلس (نمایش {collections !== null ? collections.length : ""} محصول)
            </h5>
            <select
              className="form-select"
              aria-label="Default select example"
              disabled
            >
              <option defaultValue>دسته بندی بر اساس</option>
              <option value="1">پربازدیدترین</option>
              <option value="2">ارزانترین</option>
              <option value="3">گرانترین</option>
            </select>
          </div>
          <div className="row">
            {/* FILTER */}
            <div className="col-md-3">
              <div className="border-devider-horizental mb-3">
                <h3 className="">گروه بندی محصولات</h3>
              </div>

              <FilterDirectory
                categories={categories}
                handleChangeCategory={handleChangeCategory}
              />
            </div>
            {/* PRODUCT LIST */}
            <div className="col-md-9">
              <div className="row">

                {<CollectionPreview  />}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
