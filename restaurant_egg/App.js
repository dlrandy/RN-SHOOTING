import React, { Component } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';


import RestaurantList from 'components/RestaurantList';
import RestaurantInfo from 'components/RestaurantInfo';
import About from 'components/About';
import AddReview from 'components/AddReview';
import Splesh from 'components/Splesh';

const AppNavigator = createStackNavigator({
  Home: {screen: RestaurantList},
  Info: { screen:  RestaurantInfo}
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#0066CC',
      color: '#FFF'
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      color: '#FFF'
    }    
  }
});

const TabNavigator = createBottomTabNavigator({
  List: {screen: AppNavigator},
  About: {screen: About}
},{
  defaultNavigationOptions: ({navigation}) => {
    return {
      tabBarIcon: ({tintColor}) => {
        const route = navigation.state.routeName;
        const iconName = {
          List: 'list',
          'About': 'info-circle'
        }[route];
        return <Icon name={iconName}  color={tintColor} size={22}/>
      },
      tabBarOptions: {
        activeBackgroundColor: '#E6F0FA'
      }
    };
  }
})

// AppNavigator ---> TabNavigator --->modal
// export default createAppContainer(TabNavigator);
const ModalNavigator =  createStackNavigator({
  Tabs: {screen: TabNavigator},
  AddReview: {screen: AddReview},
  Main: {screen: Splesh},
},{
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    gesturesEnabled: false
  },
  initialRouteName: 'Main',
});

const Main = createAppContainer(ModalNavigator);

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <Main />
    )
  }
}