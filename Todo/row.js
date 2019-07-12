import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";

class Row extends Component {
  render() {
    const { complete, text, editing, onComplete, onRemove, onToggleEdit, onUpdate} = this.props;
    const textComponent = (
      <TouchableOpacity style={styles.textWrap} onLongPress={() => onToggleEdit(true)} >
        <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
      </TouchableOpacity>
    );
    const removeButton = (
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.destroy}>X</Text>      
      </TouchableOpacity>
    );
    const editingComponent = (
      <View style={styles.textWrap}>
        <TextInput 
          onChangeText={onUpdate}
          autoFocus
          defaultValue={text}
          style={styles.input}
          multiline
        />
      </View>
    );

    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => onToggleEdit(false)} >
        <Text style={styles.doneText} >Save</Text>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <Switch value={complete} onValueChange={onComplete} />
        {editing ? editingComponent : textComponent}
        {editing ? doneButton : removeButton}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4d4d4d"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7
  },
  doneText: {
    color: "#4d4d4d",
    fontSize: 20
  },
  complete: {
    textDecorationLine: "line-through"
  },
  text: {
    fontSize: 24,
    color: "#4d4d4d",
  },
  destroy: {
    fontSize: 20,
    color: "#cc9a9a"
  }
})
export default Row;
