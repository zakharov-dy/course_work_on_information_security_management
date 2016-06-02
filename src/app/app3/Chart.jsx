/*
 * Компонент - контент приложения Расчет рационального варианта реагирования на событие нарушения информационной безопасности
 * @props:
 *     {Number} scheme - номер схемы, согласно которй нужно построить график.
 *     {Number} step - шаг графика.
 *     {Array} damages - массив, со значениями, введенными пользователем.
 *     {Boolean} disable - свойство, характеризующее готовность к переменам)
 * @state:
 *     {String, Boolean} errorText - имя ошибки.
 */

import React from 'react';
import Chart from 'chart.js/Chart';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeader from 'material-ui/lib/table/table-header';
import TableBody from 'material-ui/lib/table/table-body';

let myChart = undefined;

/**
 * Объект, содержащий в себе всю логику обработки данных
 */
let chartLogic = {
   // константа - массив со структурой графа.
   data: [
      [
         [
            {
               "v1":"p"
            },
            {
               "v3":"1-p"
            }
         ],
         [
            {
               "v1":"(1-p)/2"
            },
            {
               "v2":"(1-p)/2"
            },
            {
               "v4":"p"
            }
         ]
      ],
      [
         [
            {
               "v1": "p"
            },
            {
               "v3": "1-p"
            }
         ],
         [
            {
               "v1": "1/3"
            },
            {
               "v2": "1/3"
            },
            {
               "v3": "1/3"
            }
         ],
         [
            {
               "v1": "1-p"
            },
            {
               "v3": "p"
            }
         ]
      ],
      [
         [
            {
               "v1": "p"
            },
            {
               "v3": "1-p"
            }
         ],
         [
            {
               "v1": "p/2"
            },
            {
               "v2": "1-p"
            },
            {
               "v3": "p/2"
            }
         ],
         [
            {
               "v1": "(1-p)/2"
            },
            {
               "v2": "(1-p)/2"
            },
            {
               "v4": "p"
            }
         ]
      ]
   ],

   // константа - объект для хранения массивов цветов отрисовки графиков.
   chartData: {
      label: ["Первый вариант реагирования", "Второй вариант реагирования", "Третий вариант реагирования"],
      fillColor: ["rgba(220,220,220,0.2)", "rgba(151,187,205,0.2)", "rgba(70,191,189,0.2)"],
      strokeColor: ["rgba(220,220,220,1)","rgba(151,187,205,1)","rgba(70,191,189,0.2)" ],
      pointColor: ["rgba(220,220,220,1)",  "rgba(151,187,205,1)",  "rgba(70,191,189,0.2)"],
      pointHighlightStroke: ["rgba(220,220,220,1)", "rgba(151,187,205,1)", "rgba(70,191,189,0.2)"]
   },
   // константа для первого цикла функции _branch
   initBranchNumber: 0,
   // Константа - координата конечной точки графика по оси x.
   lastP: 1,
   /**
    * Функция, управляющая обработкой данных.
    *
    * @param {number} index - номер графика.
    * @param {array} damage - массив ущерба.
    * @param {number} deltaP - шаг графика.
    */
   _generateChart: function(index, damage, deltaP) {
      // Массив - все комбинации z(вектор z). Каждый z представляет собой
      //    строку - комбинацию из набора structs - массива со структурой графа.
      this.combination_set = [];
      // Массив - элемент массива combination_set для работы функции _branch.
      this.combination = [];
      // Массив для хранения данных по оси y
      this.arrayData = [];
      // Объект с текущей структурой графа, которую выбрал пользователь
      this.struct = this.data[index];
      // Массив ущерба
      this.damage = damage;
      // Шаг графика.
      this.deltaP = deltaP;
      // Формируем массив комбинаций для построения z
      this._branch(this.initBranchNumber);
      console.log('!!!');
      // Формируем массив строк J
      this._formationJ();
      // Формируем массив данных по оси x
      this._formArrayY();
      // Формируем массив точек для каждого элемента массива arrayY
      this._formData();
      // Формируем данные для графика и отправляем их на построение(Массив
      //    данных для каждого из графиков, цвета графиков, шаг графика).
      this._createDataChart();
   },

   /**
    * Функция, составляющая массив combination - всех комбинаций, каждая из
    *    которых представляет собой строку, хранящую формулу для конкретного z.
    *    Используются переменные:
    *       1. combination - массив для хранения всех комбинаций
    *       2. combination_set - массив для хранения текущей комбинации.
    *
    * @param {number} branchNumber - номер текущего уровня иерархии.
    */
   _branch: function _branch (branchNumber) {
      let struct = chartLogic.struct,
         combination = chartLogic.combination;
      if (branchNumber === struct.length) {
         let clone = [];
         for (let key in combination) {
            clone[key] = combination[key];
         }
         chartLogic.combination_set.push(clone);
      }
      else {
         for (let i = 0; i < struct[branchNumber].length; i++) {
            combination[branchNumber] = struct[branchNumber][i];
            _branch(branchNumber + 1);
         }
      }
   },

   /**
    * Функция, составляющая массив j_struct - массив конкретных j. Для
    * конкретного Ui(см. методические указания) умножает каждое z на
    * значение С(vi), взятого из массива damage.
    */
   _formationJ: function () {
      let combination_set = this.combination_set;
      this.j_struct = new Array(combination_set[0].length);
      let j_struct = this.j_struct;
      for (let i = 0; i < j_struct.length; i++) {
         j_struct[i] = '';
         for (let j = 0; j < combination_set.length; j++) {
            // формируем z
            for (let k = 0; k < combination_set[j].length; k++) {
               for (let key in combination_set[j][k]) {
                  if (combination_set[j][k].hasOwnProperty(key)) {
                     j_struct[i] += '(' +  combination_set[j][k][key] + ')'+ '*';
                  }
               }
            }
            // Умножаем z на С(Vi)
            for (let key2 in combination_set[j][i]) {
               j_struct[i] += chartLogic.damage[key2] + ' ';
            }
         }
         // Формируем j_struct
         j_struct[i] = j_struct[i].split(' ').join('+').slice(0, -1);
      }
   },

   /**
    * Функция, составляющая массив array - массив для координат по x.
    */
   _formArrayY: function () {
      this.arrayY = [];
      let deltaP = this.deltaP,
         lastP = this.lastP;
      // Формируем массив p-шек
      for (let i = 0; i <= lastP; i+= deltaP) {
         this.arrayY.push(i.toFixed(2));
      }
   },

   /**
    * Функция, составляющая массив arrayData - массив значений по Y для
    * каждого графика.
    */
   _formData: function () {
      this.arrayData = [];
      for (let k = 0; k <= this.struct.length; k++) {
         this.arrayData.push([]);
      }
      for ( let i = 0; i < this.j_struct.length; i++ ) {
         for ( let j = 0; j < this.arrayY.length; j++ ) {
            let p = this.arrayY[j];
            this.arrayData[i].push((eval(this.j_struct[i])).toFixed(2));
         }
      }
   },

   /**
    * Функция формирования данных для графика. По окончании запускает
    * функцию updateChart
    */
   _createDataChart: function() {
      let chartData = this.chartData,
         arrayData = this.arrayData,
         yData = [];
      for (let i = 0; i < this.j_struct.length; i++) {
         let chartDataElement = {
            label: chartData.label[i],
            fillColor: chartData.fillColor[i],
            strokeColor: chartData.strokeColor[i],
            pointColor: chartData.pointColor[i],
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: chartData.pointHighlightStroke[i],
            data: arrayData[i]
         };
         yData.push(chartDataElement);
      }

      let data = {
         labels: this.arrayY,
         datasets: yData
      };

      let options = {
         bezierCurve : false
      };
      updateChart(data, options);
   }
};

