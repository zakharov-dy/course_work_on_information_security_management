import React from 'react';
import Master from './../core/Master.jsx'
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';
import Dialog from 'material-ui/lib/dialog';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import CalculationTable from './CalculationTable.jsx';

const initialValue = [
   '[{"name":"Функциональная подсистема 1","protections":[{"name":"Критерий 1","value":1,"errorValueText":"","errorNameText":""},{"name":"Критерий 2","value":1,"errorValueText":"","errorNameText":""}],"costs":[{"name":"Критерий 3","value":1,"errorValueText":"","errorNameText":""},{"name":"Критерий 4","value":1,"errorValueText":"","errorNameText":""}],"struct":[["Элем. альтернатива 1","1","2","3","4"],["Элем. альтернатива 2","2","3","2","1"],["Элем. альтернатива 3","2","3","4","8"],["Элем. альтернатива 4","1","2","3","6"]]},{"name":"Функциональная система 2","protections":[{"name":"критерий 1","value":1,"errorValueText":"","errorNameText":""},{"name":"критерий 2","value":1,"errorValueText":"","errorNameText":""}],"costs":[{"name":"критерий 3","value":1,"errorValueText":"","errorNameText":""},{"name":"критерий 4","value":1,"errorValueText":"","errorNameText":""}],"struct":[["Элем. альтернатива 1","12","22","43","6"],["Элем. альтернатива 2","23","77","99","9"],["Элем. альтернатива 3","23","22","88",0]]}]',
   '[{"name":"Функциональная подсистема 1","alternativeNames":["Элем. альтернатива 1","Элем. альтернатива 2","Элем. альтернатива 3","Элем. альтернатива 4"],"protections":[1.1666666666666665,2,2,1.1666666666666665],"costs":[1.25,0.625,2,1.5]},{"name":"Функциональная система 2","alternativeNames":["Элем. альтернатива 1","Элем. альтернатива 2","Элем. альтернатива 3"],"protections":[0.8074534161490683,2,1.2857142857142856],"costs":[1.101010101010101,2,0.8888888888888888]}]'
];


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
   sectionStyle: {
      textAlign: 'center'
   },
   divider: {
      borderBottom: '1px solid'
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
      content: 'Определите элементарные альтернативы для заданной функциональной подсистемы'
   }


];

export default class Content2 extends React.Component {

   constructor(props) {
      super(props);

      this.onCloseDialog = this.onCloseDialog.bind(this);
      this.truncation = this.truncation.bind(this);
      this.onCloseResultDialog = this.onCloseResultDialog.bind(this);
      this.onAddSet = this.onAddSet.bind(this);
      this.generateSet = this.generateSet.bind(this);
      this.openResultDialog = this.openResultDialog.bind(this);
      this.onDeleteTable = this.onDeleteTable.bind(this);

      this.state = {
         sets: JSON.parse(initialValue[0]),
         brotherSets: JSON.parse(initialValue[1]),
         isDialogOpen: false,
         isResultDialogOpen: false
      };
   }

