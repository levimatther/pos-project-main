import React, {Component} from "react";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Provider} from "react-redux";
import store from "../../store";
import { BrowserRouter} from 'react-router-dom';
import TransitionComponent from "../pageTransition/TransitionComponent";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#7CE7AC',
            lightgray: '#919191',
            disabled: 'rgba(145,145,145,0.25)',
            btnColor: '#7CE7AC',
            danger: '#FF808B',
            dangerDisabled: 'rgba(255,128,139,0.31)',
            dangerHover: '#FF7781',
            product: '#778CA2',
            background: '#F7F7F7',
            backWhite: '#ffffff',
            borderColor: '#E8ECEF',
            headerColor: '#252631',
            modalText: '#8181A5',
            deleteModalText: '#8180A6',
            borderColor2: '#979797',
            backgroundColor: '#f5f5f5'
        },
        secondary: {
            main: '#11cb5f',
        },
        danger: {
            main: '#FF808B'
        }
    },
    width: {
        takeAway: 268
    }
});

class App extends Component {
    constructor(props) {
        super(props);
    }

    // const currentKey = location.pathname.split("/")[1] || "/";

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <TransitionComponent />
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        )
    }


}

export default App;
