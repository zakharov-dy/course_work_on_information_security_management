import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import {deepOrange500} from '../../node_modules/material-ui/lib/styles/colors';
import getMuiTheme from '../../node_modules/material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from '../../node_modules/material-ui/lib/MuiThemeProvider';

import codeIcon from 'material-ui/lib/svg-icons/action/code'
import copyrightIcon from 'material-ui/lib/svg-icons/action/copyright'
import folderIcon from 'material-ui/lib/svg-icons/file/folder'

// Первое приложение
// import AppContent from './app3/Content.jsx';
// const appNames = 'Выбор СЗИ методами линейной свертки и ранжирования альтернатив';

// Второе приложение
//import AppContent from './App2/Content.jsx';
//const appNames = 'Комбинаторно-морфологический метод синтеза наборов СЗИ';

// Третье приложение
 import AppContent from './App1/Content.jsx';
 const appNames = 'Выбор рационального варианта реагирования на событие нарушения ИБ';

const styles = {
   container: {
      textAlign: 'center',
      paddingTop: 200
   },
   about:{
      // textAlign: 'center',
      fontSize: 'large'
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
            icon: copyrightIcon,
            onButtonClick: () => {this.setState({isDockDialog: true})}
         },
         {
            name: 'Исходники',
            icon: codeIcon,
            onButtonClick: () => {open("https://github.com/dmitry22/course_work_on_information_security_management", "firefox");}
         },
         {
            name: 'Документация',
            icon: folderIcon,
            onButtonClick: () => {open("https://github.com/dmitry22/course_work_on_information_security_management/blob/master/doc.md", "firefox");}
         }],
         about = (
            <div style={styles.about}>
               <h3>Серия программ для проведения лабораторных работ по дисциплине "Управление информационной безопасностью"</h3>
               <p>© 2016 Уфимский государственный авиационный технический университет, кафедра "Вычислительной техники и защиты информации"</p>
               <p>Данная лицензия разрешает лицам, получившим копию данного программного обеспечения и сопутствующей документации (в дальнейшем именуемыми «Программное Обеспечение»), безвозмездно использовать Программное Обеспечение без ограничений, включая неограниченное право на использование, копирование, изменение, слияние, публикацию, распространение, сублицензирование и/или продажу копий Программного Обеспечения, а также лицам, которым предоставляется данное Программное Обеспечение, при соблюдении следующих условий: </p>
               <p>Указанное выше уведомление об авторском праве и данные условия должны быть включены во все копии или значимые части данного Программного Обеспечения.</p>
               <p>ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ, НО НЕ ОГРАНИЧИВАЯСЬ ИМИ. НИ В КАКОМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО КАКИМ-ЛИБО ИСКАМ, ЗА УЩЕРБ ИЛИ ПО ИНЫМ ТРЕБОВАНИЯМ, В ТОМ ЧИСЛЕ, ПРИ ДЕЙСТВИИ КОНТРАКТА, ДЕЛИКТЕ ИЛИ ИНОЙ СИТУАЦИИ, ВОЗНИКШИМ ИЗ-ЗА ИСПОЛЬЗОВАНИЯ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫХ ДЕЙСТВИЙ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ.</p>
            </div>
         );
      let barContent = myBarButtonsParams.map(function (item, i) {
            return (
               <MenuItem
                  key={i}
                  primaryText={item.name}
                  onMouseDown={item.onButtonClick}
                  rightIcon={<item.icon />}
               />);
         });

      return (
         <MuiThemeProvider muiTheme={muiTheme}>
            <div>
               <AppBar
                  title={appNames}
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
                  children={about}
               />
            <AppContent />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Main;
