import React, { Component } from 'react';

export default class EmptyDecorator extends Component {
  render() {
    return (
      <div className="empty-decorator">
        <div className="empty-decorator__content">Упс</div>
      </div>
    );
  }
}