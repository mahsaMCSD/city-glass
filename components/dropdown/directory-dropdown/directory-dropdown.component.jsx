import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  fetchCollections,
} from "../../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import {
  saveMainQuery,
  saveCollections,
  saveFiltered,
} from "../../../redux/product/product.action";
import API_URL from "../../../configurations/environment";
import { useRouter } from "next/router";

const DirectoryDropdown = () => {
  const [fullCategorySub, setFullCategorySub] = useState([]);
  const [catFilterkeybaseds, setCatFilterkeybaseds] = useState([]);
  const [catSubFilterkeybaseds, setCatSubFilterkeybaseds] = useState([]);
  const pageNumber = useSelector((state) => state.pagination.pageNumber);
  const dispatch = useDispatch();
  let mainQuery = useSelector((state) => state.product.mainQuery);
  let menuFiltered = useSelector((state) => state.product.menuFiltered);
  const router = useRouter()
  useEffect(() => {
    axios({
      headers: { "x-client-id": "website" },
      method: "get",
      url: `${API_URL}/categories`,
      responseType: "stream",
    }).then((response) => {
      setFullCategorySub(response.data.data);
    });
  }, []);

  const onMouseEnter = (id, filterKey) => {
    let newcatFilterkeybaseds = {};
    newcatFilterkeybaseds[filterKey] = rootSubcategories.map(
      (eachRootSubcategory) => {
        return eachRootSubcategory.filter((rSub) => {
          return rSub.parent_id === id;
        });
      }
    );
    newcatFilterkeybaseds[filterKey] = Object.values(
      newcatFilterkeybaseds
    )[0].filter((arr) => !(arr && arr.length === 0));

    setCatFilterkeybaseds(newcatFilterkeybaseds);
  };
  const onMouseEnter2 = (id, filterKey) => {
    let newcatSubFilterkeybaseds = [];
    newcatSubFilterkeybaseds[filterKey] = sSubcategories.map(
      (eachsSubcategories) => {
        return eachsSubcategories.filter((sSub) => {
          return sSub.parent_id === id;
        });
      }
    );
    setCatSubFilterkeybaseds(newcatSubFilterkeybaseds);
  };

  const handleChangeCategory = (
    id,
    rootFilterKey,
    secondFilterKey,
    filterkey,
    event
  ) => {
    switch (rootFilterKey) {
      case "brand":
        mainQuery = `brand:"${event.target.innerText}"`;
        break;
      case "device":
        mainQuery = `device:"${event.target.innerText}"`;
        break;
      case "model":
        mainQuery = `category:"${event.target.innerText}"`;
        break;
      default:
        mainQuery = `category:"${event.target.innerText}"`;
        break;
    }

    menuFiltered = [
      {
        id: id,
        rootFilterKey: rootFilterKey,
        secondFilterKey: secondFilterKey,
        filterKey: filterkey,
        innerText: event.target.innerText,
      },
    ];
    dispatch(saveMainQuery(mainQuery));
    dispatch(saveFiltered(menuFiltered));

    mainQuery
      ? fetchCollections(mainQuery,pageNumber).then((data) => {
        dispatch(saveCollections(data.collections));
        window.location = "/products"
      })
      : "";
  };
  let rootParents = [];
  let rootSubcategories = [];
  let sSubcategories = [];

  if (fullCategorySub.length > 0) {
    const fullCatRoot = fullCategorySub.filter(
      ({ parent }) => parent.parent_id == null
    );
    fullCatRoot.splice(-1, 1);
    const subCat = fullCategorySub.filter(
      ({ parent }) => parent.parent_id !== null
    );
    for (let i = 0; i < fullCatRoot.length; i++) {
      rootParents.push(fullCatRoot[i].parent);
      rootSubcategories.push(fullCatRoot[i].subcategories);
    }
    for (let i = 0; i < subCat.length; i++) {
      sSubcategories.push(subCat[i].subcategories);
    }
  }
  return (
    <>
      <nav>
        <ul className="menu-items p-0">
          <li className="dropdown">
            <a
              className={`dropdown menu-item btn btn-orange w-100 rounded-0`}
            >
              <img src="/image/justify.svg" alt="" /> دسته بندی
            </a>
            <ul className="dropdown-menu bg-light">
              {rootParents.map((cat, idx) => (
                <li
                  key={idx}
                  className="dropdown dropdown-right"
                  onMouseEnter={() => onMouseEnter(cat._id, cat.filter_key)}
                >
                  {cat.category}

                  <ul className="menu-right bg-light p-0 z-index-1">
                    {catFilterkeybaseds[cat.filter_key] &&
                      catFilterkeybaseds[cat.filter_key].map(
                        (catFilterkeybased) =>
                          catFilterkeybased.map((cf, i) => {
                            return cf.is_last_node ? (
                              <li
                                key={i}
                                className="dropdown dropdown-right"
                                onClick={(e) =>
                                  handleChangeCategory(
                                    cat._id,
                                    cat.filter_key,
                                    cf.filter_key,
                                    cf.filter_key,
                                    e
                                  )
                                }
                              >
                                {cf.category}
                              </li>
                            ) : (
                              <li
                                key={i}
                                className="dropdown secondary-dropdown dropdown-right"
                                onMouseEnter={() =>
                                  onMouseEnter2(cf._id, cf.filter_key)
                                }
                              >
                                {cf.category}
                                <ul className="secondary-menu bg-light p-0">
                                  {catSubFilterkeybaseds[cf.filter_key] &&
                                    catSubFilterkeybaseds[cf.filter_key].map(
                                      (catSubFilterkeybased) =>
                                        catSubFilterkeybased.map((scf, i) => {
                                          return scf.is_last_node ? (
                                            <li
                                              key={i}
                                              className="dropdown dropdown-right"
                                              onClick={(e) =>
                                                handleChangeCategory(
                                                  cf._id,
                                                  cat.filter_key,
                                                  cf.filter_key,
                                                  scf.filter_key,
                                                  e
                                                )
                                              }
                                            >
                                              {scf.category}
                                            </li>
                                          ) : (
                                            <li
                                              key={i}
                                              className="dropdown dropdown-right"
                                            >
                                              {scf.category}
                                            </li>
                                          );
                                        })
                                    )}
                                </ul>
                              </li>
                            );
                          })
                      )}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

  
    </>
  );
};

export default DirectoryDropdown;
