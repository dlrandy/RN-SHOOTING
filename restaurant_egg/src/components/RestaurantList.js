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
  FlatList,
  View,
  Text,
  TextInput,
  Image,
  StatusBar
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

import axios from "axios";

import RestaurantRow from "components/RestaurantRow";
import PizzaImage from "images/pizza.png";
import { getBaseUrl } from "utils";
class App extends React.Component {
  static navigationOptions = {
    header: null
  }
  
  state = {
    search: null,
    restaurants: []
  };

  componentDidMount() {
    axios
      .get(`${getBaseUrl()}/restaurants`)
      .then(result => this.setState({ restaurants: result.data }));
  }

  render() {
    console.log("search: ", this.state.search);
    const { restaurants } = this.state;
    // debugger
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View
            style={{
              marginTop: 40,
              alignItems: "center"
            }}
          >
            <Image source={PizzaImage} />
 
          </View>
          <View>
            <Text style={styles.header}>Restaurants</Text>
            <TextInput
              style={styles.input}
              placeholder="Live Search"
              onChangeText={text => {
                this.setState({ search: text });
              }}
              value={this.state.search}
            />
            <FlatList
              data={restaurants.filter(place => {
                return (
                  !this.state.search ||
                  place.name
                    .toLowerCase()
                    .indexOf(this.state.search.toLowerCase()) > -1
                );
              })}
              renderItem={({ item, index }) => {
                return <RestaurantRow place={item} index={index} />;
              }}
              keyExtractor={item => item.name}
              initialNumToRender={16}
              ListHeaderComponent={<View style={{ height: 30 }} />}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "orange",
    flex: 1
  },
  header: {
    padding: 40,
    fontSize: 30,
    textAlign: "center",
    color: "#0066CC",
    fontWeight: "300"
  },
  row: {
    flexDirection: "row"
  },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  nameAddress: {
    flexDirection: "column",
    flex: 8
  },
  addressText: {
    color: "grey"
  },
  input: {
    marginBottom: 30,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5"
  }
});

export default App;
