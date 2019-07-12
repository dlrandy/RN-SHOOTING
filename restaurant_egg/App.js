/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

const restaurants = [
  {name: 'React Cafe', address: '123 Anywhere St'},
  {name: 'Fancy Restaurant', address: '799 Main St'},
  {name: 'Taco Place', address: '550 Maple Rd'},
  {name: "Tony's Diner", address: '4101 College St'},
  {name: 'Pasta Central', address: '706 Harper St'},
  {name: 'Burger Builder', address: '4869 Hamilton Dr'},
  {name: 'Pizza Express', address: '1049 Bird St'},
  {name: 'Teriyaki To Go', address: '1885 Tea Berry Lane'},
  {name: 'Maroon Deli', address: '1082 Stuart St'},
  {name: 'Prime Bar and Grill', address: '1848 Fairfax Dr'},
  {name: 'Dumpling House', address: '747 Kelly Dr'},
  {name: 'Hot Chicken', address: '1816 Olive St'},
  {name: "Luna's Tap Room", address: '3256 Spirit Dr'},
  {name: 'Quick Sandwich Shop', address: '2587 Cherry Ridge Dr'},
  {name: "Bobby's Burgers", address: '4152 Berkley St'},
  {name: 'Turnpike Diner', address: '4571 Central Ave'},
  {name: 'Bombay Express', address: '65 Queens Lane'},
  {name: 'Coffee Central', address: '3228 Oakwood Circle'},
  {name: "King's Garden", address: '2935 Victoria Ct'},
  {name: 'Salads and More', address: '2454 Preston St'},
];
class App extends React.Component {

  state = {
    search: null
  }

  render() {
    console.log('search: ', this.state.search);
    // debugger
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View>
            <Text
              style={styles.header}
            >
              Restaurants
            </Text>
            <TextInput style={styles.input} 
              placeholder="Live Search"
              onChangeText={text => {
                this.setState({ search: text});
              }}
              value={this.state.search}
            />
            <ScrollView contentContainerStyle={{paddingTop: 30}}>
              {restaurants.filter(place => {
                return !this.state.search || place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
              }).map((place, index) => {
                return (
                  <View key={place.name} style={[styles.row, {backgroundColor: index % 2 ==  0 ? 'white' : '#F3F3F7' }]}>
                    <Text style={styles.edges}>{index + 1}</Text>
                    <View style={styles.nameAddress}>
                      <Text>{place.name}</Text>
                      <Text style={styles.addressText}>{place.address}</Text>
                    </View>
                    <Text style={styles.edges}>Info</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
  
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "orange", flex: 1 
  },
  header: {
    padding: 40,
    fontSize: 30,
    textAlign: "center",
    color: "#0066CC",
    fontWeight: "300"
  },
  row: {
    flexDirection: 'row'
  },
  edges: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  nameAddress: {
    flexDirection: 'column',
    flex: 8
  },
  addressText: {
    color: 'grey'
  },
  input: {
    marginBottom: 30,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5'
}
});

export default App;
