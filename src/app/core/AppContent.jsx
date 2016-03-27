import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import Paper from 'material-ui/lib/paper';

import SwipeableViews from 'react-swipeable-views';

const styles = {
   paper: {
      marginTop: '10px',
      width: '100%',
      // textAlign: 'center',
      display: 'inline-block'
   },

   headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400
   }

};

class AppContent extends React.Component {
   constructor(props, context) {
      super(props, context);

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
         <Paper style={styles.paper} zDepth={3}>
            {dialogs}
            <SwipeableViews
               index={this.props.contentIndex}
            >
               <div>
                  <FirstContent/>
               </div>
               <div>
                  <SecondContent/>
               </div>
            </SwipeableViews>
         </Paper>
      );
   }
}

export default AppContent;