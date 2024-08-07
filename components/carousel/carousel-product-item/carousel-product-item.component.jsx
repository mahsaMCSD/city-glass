import React from 'react'
import { Carousel } from 'react-bootstrap'
const CarouselProductItem = ({imageUrl}) => (
    <React.Fragment>
         <Carousel.Item>
         <div className="row">
            <div className="col-md-6">
              <img className="img-fluid" src={imageUrl} alt="Image"/>
            </div>
            <div className="col-md-6">
              <img className="img-fluid" src={imageUrl} alt="Image"/>
            </div>
          </div>
          </Carousel.Item>
    </React.Fragment>
)
export default CarouselProductItem;