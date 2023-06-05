import React from "react";
function VariantsProduct(props) {
    return(
        <div>
            <div className='multiProduct'>
                <div className='layer1'></div>
                <div className='layer2'>
                    <p className='fs-16 fw-bold m-0 p-0 text-center noselect' style={{color: '#252631'}}>{props.name}</p>
                    <div className={'stockArea'}>
                        <p className={'fs-10 m-0 p-0 noselect'} style={{color: '#778CA2'}}>{props.price}</p>
                        <p className={'fs-10 m-0 p-0 noselect'} style={{color: '#778CA2'}}>{props.stockNumber} in stock</p>
                    </div>
                </div>
            </div>
        </div>



    )
}
export default VariantsProduct;
