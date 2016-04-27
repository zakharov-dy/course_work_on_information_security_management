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
import CalculationTable from './CalculationTable.jsx';
import LeftNav from 'material-ui/lib/left-nav';


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

export default class Content2 extends React.Component {

   constructor(props) {
      super(props);

      this.onCloseDialog = this.onCloseDialog.bind(this);
      this.onCloseResultDialog = this.onCloseResultDialog.bind(this);
      this.onAddSet = this.onAddSet.bind(this);
      this.generateSet = this.generateSet.bind(this);
      this.openResultDialog = this.openResultDialog.bind(this);
      
      this.state = {
         sets: [],
         isDialogOpen: false,
         isResultDialogOpen: false
      };
   }

   render() {
      let state = this.state,
         sets = state.sets,
         tables = sets.map(function(table, i, array){
            return (
               <Table
                  key={i}
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
                        <TableHeaderColumn tooltip='Наименование альтернативы'>
                           Наименование альтернативы
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
            )
         });

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
               <RaisedButton label='Добавить набор'
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
               title='Создание набора альтернатив'
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
               title='Создание набора альтернатив'
               actions={closeResultButton}
               contentStyle={styles.dialog}
               open={this.state.isResultDialogOpen}
               autoScrollBodyContent={true}
               children={
                  <CalculationTable sets={sets}/>
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

      this.setState({
         isDialogOpen: false,
         sets: sets
      })
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
}