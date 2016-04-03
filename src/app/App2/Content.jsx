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

export default class Content2 extends React.Component {

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
      let state = this.state,
         sets = state.sets,
         tables = sets.map(function(item, i, array){
            (
               <Table
                  fixedHeader={true}
                  selectable={false}
               >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                     <TableRow>
                        <TableHeaderColumn colSpan={alternatives.length + 1}
                                           tooltip={item.name}
                                           style={{textAlign: 'center'}}>
                           {props.name}
                        </TableHeaderColumn>
                     </TableRow>
                     <TableRow>
                        <TableHeaderColumn tooltip='Наименование альтернативы'>
                           Наименование альтернативы
                        </TableHeaderColumn>
                        {alternatives.map( (item, i) => (
                           <TableHeaderColumn key={i + 'alternatives'} tooltip={item.value}>
                              {item.name}
                           </TableHeaderColumn>
                        ))}
                     </TableRow>
                  </TableHeader>
                  <TableBody
                     showRowHover={true}
                     stripedRows={this.state.stripedRows}
                     displayRowCheckbox={false}
                  >
                     {struct.map( (row, i) => (
                        <TableRow key={i}>
                           {row.map((item, j) => (
                              <TableRowColumn key={j}>
                                 <ValidationField2 id={[i, j]}
                                                   value={item}
                                                   type={j===0?'strinng':'number'}
                                                   handleChange={self.onFieldChange}
                                 />
                              </TableRowColumn>
                           ))}
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            )
         });
1
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


   generateSet(protections, costs, struct) {
      //
   }

   onAddSet() {
      this.setState({isDialogOpen: true})
   }

   onCloseDialog() {
      this.setState({isDialogOpen: false})
   }
}
