import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import findDuplicateCount from './findDuplicateCount'

class App extends Component {
  state = {
    count: 0,
    textArea: [],
    textAreaValues: {},
    totalDuplicateCount: 0
  }

  handleCount = () => {
    const { count } = this.state;
    this.setState({ count: count+1, textArea: [...Array(count+1)].map((m,i) => ++i) })
  }
  getValues = (e) => {
    const { textAreaValues } = this.state;
    const values = e.target.value.split('\n');
    textAreaValues[e.target.name] = {
      values,
      dupCount: findDuplicateCount([values])
    }
    this.setState({ textAreaValues });
  }
  handleDuplicateCount = () => {
    const { textAreaValues } = this.state;
    const allValues = Object.values(textAreaValues).map((i) => i.values);    
    this.setState({ totalDuplicateCount: findDuplicateCount(allValues)});
  }

  render() {
    const { count, textArea, textAreaValues, totalDuplicateCount } = this.state;
    // findDuplicateButton = count ? <button onClick={this.handleDuplicateCount}>Get Duplicate Count</button> : null,
    // dupCountValue = totalDuplicateCount ? <p>Total Duplicate Count is:{totalDuplicateCount}</p> : null;
    return (
      <React.Fragment>
        <div className="App">
          <button value="+" onClick={this.handleCount}>Add Array</button>
        </div>
        {textArea.map((i) => {
          return (
            <div key={i}>
              <textarea rows="4" cols="50" name={`arr-${i}`} onChange={this.getValues}></textarea>
              <p>Duplicate Value Count is:{textAreaValues[`arr-${i}`] ? textAreaValues[`arr-${i}`]['dupCount'] : ''}</p>
            </div>
          )
        })}
        {count ? <button onClick={this.handleDuplicateCount}>Get Duplicate Count</button> : null}
        {totalDuplicateCount ? <p>Total Duplicate Count is:{totalDuplicateCount}</p> : null}
        {/* {findDuplicateButton}
        {dupCountValue} */}
      </React.Fragment>
    );
  }
}

export default App;
