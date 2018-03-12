import React from 'react';
import TalentTree from './talentTree';
import theme from '../toolbox/theme';
import '../toolbox/theme.css';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import TopBar from './topBar';

class App extends React.Component {
    render () {
        return (
            <ThemeProvider theme={ theme }>
            <div>
                <TopBar />
                <TalentTree />
            </div>
            </ThemeProvider>
        );
    }
}

export default App;