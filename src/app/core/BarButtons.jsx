import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class ButtonGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div>
          <RaisedButton
            label="Choose an Image"
            style={styles.button}
          >
          <RaisedButton
            label="Label before"
            labelPosition="before"
            primary={true}
            icon={<ActionAndroid />}
            style={styles.button}
          />
          <RaisedButton
            label="Github Link"
            linkButton={true}
            href="https://github.com/callemall/material-ui"
            secondary={true}
            style={styles.button}
            icon={<FontIcon className="muidocs-icon-custom-github"/>}
          />
        </div>
    );
  }
}

export default ButtonGroup;