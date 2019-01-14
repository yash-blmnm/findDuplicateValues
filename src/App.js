import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {findDuplicateCountArray, findDuplicateCountObjects} from './findDuplicateCount'
import { Icon, Grid, Form, Button, Divider } from 'semantic-ui-react'

class App extends Component {

  state = {
    count: 0,
    textAreaIds: [],
    textAreaValues: {},
    totalDuplicateCount: 0,
    properties: ["name", "price", "weight"],
    duplicateIndex: new Set(),
    newProperty: "",
    duplicateCount: 0
  }
  handleDuplicateCount = () => {
    const { textAreaValues } = this.state;
    let [duplicateIndex, count] = findDuplicateCountObjects(textAreaValues);
    this.setState({ totalDuplicateCount: count, duplicateIndex});
  }
  tempProperty = (e) => {
    this.setState({ newProperty: e.target.value});
  }
  addNewProperty = () => {
    const { properties, newProperty } = this.state;
    properties.push(newProperty);
    this.setState({ properties, newProperty: ''});
  }
  addProduct = () => {
    const { count, textAreaValues, properties, textAreaIds } = this.state;
    let tempCount = count+1;
    textAreaValues[`product-${tempCount}`] = properties.reduce((x, y) => { 
      x[y] = '';
      return x;
    }, {});
    textAreaIds.push(tempCount);
    this.setState({ count: tempCount, textAreaIds, textAreaValues });
  }
  editProduct = (e) => {
    console.log(e.target);
  }
  inputUpdate = (e) => {
    const { textAreaValues } = this.state;
    textAreaValues[e.target.form.getAttribute("name")][e.target.name] = e.target.value;
    this.setState({ textAreaValues });
  }
  getDuplicateCount = (e) => {
    const { textAreaValues } = this.state;
    const tempArray = Object.values(textAreaValues).map((i) => i[e.target.value]);
    this.setState({ duplicateCount: findDuplicateCountArray(tempArray) });
  }
  deleteProduct = (e) => {
    const { textAreaIds, textAreaValues } = this.state;
    const currentTarget = e.currentTarget.dataset.productId;
    delete textAreaValues[`product-${currentTarget}`];
    textAreaIds.splice(textAreaIds.indexOf(parseInt(currentTarget)),1);
    this.setState({ textAreaValues, textAreaIds });
  }

  render() {
    const { 
      count, 
      textAreaIds, 
      textAreaValues, 
      totalDuplicateCount, 
      properties, 
      duplicateIndex, 
      newProperty, 
      duplicateCount 
    } = this.state;
    return (
      <React.Fragment>
        <div className="App">
          <div className="sidebar">
            <h1 className="title center">Products</h1>
            <Form name="property-add" onSubmit={this.addNewProperty}>
              <Form.Input name="property" value={newProperty} placeholder="Add new Property" onChange={this.tempProperty} />
              <div className="add-property center">
                <span className="circle-icon" onClick={this.addNewProperty}><Icon name='add' /></span>
                <span className="hide-in-mobile">Add Property</span>
              </div>
            </Form>
          </div>
          <div className="main">
            <div className="container">
            {textAreaIds.map((i) => {
              return (
                <Grid.Column mobile={16} tablet={8} computer={4} key={i}>
                  <div className={duplicateIndex.has(`product-${i}`) ? "duplicate" : ""}>
                  <span className="delete-icon" data-product-id={i} onClick={this.deleteProduct} title="Delete Product"><Icon name='delete' /></span>
                    <Form name={`product-${i}`} onSubmit={this.editProduct}>
                      {properties.map((property) => {
                        return <Form.Input key={property} name={property} value={textAreaValues[`product-${i}`][property]} label={property} placeholder={property} onChange={this.inputUpdate} />
                      })}
                      <Form.Button primary>Save</Form.Button>
                    </Form>
                  </div>
                </Grid.Column>
              )
            })}
            <Grid.Column mobile={16} tablet={8} computer={4} key="0">
              <span className="circle-icon center" onClick={this.addProduct} title="Add Product"><Icon name='add' /></span>
            </Grid.Column>
          </div>
          <Divider />
          <div className="results center">
            <h5>Duplicate Count of property 
              <select onChange={this.getDuplicateCount}>
                <option value defaultValue>...</option>
                {properties.map((property) => {
                  return <option key={property} className="capital" value={property}>{property}</option>
                })}
              </select>
              is: <b>{duplicateCount}</b>
            </h5> 
            {count ? <Button primary onClick={this.handleDuplicateCount}>Find Duplicate Products</Button> : null}
            {totalDuplicateCount ? <h3>Total Duplicate Products are:<b>{totalDuplicateCount}</b></h3> : null}
          </div>
          <Divider />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
