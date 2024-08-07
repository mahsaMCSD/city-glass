import React from 'react'
import TextLoop from "react-text-loop";
const MainSlogan = () => {

  return (
    // SLOGAN
    <div className="col-md-12 p-5 mx-auto">
      <div className="col-md-8 mx-auto">
      <h1 className="text-center mb-4 fw-normal">Shahr Glass is <TextLoop className="bg-orange">
        <span>Variety</span>
        <span>really</span>
        <span>beautiful</span>
      </TextLoop>{" "}
      to the  extent of  a city</h1>
      <p className="p-3">زمان یکی از با ارزش ترین سرمایه های انسانی است که باید از آن به بهترین نحو ممکن استفاده شود. اهمیت زمان آنقدر برای بشر شناخته شده بود که همواره سعی داشته و دارد، تا برای رسیدن به اهداف خود کوتاه ترین مسیر را انتخاب کند. مسیری که او را زودتر به هدف مورد نظر خود برساند </p>
     
      </div>
    
     <div className="row">
        <div className="col-md-6">

          <img className="w-100" src="/image/mainRightAd.jpg" alt="" />


        </div>
        <div className="col-md-6">

          <img className="w-100" src="/image/mainLeftAd.png" alt="" />


        </div>
      </div>
    </div>
  )


};

export default MainSlogan