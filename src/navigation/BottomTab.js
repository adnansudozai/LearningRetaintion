import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Header, Badge} from 'react-native-elements';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
import colors from '../theme/colors';
import {
  homeon,
  homeoff,
  progresson,
  progressoff,
  leaderboardon,
  leaderboardoff,
  moreon,
  moreoff,
  smalllogo,
  HomeColor,
  Home1,
  Leaderboardcolor,
  Leaderboard1,
  progresscolor,
  progress,
  listcolor,
  list,
} from '../assets';
//classes
import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  AppState,
  TouchableOpacity,
} from 'react-native';
 import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Collection from '../screens/Auth/Filters1/Filters1';

import Settings from '../screens/App/Settings';
import Home from '../screens/App/Home/Home';
import Unanswered from '../screens/App/Unanswered/Unanswered';
import Leaderboard from '../screens/App/Leaderboard/Leaderboard';
import MyProgress from '../screens/App/MyProgress/MyProgress';
import More from '../screens/App/More/More';
import Progress from '../screens/App/Progress/Progress';
import PushNotification from 'react-native-push-notification';
//import database from '@react-native-firebase/database';

import AsyncStorage from '@react-native-community/async-storage';
const INITIAL_ROUTE_NAME = 'settings';
import {connect} from 'react-redux';
import {logoutSuccess, updateuserinfo} from '../redux/actions/auth';
import {storeurl} from '../redux/actions/storeurl';

function BottomTabNavigator({
  navigation,
  route,
  user,
  logoutSuccess,
  updateuserinfo,
  userData
}) {
  const [position, setPosition] = useState(new Animated.Value(2));
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [index, setIndex] = useState(0);
 
  const [lboard, setlboard] = useState(userData!=null?userData.progressbar_show:'No');
  console.log("Datataa",userData)
 
  const [routes, setRoutes] = useState(lboard==='No'?[
    {key: 'Home', title: 'Home'},
   
    {key: 'Progress', title: 'Progress'},
    
    {key: 'More', title: 'More1'},
  ]:[
    {key: 'Home', title: 'Home'},
  
    {key: 'Progress', title: 'Progress'},
    
    {key: 'Leaderboard', title: 'Leaderboard'},
    
    {key: 'More', title: 'More1'},
  ]);


 

  const renderIcon = (route, focused, color) => {
    
    switch (route.key) {
      case 'Home':
        return (
          <View
            style={{
              // backgroundColor: index === 0 ? colors.primary : 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {index == 0 && (
              <Image resizeMode="contain" source={HomeColor} style={{}} />
            )}

            {index != 0 && (
              <Image resizeMode="contain" source={Home1} style={{width: 30}} />
            )}
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: index === 0 ? colors.primary : colors.fontcolor,
              }}>
              Home
            </Text>
          </View>
        );

      case 'Progress':
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: index === 1 ? colors.primary : 'white',
            }}>
            {index == 1 && (
              <Image resizeMode="contain" source={progresscolor} style={{}} />
            )}

            {index != 1 && (
              <Image resizeMode="contain" source={progress} style={{}} />
            )}
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: index === 1 ? colors.primary : colors.fontcolor,
              }}>
              Progress
            </Text>
          </View>
        );
     
        case 'Leaderboard':
          return (
   
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: index === 2 ? colors.primary : 'white',
              }}>
              {index == 2 && (
                <Image
                  resizeMode="contain"
                  source={Leaderboardcolor}
                  style={{}}
                />
              )}
  
              {index != 2 && (
                <Image
                  resizeMode="contain"
                  source={Leaderboard1}
                  style={{width: 100}}
                />
              )}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: index === 2 ? colors.primary : colors.fontcolor,
                }}>
                Leaderboard
              </Text>
            </View>
           
          );

      case 'More':
        return (
          <View
            style={{
              width: 70,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: index === 3 ? colors.primary : 'white',
            }}>
            {index == 3 && (
              <Image resizeMode="contain" source={listcolor} style={{}} />
            )}

            {index != 3 && (
              <Image resizeMode="contain" source={list} style={{}} />
            )}
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: index === 3 ? colors.primary : colors.fontcolor,
              }}>
              More
            </Text>
          </View>
        );

      default:
        return;
    }
  };
  return (
    <TabView
      tabBarPosition="bottom"
      renderTabBar={props => (
        <TabBar
          renderIcon={({route, focused, color}) =>
            renderIcon(route, focused, color)
          }
          renderLabel={({route, focused, color}) => <></>}
          {...props}
          style={styles.tabBar}
          indicatorStyle={{backgroundColor: colors.primary}}
        />
      )}
      navigationState={{index, routes}}
      renderScene={SceneMap({
        Home: Home,
     
        Progress: Progress,
        Leaderboard: Leaderboard,
        More: More,
      })}
      position={position}
      onIndexChange={index => {
        setIndex(index);
      }}
    />
  );
}

const mapStateToProps = state => {
 
  const {user} = state.auth;
  console.log("user data",user)
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {logoutSuccess, updateuserinfo})(
  BottomTabNavigator,
);

const styles = StyleSheet.create({
  tabBar: {
    borderWidth: 0.5,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopColor: '#000',
    borderBottomColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 5,
  },
});
