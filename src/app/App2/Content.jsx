import React from 'react';
import Master from './../core/Master.jsx'

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

export default class TabsExampleSwipeable extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         slideIndex: 0
      };
   }

   render() {
      return (
         <Master />
      );
   }
}
