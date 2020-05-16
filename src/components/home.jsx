import React,{Component} from 'react';
import Carousel from './carousel';
class Home extends Component
{
    render()
    {
        return(
            <React.Fragment>  
                <div>
                    <Carousel/>
                </div>      
            </React.Fragment>
        )
    }
}
export default Home;