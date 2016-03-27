import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import ValidationField from './../core/ValidationField.jsx'
import SwipeableViews from 'react-swipeable-views';
import LinearProgress from 'material-ui/lib/linear-progress';

const progressProps = {
   min: 0,
   max: 3
};

/*
 * Компонент - Мастер.
 * @props:
 *     {Function} onFinish - функция, вызываемая по завершении работы мастера.
 *     {Array} text - текстовая информация мастера:
 *       {String} title - титульник.
 *       {String} subtitle - подзаголовок.
 *       {String} content - текст.
 *     {Object} progressProps:
 *       {Number} min - минимальное значение.
 *       {Number} max - максимальное значение.
 *       {Number} value - Текущее значение прогресса.
 *     {Array} buttons:
 *       {String} caption - Надпись.
 *       {Boolean}isDisable - кнопка отключена?
 */

export default class Master extends React.Component {
   constructor(props, context)
   {
      super(props, context);

      this.onRightButtonClick = this.onRightButtonClick.bind(this);
      this.getRightButtonName = this.getRightButtonName.bind(this);

      this.state = {
         contentIndex: 0
      };
   }

   onRightButtonClick(){
      let contentIndex = this.state.contentIndex;
      if (contentIndex !== 3){
         this.setState({
            contentIndex: contentIndex + 1
         });
      }
      else {
         this.props.onFinish(this.state.structure);
      }
   }

   getRightButtonName(){
      return this.state.contentIndex !== 3 ? 'Далее' : 'Готово'
   }

   render(){
      let props = this.props;
      let state = this.state;
      let contentIndex = state.contentIndex;

      return (
         <Card>
            <CardHeader
               title={props.text[contentIndex].title}
               subtitle={props.text[contentIndex].subtitle}
               actAsExpander={true}
               showExpandableButton={true}
            />
            <CardText>
               {props.text[contentIndex].content}
            </CardText>

            <CardText>
               <SwipeableViews
                  index={this.state.contentIndex}
               >
                  <div>
                     <FirstStep />
                  </div>
                  <div>
                     slide n°2
                  </div>
                  <div>
                     slide n°3
                  </div>
                  <div>
                     slide n°4
                  </div>
               </SwipeableViews>
               <LinearProgress
                  min={progressProps.min}
                  mode="determinate"
                  max={progressProps.max}
                  value={this.state.contentIndex} />
            </CardText>
            <CardActions>
               <FlatButton label="Назад"/>
               <FlatButton label={this.getRightButtonName()}
                           onMouseDown={this.onRightButtonClick}
               />
            </CardActions>

         </Card>
      );
   }
}

class FirstStep extends React.Component {
   constructor(props, context)
   {
      super(props, context);

      // this.onRightButtonClick = this.onRightButtonClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      //
      // this.state = {
      //    contentIndex: 0
      // };
   }

   // onRightButtonClick(){
   //    let contentIndex = this.state.contentIndex;
   //    if (contentIndex !== 3){
   //       this.setState({
   //          contentIndex: contentIndex + 1
   //       });
   //    }
   //    else {
   //       this.props.onFinish(this.state.structure);
   //    }
   // }
   //
   handleChange(){

   }

   render(){
      let props = this.props;
      let state = this.state;

      return (
         <ValidationField  type="string"
                           handleChange={this.handleChange}/>
      );
   }
}