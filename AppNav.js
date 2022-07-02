import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//screens
import BottomTab from './src/navigation/BottomTab';

import {connect} from 'react-redux';
import Splash from './src/screens/Auth/Splash';
import Changepassword from './src/screens/Auth/Changepassword';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Forget from './src/screens/Auth/ForgetPassword';
import Otp from './src/screens/Auth/Otp';
import Settings from './src/screens/App/Settings';
import Home from './src/screens/App/Home';
import Success from './src/screens/App/Success';
import failed from './src/screens/App/failed';
import CommunicationSkills from './src/screens/App/CommunicationSkills';
import Unanswered from './src/screens/App/Unanswered';
import Progress from './src/screens/App/Progress';
import MyProgress from './src/screens/App/MyProgress/MyProgress';
import Notifications from './src/screens/App/Notifications';
import Leaderboard from './src/screens/App/Leaderboard';
import FAQs from './src/screens/App/FAQs/FAQs';
import UpdateProfile from './src/screens/App/UpdateProfile/UpdateProfile';
import {LogBox} from 'react-native';
import AccountSettings from './src/screens/App/Settings/AccountSettings';
import TopTab from './src/screens/App/TopTab/TopTab';
import More from './src/screens/App/More';
import PrivacyPolicy from './src/screens/App/PrivacyPolicy';
import ViewCourses from './src/screens/App/ViewCourses';
import Music from './src/screens/App/Music'
LogBox.ignoreAllLogs();
function AppNav({route}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="FAQs"
          component={FAQs}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Music"
          component={Music}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Progress"
          component={Progress}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="ViewCourses"
          component={ViewCourses}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="MyProgress"
          component={MyProgress}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="Changepassword"
          component={Changepassword}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="More"
          component={More}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown: false, animationEnabled: true}}
        />

        <Stack.Screen
          name="Root"
          component={BottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Setting"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CommunicationSkills"
          component={CommunicationSkills}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Unanswered"
          component={Unanswered}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="failed"
          component={failed}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TopTab"
          component={TopTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppBottom() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#42f44b',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Unanswered"
          component={Unanswered}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = state => {
  const {isLoggedIn} = state.auth;
  return {
    isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppNav);
