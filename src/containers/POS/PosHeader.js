import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import clsx from "clsx";
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel'
import Input from '@material-ui/core/Input';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {useDispatch} from "react-redux";
import * as Actions from '../../store/actions'

const useStyle = makeStyles(theme => (
    {
        root: {
            backgroundColor: "white",
            borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
            position: 'fixed',
            width: 'calc(100vw - 268px)',
            zIndex: 150
        },
        toggleBtn: {
            height: 50,
            width: 60,
            minWidth: 60,
            backgroundColor: "white",
            color: 'black',
            border: 0,
            borderRadius: 0
        },
        searchBar: {
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 20,
        },
        underline: {
            "&&&:before": {
                borderBottom: "none"
            },
        }

    }
));


function PosHeader(props) {
    const dispatch = useDispatch();
    const classes = useStyle();
    const products = props.products;
    const [search, setSearch] = useState('')
    const options = products.map((item) => {
        return item.category
    });
    const defaultOption = options[0];
    const inputRef = useRef();

    function openSidebar() {
        dispatch(Actions.openNab())
    }

    function setFocus() {
        inputRef.current.focus();
    }

    return (
        <div className={clsx(classes.root, 'flex flex-row')}>
            <ToggleButton value={'justify'} className={classes.toggleBtn} onClick={openSidebar}>
                <DehazeIcon fontSize="small"/>
            </ToggleButton>
            <Dropdown
                options={options}
                value={defaultOption}
                placeholder="Select an option"
                controlClassName={'categoryDropdown'}
                arrowOpen={<ExpandLessIcon fontSize='small'/>}
                arrowClosed={<ExpandMoreIcon fontSize="small"/>}
                arrowClassName={'arrowArea'}
                menuClassName='menuArea'
                onChange={(e) => props.changeCategory(e.value)}
            />
            <div className='mr-20 fullWidth flex justify-content align-center'>
                <FormControl className={classes.searchBar} fullWidth>
                    <Input
                        classes={{underline: classes.underline}}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start" onClick={() => {
                                setFocus()
                            }} className='cursor-pointer'>
                                <SearchIcon color={'primary'}/>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end" onClick={() => {
                                props.changeSearch('')
                                setSearch('')
                            }} className="cursor-pointer">
                                {search !== '' ? <CancelIcon color="primary"/> : null}
                            </InputAdornment>
                        }
                        value={search}
                        inputRef={inputRef}
                        onChange={(e) => {
                            props.changeSearch(e.target.value)
                            setSearch(e.target.value)
                        }}
                    />
                    

                </FormControl>
            </div>
        </div>
    )
}

export default PosHeader;
