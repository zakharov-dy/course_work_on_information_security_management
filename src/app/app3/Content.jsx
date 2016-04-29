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
   content:{
      textAlign: 'center'
   }
};

const text = [
   {
      title: '',
      subtitle: '',
      content: ''
   },
   {
      title: 'Показатель "Защищенность"',
      subtitle: 'Этап №1',
      content: 'Осуществите ввод критериев показателя "Защищенность" и определите соответствующие им весовые коэффициенты.'
   },
   {
      title: 'Показатель "Издержки"',
      subtitle: 'Этап №2',
      content: 'Осуществите ввод критериев показателя "Издержки" и определите соответствующие им весовые коэффициенты.'
   },
   {
      title: 'Определение альтернатив',
      subtitle: 'Этап №3',
      content: 'Определите набор альтернатив функциональной подсистемы'
   }

];

export default class Content2 extends React.Component {

   constructor(props) {
      super(props);

      //this.onCloseDialog = this.onCloseDialog.bind(this);
      this.onCloseDialog = this.onCloseDialog.bind(this);
      //this.onAddSet = this.onAddSet.bind(this);
      this.generateSet = this.generateSet.bind(this);
      this.onOpenDialog = this.onOpenDialog.bind(this);
      
      this.state = {
         struct: [],
         isDialogOpen: false,
         isResultDialogOpen: false
      };
   }

   render() {
      let closeResultButton = (
            <RaisedButton
               label='Закрыть'
               onMouseDown={}
               primary={true}
            />
         ),
         newSessionButton = (
            <RaisedButton
               label='Ввести данные'
               onMouseDown={this.onOpenDialog}
               primary={true}
            />
         ),
         DialogContent;

         if (this.state.struct.length !== 0) {
            DialogContent = (
               <div>
                  <h1>
                     Результаты по первому методу
                  </h1>
                  <ol>
                     {this.state.struct.map(function (item, i) {
                        return (<li>{item.name}: {item.result}</li>)
                     })}
                  </ol>
                  {newSessionButton}
               </div>
            )
         } else {
            DialogContent = (
               <div>
                  {newSessionButton}
               </div>
               )
         }  
      return (
         <div style={styles.content}>
            {DialogContent}
            <Dialog
               title='Результаты'
               actions={closeResultButton}
               contentStyle={styles.dialog}
               open={this.state.isResultDialogOpen}
               autoScrollBodyContent={true}
               children={
                  <Master text={text} onFinish={this.generateSet} startProgressValue={1}/>
               }
            />
         </div>
      );
   }

   generateSet(name, protections, costs, struct) {

      let alternativesLength = struct[0].length,
         maxMin = [];

      // Преобразование данных в числовые значения
      struct = struct.map(function (set) {return set.map(function (item, i) {
         if(i !== 0) item = +item
         return item
      })});

      // Формирование массива с именами альтернатив и обрезание имен у исходного массива
      let newStruct = struct.reduce(function(result, set){
         result.push({name: set.shift()})
         return result
         }, []);

      // Нахождение минимального и максимального значений для каждого критерия 
      for(let i=0; i<alternativesLength; i++){
         maxMin.push(struct.reduce(function (result, current, j) {
            if(current[i] > result.max) result.max = current[i]
            if(current[i] < result.min) result.min = current[i]
            return result
            }, {max: 0, min: Infinity}))
      }

      // дублируем исходные данные для второго метода.  
      let secondStrict = JSON.parse(JSON.stringify(struct));

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
      })

      // Схлопывание всех критериев по альтернативе в одно значение
      newStruct.forEach(function (item, i) {
         item.result = normalizeStrict[i].reduce(function (result, item) {
            result = result + item
            return result
         }, 0)
      })

      // Сортировка всех значений в одно
      newStruct.sort(function (a, b) {
         return a.result - b.result
      }).reverse()

      this.setState({
         isResultDialogOpen: false,
         struct: newStruct
      })
   }

   onOpenDialog() {
     this.setState({isResultDialogOpen: true})
   }
}