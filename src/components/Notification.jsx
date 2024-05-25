import { Component } from 'react';

class DesktopNotification extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }
  }

  showNotification() {
    new Notification(this.props.texte);
  }

  render() {
    return (
      <div>
        <button onClick={this.showNotification}>Show notification</button>
      </div>
    );
  }
}

export default DesktopNotification;
