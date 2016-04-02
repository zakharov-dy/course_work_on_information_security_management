import React from 'react';
import Master from './Master.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

const styles = {
   headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400
   },
   slide: {
      padding: 10
   }
};

const text = [
   {
      title: 'Функциональная подсистема',
      subtitle: 'Этап №1',
      content: 'Введите название функциональной подсистемы'
   },
   {
      title: 'Показатель "Защищенность"',
      subtitle: 'Этап №2',
      content: 'Осуществите ввод критериев показателя "Защищенность" и определите соответствующие им весовые коэффициенты.'
   },
   {
      title: 'Показатель "Издержки"',
      subtitle: 'Этап №3',
      content: 'Осуществите ввод критериев показателя "Издержки" и определите соответствующие им весовые коэффициенты.'
   },
   {
      title: 'Определение альтернатив',
      subtitle: 'Этап №4',
      content: 'Определите набор альтернатив для заданной функциональной подсистемы'
   }


];

export default class TabsExampleSwipeable extends React.Component {

   constructor(props) {
      super(props);


      this.onCloseDialog = this.onCloseDialog.bind(this);
      this.onAddSet = this.onAddSet.bind(this);

      this.state = {
         sets: [],
         isDialogOpen: false
      };
   }

   render() {
      let closeButton = (
         <RaisedButton
            label='Закрыть'
            onMouseDown={this.onCloseDialog}
            primary={true}
         />
      );
      return (
         <div>
            <RaisedButton label='Добавить набор'
                          onMouseDown={this.onAddSet}
                          secondary={true}
            />
            <Dialog
               title='Создание набора альтернатив'
               actions={closeButton}
               open={this.state.isDialogOpen}
               children={
                  <Master text={text}/>
               }
            />
         </div>
      );
   }



   onAddSet() {
      this.setState({isDialogOpen: true})
   }

   onCloseDialog() {
      this.setState({isDialogOpen: false})
   }
}
