import React, { Component } from 'react';
import './App.css';
//import './Style.css';
import './slide.css';
//import {TemplateJsx} from './TemplateJsx.js';
class App extends Component {
  state = {
    stat:{requests_today : 0,requests_yesterday : 0,requests_month: 0,requests_last_month : 0,limit : 500},
    goldC: {"timestamp":0,"metal":"","currency":"","exchange":"","symbol":"","prev_close_price":0,"open_price":0,"low_price":0,"high_price":0,"open_time":0,"price":0,"ch":0,"chp":0,"ask":0,"bid":0},
    silverC: {"timestamp":0,"metal":"","currency":"","exchange":"","symbol":"","prev_close_price":0,"open_price":0,"low_price":0,"high_price":0,"open_time":0,"price":0,"ch":0,"chp":0,"ask":0,"bid":0},
    goldY: {"date":"","timestamp":0,"metal":"","exchange":"","currency":"","price":0,"prev_close_price":0,"ch":0,"chp":0},
    silverY: {"date":"","timestamp":0,"metal":"","exchange":"","currency":"","price":0,"prev_close_price":0,"ch":0,"chp":0}
  };

  componentDidMount() {
    setInterval(()=>{
            this.getGoldC();
            this.getGoldY();
            this.getSilverC();
            this.getSilverY();
    },30000);
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
	  if (response.status !== 200)
      throw Error(body.message);
	  return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };


  getStat = async e => {
    e.preventDefault();
    const response = await fetch('/api/stat');
    const body = await response.json();
	  if (response.status !== 200)
      throw Error(body.message);
    var data = JSON.parse(body.express);
    data["limit"]=500;
    this.setState({ stat: data })
	  return body;
  };

  getGoldC = async e => {
    const response = await fetch('/api/rates/gold/current');
    const body = await response.json();
	  if (response.status !== 200)
      throw Error(body.message);
    var data = JSON.parse(body.express);
    this.setState({ goldC: data })
	  return body;
  };

  getGoldY = async e => {
    const response = await fetch('/api/rates/gold/yesterday');
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    var data = JSON.parse(body.express);
    this.setState({ goldY: data })
    return body;
  };

  getSilverC = async e => {
    const response = await fetch('/api/rates/silver/current');
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    var data = JSON.parse(body.express);
    this.setState({ silverC: data })
    return body;
  };

  getSilverY = async e => {
    const response = await fetch('/api/rates/silver/yesterday');
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    var data = JSON.parse(body.express);
    //console.log("Yesterday Silver:"+JSON.stringify(data));
    this.setState({ silverY: data })
    return body;
  };

  render() {
    return (<div>
   <div> <img height="95px" src={ require('./images/logo.jpg') } alt="GOLD RATES" /></div>
   <div>
     <h2> Current Data</h2>
      <table style={{border: 2}}>
        <thead>
            <tr>
              <th>TimeStamp</th>
              <th>Metal</th>
              <th>Currency</th>
              <th>Exchange Name</th>
              <th>Symbol</th>
              <th>Previous Close</th>
              <th>Open</th>
              <th>Low</th>
              <th>High</th>
              <th>Open Time</th>
              <th>Current Price</th>
              <th>Change</th>
              <th>Change Percentage</th>
              <th>Ask</th>
              <th>Bid</th>
            </tr>
        </thead>
         <tbody>
            <tr>
              <td>{this.state.goldC.timestamp}</td>
              <td>{this.state.goldC.metal}</td>
              <td>{this.state.goldC.currency}</td>
              <td>{this.state.goldC.exchange}</td>
              <td>{this.state.goldC.symbol}</td>
              <td>{this.state.goldC.prev_close_price}</td>
              <td>{this.state.goldC.open_price}</td>
              <td>{this.state.goldC.low_price}</td>
              <td>{this.state.goldC.high_price}</td>
              <td>{this.state.goldC.open_time}</td>
              <td>{this.state.goldC.price}</td>
              <td>{this.state.goldC.ch}</td>
              <td>{this.state.goldC.chp}</td>
              <td>{this.state.goldC.ask}</td>
              <td>{this.state.goldC.bid}</td>
            </tr>
            <tr>
              <td>{this.state.silverC.timestamp}</td>
              <td>{this.state.silverC.metal}</td>
              <td>{this.state.silverC.currency}</td>
              <td>{this.state.silverC.exchange}</td>
              <td>{this.state.silverC.symbol}</td>
              <td>{this.state.silverC.prev_close_price}</td>
              <td>{this.state.silverC.open_price}</td>
              <td>{this.state.silverC.low_price}</td>
              <td>{this.state.silverC.high_price}</td>
              <td>{this.state.silverC.open_time}</td>
              <td>{this.state.silverC.price}</td>
              <td>{this.state.silverC.ch}</td>
              <td>{this.state.silverC.chp}</td>
              <td>{this.state.silverC.ask}</td>
              <td>{this.state.silverC.bid}</td>
            </tr>
         </tbody>
      </table>
      <br />
      <br />
      <h2> History Data</h2>
        <table style={{border: 2}}>
          <thead>
              <tr>
                <th>Metal</th>
                <th>Current Date</th>
                <th>TimeStamp</th>
                <th>Exchange Name</th>
                <th>Currency</th>
                <th>Price</th>
                <th>Previous Price</th>
                <th>Change</th>
                <th>Change Percentage</th>
              </tr>
          </thead>
           <tbody>
              <tr>
                <td>{this.state.goldY.metal}</td>
                <td>{this.state.goldY.date}</td>
                <td>{this.state.goldY.timestamp}</td>
                <td>{this.state.goldY.exchange}</td>
                <td>{this.state.goldY.currency}</td>
                <td>{this.state.goldY.price}</td>
                <td>{this.state.goldY.prev_close_price}</td>
                <td>{this.state.goldY.ch}</td>
                <td>{this.state.goldY.chp}</td>
              </tr>
              <tr >
                <td>{this.state.silverY.metal}</td>
                <td>{this.state.silverY.date}</td>
                <td>{this.state.silverY.timestamp}</td>
                <td>{this.state.silverY.exchange}</td>
                <td>{this.state.silverY.currency}</td>
                <td>{this.state.silverY.price}</td>
                <td>{this.state.silverY.prev_close_price}</td>
                <td>{this.state.silverY.ch}</td>
                <td>{this.state.silverY.chp}</td>
              </tr>
           </tbody>
        </table>
   </div>
   <br />
   <br />
    <div>
      Get Stats for requests used:
      <form onSubmit={this.getStat}>
        <input type="submit" value="Get Stats" /><br /><br />
        <label>Today's Hit:</label>{this.state.stat.requests_today}<br />
        <label>Yesterday's Hit:</label>{this.state.stat.requests_yesterday}<br />
        <label>This Month:</label>{this.state.stat.requests_month}<br />
        <label>Last Month:</label>{this.state.stat.requests_last_month}<br />
        <label>Limit:</label>{this.state.stat.limit}<br />
      </form>
    </div>
   </div>);
  }
}export default App;
