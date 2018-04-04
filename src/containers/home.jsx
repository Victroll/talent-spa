import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className='main-container'>
                <h1>Welcome to the Talent Tree Creator app!</h1>
                <hr/>
                <br/>
                <p>Have you ever wanted to create your own talent tree like so many RPGs do? Well, with this app, you can!</p>
                <p>Do you want to create separate talents with its own name, description and points? You got it!</p>
                <p>Do you want to choose a cool image for each of your talents? You got it!</p>
                <p>Do you want to move each one of your talents to create a structure? You got it!</p>
                <p>Do you want to activate some talents only when others are active? You got it!</p>
                <p>Do you want to test your talent tree? You got it!</p>
                <p>Do you want to save and load your talent trees? You got it!</p>
                <p>Do you want to modify any characteristic with the talents? Not yet</p>
                <br/>
                <p>Don't wait, go to the Create section and check the basic examples.</p>
            </div>
        );
    }
}

export default Home;