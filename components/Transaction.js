import React from 'react';

export default class Transaction extends React.Component {
  render() {
    const {value, address} = this.props;
    return (
      <div className="transaction container">
        <div className="col">
          <div>Value</div>
          <div>Address</div>
        </div>
        <div className="col">
          <div>{value}</div>
          <div>{address}</div>
        </div>
      </div>
    );
  }
}