import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import { connect } from 'react-redux';
import { goToHome, goToCreate } from '../actions';

class TopBar extends React.Component {
    constructor() {
        super();

        this.showHome = this.showHome.bind(this);
        this.showCreate = this.showCreate.bind(this);
    }

    showHome() {
        this.props.goToHome();
    }

    showCreate() {
        this.props.goToCreate();
    }

    render() {
        var homeActive = this.props.currentPage === 'h' ? 'active' : '';
        var createActive = this.props.currentPage === 'c' ? 'active' : '';
        return (
            <AppBar className='top-bar' fixed flat title='Talent tree creator' leftIcon={<i className="fas fa-tree"></i>}>
                <Navigation type='horizontal'>
                    <Link active className={ 'top-bar-button ' + homeActive } label='Home' onClick={ this.showHome }/>
                    <Link active className={ 'top-bar-button ' + createActive } label='Create' onClick={ this.showCreate } />
                    <Link active className='top-bar-button' href='https://github.com/Victroll'>
                        <i className='fab fa-github' style={{ fontSize: '1.5em' }}></i>
                    </Link>
                </Navigation>
            </AppBar>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentPage: store.currentPage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToHome: () => dispatch(goToHome()),
        goToCreate: () => dispatch(goToCreate())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBar);