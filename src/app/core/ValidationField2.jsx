/*
 * Компонент - числовой инпут.
 * @props:
 *     {Number} id - id инпута.
 *     {String} caption - имя инпута.
 *     {String} type - тип импута.
 *     {Number} min - минимальное значение.
 *     {Number} man - максимальное значение.
 *     {Function} handleChange - функция, срабатывающая по событию изменения значения.
 *     {Number|String} value - значение инпута.
 * @state:
 *     {String, Boolean} errorText - имя ошибки.
 */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import TextField from 'material-ui/lib/text-field';

const styles = {
   numberFieldCaption: {
      fontSize: 'large'
   }
};

class ValidationField extends React.Component {

   constructor(props, context) {
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

      this.onChange = this.onChange.bind(this);
      this.state = {
         errorText: false
      };
   }

   render() {
      let props = this.props;
      return (
            <table>
               <tbody>
                  <tr>
                     <td style={styles.numberFieldCaption}>
                        {props.caption}
                     </td>
                     <td>
                        <TextField
                           value={props.value}
                           errorText={this.state.errorText}
                           onChange={this.onChange}
                        />
                     </td>
                  </tr>
               </tbody>
            </table>
      );
   }

   /*
    * @params:
    *    {Object} event - событие.
    * 
    * Функция смены значения input'а и присваивания ему состояния и ошибки, в
    * случае, если значение не является валидным. Вызывается при событии в input.
    * По завершении отправляет уведомление об изменении родительскому компоненту.
    *
    */
   onChange(event) {
      event.stopPropagation();
      let props = this.props,
         target = event.target,
         handleChange = props.handleChange,
         value = target.value,
         errorText = '';

      if(value === ''){
         errorText = 'Поле обязательно для заполнения';
      }
      else if(props.type === 'number') {
         let min = props.min,
            max = props.max,
            numberValue = +value;

         if (isNaN(numberValue)) errorText = 'Невалидное значение';
         else if (min && numberValue <= min) errorText = 'Значение меньше' +
            ' нижней границы';
         else if (max && numberValue > max) errorText = 'Значение больше' +
            ' верхней границы';
      }


      if (typeof handleChange === 'function') handleChange(props.id, errorText, value);

      this.setState({
         errorText: errorText
      });

   }
}

export default ValidationField;