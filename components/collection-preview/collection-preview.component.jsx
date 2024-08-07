import React, { useEffect, useRef, useState } from "react";
import styles from "./collection-preview.module.scss";
import Link from "next/link";
import AlertMessage from "../../components/alert/alert.component";
import { fetchCollections } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFilters, saveCollections } from "../../redux/product/product.action";
import API_URL from "../../configurations/environment";
import { CLEAR_PAGENUMBER, INCREMENT_PAGENUMBER } from "../../redux/pagination/pagination.types";

const CollectionPreview = () => {
  const collections = useSelector((state) => state.product.collections);
console.log('collections',collections)
  const pageNumber=useSelector((state) => state.pagination.pageNumber);
  const [loading, setLoading] = useState(false)
  const [loadingCollections, setLoadingCollections] = useState(false)
  const [totalCount, setTotalCount] = useState(0);

  const mainQuery = useSelector((state) => state.product.mainQuery);
  const dispatch = useDispatch();
  const fetchProducts = pg => {
    fetchCollections(mainQuery, pg).then((data) => {
      dispatch(saveCollections([...collections, ...data.collections]))
      setTotalCount(data.totalCount)
      setLoadingCollections(data.loadingCollections)
    },
      setLoading(true)
    )
  }
  useEffect(() => {
    dispatch({type:CLEAR_PAGENUMBER})    
  }, [])
  useEffect(() => {
    fetchProducts(pageNumber);
  }, [pageNumber])

  const loadMore = () => {
    dispatch({ type: INCREMENT_PAGENUMBER })

  }
  const handleClearFilters = () => {
    dispatch(clearAllFilters())
  }
  const pageEnd = useRef();
  let num = 1;
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          num++;
          loadMore();
          if (num >= 10) {
            observer.unobserve(pageEnd.current)
            setLoading(false)

          }
        }

      }, { threshold: 1 });
      observer.observe(pageEnd.current)
    }
  }, [loading, num])
  return (<React.Fragment>
    {
      !loadingCollections ?

        collections && collections.map((collection, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className={styles.hovereffect}>
              <div className={`card ${styles.product_img}`}>
                <img
                  className="img-fluid card-img"
                  src={`${API_URL}/products/${collection._id}/cover?type=thumb`}
                  alt=""
                />
                <div className="card-img-overlay top-less d-flex flex-column justify-content-center">
                  <h3 className="mb-2 fw-normal">{collection.name}</h3>

                </div>
              </div>
              <div
                className={`${styles.overlay} d-flex w-100 justify-content-space-between align-items-center`}
              >
                <div
                  className={`btn-group shop-btn d-flex justify-content-space-between w-100 ${styles.shop_btn}`}
                  role="group"
                  aria-label="Basic example"
                >
                  <button type="button" className="btn btn-pink">
                    <img className="img-fluid" src="/image/heart.svg" alt="" />
                  </button>

                  <Link
                    href={{
                      pathname: `/products/${collection._id}/${collection.name.replace('/', '').concat(collection.brand)}`,
                    }}
                    onClick={handleClearFilters}
                  >
                    <button type="button" className="btn btn-orange text-white">
                      توضیحات و خرید محصول
                    </button>
                  </Link>

                  <button type="button" className="btn btn-pink">
                    <img className="img-fluid" src="/image/search-wt.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        )) :
        <div className="loading d-flex justify-content-center">
          <img height="300" src="/image/ShahrGlassLoading.gif" alt="loading" />
        </div>

    }

    {loading ?
      <div className="loading d-flex justify-content-center">
        <img height="100" src="/image/ShahrGlassLoading.gif" alt="loading" />
      </div>

      : ""
    }

    <span ref={pageEnd}></span>
  </React.Fragment>)
};

export default CollectionPreview;
