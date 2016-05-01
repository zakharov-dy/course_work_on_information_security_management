import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import SecondAppContent from './App2/Content.jsx';
import FirstAppContent from './app3/Content.jsx';
import ThirdAppContent from './App1/Content.jsx';


import {deepOrange500} from '../../node_modules/material-ui/lib/styles/colors';
import getMuiTheme from '../../node_modules/material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from '../../node_modules/material-ui/lib/MuiThemeProvider';


const appNames = [
   'Выбор СЗИ методами линейной свертки и ранжирования альтернатив',
   'Комбинаторно-морфологический метод синтеза наборов СЗИ',
   'Выбор рационального варианта реагирования на событие нарушения ИБ'],
   appContents = [FirstAppContent, SecondAppContent, ThirdAppContent],
   appNumber = 2;

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
            action: 'about',
            onButtonClick: () => {this.setState({isDockDialog: true})}
         },
         {
            name: 'Документация'
            // onButtonClick: () => {require('nw.gui').Shell.openExternal('https://github.com/dmitry22/course_work_on_information_security_management')},
            // link: ''
         },
         {
            name: 'Исходники',
            onButtonClick: () => {open("https://github.com/dmitry22/course_work_on_information_security_management", "firefox");}

            // link: 'https://github.com/dmitry22/course_work_on_information_security_management'
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
                  onMouseDown={item.onButtonClick}/>);
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
                  children={about}
               />
               <Content />
            </div>
         </MuiThemeProvider>
      );
   }
}

export default Main;
