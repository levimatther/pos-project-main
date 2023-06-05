import React, {useRef, useEffect, useState} from "react";
import ResultComponent from "./resultComponent";
import KeyPadComponent from "./keyPadComponent";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as Actions from '../../store/actions'
function LoginForm(props) {
    const history = useHistory();
    const {location} = history;
    const {containerRef} = props;
    const [result, setResult] = useState('');
    const [isWrong, setIsWrong] = useState(false);
    const [backDisable, setIsBackDisable] = useState(true);
    const dispatch = useDispatch();
    const isLogin = location.pathname.split('/')[1] === 'login';
    
    function onClick(e) {
        if(e.key){
            const key = e.key;
            if(e.key === 'Backspace'){
                if (result.length === 4) {
                    return
                }
                setResult(prevState => {
                    let str = prevState;
                    return str.slice(0, -1)
                })
            }
            else if((e.keyCode>= 48 && e.keyCode<= 57) || (e.keyCode>= 96 && e.keyCode<= 105)){
                if (result.length === 4) {
                    return
                }
                setResult(prevState => {
                    let str = prevState;
                    str += key;
                    return str;
                })
            }
        }
        else if (e === '.') {
            if (isLogin) {
                history.push('/clock')
            } else {
                history.push('/login');
            }
        } else if (e === '=') {
            if (result.length === 4) {
                return
            }
            setResult(prevState => {
                let str = prevState;
                return str.slice(0, -1)
            })
        } else {
            if (result.length === 4) {
                return
            }
            setResult(prevState => {
                let str = prevState;
                str += e;
                return str;
            })
        }
    }
    useEffect(() => {
        let mounted = true;
        containerRef.current.focus();
        if (result.length === 0) {
            setIsBackDisable(true);
        } else {
            setIsBackDisable(false);
        }
        if (result.length === 4) {
            if (result === '1111') {
                setIsWrong(false);
                if (!isLogin) {
                    if (mounted) {
                        dispatch(Actions.clockIn())
                    }
                } else {
                    localStorage.setItem("token", "1111");
                    history.push('/main/pos')
                }
            } else {
                var timerID2 = setInterval(() => {
                    setResult('');
                    setIsWrong(false);
                }, 1000);
                setIsWrong(true);
            }
        }
        return() => {
            mounted = false;
            clearInterval(timerID2);
        }
    }, [result]);
    return(
        <div className="login-form-body" style={{outline:"none"}} tabIndex="-1" onKeyDown={onClick} ref={containerRef} >
            <ResultComponent result={result} isWrong={isWrong} />
            <KeyPadComponent onClick={onClick} backDisable={backDisable}/>
        </div>
    )
}

export default LoginForm
