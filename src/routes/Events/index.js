import React, { Component } from 'react';

import EventsDashboard from '../../containers/EventsDashboard';

class Events extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'Pending',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <EventsDashboard />
      </div>
    );
  }
}

export default Events;
