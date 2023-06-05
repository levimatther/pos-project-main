import React from "react";
function OutStockProduct(props) {
    return (
        <div className='singleProduct ripple'>
            <img className="outStockArea" src="/assets/images/svg/OutOfStock.svg" alt="logo" />
            <p className={'fs-16 fw-bold m-0 p-0 text-center noselect'} style={{color: '#252631'}}>{props.name}</p>
            <div className={'stockArea'}>
                <p className={'fs-10 m-0 p-0 noselect'} style={{color: '#778CA2'}}>{props.price}</p>
                <p className={'fs-10 m-0 p-0 noselect'} style={{color: '#FF808B'}}>Out of stock</p>
            </div>
        </div>
    )
}
export default OutStockProduct;
