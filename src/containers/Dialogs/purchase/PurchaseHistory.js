import React, {useState} from "react";
import {Button, Icon} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import PurchaseDetailDialog from "./PurchaseDetail";
import {_transitionDuration} from "../../../constants";
import {CSSTransition} from "react-transition-group";
import SvgPaid from "../../../Icons/Paid";

const useStyles = makeStyles(theme => ({
    paperDialog: {
        width: 520,
        height: 580,
        position: 'absolute',
        top: 60
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        height: 40,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: 4
    }
}));

function PurchaseHistoryDialog(props) {
    const classes = useStyles();
    const [searchWord, setSearchWord] = useState('');
    const [purchaseDetail, setPurchaseDetail] = useState(false);
    return (
            <div className='down-body'>
                <div>
                    <div className='pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight'>
                        <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>Close</Button>
                        <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Purchase history</p>
                        <Button color='primary' disabled className={classes.openBtn} onClick={props.handleCancel}></Button>
                    </div>
                    <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight flex'>
                        <FormControl className={classes.searchBar} fullWidth={true}>
                            <Input
                                classes={{underline: classes.underline}}
                                id="input-with-icon-adornment"
                                placeholder='Search purchases'
                                value={searchWord}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon color={'primary'}/>
                                    </InputAdornment>
                                }
                                onChange={(e) => setSearchWord(e.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div className='height-440 overflowYAuto'>
                        <div className='pt-10 pb-10 pl-20 pr-20 height-80 borderBottomLight flex flex-col'>
                            <p className='p-0 m-0 color-light fs-12'>
                                All purchases
                            </p>
                            <div className='pt-20 flex flex-row justify-between cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                                <div className='flex flex-col height-40 justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                    <div className='flex flex-row'>
                                        <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                        <SvgPaid />
                                        <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                    </div>
                                </div>
                                <div className='flex flex-row height-40'>
                                    <div className='flex flex-col justify-between'>
                                        <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                        <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                    </div>
                                    <div className='pl-20 m-auto'>
                                        <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <img className='width-10 height-10' src={"/assets/images/svg/Partial-refund.svg"} alt="logo"/>
                                    <p className='pl-5 m-0 fs-10 color-pink'>Partially refunded</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <img className='width-10 height-10' src={"/assets/images/svg/circle-r.svg"} alt="logo"/>
                                    <p className='pl-5 m-0 fs-10 color-pink'>Refunded</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid/>
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid/>
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setPurchaseDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <SvgPaid />
                                    <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CSSTransition
                    in={purchaseDetail}
                    timeout={_transitionDuration}
                    classNames="right-transition"
                    unmountOnExit
                    appear
                >
                    <PurchaseDetailDialog handleCancel={() => setPurchaseDetail(false)}/>
                </CSSTransition>
            </div>
    )
}

export default PurchaseHistoryDialog;
