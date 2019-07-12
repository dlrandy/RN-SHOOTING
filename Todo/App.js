import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Keyboard,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Header from "./header";
import Footer from "./footer";
import Row from "./row";

const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete;
  });
};

// create a component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      value: "",
      items: [],
      filter: "ALL",
      dataSource: [],
      loading: true
    };
  }

  setSource = (dataSource, items, otherState = {}) => {
    this.setState({
      dataSource,
      items,
      ...otherState
    });
    AsyncStorage.setItem('items', JSON.stringify(items));
  };

  componentDidMount() {
    AsyncStorage.getItem("items").then(json => {
      try {
        const items = JSON.parse(json) || [];
        this.setSource(items, items, {loading: false});
      } catch (e) {
        this.setState({
          loading: false
        })
      }
    });
  }

  handleFilter = filter => {
    const { dataSource, items } = this.state;
    this.setSource(dataSource, filterItems(filter, dataSource), { filter });
  };

  handleClearComplete = () => {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter,newItems));
  };

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.dataSource.map(item => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };

  handleToggleAllComplete = () => {
    const { allComplete, dataSource } = this.state;

    const newItems = dataSource.map(item => ({
      ...item,
      complete: !allComplete
    }));

    this.setSource(dataSource, filterItems(this.state.filter, newItems), { allComplete: !allComplete });
  };

  handleUpdateText = (key, text) => {
    const newItems = this.state.dataSource.map(item => {
      if (item.key !== key) {
        return item;
      }
      return {
        ...item,
        text,
        value: text
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleEditing = (key, editing) => {
    const newItems = this.state.dataSource.map(item => {
      if (item.key !== key) {
        return item;
      }
      return {
        ...item,
        editing
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleRemoveItem = key => {
    const newItems = this.state.dataSource.filter(item => {
      return item.key !== key;
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };

  handleAddItem = () => {
    const { value, items, dataSource } = this.state;
    if (!value) {
      return;
    }
    const newItems = [
      ...dataSource,
      {
        key: String(Date.now()),
        value: value,
        complete: false
      }
    ];

    this.setSource(newItems, filterItems(this.state.filter, newItems), { value: "" });
  };

  render() {
    const { value, items, filter } = this.state;
    return (
      <View style={styles.container}>
        <Header
          value={value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <Row
                onRemove={() => this.handleRemoveItem(item.key)}
                key={item.key}
                text={item.value}
                editing={item.editing}
                onUpdate={text => this.handleUpdateText(item.key, text)}
                onToggleEdit={editing => this.handleToggleEditing(item.key, editing)}
                complete={item.complete}
                onComplete={complete =>
                  this.handleToggleComplete(item.key, complete)
                }
              />
            )}
          />
        </View>
        <Footer
          onClearComplete={this.handleClearComplete}
          count={filterItems("ACTIVE", this.state.items).length}
          onFilter={this.handleFilter}
          filter={filter}
        />
        {this.state.loading && <View style={styles.loading}>
        <ActivityIndicator
          animating
          size="large"
        />
      </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)"
  },
  content: {
    flex: 1
  }
});

export default App;
