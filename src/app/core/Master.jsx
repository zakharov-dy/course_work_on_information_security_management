import React from 'react';
import Card from '../../../node_modules/material-ui/lib/card/card';
import CardActions from '../../../node_modules/material-ui/lib/card/card-actions';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';
import FloatingActionButton from '../../../node_modules/material-ui/lib/floating-action-button';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import ValidationField from './ValidationField2.jsx'
import SwipeableViews from 'react-swipeable-views';
import LinearProgress from '../../../node_modules/material-ui/lib/linear-progress';
import ContentAdd from '../../../node_modules/material-ui/lib/svg-icons/content/add';
import ContentRemove from '../../../node_modules/material-ui/lib/svg-icons/content/remove';
import TableFields from './TableFields.jsx'

const styles = {
   headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400
   },
   slide: {
      padding: 10
   }
};

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
 *       {Boolean} isDisable - кнопка отключена?
 * @state:
 *     {Array} protections - массив "хороших" критериев.
 *     {Array} costs - массив издержек.
 *     {Array} struct - структура, хранящая в себе значения по всем
 *     критериям и названия альтернатив.
 *     {Boolean} isNextButtonDisable - кнопка перехода к следующему
 *     состоянию активна?
 */

export default class Master extends React.Component {
   constructor(props, context)
   {
      super(props, context);

      this.onRightButtonClick = this.onRightButtonClick.bind(this);
      this.getRightButtonName = this.getRightButtonName.bind(this);
      this.validateNextStep = this.validateNextStep.bind(this);

      this.state = {
         contentIndex: 0,
         isNextButtonDisable: true
      };
   }

   render(){
      let props = this.props,
         state = this.state,
         costs = state.costs,
         protections = state.protections,
         contentIndex = state.contentIndex,
         alternatives;

      if(typeof costs !== 'undefined') {
         alternatives = protections.concat(costs);
      }

      return (
         <Card>
            <CardHeader
               title={props.text[contentIndex].title}
               subtitle={props.text[contentIndex].subtitle}
            />
            <CardText>
               <LinearProgress
                  min={progressProps.min}
                  mode="determinate"
                  max={progressProps.max}
                  value={this.state.contentIndex} />
            </CardText>
            <CardText>
               {props.text[contentIndex].content}
            </CardText>

            <CardText>
               <SwipeableViews
                  index={this.state.contentIndex}
               >
                  <div style={styles.slideContent}>
                     <FirstStep handleChange={this.validateNextStep}/>
                  </div>
                  <div style={styles.slideContent}>
                     <GeneratorFeatures criteriaCaption='Название критерия'
                                        criteriaWeight='Вес критерия'
                                        handleChange={this.validateNextStep}
                     />
                  </div>
                  <div style={styles.slideContent}>
                     <GeneratorFeatures criteriaCaption='Название критерия'
                                        criteriaWeight='Вес критерия'
                                        handleChange={this.validateNextStep}/>
                  </div>
                  <div style={styles.slideContent}>
                     <TableFields alternatives={alternatives}
                                  name={state.functionalSubsystemName}
                                  handleChange={this.validateNextStep}
                                  active={state.contentIndex === 3}

                     />
                  </div>
               </SwipeableViews>
            </CardText>
            <CardActions>
               <RaisedButton label={this.getRightButtonName()}
                             onMouseDown={this.onRightButtonClick}
                             disabled={state.isNextButtonDisable}
                             secondary={true}
               />
            </CardActions>

         </Card>
      );
   }


   onRightButtonClick(){
      let state = this.state,
         contentIndex = state.contentIndex,
         costs = state.costs,
         protections = state.protections,
         struct = state.struct,
         name = state.functionalSubsystemName;

      if (contentIndex !== 3){
         this.setState({
            contentIndex: contentIndex + 1,
            isNextButtonDisable: true
         });
      }
      else {
         this.props.onFinish(name, protections, costs, struct);
      }
   }

   getRightButtonName(){
      return this.state.contentIndex !== 3 ? 'Далее' : 'Готово'
   }