   render() {
      let self = this,
         state = this.state,
         sets = state.sets,
         brotherSets = state.brotherSets,
         maxLength = sets.length !== 0 && sets.reduce(function (params, item, i) {
               if(params[0] < item.struct.length) return [item.struct.length, i]
               else return params
         }, [0, 0]),
         tables = sets.map(function(table, i){
            return (
               <div key={i} style={styles.sectionStyle}>
                  <Table
                     fixedHeader={true}
                     selectable={false}
                  >
                     <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                           <TableHeaderColumn colSpan={table.protections.length + table.costs.length + 1}
                                              tooltip={table.name}
                                              style={{textAlign: 'center'}}>
                              {table.name}
                           </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                           <TableHeaderColumn tooltip='Имя альтернативы'>
                              Имя альтернативы
                           </TableHeaderColumn>
                           {table.protections.map( (item, i) => (
                              <TableHeaderColumn key={i + 'protection'} tooltip={item.value}>
                                 {item.name}
                              </TableHeaderColumn>
                           ))}
                           {table.costs.map( (item, i) => (
                              <TableHeaderColumn key={i + 'cost'} tooltip={item.value}>
                                 {item.name}
                              </TableHeaderColumn>
                           ))}
                        </TableRow>
                     </TableHeader>
                     <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}
                     >
                        {table.struct.map( (row, i) => (
                           <TableRow key={i}>
                              {row.map((item, j) => (
                                 <TableRowColumn key={j}>
                                    {item}
                                 </TableRowColumn>
                              ))}
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
                  <RaisedButton
                     key={i + 'deleteTableButton'}
                     label='Удалить таблицу функциональной подсистемы'
                     onMouseDown={self.onDeleteTable.bind(null, i)}
                     primary={true}
                     style={styles.button}
                  />
                  <Divider />
               </div>
            );
         });
      if (brotherSets.length > 0) {
         tables.unshift(
            <div style={styles.sectionStyle}>
               <h2>Отношения показателей "Защищенность" к "Издержкам" для элементарных альтернатив</h2>
               <Table
                  fixedHeader={true}
                  selectable={false}
               >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                     <TableRow>
                        <TableHeaderColumn tooltip='Имя альтернативы'>
                           Функциональная подсистема
                        </TableHeaderColumn>
                        {sets[maxLength[1]].struct.map( (item, i) => (
                           <TableHeaderColumn key={i + 'number'} style={styles.sectionStyle}>
                              {i+1}
                           </TableHeaderColumn>
                        ))}
                     </TableRow>
                  </TableHeader>
                  <TableBody
                     showRowHover={true}
                     displayRowCheckbox={false}
                  >
                     {brotherSets.map( (row, i) => (
                        <TableRow key={i} >
                           <TableRowColumn>
                              {row.name}
                           </TableRowColumn>
                           {row.costs.map((item, j) => (
                              <TableRowColumn key={j} >
                                 <p style={styles.sectionStyle}>{self.truncation(row.protections[j])}</p>
                                 <p style={styles.divider}></p>
                                 <p style={styles.sectionStyle}>{self.truncation(row.costs[j])}</p>
                              </TableRowColumn>
                           ))}
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <h2>{brotherSets.length === 1 ? 'Таблица функциональной подсистемы' : 'Таблицы функциональных подсистем'}</h2>
            </div>
         )
      }

      let closeButton = (
         <RaisedButton
            label='Закрыть'
            onMouseDown={this.onCloseDialog}
            primary={true}
         />
      );
      let closeResultButton = (
         <RaisedButton
            label='Закрыть'
            onMouseDown={this.onCloseResultDialog}
            primary={true}
         />
      );

      return (
         <div>
            {tables}
            <div style={{textAlign: 'center'}}>
               <RaisedButton label={sets.length === 0 ? 'Задать таблицу' +
                ' функциональной' +
                ' подсистемы' : 'Добавить таблицу функциональной подсистемы'}
                             onMouseDown={this.onAddSet}
                             secondary={true}
                             style={styles.button}
               />

               <RaisedButton label='Показать результат'
                             onMouseDown={this.openResultDialog}
                             secondary={true}
                             style={styles.button}
                             disabled={tables.length === 0}
               />
            </div>

            <Dialog
               title='Мастер задания функциональной подсистемы'
               actions={closeButton}
               open={this.state.isDialogOpen}
               contentStyle={styles.dialog}
               autoScrollBodyContent={true}
               overlayStyle={styles.overlayStyle}
               repositionOnUpdate={false}
               children={
                  <Master text={text} onFinish={this.generateSet}/>
               }
            />


            <Dialog
               title='Результаты'
               actions={closeResultButton}
               contentStyle={styles.dialog}
               open={this.state.isResultDialogOpen}
               autoScrollBodyContent={true}
               children={
                  <CalculationTable sets={brotherSets}/>
               }
            />
         </div>
      );
   }


   generateSet(name, protections, costs, struct) {
      let sets = this.state.sets;
      sets.push({name: name,
         protections: protections,
         costs: costs,
         struct: struct});

      // Метод нормализации
      let normalize = function(array, widthArray){
         for(let i=0; i<array[0].length; i++){
            let max = +array[0][i];

            for(let j=0; j<array.length; j++) {
               if(array[j][i] > max) max = array[j][i];
            }

            for(let j=0; j<array.length; j++) {
               array[j][i] = (array[j][i] / max) * widthArray[i].value;
            }
         }

         // Склеивает двумерный массив в одномерный
         return array.map(function(item){
            return item.reduce(function(sum, current) {
               return sum + current;
            }, 0)})
      };

      //преобразовываем исходный массив к удобному для нас виду
      let brotherSets = JSON.parse(JSON.stringify(sets));
      let functionalSets = brotherSets.map(function(functionalSet){
         let costs = functionalSet.costs,
            protections = functionalSet.protections,
            name = functionalSet.name,
            setData = functionalSet.struct,
            protectionsValue,
            alternativeNames;

         alternativeNames = setData.map(function(item, i, setData){
            return setData[i].shift()
         });

         setData.forEach(function(row, i) {
            row.forEach(function(item, j) {setData[i][j] = +item})
         });

         protectionsValue = setData.map(function(item, i, setData){
            let alternativeData = [];
            for(let j=0; j<protections.length; j++){
               alternativeData[j] = setData[i].shift()
            }
            return alternativeData
         });

         costs = normalize(setData, costs);
         protections = normalize(protectionsValue, protections);

         return {
            name: name,
            alternativeNames: alternativeNames,
            protections: protections,
            costs: costs
         }
      });

      this.setState({
         isDialogOpen: false,
         brotherSets: functionalSets,
         sets: sets
      })
   }

   truncation(value) {
      if (value.toFixed) {
         if ( parseInt( value ) !== value ) {
            return value.toFixed(3)
         } else {
            return value
         }
      }
      return value
   }
   
   onAddSet() {
      this.setState({isDialogOpen: true})
   }

   openResultDialog(){
      this.setState({isResultDialogOpen: true})
   }

   onCloseDialog() {
      this.setState({isDialogOpen: false})
   }

   onCloseResultDialog() {
      this.setState({isResultDialogOpen: false})
   }

   onDeleteTable(i, e) {
      e.stopPropagation();
      let sets = this.state.sets,
         brotherSets = this.state.brotherSets;
      sets.splice(i, 1);
      brotherSets.splice(i, 1);
      this.setState({
         sets: sets,
         brotherSets: brotherSets
      });
   }
}
