import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
   button: {
      margin: 12
   }
};

class AppHeader extends React.Component {
   constructor(props, context) {
      super(props, context);
   }

   componentWillMount() {
      let barButtonsParams = this.props.barButtonsParams;
      let barContent = barButtonsParams.map(function (item, i) {
         return (
            <MenuItem
               key={i}
               primaryText={item.name}
               onMouseDown={item.onButtonClick}
            />
         )
      });

      this.setState({
         barContent: barContent
      });
   }

   render() {
      return (
         <AppBar
            showMenuIconButton={false}
            title={this.props.title}
            iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
            {this.state.barContent}
            </IconMenu>
         }
         />
      );
   }
}

export default AppHeader;
