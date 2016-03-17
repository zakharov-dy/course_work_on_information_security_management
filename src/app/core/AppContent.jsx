import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Dialog from 'material-ui/lib/dialog';

class AppContent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

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
      <div>
        {dialogs}
        <Content/>
      </div>
    );
  }
}

export default AppContent;
