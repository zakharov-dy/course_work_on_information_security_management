/*
 * Компонент - контент приложения Расчет рационального варианта реагирования на событие нарушения информационной безопасности
 *
 */

import React from 'react';

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
   }
};

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
         <div style={styles.firstAppContainer}>
            <h1>Второй контент</h1>
            <Card>
               <CardHeader
                  title='Выберите граф связи вариантов реагирования и исходов.'
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
            </Card>
            <Card>
               <CardHeader
                  title='Заполните величину ущерба от 0 до 1'
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
                  <NumberField
                     id={'stepId'}
                     minValue={0.01}
                     maxValue={1}
                     handleChange={this.inputChange}/>
                  <RaisedButton
                     label='Строить график'
                     label="Secondary"
                     onMouseDown={this.onButtonClick}
                     disabled={this.isGenerateButtonReady()}
                  />
               </CardText>
            </Card>

            <ChartData
               index={this.state.scheme}
               damages={damages}
               step={+this.state.stepParams.value}
               disable={this.isGenerateButtonReady() || !this.state.isButtonActivate}
               style={styles.button}/>
         </div>
      );
   }
}

export default Content;


