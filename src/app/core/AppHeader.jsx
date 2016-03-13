import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

class AppHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    let barButtonsParams = this.props.barButtonsParams;
    let barContent = barButtonsParams.map(function (item, i) {
      return (
        <RaisedButton
          key={i}
          label={item.name}
          onMouseUp={function() {console.log('Hello')}}
          style={item.style}
        />
      )
    });

    this.setState({
      barContent: barContent,
    });
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={this.props.title}
        children={this.state.barContent}
      />
    );
  }
}

export default AppHeader;
