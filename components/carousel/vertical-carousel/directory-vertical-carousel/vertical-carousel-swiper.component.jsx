import React from 'react'
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
SwiperCore.use([Navigation]);

class VerticalCarouselSwipper extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: [
        {
          title: 'لورم ایپسوم متن',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          id: 1
        },
        {
          title: '2 لورم ایپسوم متن',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          id: 2
        },
        {
          title: '3 لورم ایپسوم متن',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          id: 3
        },
        {
          title: '4 لورم ایپسوم متن',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          id: 4
        },
        {
          title: '5 لورم ایپسوم متن',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          id: 5
        },
        {
          title: '6 لورم ایپسوم متن',
          description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ',
          id: 6
        }
      ]
    }
  }
  render() {
    return (
      <React.Fragment>
        <Swiper className=""
          spaceBetween={5}
          direction={'vertical'}
          slidesPerView={3}
          navigation
          loop={true}
          centeredSlides={true}
       
        >
          {
            this.state.sections.map(({ id, title,description }) => (
              <SwiperSlide key={id} className="bg-orange text-dark rounded">
                <div className="card-body">
                  <h3 className="mb-2 font-weight-bold">{title}</h3>
                  <span className="card-text">{description}</span>

                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </React.Fragment>
    )
  }
}


export default VerticalCarouselSwipper