/**
 * Функция формирования графика.
 * @param {object} data - объект, содержащий структуру данных в виде,
 * необходимом для библиотеки chartjs.
 * @param {object} options - объект, содержащий структуру параметров в виде,
 * необходимом для библиотеки chartjs
 */
function updateChart(data, options) {
   if (typeof myChart !== 'undefined' && typeof myChart.datasets !== 'undefined') {
      myChart.destroy();
      let ctx = document.querySelector('canvas').getContext('2d');
      myChart = new Chart(ctx).Line(data, options);
   }
   else{
      let ctx = document.querySelector('canvas').getContext('2d');
      myChart = new Chart(ctx).Line(data, options);
   }
}

class AppChart extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.generateChart = this.generateChart.bind(this);
      this.getPValue = this.getPValue.bind(this);
      this.truncation = this.truncation.bind(this);
   }

   generateChart(index, damages, deltaP) {
      chartLogic._generateChart(index, damages, deltaP);
   }

   render(){
      console.log(chartLogic.combination_set);

      let self = this,
         width = 1000,
         halfBodyWidth = document.body.clientWidth * 0.75,
         combination_set = [],
         combinationSet,
         table1,
         table2;

      chartLogic.combination_set = [];
      chartLogic.combination = [];
      chartLogic.struct = chartLogic.data[this.props.index];
      chartLogic._branch(chartLogic.initBranchNumber);
      let arrayY = [],
         deltaP = 0.1,
         lastP = 1;
      // Формируем массив p-шек
      for (let i = 0; i <= lastP; i+= deltaP) {
         arrayY.push(i.toFixed(1));
      }
      if(chartLogic.combination_set.length !== 0){
         combinationSet = JSON.parse(JSON.stringify(chartLogic.combination_set));
         combinationSet[0].forEach(function(){combination_set.push([])});
         combinationSet.forEach(function (columns) {
            columns.forEach(function(column, j ) {
               for(let key in column){
                  column['key'] = key;
                  column['value'] = column[key];
               }
               combination_set[j].push(column)
            })
         });

      let pArray = combinationSet.map(function(item, i){
         return item.reduce(function(array, jtem, j){
            array.push('('+jtem.value+')');
            return array;
         }, []).join('*')
      });

         table1 = (
            <Table
               fixedHeader={true}
               selectable={false}
            >
               <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                  <TableRow>
                     <TableHeaderColumn>
                     </TableHeaderColumn>
                     {combination_set[0].map( (column, i) => (
                              <TableHeaderColumn>
                                 z{i+1}
                              </TableHeaderColumn>
                     ))}
                  </TableRow>
               </TableHeader>
               <TableBody
                  showRowHover={true}
                  displayRowCheckbox={false}
               >
                  {combination_set.map( (row, i) => (
                     <TableRow key={i}>
                        <TableRowColumn>
                           u{i+1}
                        </TableRowColumn>
                        {row.map( (column, j) => (
                           <TableRowColumn>
                              {column['key']}
                           </TableRowColumn>
                        ))}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         ),
         table2 = (
            <Table
               fixedHeader={true}
               selectable={false}
            >
               <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                  <TableRow>
                     <TableHeaderColumn>
                     </TableHeaderColumn>
                     {arrayY.map( (column, i) => (
                        <TableHeaderColumn>
                           Pa={column}
                        </TableHeaderColumn>
                     ))}
                  </TableRow>
               </TableHeader>
               <TableBody
                  showRowHover={true}
                  displayRowCheckbox={false}
               >
                  {pArray.map( (row, i) => (
                     <TableRow key={i}>
                        <TableRowColumn>
                           P(z{i+1})
                        </TableRowColumn>
                        {arrayY.map( (column, i) => (
                           <TableRowColumn>
                              {self.getPValue(row, column)}
                           </TableRowColumn>
                        ))}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            )

      }
      if(width < halfBodyWidth){
         width = halfBodyWidth;
      }

      let height = width / 3;

      return (
         <div>
            <h2>Таблица функции реализации</h2>
               {table1}
            <h2>Таблица вероятности реализации</h2>
               {table2}
            <h2>График зависимости значений целевой функции J от вероятности атаки</h2>
            <canvas id="myChart" width={width} height={height}>
            </canvas>
         </div>
      );
   }

   componentDidMount(){
      let props = this.props;
      if(!this.props.disable) this.generateChart(props.index, props.damages, props.step)
   }

   componentDidUpdate(){
      let props = this.props;
      if(!this.props.disable) this.generateChart(props.index, props.damages, props.step)
   }

   getPValue(evalString, value){
      let p = value;
      return this.truncation(eval(evalString))
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
   };
}

export default AppChart;
