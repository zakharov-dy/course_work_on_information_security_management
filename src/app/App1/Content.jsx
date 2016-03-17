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


class Content extends React.Component {
   constructor(props, context) {
      super(props, context);
      this.inputChange = this.inputChange.bind(this);
      this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
      //this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
      this.getClearDamages = this.getClearDamages.bind(this);
      this.state = {
         scheme: 0,
         damages: this.getClearDamages(1),
         step: false,
      };
   }

   /*
    * Функция возвращает "чистые" данные для
    *   построения инпутов ущерба в зависимости от схемы.
    *
    */
   getClearDamages(scheme) {
      let damages;
      scheme === 2 ? damages = [{},{},{}] : damages = [{},{},{},{}];

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
            value: scheme,
            damages: this.getClearDamages(scheme),
         })
      }
   }

   /*
    * Функция смены значения input'а и присваивания ему состояния и ошибки, в случае, если значение не является валидным. Вызывается при событии в input.
    *
    */
   handleChangeTextValue(event) {
      let target = event.target;
      let id = +target.id[target.id.length-1] - 1;
      let value = +target.value;
      let damages = this.state.damages;

      if (typeof value === 'number' && value > 0 && value <= 1 ) {
         damages[id].errorText = ''
      } else {
         damages[id].errorText = 'Невалидное значение'
      }

      damages[id].value = target.value;

      this.setState({
         damages: damages,
      });
   }

   inputChange(id, errorText, value){
      if (id === 'stepId') {
         this.setState({
            step: errorText,
            stepValue: value,
         })
      }
      else {
         let damages = this.state.damages;
         damages[id].errorText = errorText;
         damages[id].value = value;
      }
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
            />
         )
      });

      let isGenerateButtonDisabled = this.props.step;
      return (
         <div>
            <h2>Выберите граф связи вариантов реагирования и исходов.</h2>
            <SelectField
               ref='SelectField'
               value={this.state.value}
               onChange={this.handleChangeSelectField}>
               <MenuItem value={1} primaryText="Граф №1"/>
               <MenuItem value={2} primaryText="Граф №2"/>
               <MenuItem value={3} primaryText="Граф №3"/>
            </SelectField>
            <h2>Заполните величину ущерба от 0 до 1</h2>
            {damagesTextField}
            <h2>Заполните шаг графика от 0,01 до 1</h2>
            <NumberField
               id={'stepId'}
               minValue={0}
               maxValue={1}
               handleChange={this.inputChange}
            />
            <RaisedButton
               label="Строить график"
               disabled={isGenerateButtonDisabled}/>
         </div>
      );
   }
}

export default Content;


