import React from "react";
import { View, Text } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';

const Star = ({rating}) => {

  const stars = [...Array(Math.ceil(rating))];

  return (
    <View style={{flexDirection: 'row'}}>
      {
        stars.map((_, i) => {
          const name = Math.floor(rating) > i ? 'star' : 'star-half';
          return <Icon key={i} name={name} color="#FFD64C" />
        })
      }
    </View>
  );
};

export default Star;
