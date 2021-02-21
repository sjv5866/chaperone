// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
//import firebase from '../database/firebase';
import SearchBar from 'react-native-elements';

export default class ProduceSearch extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      query: '',
      results: [],
      refreshing: true,
    }
  }

  ItemSeparator = () => {
    return(<View style={{
      height: 2,
      backgroundColor: "rgba(0,0,0,0.5)",
      marginLeft: 10,
      marginRight: 10,
    }}
    />);
  }
  handleChange = text => {
    this.setState({query: text});
  }

  queryProduce = text => {
    this.setState({ refreshing: true, query: text });
    fetch(`https://api.wegmans.io/products/search?query=${text}`)
      .then(res => res.json())
      .then(data => this.setState({results: data.results, refreshing: false}))
      .catch(e => console.log(e));
  }

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.queryProduce() }); // call fetchCats after setting the state
  }

  render() {
    // this.state = { 
    //   displayName: firebase.auth().currentUser.displayName,
    //   uid: firebase.auth().currentUser.uid
    // }    
    return (
      <View style={styles.container}>
        <View style={styles.searchSection}>
            <SearchBar
              searchIcon={{ size: 25 }}
              placeholder="search for produce from Wegmans"
              onChange={text => this.queryProduce(text)}
              value={this.state.query}
            />
        </View>
        <SafeAreaView>
            <FlatList
              data={this.state.results}
              renderItem={item => {
                <TouchableOpacity style={styles.container}>
                  <Text onPress={() => this.props.navigation.navigate('ItemInfo', {sku: data.sku, name: data.name})}>
                    {item.name.toString()}:    {item.sku.toString()}
                  </Text>
                </TouchableOpacity>
              }}
              keyExtractor={item => item.sku.toString()}
              ItemSeparatorComponent={() => this.ItemSeparator}
            />   
          </SafeAreaView>

        <Button
          color="#3740FE"
          title="Home"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  }
});