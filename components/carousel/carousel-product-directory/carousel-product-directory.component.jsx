import React from 'react'
import CarouselProductItem from '../carousel-product-item/carousel-product-item.component'
import { Carousel } from 'react-bootstrap'

class CarouselProductDirectory extends React.Component {
    constructor() {
        super();
        this.state = {
            sections: [
                {
                    imageUrl: '../image/buttomSlideBanner.png',
                    imageUrl2: '../image/buttomSlideBanner2.png',
                    id: 1
                },
                // {
                //     imageUrl: '../image/buttomSlideBanner.png',
                //     imageUrl2: '../image/buttomSlideBanner2.png',

                //     id: 2
                // }
          
            ]
        }
    }
    render() {
        return (
            <React.Fragment>               
                <Carousel controls={false} indicators={false} className="carousel-product mb-5">                 
                        {this.state.sections.map(({ id, imageUrl,imageUrl2 }) => (
                            <Carousel.Item key={id}>
                            <div className="row">
                               <div className="col-md-6">
                                 <img className="img-fluid" src={imageUrl} alt="Image"/>
                               </div>
                               <div className="col-md-6">
                                 <img className="img-fluid" src={imageUrl2} alt="Image"/>
                               </div>
                             </div>
                             </Carousel.Item>
                        ))}                 
                </Carousel>
            </React.Fragment>
        )
    }
}
export default CarouselProductDirectory;