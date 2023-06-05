import React from "react";
import ListHeader from "./ListHeader";
import { StickyContainer } from "react-sticky";
import OutStockProduct from "../../../components/products/OutStockProduct";
import StockProduct from "../../../components/products/StockProduct";
import SpotProduct from "../../../components/products/SpotProduct";
import VariantsProduct from "../../../components/products/VariantsProduct";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    list_roup: {
        position: 'relative',
    }
}
));

function ListGroup(props) {
    const classes = useStyle();
    const { listData } = props;
    
    function chunkArray(myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            var myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    }
    function getAllProducts(products) {
        var tempArray = [];

        var flag = products.filter((item, index) => {
            return item.name.toLowerCase().includes(props.searchWord.toLowerCase());
        });
        var midArray = chunkArray(flag
            .sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }), 20);
        tempArray = tempArray.concat(midArray);
        return tempArray;
    }


    return (
        <StickyContainer className={classes.list_group}>
            <ListHeader data={listData.title} />
            {
                getAllProducts(listData.products).map((subproducts, subIndex) => {
                    return (
                        <div className='productsContainer' key={subIndex}>
                            {
                                subproducts.map((item, index) => (
                                    <div className='sProduct' key={index} onClick={() => props.handleProductClick(item)}>
                                        {
                                            item.type === 1 && <SpotProduct name={item.name} price={item.price} />
                                        }
                                        {
                                            item.type === 2 && <StockProduct name={item.name} price={item.price} stockNumber={item.stock} />
                                        }
                                        {
                                            item.type === 3 && <OutStockProduct name={item.name} price={item.price} />
                                        }
                                        {
                                            item.type === 4 && <VariantsProduct name={item.name} price={item.price} stockNumber={item.stock} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                )
            }

        </StickyContainer>
    );
}

export default ListGroup;
