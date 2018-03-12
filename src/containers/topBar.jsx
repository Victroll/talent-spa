import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Button from 'react-toolbox/lib/button/Button';

class TopBar extends React.Component {
    render() {
        return (
            <AppBar className='top-bar' fixed flat title='Talent tree creator'>
                <Navigation type='horizontal'>
                    <Button className='top-bar-button' label='Home' icon='home' />
                    <Button className='top-bar-button' label='Create' icon='create'/>
                    <Button className='top-bar-button' label='Load' icon='file_upload'/>
                </Navigation>
            </AppBar>
        );
    }
}

export default TopBar;