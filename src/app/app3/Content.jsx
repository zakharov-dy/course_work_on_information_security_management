import React from 'react';
import Master from './../core/Master.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
// import  from 'increasingFunction.png';
let increasingFunction = require('./../images/increasingFunction.png');
let decreasingFunction = require('./../images/decreasingFunction.png');

const styles = {
   headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400
   },
   slide: {
      padding: 10
   },
   dialog: {
      position: 'absolute',
      width: '100%',
      maxWidth: 'none',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
   },
   overlayStyle:{
      paddingTop: '10%'
   },

   button: {
      margin: 12
   },
   buttonContainer:{
      textAlign: 'center'
   },
   leftResult:{
      display: 'inline-block',
      float: 'left',
      marginLeft: '100',
      maxWidth: '35%'
   },
   rightResult:{
      display: 'inline-block',
      float: 'right',
      marginRight: '100',
      maxWidth: '35%'
   },
   resultHeader:{
      textAlign: 'center'
   },
   listStyle:{
      fontSize: 'large'
   }

};

const text = [
   {
      title: '',
      subtitle: '',
      content: ''
   },
   {
      title: 'Показатель "Защищенность"',
      subtitle: 'Этап №1',
      content: 'Осуществите ввод критериев для возрастающей функции предпочтения и определите соответствующие им весовые коэффициенты.',
      picture: (<img src={increasingFunction}/>)
   },
   {
      title: 'Показатель "Издержки"',
      subtitle: 'Этап №2',
      content: 'Осуществите ввод критериев для убывающей функции предпочтения и определите соответствующие им весовые коэффициенты.',
      picture: (<img src={decreasingFunction}/>)
   },
   {
      title: 'Определение альтернатив',
      subtitle: 'Этап №3',
      content: 'Определите набор альтернатив функциональной подсистемы'
   }

];

export default class Content2 extends React.Component {

   constructor(props) {
      super(props);

      this.onCloseDialog = this.onCloseDialog.bind(this);
      this.generateSet = this.generateSet.bind(this);
      this.onOpenDialog = this.onOpenDialog.bind(this);

      this.state = {
         firstMethod: [],
         secondMethod: [],
         isDialogOpen: false,
         isResultDialogOpen: false
      };
   }

   render() {

      let closeResultButton = (
            <RaisedButton
               label='Закрыть'
               onMouseDown={this.onCloseDialog}
               primary={true}
            />
         ),
         buttonLabel = (this.state.firstMethod.length === 0)? 'Ввод исходных данных' : "Начать сначала",
         newSessionButton = (
            <RaisedButton
               style={styles.button}
               secondary={true}
               label={buttonLabel}
               onMouseDown={this.onOpenDialog}
            />
         ),
         DialogContent;

      if (this.state.firstMethod.length !== 0) {
         DialogContent = (
            <div>
               <div style={styles.buttonContainer}>
                  {newSessionButton}
               </div>
               <div style={styles.leftResult}>
                  <h1 style={styles.resultHeader}>
                     Результаты по методу "линейной свертки критериев"
                  </h1>
                  <ol style={styles.listStyle}>
                     {this.state.firstMethod.map(function (item) {
                        return (<li>{item.name}: {item.result}</li>)
                     })}
                  </ol>
               </div>
               <div style={styles.rightResult}>
                  <h1 style={styles.resultHeader}>
                     Результаты по методу "ранжирования альтернатив по свойстваам"
                  </h1>
                  <ol style={styles.listStyle}>
                     {this.state.secondMethod.map(function (item) {
                        return (<li>{item.name}: {item.result}</li>)
                     })}
                  </ol>
               </div>
            </div>
         )
      } else {
         DialogContent = (
            <div style={styles.buttonContainer}>
               {newSessionButton}
            </div>
         )
      }
      return (
         <div style={styles.content}>
            {DialogContent}
            <Dialog
               actions={closeResultButton}
               title='Мастер создания матрицы ранжирования средств защиты информации'
               contentStyle={styles.dialog}
               open={this.state.isResultDialogOpen}
               autoScrollBodyContent={true}
               children={
                  <Master text={text} onFinish={this.generateSet} startProgressValue={1}/>
               }
            />
         </div>
      );
   }

   generateSet(name, protections, costs, struct) {

      let alternativesLength = struct[0].length,
         maxMin = [];

      // Преобразование данных в числовые значения
      struct = struct.map(function (set) {return set.map(function (item, i) {
         if(i !== 0) item = +item;
         return item
      })});

      // Формирование массива с именами альтернатив и обрезание имен у исходного массива
      let arrayForFirstMethod = struct.reduce(function(result, set){
         result.push({name: set.shift()});
         return result
      }, []);

      // Нахождение минимального и максимального значений для каждого критерия
      for(let i=0; i<alternativesLength; i++){
         maxMin.push(struct.reduce(function (result, current, j) {
            if(current[i] > result.max) result.max = current[i];
            if(current[i] < result.min) result.min = current[i];
            return result
         }, {max: 0, min: Infinity}))
      }

      // дублируем исходные данные для второго метода.
      let secondStrict = JSON.parse(JSON.stringify(struct));

      //
      let arrayForSecondMethod = arrayForFirstMethod.map(function(item){return {name: item.name, result: 0}});
      for(let i = 0; i < secondStrict[0].length; i++){
         // для каждого столбца формируем сортированный массив его элементов
         let sortedColumn = [];
         for(let j=0; j<secondStrict.length; j++){sortedColumn[j] = secondStrict[j][i]}
         sortedColumn.sort(function (a, b) {return a - b});

         //
         for(let j=0; j<secondStrict.length; j++){
            arrayForSecondMethod[j].result += (sortedColumn.indexOf(secondStrict[j][i]) + 1)
         }
      }

      // Нормализация структуры.
      let normalizeStrict = struct.map(function (set, i) {
         return set.map(function (item, j) {
            let min = maxMin[j].min,
               max = maxMin[j].max,
               alternativesLength = struct[0].length,
               protectionsLength = protections.length,
               weight;
            if(j < protectionsLength){
               weight = protections[j].value;
               item = weight * (item - min) / (max - min);
            }
            else {
               weight = costs[alternativesLength - protectionsLength - 1].value;
               item = weight * (max - item) / (max - min);
            }
            return item
         })
      });

      // Схлопывание всех критериев по альтернативе в одно значение
      arrayForFirstMethod.forEach(function (item, i) {
         item.result = normalizeStrict[i].reduce(function (result, item) {
            result = result + item;
            return result
         }, 0)
      });

      // Сортировка всех значений в одно
      arrayForFirstMethod.sort(function (a, b) {
         return a.result - b.result
      }).reverse();

      // Сортировка всех значений в одно
      arrayForSecondMethod.sort(function (a, b) {
         return a.result - b.result
      });

      this.setState({
         isResultDialogOpen: false,
         firstMethod: arrayForFirstMethod,
         secondMethod: arrayForSecondMethod
      })
   }

   onOpenDialog() {
      this.setState({isResultDialogOpen: true})
   }
   onCloseDialog() {
      this.setState({isResultDialogOpen: false})
   }
}
