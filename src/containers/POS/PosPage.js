import React, { useState, useRef, useEffect } from "react";
import PosHeader from "./PosHeader";
import VariantsProduct from "../../components/products/VariantsProduct";
import StockProduct from "../../components/products/StockProduct";
import SpotProduct from "../../components/products/SpotProduct";
import OutStockProduct from "../../components/products/OutStockProduct";
import { products } from '../../constants'
import ReactPageScroller from 'react-page-scroller'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowDownwardSharp, ArrowUpwardSharp } from "@material-ui/icons";
import VariantDialog from "../Dialogs/VariantDialog";
import VolumeDialog from "../Dialogs/VolumeDialog";
import ModifierDialog from "../Dialogs/ModifersDialog";
import { StickyContainer } from "react-sticky";
import ListGroup from "./list/ListGroup";
const useStyle = makeStyles(theme => (
    {
        paginationBtn: {
            width: 40,
            height: 40
        },
        startIcon: {
            marginLeft: 12
        },
        btnGroup: {
            width: 'calc(100vw - 268px)',
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'fixed',
            right: '279px',
            top: '61px',
            zIndex: 110
        },
        content:{
            padding: 10,
            marginTop:51,
            paddingTop:0
        }
    }
));

function PosPage(props) {
    const classes = useStyle();
    function changeCategory(e) {
        setCategory(e);
    }
    function changeSearch(e) {
        setSearchWord(e);
    }

    const productContainerRef = useRef(null);

    const [category, setCategory] = useState('Popular');
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);
    const [isVariant, setIsVariant] = useState(false);
    const [isModifier, setIsModifier] = useState(false);
    const [isVolume, setIsVolume] = useState(false);
    const [variantProduct, setVariantProduct] = useState({});
    const [modifierProduct, setModifierProdut] = useState({});
    const [volumeProduct, setVolumeProduct] = useState({});
    const [searchWord, setSearchWord] = useState('');
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [fullHeight, setFullHeight] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [titleArr, settitleArr] = useState([]);

    

    const productList = products.filter((item) => {
        if (item.category === category) {
            return item
        }
    });
    const list = category === 'Popular'?[]:productList[0].subCategory;
    const refs = list.reduce((acc, value) => {
        acc[value.title] = React.createRef();
        return acc;
      }, {});
    let arr=[];
    list.map(item=>{
        arr.push(item.title);
    });
    const titleArray= arr;
    const handleClick = title =>{
        refs[title].current.scrollIntoView({
        behavior: 'smooth',
    //   block: 'start',
    });}
    // useEffect(() => {
    //     let arr=[];
    //     list.map(item=>{
    //         arr.push(item.title);
    //     });
    //     settitleArr(arr);
    // }, [])
    // const onScroll = e => {
    //     setScrollTop(e.target.documentElement.scrollTop);
    //     setScrolling(e.target.documentElement.scrollTop > scrollTop);
    //     let page = Math.ceil(e.target.documentElement.scrollTop/window.innerHeight);
    //     setPageIndex(page);
    //   };
    // const load = ()=>{
    //     let boxHeight = productContainerRef.current.clientHeight;
    //     let screenHeight = window.innerHeight;
    //     setFullHeight(productContainerRef.current.clientHeight);
    //   }
    // useEffect(() => {
    //     window.addEventListener("scroll", onScroll);
    //     return () => window.removeEventListener("scroll", onScroll);
    //   }, [scrollTop]);
    
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
        var tempSub = [];
        products.subCategory.forEach((item, index) => {
            var flag = item.products.filter((item, index) => {
                return item.name.toLowerCase().includes(searchWord.toLowerCase());
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
            for (let i = 0; i < midArray.length; i++) {
                tempSub.push(item.title)
            }
        });
        return [tempArray, tempSub];
    }

    function handlePageChange(pIndex) {
        const pageNumbers = titleArray.length-1;
        if (pIndex === 0) {
            setIsFirst(true)
        } else {
            setIsFirst(false)
        }
        if (pIndex === pageNumbers) {
            setIsLast(true)
        } else {
            setIsLast(false);
        }
    }
    useEffect(() => {
        const title = titleArray[pageIndex];
        if(title){
            handleClick(title);
        }
    }, [pageIndex])
    function handleDownPage() {
        if(!isLast){
            setPageIndex(prevState => {
                let flag = prevState;
                flag += 1;
                handlePageChange(flag)
                return flag;
            });
        }
    }
    function handleUpPage() {
        if(!isFirst){
            setPageIndex(prevState => {
                let flag = prevState;
                flag -= 1;
                handlePageChange(flag);
                return flag;
            });
        }
    }

    function handleProductClick(item, index) {
        if (item.type === 4) {
            if (item.name === 'bread') {
                setIsModifier(true);
                let prod = { ...item, amount: 1 };
                setModifierProdut(prod);
                return;
            }
            setIsVariant(true);
            let prod = { ...item, amount: 1 };
            setVariantProduct(prod);
            return
        }
        if (item.type === 2) {
            setIsVolume(true);
            let prod = { ...item, amount: 0.000 };
            setVolumeProduct(prod);
            return;
        }
        props.productClick(item)
    }

    function handleVariantClose() {
        setIsVariant(false)
    }
    function handleModifiers() {
        setIsModifier(false)
    }
    function handleVolumeClose() {
        setIsVolume(false)
    }

    function onCheckOut(data) {
        setIsVariant(false);
        props.productClick(data)
    }
    function onCheckOutModifier(data) {
        setIsModifier(false);
        props.productClick(data)
    }
    function onCheckOutVolume(data) {
        setIsVolume(false);
        props.productClick(data)
    }
    return (
        <div className={props.classes}>
            <VariantDialog open={isVariant} data={variantProduct} onClose={handleVariantClose} onCheckOut={onCheckOut} />
            <ModifierDialog open={isModifier} data={modifierProduct} onClose={handleModifiers} onCheckOut={onCheckOutModifier} />
            <VolumeDialog open={isVolume} data={volumeProduct} onClose={handleVolumeClose} onCheckOut={onCheckOutVolume} />
            <PosHeader changeCategory={changeCategory} products={products} changeSearch={changeSearch} />

            <div className={classes.content}>
                {
                    !productList[0].subCategory ? (
                        <div className='pt-10'>
                            <div className={'flex flex-row justify-between'}>
                                <div className={'pt-20'}>
                                    <p className={'m-0 p-0 fw-bold fs-18 f-ls-19 color-2d'} style={{ color: '#252631' }}>
                                        {productList[0].category}
                                    </p>
                                </div>
                            </div>
                            <div className={'productsContainer'}>
                                {
                                    productList[0].products.sort((a, b) => {
                                        if (a.name > b.name) {
                                            return 1
                                        }
                                        if (b.name > a.name) {
                                            return -1
                                        }
                                        return 0
                                    }).filter((item, index) => {
                                        return item.name.toLowerCase().includes(searchWord.toLowerCase())
                                    }).map((item, index) => (
                                        <div className={'sProduct'} key={index} onClick={() => handleProductClick(item, index)}>
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
                        </div>
                    ) : (
                            <div>
                                <div className={classes.btnGroup}>
                                    <ButtonGroup aria-label="outlined secondary button group">
                                        <Button
                                            disabled={isFirst}
                                            className={classes.paginationBtn}
                                            onClick={handleUpPage}
                                            startIcon={<ArrowUpwardSharp className={classes.startIcon}/>}/>

                                        <Button
                                            disabled={isLast}
                                            className={classes.paginationBtn}
                                            startIcon={<ArrowDownwardSharp className={classes.startIcon}/>}
                                            onClick={handleDownPage}
                                        />
                                    </ButtonGroup>
                                </div>
                                <div ref={productContainerRef}>
                                <StickyContainer>
                                    {productList[0].subCategory.map((subproducts, subIndex) => {
                                        return (
                                            <div ref={refs[subproducts.title]} key={subIndex}>
                                            <ListGroup listData={subproducts} searchWord={searchWord} handleProductClick={handleProductClick} 
                                            />
                                            </div>
                                        )
                                    }
                                    )}
                                </StickyContainer>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default PosPage;
