import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import Paper from 'material-ui/lib/paper';


import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';


const styles = {
   paper: {
      marginTop: '10px',
      width: '100%',
      height: '100%',
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

      let Content = this.props.content;
      return (
         <Paper style={styles.paper} zDepth={3}>
            {dialogs}
            <Tabs
               value={this.state.value}
               onChange={this.handleChange}
            >
               <Tab label="Комбинаторно-морфологический синтез рациональных наборов СЗИ" value="a" >
                  <div>
                     <h2 style={styles.headline}>Controllable Tab A</h2>
                     <p>
                        Tabs are also controllable if you want to programmatically pass them their values.
                        This allows for more functionality in Tabs such as not
                        having any Tab selected or assigning them different values.
                     </p>
                  </div>
               </Tab>
               <Tab label="Расчет рационального варианта реагирования на событие нарушения ИБ" value="b">
                  <Content/>
               </Tab>
            </Tabs>
         </Paper>
      );
   }
}

export default AppContent;