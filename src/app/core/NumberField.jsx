/*
 * Компонент - числовой инпут.
 * @props:
 *     {Number} id - id инпута.
 *     {String} caption - имя инпута.
 *     {Number} minValue - минимальное значение.
 *     {Number} minValue - максимальное значение.
 *     {Function} handleChange - функция, срабатывающая по собтию изменения значения.
 * @state:
 *     {String, Boolean} errorText - имя ошибки.
 */
import React from 'react';
import TextField from 'material-ui/lib/text-field';


class NumberField extends React.Component {
   constructor(props, context) {
      super(props, context);
      // this.handleChangeSelectField = this.handleChangeSelectField.bind(this);
      this.onChange = this.onChange.bind(this);
      this.state = {
         errorText: false,
      };
   }

   /*
    * Функция смены значения input'а и присваивания ему состояния и ошибки, в случае, если значение не является валидным. Вызывается при событии в input.
    *
    */
   onChange(event) {
      let target = event.target;
      let value = +target.value;

      let minValue = this.props.minValue;
      let maxValue = this.props.maxValue;
      let handleChange = this.props.handleChange

      let errorText = false;
      if (isNaN(value)) errorText = 'Невалидное значение'
      else if (value < minValue) errorText = 'Значение меньше нижней границы'
      else if (value >= maxValue) errorText = 'Значение больше верхней границы'
      if (typeof handleChange === 'function') handleChange(this.props.id, errorText, value);

      this.setState({
         errorText: errorText,
      });
   }

   render() {
      return (
         <TextField
            errorText={this.state.errorText}
            onChange={this.onChange}
         />
      );
   }
}

export default NumberField;