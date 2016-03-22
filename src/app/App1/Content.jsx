/*
 * Компонент - контент приложения Расчет рационального варианта реагирования на событие нарушения информационной безопасности
 *
 */

import React from 'react';
import SelectField from 'material-ui/lib/SelectField';
import TextField from 'material-ui/lib/text-field';
import NumberField from './../core/NumberField.jsx';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import ChartData from './Chart.jsx';


class Content extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.inputChange = this.inputChange.bind(this);
      this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
      this.getClearDamages = this.getClearDamages.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
      this.state = {
         scheme: 0,
         damages: this.getClearDamages(1),
         stepParams: {},
         isButtonActivate: false
      };
   }

   /*
    * Функция возвращает "чистые" данные для
    *   построения инпутов ущерба в зависимости от схемы.
    *
    */
   getClearDamages(scheme) {
      let damages;
      scheme === 1 ? damages = [{},{},{},{}] : damages = [{},{},{}];

      for (let i = 0; i < damages.length; i++) {
         damages[i].name = 'C(v' + (i + 1) + ')';
         damages[i].id = i;
      }
      return damages;
   }

   /*
    * Функция смены значения селектора и построения 'чистых' инпутов. Вызывается при событии в селекторе.
    *
    */
   handleChangeSelectField(event, index, scheme) {
      if (scheme !== this.state.value) {
         this.setState({
            scheme: scheme,
            damages: this.getClearDamages(scheme),
            isButtonActivate: false
         })
      }
   }


   isGenerateButtonReady(){
      let isStepReady = this.state.stepParams.errorText !== '';
      let isDamagesReady = this.state.damages.filter(function(item) {
         return item.errorText !== '';
      }).length === this.state.damages.length;
      return isDamagesReady || isStepReady
   }

   /*
    * Функция смены значения input'а и присваивания ему состояния и ошибки, в случае, если значение не является валидным. Вызывается при событии в input.
    *
    */
   inputChange(id, errorText, value){
      if (id === 'stepId') {
         let stepParams = this.state.stepParams;
         stepParams.value = value;
         stepParams.errorText = errorText;
         this.setState({
            stepParams: stepParams,
            isButtonActivate: false
         })
      }
      else {
         let damages = this.state.damages;
         damages[id].errorText = errorText;
         damages[id].value = value;
         this.setState({
            damages: damages,
            isButtonActivate: false
         })
      }
   }

   onButtonClick(){
      this.setState({isButtonActivate: true})
   }


   render() {
      let self = this;
      let damagesTextField = this.state.damages.map(function (item, i, array) {
         return (
            <NumberField
               key={'damagesTextField' + i}
               id={item.id}
               minValue={0}
               maxValue={1}
               handleChange={self.inputChange}
               caption={item.name}/>
         )
      });
      let damages = {};
      if(!this.isGenerateButtonReady()){
         let stateDamages = this.state.damages;
         for(let i=0; i<stateDamages.length; i++){
            let key = 'v' + (i+1);
            damages[key] = stateDamages[i].value;
         }
      }

      return (
         <div>
            <h2>Выберите граф связи вариантов реагирования и исходов.</h2>
            <SelectField
               ref='SelectField'
               value={this.state.scheme}
               onChange={this.handleChangeSelectField}>
               <MenuItem value={0} primaryText="Граф №1"/>
               <MenuItem value={1} primaryText="Граф №2"/>
               <MenuItem value={2} primaryText="Граф №3"/>
            </SelectField>
            <h2>Заполните величину ущерба от 0 до 1</h2>
            {damagesTextField}
            <h2>Заполните шаг графика от 0,01 до 1</h2>
            <NumberField
               id={'stepId'}
               minValue={0.01}
               maxValue={1}
               handleChange={this.inputChange}/>
            <RaisedButton
               label='Строить график'
               label="Secondary"
               onMouseDown={this.onButtonClick}
               disabled={this.isGenerateButtonReady()}/>
            <ChartData
               index={this.state.scheme}
               damages={damages}
               step={+this.state.stepParams.value}
               disable={this.isGenerateButtonReady() || !this.state.isButtonActivate}/>
         </div>
      );
   }
}

export default Content;


