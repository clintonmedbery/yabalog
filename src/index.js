import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// Import some styles
import './styles/App.css'
import Home from "./Containers/Home";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#3C3F41",
            main: "#313335",
            dark: "#2B2B2B"
        },
        secondary: {
            main: "#A9B7C6"
        },
        text: {
            button: "#BABABA",
            inputText: "#C7C7C7",
            text: "#C7C7C7"

        }
    },
    typography: {
        useNextVariants: true,
    },
});

// Create main App component
class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Home/>
            </MuiThemeProvider>
        )
    }
}
// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))