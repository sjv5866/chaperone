import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '../database/firebase';

export default class ItemInfo extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      ingredients: [],
      isHangoverSafe: false
    }
  }

  componentWillMount() {
    NavigationPreloadManager.setOptions({title: this.props.name});
    fetch(`https://api.wegmans.io/products/${this.props.sku}`)
    .then(res => res.json())
    .then(data => { 
        this.setState({ingredients: data.ingredients})
        this.setState({isHangoverSafe: (data[alcohol] == null)})
     })
    .catch(e => console.log(e));


  }

  render() {
    // this.state = { 
    //     displayName: firebase.auth().currentUser.displayName,
    //     uid: firebase.auth().currentUser.uid
    // }

    return() => {
        <View>
          <Text>
            {this.state.ingredients[0]}
          </Text>
          <Text>
            Is it safe for treating hangovers? {this.state.isHangoverSafe ? "yes" : "NO"}
          </Text>
        </View>
    }
  }
// componentWillMount() {
//     NavigationPreloadManager.setOptions({title: this.PaymentResponse.name});
// }
}