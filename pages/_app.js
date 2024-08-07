import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "../styles/base.scss";
import React from "react";
import MainRoot from "../main";

function MyApp({ Component, pageProps }) {
  return <MainRoot Component={Component} pageProps={pageProps} />;
}

export default MyApp;
