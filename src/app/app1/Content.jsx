import React from 'react';
import Master from './../core/Master.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';


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
   resultHeader:{
      textAlign: 'center'
   }

};

const text = [
   {
      title: '',
      subtitle: '',
      content: ''
   },
   {  title: 'Определение критериев',
      subtitle: 'Этап №1',
      content: 'Задайте критерии для функции предпочтения указанной на' +
      ' рисунке.',
      picture: (<img src={increasingFunction}/>)
   },
   {
      title: 'Определение критериев',
      subtitle: 'Этап №2',
      content: 'Задайте критерии для функции предпочтения указанной на' +
      ' рисунке.',
      picture: (<img src={decreasingFunction}/>)
   },
   {
      title: 'Определение альтернатив',
      subtitle: 'Этап №3',
      content: 'Задайте набор альтернатив.'
   }

];

export default class Content2 extends React.Component {

   constructor(props) {
      super(props);

      this.onCloseDialog = this.onCloseDialog.bind(this);
      this.generateSet = this.generateSet.bind(this);
      this.onOpenDialog = this.onOpenDialog.bind(this);

      this.state = {
         resultArray: [],
         secondMethod: [],
         isDialogOpen: false,
         isResultDialogOpen: false
      };
   }

   render() {

      let state = this.state,
         normalizeStrict = state.normalizeStrict,
         criteriaNames = state.criteriaNames,
         resultArray = state.resultArray,
         closeResultButton = (
            <RaisedButton
               label='Закрыть'
               onMouseDown={this.onCloseDialog}
               primary={true}
            />
         ),
         buttonLabel = (this.state.resultArray.length === 0)? 'Ввод исходных данных' : "Начать сначала",
         newSessionButton = (
            <RaisedButton
               style={styles.button}
               secondary={true}
               label={buttonLabel}
               onMouseDown={this.onOpenDialog}
            />
         ),
         DialogContent,
         table;

      if (resultArray.length !== 0) {
         DialogContent = (
            <div>
               <h2>Результаты</h2>
               <Table
                  fixedHeader={true}
                  selectable={false}
               >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                     <TableRow>
                        <TableHeaderColumn>
                           Альтернатива
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                           Метод линейной свертки критериев
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                           Метод ранжирования альтернатив по свойствам
                        </TableHeaderColumn>
                     </TableRow>
                  </TableHeader>
                  <TableBody
                     showRowHover={true}
                     displayRowCheckbox={false}
                  >
                     {this.state.resultArray.map( (row, i) => (
                        <TableRow key={i}>
                           <TableRowColumn>
                              {resultArray[i].name}
                           </TableRowColumn>
                           <TableRowColumn>
                               {resultArray[i].result} {resultArray[i].firstWinner ? '(max)' : ''}
                           </TableRowColumn>
                           <TableRowColumn>
                              {resultArray[i].result2} {resultArray[i].secondWinner? '(min)' : ''}
                           </TableRowColumn>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <div style={styles.buttonContainer}>
                  {newSessionButton}
               </div>
            </div>
         ),
         table = (
            <div>
               <h2>Критерии и альтернативы</h2>
               <Table
                  fixedHeader={true}
                  selectable={false}
               >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                     <TableRow>
                        <TableHeaderColumn>
                           Альтернатива
                        </TableHeaderColumn>
                        {criteriaNames.map( (row, i) => (
                           <TableHeaderColumn>
                              {row.name}
                           </TableHeaderColumn>
                        ))}
                     </TableRow>
                  </TableHeader>
                  <TableBody
                     showRowHover={true}
                     displayRowCheckbox={false}
                  >
                     {normalizeStrict.map( (row, i) => (
                        <TableRow key={i}>
                           <TableRowColumn>
                              {resultArray[i].name}
                           </TableRowColumn>
                        {row.map( (column, j) => (
                           <TableRowColumn>
                              {column}
                           </TableRowColumn>
                        ))}
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
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
         <div style={styles.resultHeader}>
            {table}
            <div>
               {DialogContent}
               <Dialog
                  actions={closeResultButton}
                  contentStyle={styles.dialog}
                  open={this.state.isResultDialogOpen}
                  autoScrollBodyContent={true}
                  children={
                  <Master text={text} onFinish={this.generateSet} startProgressValue={1}/>
               }
               />
            </div>
         </div>
      );
   }

   generateSet(name, protections, costs, struct) {
      console.log(arguments);
      let alternativesLength = struct[0].length,
         maxMin = [];

      // Преобразование данных в числовые значения
      struct = struct.map(function (set) {return set.map(function (item, i) {
         if(i !== 0) item = +item;
         return item
      })});

      // Формирование массива с именами альтернатив и обрезание имен у исходного массива
      let resultArray = struct.reduce(function(result, set){
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
      console.log(normalizeStrict);


      // Схлопывание всех критериев по альтернативе в одно значение
      resultArray.forEach(function (item, i) {
         item.result = normalizeStrict[i].reduce(function (result, item) {
            result = result + item;
            return result
         }, 0)
      });

      resultArray.forEach(function(item){item.result2 = 0});
      for(let i = 0; i < normalizeStrict[0].length; i++){
         // для каждого столбца формируем сортированный массив его элементов
         let sortedColumn = [];
         for(let j=0; j<normalizeStrict.length; j++){sortedColumn[j] = normalizeStrict[j][i]}
         sortedColumn.sort(function (a, b) {return a - b}).reverse();

         for(let j=0; j<normalizeStrict.length; j++){
            resultArray[j].result2 += (sortedColumn.indexOf(normalizeStrict[j][i]) + 1)
         }
      }

      resultArray.forEach(function(item){
         if (isNaN(item.result)) item.result = 0;
         if (isNaN(item.result2)) item.result2 = 0;
      });

      let firstArr = resultArray.map(function (elem) {
         return elem.result
      });

      let secondArr = resultArray.map(function (elem) {
         return elem.result2
      });

      let max = Math.max.apply(null, firstArr);
      let min = Math.min.apply(null, secondArr);

      //Определение победителей
      resultArray.forEach(function(i){
         i.result === max ? i.firstWinner = true : i.firstWinner = false;
         i.result2 === min ? i.secondWinner = true : i.secondWinner = false;
      });

      this.setState({
         isResultDialogOpen: false,
         resultArray: resultArray,
         normalizeStrict: normalizeStrict,
         criteriaNames: protections.concat(costs)
      })
   }

   onOpenDialog() {
      this.setState({isResultDialogOpen: true})
   }
   onCloseDialog() {
      this.setState({isResultDialogOpen: false})
   }
}
