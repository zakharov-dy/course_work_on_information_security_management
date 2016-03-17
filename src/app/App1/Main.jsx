import React from 'react';
import AppHeader from './../core/AppHeader.jsx';
import AppContent from './../core/AppContent.jsx';
import MyContent from './Content.jsx';

import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

const appName = 'Расчет рационального варианта реагирования на событие нарушения информационной безопасности';

const styles = {
   container: {
      textAlign: 'center',
      paddingTop: 200,
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
         isDockDialog: false,
      };
   }

   render() {
      const myBarButtonsParams = [
         {
            name: 'Документация',
            onButtonClick: () => {this.setState({isDockDialog: true})},
         },
         {
            name: 'О программе',
            action: 'about',
         },
         {
            name: 'Исходники',
            action: 'git',
         }];

      const dialogParams = [
         {
            title: 'Документация',
            isOpen: this.state.isDockDialog,
            content: 'Документация',
            buttonCloseParams: {
               caption: 'закрыть',
               onClick: () => {this.setState({isDockDialog: false})},
            },
         },
      ]

      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div>
               <AppHeader barButtonsParams={myBarButtonsParams}
                          title={appName}
               />
               <AppContent dialogParams={dialogParams}
                           content={MyContent}/>

            </div>
         </MuiThemeProvider>
      );
   }
}

export default Main;


