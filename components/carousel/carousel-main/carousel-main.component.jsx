import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselMain = () => (
  //    MAIN SLIDER
  <Carousel controls={false}>
    <Carousel.Item>
    <div className="row">
      <div className="col-md-6">
        <div className="content-box p-5">
          <h1 className="display-6 mb-4 font-weight-bold">
            شهر گلس تنوعی به وسعت یک شهر
          </h1>
          <p>
            مجموعه ی شهر گلس با سابقه ای طولانی در بازار لوازم جانبی گوشی و تبلت
            , یکی از معتبرترین و موفق ترین شرکت های واردکننده ی گلس و محافظ صفحه
            نمایش در بازار علاءالدین تهران است.در شهر گلس به معرفی کاملا تخصصی و
            بررسی اجمالی انواع محافظ صفحه نمایش و گلس خواهیم پرداخت و تجربه و
            علم متخصصان خود را در اختیار شما قرار خواهیم داد تا دسترسی به هرگونه
            اطلاعات لازم جهت تهیه و نصب گلس و محافظ صفحه نمایش را داشته و با ما
            تجربه ی موفق و لذت بخشی از خرید و نصب گلس داشته باشید.
          </p>
          <div
            className="btn-group btn-group-toggle w-100 mt-20"
            data-toggle="buttons"
          >
            <button
              type="button"
              className="btn border-less w-50 me-5 rounded-0"
            >
              مشاهده فروشگاه اصلی
            </button>
            <button type="button" className="btn btn-orange w-50 rounded-0">
              مشاهده محصول
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center">
        <img className="img-fluid" src="../image/smartphone-group.png" alt="" />
      </div>
    </div>
    </Carousel.Item>
    <Carousel.Item>
      <div className="row">
        <div className="col-md-6 mb-margin-bottom-3">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              className="main-carousel_img img-fluid mb-width-200"
              src="../image/iphone.svg"
              alt=""
            />
            <img
              className="position-absolute right-20rem mb-right-23rem img-fluid"
              width="100"
              src="../image/apple-watch.svg"
              alt=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-box">
            <h1 className="display-6 mb-4 font-weight-bold">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </h1>
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
            <ul className="list-group border-less">
              <li className="list-group-item d-flex justify-content-start align-items-center px-0 mb-3">
                <img
                  width="25"
                  className="me-5"
                  src="../image/check-round.svg"
                  alt=""
                />
                <span className="text-right">Here goes feature number 1</span>
              </li>
              <li className="list-group-item d-flex justify-content-start align-items-center px-0 mb-3">
                <img
                  width="25"
                  className="me-5"
                  src="../image/check-round.svg"
                  alt=""
                />
                <span className="text-right">Here goes feature number 1</span>
              </li>
              <li className="list-group-item d-flex justify-content-start align-items-center px-0">
                <img
                  width="25"
                  className="me-5"
                  src="../image/check-round.svg"
                  alt=""
                />
                <span className="text-right">Here goes feature number 1</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Carousel.Item>
  </Carousel>
);

export default CarouselMain;
