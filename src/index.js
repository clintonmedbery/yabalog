import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Import some styles
import './styles/App.css'
import Home from "./Containers/Home";

// Create main App component
class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Home/>
            </MuiThemeProvider>
        )
    }
}

// Render the application into the DOM, the div inside index.html
render(<App />, document.getElementById('root'))