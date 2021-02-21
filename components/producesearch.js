// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../database/firebase';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

export default class ProduceSearch extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      queryy: '',
      test: '',
      results: []
    };
  }

  componentDidUpdate(prevState, prevProps) {
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

  queryProduce = () => {
    axios.get(`https://api.wegmans.io/products/search?query=salad&results=100&page=1&api-version=2018-10-18`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(e => console.log(e));
      console.log(this.state);
  }

//   handleRefresh = () => {
//     this.setState({ refreshing: false }, () => { this.queryProduce(this.state.query) }); // call fetchCats after setting the state
//   }

  render() {
    // this.state = { 
    //   displayName: firebase.auth().currentUser.displayName,
    //   uid: firebase.auth().currentUser.uid
    // }    
    const { queryy } = this.state;
    console.log("value: ", this.state);
    return (
      <View style={styles.container}>
        <SafeAreaView>
            <View >
                {/* <SearchBar
                  style={styles.searchBar}
                  platform="android"
                  searchIcon={{ size: 25 }}
                  placeholder="search for Wegman produce"
                  value={this.state.queryy}
                  ref={input => this.search = input}
                  onChangeText={() => this.handleChange}
                /> */}
                <SearchBar
                  style={styles.searchBar}
                  platform="android"
                  searchIcon={{size: 25}}
                  placeholder="test"
                  value={this.state.test}
                />
                <Button 
                  title="submit"
                  onPress={() => this.queryProduce()}
                />
            </View>
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
    alignItems: 'stretch',
    padding: 35,
    backgroundColor: '#fff',
    width: "100%"
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
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
    width: "100%"
  },
  searchBar: {
      width: "100%",
      flex: 1,
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent'
  }
});