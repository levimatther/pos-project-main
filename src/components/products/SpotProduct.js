import React from "react";
function SpotProduct(props) {
    return(
        <div className='singleProduct ripple'>
            <p className={'fs-16 fw-bold m-0 p-0 text-center noselect'} style={{color: '#252631'}}>{props.name}</p>
            <div className={'priceArea noselect'}>
                <p className={'fs-10 m-0 p-0 noselect'} style={{color: '#778CA2'}}>{props.price}</p>
            </div>
        </div>
    )
}
export default SpotProduct;
