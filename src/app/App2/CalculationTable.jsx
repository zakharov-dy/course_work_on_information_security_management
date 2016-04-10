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
 * @state:
 *     {Array} generalSets - массив результатов вычисления наборов.
 */
export default class TableFields extends React.Component {

   constructor(props) {
      super(props);

      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.updateGeneralSets = this.updateGeneralSets.bind(this);

      this.state = {
         struct: undefined
      };
   }

   componentWillReceiveProps (nextProps) {
      this.updateGeneralSets(nextProps)
   }

   render() {
      let data = this.state.struct;
      if (typeof data !== 'undefined'){
         return (
            <Table
               fixedHeader={true}
               selectable={false}
            >
               <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                  <TableRow>
                     <TableHeaderColumn colSpan={3}
                                        style={{textAlign: 'center'}}>
                        Список наборов альтернатив
                     </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                     <TableHeaderColumn>
                        Место
                     </TableHeaderColumn>
                     <TableHeaderColumn>
                        Значение
                     </TableHeaderColumn>
                     <TableHeaderColumn>
                        Альтернативы
                     </TableHeaderColumn>
                  </TableRow>
               </TableHeader>
               <TableBody
                  showRowHover={true}
                  stripedRows={this.state.stripedRows}
                  displayRowCheckbox={false}
               >
                  {data.map( (row, i) => (
                     <TableRow key={i}>
                        <TableHeaderColumn>
                           {i}
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn>
                           {row.value}
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn>
                           {row.names.join(' ')}
                        </TableHeaderColumn>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         )
      }
      else return (<div></div>)
   }

   componentDidMount(){
      this.updateGeneralSets(this.props)
   }

   updateGeneralSets(props){
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
      if(props.sets.length !== 0 ){
         //преобразовываем исходный массив к удобному для нас виду
         let sets = JSON.parse(JSON.stringify(props.sets));
         let functionalSets = sets.map(function(functionalSet){
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

         // Для формирования массива массивов с номерами мест, каждое из
         // которых будет определять номер альтернативы в наборе, при этом
         // место в массиве будет определяться номером набора, сформируем
         // массив длинн наборов альтернатив.

         let functionalSetsLengths = functionalSets.map(function(item){
            return item.alternativeNames.length
         });

         sets = [];
         let currentSet = new Array(functionalSets.length);
         let branch = function branch (depth, currentSet) {
            for(let i=0; i<functionalSetsLengths[depth]; i++){
               currentSet[depth] = i;
               if (depth === functionalSetsLengths.length-1) {
                  sets.push(currentSet.map(function(item){return item}));
               }
               else branch(depth+1, currentSet)
            }
         };
         branch(0, currentSet);

         let generalSets = sets.map(function (set) {
            let names,
               value,
               alternativeValues = set.reduce(function(sum, item, index){
                  sum.protections += functionalSets[index].protections[item];
                  sum.costs += functionalSets[index].costs[item];
                  return sum
               }, {costs:0, protections:0});
            value = alternativeValues.protections / alternativeValues.costs;

            names = set.map(function (item, i) {
               return functionalSets[i].alternativeNames[item]
            });

            return {
               names: names,
               value: value
            }
         });

         generalSets.sort(function (a, b) {
            return a.value - b.value;
         });
         generalSets.reverse();
         this.setState({
            struct: generalSets
         })
      }
   }

}
