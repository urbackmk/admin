import React from 'react';

import { Input } from 'antd';

const { TextArea } = Input;


export default class EventNotes extends React.Component {

  render() {
    return (
      <div>
        <TextArea rows={4} />
      </div>
    )
  }



}


