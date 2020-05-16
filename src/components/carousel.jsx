import React,{Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image from './images/voting4.png';
import image1 from './images/voting7.jpg'
import image2 from './images/voting9.png' 
class CarouselMain extends Component
{
    render()
    {
        return (
            <div className="container" style={{height:"400px",marginTop:"35px",backgroundColor:"white",padding:'0px'}}>
                <Carousel>
                    <Carousel.Item>
                        <img style = {{height:"400px",marginTop:"0px"}} className="d-block w-100" src={image} alt="first"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style = {{height:"400px",marginTop:"0px"}} className="d-block w-100" src={image1} alt="first"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style = {{height:"400px",margin:"0px"}} className="d-block w-100" src={image2} alt="first"/>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
export default CarouselMain