import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import ValidationField2 from './../core/ValidationField2.jsx'

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';

const styles = {
   propContainerStyle: {
      width: 200,
      overflow: 'hidden',
      margin: '20px auto 0'
   },
   propToggleHeader: {
      margin: '20px auto 10px'
   }
};

/*
 * Компонент - Сборщик.
 * @props:
 *     {Function} handleChange - функция, вызываемая по событию в сборщике.
 *     {Array} alternatives - Массив издержек:
 *       {String} name - Имя альтернативы.
 *       {String} value - Вес альтернативы.
 *     {String} name - имя таблицы
 *     {Boolean} active
 */
export default class TableFields extends React.Component {

   constructor(props) {
      super(props);
      
      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
      this.onAddItemClick = this.onAddItemClick.bind(this);
      this.onRemoveItemClick = this.onRemoveItemClick.bind(this);
      this.addItem = this.addItem.bind(this);
      this.onFieldChange = this.onFieldChange.bind(this);

      
      this.state = {
         struct: undefined
      };
   }

   componentWillReceiveProps (nextProps) {
      if(typeof this.state.struct === 'undefined' && nextProps.active){
         let struct = [];
         struct = this.addItem(struct, nextProps);
         this.setState({
            struct: struct
         });
      }
   }


   render() {
      let self = this,
         props = this.props,
         state = this.state,
         alternatives = props.alternatives,
         struct = state.struct;

      if (props.active){
         return (
            <div>
               <Table
                  fixedHeader={true}
                  selectable={false}
               >
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                     <TableRow>
                        <TableHeaderColumn colSpan={alternatives.length + 1}
                                           tooltip={props.name}
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
               <FloatingActionButton
                  mini={true}
                  secondary={true}
                  onMouseDown={this.onAddItemClick}>
                  <ContentAdd />
               </FloatingActionButton>
               <FloatingActionButton
                  mini={true}
                  secondary={true}
                  onMouseDown={this.onRemoveItemClick}>
                  <ContentRemove />
               </FloatingActionButton>
            </div>
         );
      }
      else return (<div></div>)

   }

   onAddItemClick(){
      let struct = this.addItem(this.state.struct, this.props);
      this.setState({
         struct: struct
      });
      this.props.handleChange(struct);
   }

   onRemoveItemClick(){
      let struct = this.state.struct;
      struct.pop();
      this.setState({
         struct: struct
      });
      this.props.handleChange(struct);
   }

   addItem(struct, props){
      struct.push(new Array(props.alternatives.length + 1));
      let index = struct.length - 1;
      for (let i = 0; i<struct[index].length; i++) {
         i === 0? struct[index][i] = '' : struct[index][i] = 0
      }
      return struct
   }

   onFieldChange(id, errorText, value){
      let struct = this.state.struct;

      if(errorText !== ''){
         value = ''
      }

      struct[id[0]][id[1]] = value;

      this.setState({
         struct: struct
      });
      
      this.props.handleChange(struct)
   }
}
