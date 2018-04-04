import React from 'react';
import TalentTree from './talentTree';
import Home from './home';
import theme from '../toolbox/theme';
import '../toolbox/theme.css';
import '../flexboxgrid/react-flexbox-grid.css';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import TopBar from './topBar';
import { connect } from 'react-redux';

class App extends React.Component {
    render () {
        return (
            <ThemeProvider theme={ theme }>
            <div>
                <TopBar />
                { this.props.currentPage === 'c' ?
                    <TalentTree /> :
                    <Home /> 
                }
            </div>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentPage: store.currentPage
    };
}

export default connect(
    mapStateToProps
)(App);