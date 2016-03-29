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
import TextField from 'material-ui/lib/text-field';

const styles = {
   numberFieldCaption: {
      fontSize: 'large'
   }
};

class ValidationField extends React.Component {

   constructor(props, context) {
      super(props, context);
      this.onChange = this.onChange.bind(this);
      this.state = {
         errorText: false
      };
   }

   render() {
      return (
            <table>
               <tbody>
                  <tr>
                     <td style={styles.numberFieldCaption}>
                        {this.props.caption}
                     </td>

                     <td>
                        <TextField
                           value={this.props.value}
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
    * Функция смены значения input'а и присваивания ему состояния и ошибки, в
    * случае, если значение не является валидным. Вызывается при событии в input.
    *
    */
   onChange(event) {
      event.stopPropagation();
      if(this.props.type === 'string'){
         let target = event.target,
            handleChange = this.props.handleChange,
            value = target.value,
            errorText;
         value === '' ? errorText = 'Поле обязательно для заполнения' : errorText = '';
         
         this.setState({
            errorText: errorText
         });

         if (typeof handleChange === 'function') handleChange(this.props.id, errorText, value);
      }
      else {
         let target = event.target;
         let value = target.value;
         let numberValue = +value;

         let min = this.props.min;
         let max = this.props.max;
         let handleChange = this.props.handleChange;
         
         let errorText = '';
         if (isNaN(numberValue)) errorText = 'Невалидное значение';
         else if (min && numberValue < min) errorText = 'Значение меньше' +
            ' нижней' +
            ' границы';
         else if (max && numberValue >= max) errorText = 'Значение больше' +
            ' верхней границы';

         this.setState({
            errorText: errorText
         });
         if (typeof handleChange === 'function') handleChange(this.props.id, errorText, value);
      }
   }
}

export default ValidationField;