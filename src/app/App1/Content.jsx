/*
 * Компонент - контент приложения Расчет рационального варианта реагирования на событие нарушения информационной безопасности
 *
 */

import React from 'react';
import SelectField from 'material-ui/lib/SelectField';
import ValidationField from './../core/ValidationField.jsx';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import ChartData from './Chart.jsx';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardMedia from 'material-ui/lib/card/card-media';
import Dialog from 'material-ui/lib/dialog';

const images = [
   require('./../images/0.png'),
   require('./../images/1.png'),
   require('./../images/2.png')
]
const styles = {
   firstAppContainer: {
      width: '60%',
      marginLeft: '20%'
   },
   button: {
      margin: 12
   },
   imageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
   },
   dialog: {
      textAlign: 'center',
      position: 'absolute',
      width: '100%',
      maxWidth: 'none',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
   }
};

class Content extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.inputChange = this.inputChange.bind(this);
      this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
      this.getClearDamages = this.getClearDamages.bind(this);
      this.onGeneralButtonClick = this.onGeneralButtonClick.bind(this);
      this.onCloseDialog = this.onCloseDialog.bind(this);
      this.state = {
         scheme: 0,
         damages: this.getClearDamages(0),
         stepParams: {},
         isDialogChartOpen: false
      };
   }

   /*
    * Функция возвращает "чистые" данные для
    *   построения инпутов ущерба в зависимости от схемы.
    *
    */
   getClearDamages(scheme) {
      let damages;
      scheme === 1 ? damages = [{},{},{}] : damages = [{},{},{}, {}];

      for (let i = 0; i < damages.length; i++) {
         damages[i].name = 'C(v' + (i + 1) + ')';
         damages[i].id = i;
      }
      return damages;
   }

   /*
    * Функция смены значения селектора и построения 'чистых' инпутов.
    * Вызывается при событии в селекторе.
    *
    */
   handleChangeSelectField(event, index, scheme) {
      if (scheme !== this.state.value) {
         this.setState({
            scheme: scheme,
            damages: this.getClearDamages(scheme)
         })
      }
   }


   isGenerateButtonReady(){
      let isStepReady = this.state.stepParams.errorText === '';
      let isDamagesReady = this.state.damages.filter(function(item) {
         return item.errorText === '';
      }).length === this.state.damages.length;
      return isDamagesReady && isStepReady
   }

   /*
    * Функция смены значения input'а и присваивания ему состояния и ошибки, в
    * случае, если значение не является валидным. Вызывается при событии в input.
    *
    */
   inputChange(id, errorText, value){
      if (id === 'stepId') {
         let stepParams = this.state.stepParams;
         stepParams.value = value;
         stepParams.errorText = errorText;
         this.setState({
            stepParams: stepParams
         })
      }
      else {
         let damages = this.state.damages;
         damages[id].errorText = errorText;
         damages[id].value = value;
         this.setState({
            damages: damages
         })
      }
   }

   onGeneralButtonClick() {
      this.setState({isDialogChartOpen: true})
   }

   onCloseDialog() {
      this.setState({isDialogChartOpen: false})
   }

   render() {
      let self = this;
      let damagesTextField = this.state.damages.map(function (item, i, array) {
         return (
            <ValidationField key={'damagesTextField' + i}
               id={item.id}
               min={0}
               max={1}
               handleChange={self.inputChange}
               caption={item.name}/>
         )
      });
      let damages = {};

      if(this.isGenerateButtonReady()){
         let stateDamages = this.state.damages;
         for(let i=0; i<stateDamages.length; i++){
            let key = 'v' + (i+1);
            damages[key] = stateDamages[i].value;
         }
      }

      let closeButton = (
         <RaisedButton
            label='Закрыть'
            onMouseDown={this.onCloseDialog}
            primary={true}
         />
      );

      return (
         <div style={styles.firstAppContainer}>
            <Card>
               <CardHeader
                  title='Выберите модель принятия решений в виде графа связи вариантов реагирования и исходов.'
                  subtitle='Этап № 1'
               />
               <CardText>
                  <SelectField
                     ref='SelectField'
                     value={this.state.scheme}
                     onChange={this.handleChangeSelectField}>
                     <MenuItem value={0} primaryText="Граф №1"/>
                     <MenuItem value={1} primaryText="Граф №2"/>
                     <MenuItem value={2} primaryText="Граф №3"/>
                  </SelectField>
               </CardText>
               <CardMedia
               >
                  {/*<img src={`/images/${this.state.scheme}.png`}/>*/}
                  <img src={images[this.state.scheme]}/>
               </CardMedia>
            </Card>
            <Card>
               <CardHeader
                  title='Для заданной модели заполните величину ущерба от 0 до 1'
                  subtitle='Этап № 2'
               />
               <CardText>
                  {damagesTextField}
               </CardText>
            </Card>
            <Card>
               <CardHeader
                  title='Заполните шаг графика от 0,01 до 1'
                  subtitle='Этап № 3'
               />
               <CardText>
                  <ValidationField
                     id={'stepId'}
                     min={0.01}
                     max={1}
                     handleChange={this.inputChange}
                     caption='dP'/>
                  <RaisedButton
                     label='Строить график зависимости целевой функции от значений ущерба '
                     onMouseDown={this.onGeneralButtonClick}
                     disabled={!this.isGenerateButtonReady()}
                     secondary={true}
                     secondary={true}
                  />
               </CardText>
            </Card>
            <Dialog
               title='Варианты реагирования на события нарушения ИБ'
               actions={closeButton}
               open={this.state.isDialogChartOpen}
               contentStyle={styles.dialog}
               autoScrollBodyContent={true}
               children={
                <ChartData
                  index={this.state.scheme}
                  damages={damages}
                  step={+this.state.stepParams.value}
                  disable={!(this.isGenerateButtonReady() && this.state.isDialogChartOpen)}
                  style={styles.button}/>
               }
            />
         </div>
      );
   }
}
export default Content;