   validateNextStep(params) {
      let isNextButtonDisable = true;
      switch (this.state.contentIndex){
         case 0:
            if(params.value !== ''){
               isNextButtonDisable = false;
            }

            this.setState({
               functionalSubsystemName: params.value,
               isNextButtonDisable: isNextButtonDisable
            });
            break;

         case 1:
            isNextButtonDisable = !(params.every(function(item){
               return item.errorValueText === '' && item.errorNameText === ''
            }));
            this.setState({
               protections: params,
               isNextButtonDisable: isNextButtonDisable
            });
            break;

         case 2:
            isNextButtonDisable = !(params.every(function(item){
               return item.errorValueText === '' && item.errorNameText === ''
            }));
            this.setState({
               costs: params,
               isNextButtonDisable: isNextButtonDisable
            });
            break;

         case 3:
            isNextButtonDisable = !(params.every(function(row){
               return row.every(function(item){return item !== ''});
            }));

            if (!isNextButtonDisable) {
               this.setState({
                  struct: params
               })
            }
            this.setState({
               isNextButtonDisable: isNextButtonDisable
            });
            break;
      }
   }
}

class FirstStep extends React.Component {
   constructor(props, context)
   {
      super(props, context);

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(id, errorText, value){
      this.props.handleChange({id: id, errorText: errorText, value: value})
   }

   render(){
      return (
         <ValidationField  type="string"
                           handleChange={this.handleChange}/>
      );
   }
}

class GeneratorFeatures extends React.Component {
   constructor(props, context)
   {
      super(props, context);

      this.handleNumberFieldChange = this.handleNumberFieldChange.bind(this);
      this.handleStringFieldChange = this.handleStringFieldChange.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.addItem = this.addItem.bind(this);


      this.state = {
         items: [{name: '', value: 1, errorValueText: '', errorNameText: ''}]
      };
   }

   handleNumberFieldChange(id, errorText, value){
      let state = this.state,
         items = state.items;

      items[id].value = value;
      items[id].errorValueText = errorText;

      this.setState({
         items: items
      });

      this.props.handleChange(items)
   }

   handleStringFieldChange(id, errorText, value){
      let state = this.state,
         items = state.items;

      items[id].name = value;
      items[id].errorNameText = errorText;

      this.setState({
         items: items
      });

      this.props.handleChange(items)
   }

   deleteItem(value) {
      let state = this.state,
         items = state.items;
      items.splice(value, 1);

      this.setState({
         items: items
      });

      this.props.handleChange(items)
   }

   addItem(){
      let state = this.state,
         items = state.items;
      items.push({name: '', value: 1, errorValueText: '', errorNameText: ''});

      this.setState({
         items: items
      })
   }

   render(){
      let state = this.state;
      let self = this;
      let features = state.items.map(function(item, i, array){
         let deleteItem = function(){
            let value = i;
            self.deleteItem(value);
         };
         return (
            <table key={i}>
               <tbody>
               <tr>
                  <td>
                     <ValidationField  type="string"
                                       caption={self.props.criteriaCaption}
                                       value={item.name}
                                       id={i}
                                       handleChange={self.handleStringFieldChange}/>
                  </td>
                  <td>
                     <ValidationField  type="number"
                                       caption={self.props.criteriaWeight}
                                       value={item.value}
                                       id={i}
                                       min={0}
                                       max={1}
                                       handleChange={self.handleNumberFieldChange}/>
                  </td>
                  <td>
                     <FloatingActionButton
                        id={i}
                        mini={true}
                        secondary={true}
                        onMouseDown={deleteItem}>
                        <ContentRemove />
                     </FloatingActionButton>
                  </td>
               </tr>
               </tbody>
            </table>
         )
      });
      return (
         <div>
            {features}
            <FloatingActionButton
               mini={true}
               secondary={true}
               onMouseDown={this.addItem}>
               <ContentAdd />
            </FloatingActionButton>
         </div>
      );
   }
}
