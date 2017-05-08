import React from 'react';
import Transaction from './Transaction';

const MAX_TRANSACTIONS = 15;
let socket;

export default class BitcoinTransactions extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      transactions: [{value: 75621712, address: 12323412341234}, {value: 75621712, address: 12323412341234}, {value: 75621712, address: 12323412341234}, {value: 75621712, address: 12323412341234}],
      total: 2398477213,
      totalTransactions: 4
    };
  }

  componentDidMount() {
    socket = new WebSocket('wss://ws.blockchain.info/inv');

    socket.onopen = function () {
      socket.send(JSON.stringify({ op: "unconfirmed_sub"}));
    };
    socket.onmessage = this.handleSocketMessage.bind(this);
  }

  componentWillUnmount() {
    socket.close();
  }

  handleSocketMessage (msg) {
    let {transactions, total, totalTransactions} = this.state;
    const data = JSON.parse(msg.data);

    let newTransactions = [];
    if (data && data.x && data.x.out){
      newTransactions = data.x.out.map((newT) => {
        total += newT.value;
        totalTransactions += 1;
        return {
          value: newT.value,
          address: newT.addr
        }
      })
    }

    while (transactions.length + newTransactions.length > MAX_TRANSACTIONS){
      transactions.shift();
    }

    this.setState({
      total: total,
      totalTransactions: totalTransactions,
      transactions: transactions.concat(newTransactions)
    });
  }

  render() {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return (
      <div>
        <div className="title">Bitcoin Transaction Stream</div>
        <div className="streamContainer container">
          <div className="transactionsContainer col">
            {this.state.transactions.map(transaction =>
              <Transaction value={ formatter.format(transaction.value) } address={ transaction.address }/>
            )}
          </div>
          <div className="container col">
            <div className="col">
              <div>Total Value</div>
              <div>Total Transactions</div>
            </div>
            <div className = "col">
              <div>{formatter.format(this.state.total)}</div>
              <div>{this.state.totalTransactions}</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}