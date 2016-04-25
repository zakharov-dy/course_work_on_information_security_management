import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import Paper from 'material-ui/lib/paper';
import PureRenderMixin from 'react-addons-pure-render-mixin';


import SwipeableViews from 'react-swipeable-views';

const styles = {
   firstContent: {
      //minHeight: '500px'
      maxHeight: '100%',
      minHeight: '100%'
   },

   secondContent: {
      minHeight: '500px'
   }

};

class AppContent extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

      this.handleChange = this.handleChange.bind(this);

      this.state = {
         value: 'a'
      };

   }

   handleChange(value) {
      this.setState({
         value: value
      });
   };

   render() {
      let dialogs = this.props.dialogParams.map(function (item, i, array) {
         let closeButton = (
            <RaisedButton
               key={'raisedButtonDialogs' + i}
               label={item.buttonCloseParams.caption}
               onMouseDown={item.buttonCloseParams.onClick}
               primary={true}
            />
         );
         return (
            <Dialog
               key={'dialog' + i}
               title={item.title}
               actions={closeButton}
               open={item.isOpen}
               children={item.content}
            />
         )
      });

      let FirstContent = this.props.firstContent;
      let SecondContent = this.props.secondContent;

      return (
         <div>
            {dialogs}
            <SwipeableViews
               style={styles.firstContent}
               slideStyle={styles.firstContent}
               containerStyle={styles.firstContent}
               index={this.props.contentIndex}
            >
               <div>
                  <FirstContent/>
               </div>
               <div style={styles.secondContent}>
                  <SecondContent/>
               </div>
            </SwipeableViews>

         </div>

      );
   }
}
//<Paper style={styles.paper} zDepth={3}>
//</Paper>
export default AppContent;