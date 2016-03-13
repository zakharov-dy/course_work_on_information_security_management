import React from 'react';
import AppHeader from './../core/AppHeader.jsx';
// import AppContent from './content/AppHeader.jsx';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

const appName = 'Расчет рационального варианта реагирования на событие нарушения информационной безопасности';

const styles = {
   container: {
      textAlign: 'center',
      paddingTop: 200,
   },
   button: {
      margin: 12,
   },
};

const muiTheme = getMuiTheme({
   palette: {
      accent1Color: deepOrange500,
   },
});

class Main extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         open: false,
         isMessage: false,
      };
   }

   render() {
      // <AppContent />
      let component = this;
      const myBarButtonsParams = [
         {
            name: 'Документация',
            onButtonClick: () => {component.setState({isMessage: !component.state.isMessage})},
         },
         {
            name: 'О программе',
            action: 'about',
         },
         {
            name: 'Исходники',
            action: 'git',
         }];

      myBarButtonsParams.forEach(function (item) {
         item.style = styles.button
      });

      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div>
               <AppHeader barButtonsParams={myBarButtonsParams}
                          title={appName}
               />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Main;
