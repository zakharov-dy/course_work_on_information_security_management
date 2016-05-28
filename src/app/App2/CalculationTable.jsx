import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeader from 'material-ui/lib/table/table-header';
import TableBody from 'material-ui/lib/table/table-body';

const styles = {
   propContainerStyle: {
      width: 200,
      overflow: 'hidden',
      margin: '20px auto 0'
   },
   propToggleHeader: {
      margin: '20px auto 10px'
   },
   rowColumn1: {
      width: 50
   },
   rowColumn2: {
      width: 150
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

      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

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
                        Наборы средств защиты информации с максимальным значением целевой функции.
                     </TableHeaderColumn>
                  </TableRow>
               </TableHeader>
               <TableBody
                  showRowHover={true}
                  displayRowCheckbox={false}
               >
                  <TableRow>
                     <TableRowColumn style={styles.rowColumn1}>
                        Место
                     </TableRowColumn>
                     <TableRowColumn style={styles.rowColumn2}>
                        Значение
                     </TableRowColumn>
                     <TableRowColumn>
                        Альтернативы
                     </TableRowColumn>
                  </TableRow>
                  {data.map( (row, i) => (
                     <TableRow key={i}>
                        <TableRowColumn style={styles.rowColumn1}>
                           {i+1}
                        </TableRowColumn>

                        <TableRowColumn style={styles.rowColumn2}>
                           {row.value}
                        </TableRowColumn>

                        <TableRowColumn>
                           {row.names.join(', ')}
                        </TableRowColumn>
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
      let functionalSets = props.sets;
      if(functionalSets.length !== 0 ){
         // Для формирования массива массивов с номерами мест, каждое из
         // которых будет определять номер альтернативы в наборе, при этом
         // место в массиве будет определяться номером набора, сформируем
         // массив длинн наборов альтернатив.

         let functionalSetsLengths = functionalSets.map(function(item){
            return item.alternativeNames.length
         });

         let sets = [];
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
         if (generalSets.length > 5)  generalSets.length = 5;

         generalSets.reverse();
         this.setState({
            struct: generalSets
         })
      }
   }

}
