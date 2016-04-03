import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';


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
 * Компонент - Вычислитель.
 * @props:
 *     {Array} sets - Массив наборов:
 *       {String} name - Имя набора.
 *       {Array} protections - массив "хороших" критериев.
 *       {Array} costs - массив издержек.
 *       {Array} struct - структура, хранящая в себе значения по всем
 *          критериям и названия альтернатив.
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
      let sets = nextProps.sets.map(function(set, i, sets){
         let costs = set.costs,
            protections = set.protections,
            name = set.name,
            setData = set.struct,
            protectionsValue,
            costsValue,
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

      let setsLength = sets.map(function(item){
         return item.protections.length
      });

      let generalLength = setsLength.reduce(function(mul, current) {
         return mul * current;
      }, 1);

      let general = [];

      for(let i=0; i<generalLength; i++){
         general.push(new Array);
      }

      let something = setsLength.map(function(item, i){
         let seats = [],
            pushCount = generalLength / item;
         for (let c=0; c < pushCount - 1; c++){
            
         }
      });




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