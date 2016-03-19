/*
 * Компонент - контент приложения Расчет рационального варианта реагирования на событие нарушения информационной безопасности
 * @props:
 *     {Number} scheme - номер схемы, согласно которй нужно построить график.
 *     {Number} step - шаг графика.
 *     {Array} damages - массив, со значениями, введенными пользователем.
 * @state:
 *     {String, Boolean} errorText - имя ошибки.
 */

import React from 'react';
import Chart from 'chart.js/Chart';

const data = [
   {
      "struct":[
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
      "damage":{
         "v1":0,
         "v2":0.1,
         "v3":0.5,
         "v4":1
      },
      "chartData":{
         "label":[
            "блокирование ТД",
            "DOS-атака на атакующую станцию",
            "Отсутствие реагирования"
         ],
         "fillColor":[
            "rgba(220,220,220,0.2)",
            "rgba(151,187,205,0.2)",
            "rgba(70,191,189,0.2)"
         ],
         "strokeColor":[
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ],
         "pointColor":[
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ],
         "pointHighlightStroke":[
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ]
      }
   },
   {
      "struct": [
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
      "damage": {
         "v1": 0,
         "v2": 0.1,
         "v3": 1
      },
      "chartData": {
         "label": [
            "блокирование ТД",
            "DOS-атака на атакующую станцию",
            "Отсутствие реагирования"
         ],
         "fillColor": [
            "rgba(220,220,220,0.2)",
            "rgba(151,187,205,0.2)",
            "rgba(70,191,189,0.2)"
         ],
         "strokeColor": [
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ],
         "pointColor": [
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ],
         "pointHighlightStroke": [
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ]
      }
   },
   {
      "struct": [
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
      ],
      "damage": {
         "v1": 0,
         "v2": 0.1,
         "v3": 0.5,
         "v4": 1
      },
      "chartData": {
         "label": [
            "блокирование ТД",
            "DOS-атака на атакующую станцию",
            "Отсутствие реагирования"
         ],
         "fillColor": [
            "rgba(220,220,220,0.2)",
            "rgba(151,187,205,0.2)",
            "rgba(70,191,189,0.2)"
         ],
         "strokeColor": [
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ],
         "pointColor": [
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ],
         "pointHighlightStroke": [
            "rgba(220,220,220,1)",
            "rgba(151,187,205,1)",
            "rgba(70,191,189,0.2)"
         ]
      }
   }
];
const lastPointOnX = 1;

class AppChart extends React.Component {
   constructor(props, context) {
      super(props, context);
      //this.inputChange = this.inputChange.bind(this);
   }

   generateChart(index, damage, deltaP) {
      //// Массив - все комбинации z(вектор z). Каждый z представляет собой
      ////    строку - комбинацию из набора structs - массива со структурой графа.
      //this.combination_set = [];
      //// Массив - элемент массива combination_set для работы функции _branch.
      //this.combination = [];
      //// Массив для хранения данных по оси y
      //this.arrayData = [];
      // Объект с текущей структурой графа, которую выбрал пользователь
      let struct = data[this.props.scheme];

      //// Массив ущерба
      //this.damage = damage;
      //// Шаг графика.
      //this.deltaP = deltaP;
      //// Формируем массив комбинаций для построения z
      //this._branch(this.initBranchNumber);
      //// Формируем массив строк J
      //this._formationJ();
      //// Формируем массив данных по оси x
      //this._formArrayY();
      //// Формируем массив точек для каждого элемента массива arrayY
      //this._formData();
      //// Флормируем данные для графика и отправляем их на построение(Массив
      ////    данных для каждого из графиков, цвета графиков, шаг графика).
      //this._createDataChart();
   }
   render() {

      return (
         <canvas id="myChart" width="400" height="400"></canvas>
      );
   }
}

export default AppChart;