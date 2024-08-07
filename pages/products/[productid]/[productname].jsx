import React, { useState } from "react";
import ProductDetailShare from "../../../components/product-detail-share/product-detail-share.component";

 export const getStaticPaths = async () => {
  const res = await fetch("https://api.shahr-glass.ir/products");
  const data = await res.json();
  const data2 = data.data;
  const paths = data2.map((collection) => {
    return {
      params: { productid: collection._id,productname:collection.name.replace('/','').concat(collection.brand)},
    };
  });
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async (context) => {
  const id = context.params.productid;
  const res = await fetch(`https://api.shahr-glass.ir/products/${id}`);
  const data = await res.json();
  const data2 = data.data;
  return {
    props: {
      collection: data2,
    },
    revalidate: 60

  };
};

 const productDetail = ({ collection}) => {
  const [loading, setLoading] = useState(false);
  const loadingChange = () => (
    setLoading(true),
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  );
  return (
    <React.Fragment>
    <ProductDetailShare collection={collection} loading={loading} loadingChange={loadingChange}/>
    </React.Fragment>
  );
};
export default productDetail;
