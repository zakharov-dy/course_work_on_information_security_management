import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import FirstAppContent from './App1/Content.jsx';
import SecondAppContent from './App2/Content.jsx';
import ThirdAppContent from './app3/Content.jsx';


import {deepOrange500} from '../../node_modules/material-ui/lib/styles/colors';
import getMuiTheme from '../../node_modules/material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from '../../node_modules/material-ui/lib/MuiThemeProvider';


const appNames = [
   'Выбор рационального варианта реагирования на событие нарушения ИБ',
   'Комбинаторно-морфологический метод синтеза наборов СЗИ',
   'Выбор СЗИ методами линейной свертки и ранжирования альтернатив'],
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
            name: 'О программе',
            onButtonClick: () => {this.setState({isDockDialog: true})}
         },
         {
            name: 'Документация',
            action: 'about',
            link: 'https://github.com/dmitry22/course_work_on_information_security_management'
         },
         {
            name: 'Исходники',
            action: 'git',
            link: 'https://github.com/dmitry22/course_work_on_information_security_management'
         }];

      let barContent = myBarButtonsParams.map(function (item, i) {
         if (item.link) {
            return (
               <MenuItem 
                  key={i}
                  linkButton={true} 
                  href={item.link} 
                  primaryText={item.name} />
               )
         } else {
            return (
               <MenuItem
                  key={i}
                  primaryText={item.name}
                  onMouseDown={item.onButtonClick}/>)
               }
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
               <Dialog
                  title='О программе'
                  actions={(
                     <RaisedButton
                        label='закрыть'
                        onMouseDown={() => {this.setState({isDockDialog: false})}}
                        primary={true}/>
                  )}
                  open={this.state.isDockDialog}
               />
               <Content />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Main;


