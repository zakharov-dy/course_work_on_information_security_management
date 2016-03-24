import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import SwipeableViews from 'react-swipeable-views';
import LinearProgress from 'material-ui/lib/linear-progress';

class Master extends React.Component
{
   constructor(props, context)
   {
      super(props, context);

      this.onButtonClick = this.onButtonClick.bind(this);

      this.state = {
         contentIndex: 0
      };
   }

   onButtonClick(){
      this.setState({
         contentIndex: this.state.contentIndex + 1
      });
   }

   render(){
      return (
         <Card>
            <CardHeader
               title="Without Avatar"
               subtitle="Subtitle"
               actAsExpander={true}
               showExpandableButton={true}
            />
            <CardText>
               <SwipeableViews
                  index={this.state.contentIndex}
               >
                  <div>
                     <h2>Tabs with slide effect</h2>
                     Swipe to see the next slide.<br />
                  </div>
                  <div>
                     slide n°2
                  </div>
                  <div>
                     slide n°3
                  </div>
               </SwipeableViews>
               <LinearProgress
                  min={0}
                  mode="determinate"
                  max={2}
               value={this.state.contentIndex} />
            </CardText>
            <CardActions>
               <FlatButton label="Назад"/>
               <FlatButton label="Далее"
                           onMouseDown={this.onButtonClick}
               />
            </CardActions>

         </Card>
      );
   }
}

export default Master;