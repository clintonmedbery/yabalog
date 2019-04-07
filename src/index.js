import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// Import some styles
import './styles/App.css'
import Home from "./Containers/Home";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: purple[300],
            main: purple[500],
            dark: purple[700],
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
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