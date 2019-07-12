//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// create a component
class Header extends Component {
  render() {
    const {
      value,
      onChange,
      onAddItem,
      onToggleAllComplete,
    } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleAllComplete}>
          <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput
          defaultValue={value}
          onChangeText={onChange}
          onSubmitEditing={onAddItem}
          placeholder="what needs to be done?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  toggleIcon: {
    fontSize: 30,
    color: '#ccc',
  },
  input: {
    flex:1,
    height: 50
  },
  header: {
    paddingHorizontal:16,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

//make this component available to the app
export default Header;
