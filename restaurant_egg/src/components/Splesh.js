//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

import spleshVideo from "@videos/lights.mp4";
// create a component
class SpleshScreen extends Component {
  componentDidMount() {
    const navigator = this.props.navigation;
    setTimeout(() => {
      navigator.push("Tabs");
    }, 6000);
  }

  render() {
    console.log(spleshVideo);
    return (
      <View style={styles.container}>
        <Video
          source={spleshVideo} // Can be a URL or a local file.
          resizeMode="cover"
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

//make this component available to the app
export default SpleshScreen;
