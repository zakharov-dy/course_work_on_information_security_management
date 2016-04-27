import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import FirstAppContent from './App1/Content.jsx';
import SecondAppContent from './App2/Content.jsx';
import ThirdAppContent from './app3/Content.jsx';


import {deepOrange500} from '../../node_modules/material-ui/lib/styles/colors';
import getMuiTheme from '../../node_modules/material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from '../../node_modules/material-ui/lib/MuiThemeProvider';

const appNames = ['ЛР1', 'ЛР2', 'ЛР3'],
   appContents = [FirstAppContent, SecondAppContent, ThirdAppContent],
   appNumber = 2;

const styles = {
   container: {
      textAlign: 'center',
      paddingTop: 200
   }
};

const muiTheme = getMuiTheme({
   palette: {
      accent1Color: deepOrange500
   }
});

class Main extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
         open: false,
         contentIndex: 0,
         isDockDialog: false
      };
   }

   render() {

      const myBarButtonsParams = [
         {
            name: 'Документация',
            onButtonClick: () => {this.setState({isDockDialog: true})}
         },
         {
            name: 'О программе',
            action: 'about'
         },
         {
            name: 'Исходники',
            action: 'git'
         }],
         dialogParams = [
            {
               title: 'Документация',
               isOpen: this.state.isDockDialog,
               content: 'Документация',
               buttonCloseParams: {
                  caption: 'закрыть',
                  onClick: () => {this.setState({isDockDialog: false})}
               }
            }
         ];
      let barContent = myBarButtonsParams.map(function (item, i) {
                  return (
                     <MenuItem
                        key={i}
                        primaryText={item.name}
                        onMouseDown={item.onButtonClick}
                     />
                  )
               }),
         Content = appContents[appNumber];

      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div>
               <AppBar
                  title={appNames[appNumber]}
                  iconElementLeft={
                     <IconMenu
                       iconButtonElement={
                         <IconButton><MoreVertIcon /></IconButton>
                       }
                       targetOrigin={{horizontal: 'right', vertical: 'top'}}
                       anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                     >
                        {barContent}
                     </IconMenu>
                  }
               />
               <Content />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Main;


