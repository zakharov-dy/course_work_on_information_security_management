import React from 'react';
import Master from './Master.jsx'

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
      this.state = {
         slideIndex: 0
      };
   }

   render() {
      return (
         <Master text={text}/>
      );
   }
}
