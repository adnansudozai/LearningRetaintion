import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Button from '../../../components/Button';
import Modal from 'react-native-modal';
import CustomText from '../../../components/Text';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
//logo
import {lock, logout1,updateicon,Questionmark,privicy,gratericon} from '../../../assets';

//redux
import {signin, signupwithfb,logoutSuccess} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import { Headers1 } from '../../../components/Headers1';

import {Header, Badge} from 'react-native-elements';
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from '../../../theme/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const More = ({signin, route,userData, signupwithfb,logoutSuccess}) => {
  const navigation = useNavigation();
  const logouthandle=()=>{
 
    new Promise((rsl, rej) => {
      logoutSuccess(rsl, rej);
    })
      .then(res => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
  
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      
        
      }}>
      <Headers1
       title="More"
       />
      <View style={{ width:'110%',marginTop:'10%',}}>
   
      <TouchableOpacity
          onPress={() => navigation.navigate('UpdateProfile')}
          style={{
            borderBottomWidth:0.2,
            flexDirection: 'row',
            paddingHorizontal: 25,
            paddingBottom:10
           
          }}>
          <View style={{width: '10%', justifyContent: 'center'}}>
          <Image
          source={updateicon}
          style={{
            alignItems: 'center',
            height: 21,
            width: 18,
            

          }}
        />
          </View>
          <View style={{width: '80%', justifyContent: 'center',}}>
            <Text
              style={{
                marginTop:2,
                fontSize: 17,
                color: colors.black,
              }}>
              Update profile
            </Text>
            
          </View>
          <View style={{borderWidth:0,}}>
          <Image
          source={gratericon}
          style={{
            alignItems: 'center',
            height: 16,
            width: 10,
            marginTop:10
            

          }}
        />

          </View>
        </TouchableOpacity>

    

        <TouchableOpacity
          onPress={() => navigation.navigate('FAQs')}
          style={{
            borderBottomWidth:0.2,
            flexDirection: 'row',
            paddingHorizontal: 25,
            paddingBottom:10,
            paddingTop:10
          }}>
          <View style={{width: '10%', justifyContent: 'center'}}>
          <Image
          source={Questionmark}
          style={{
            alignItems: 'center',
            height: 21,
            width: 20,
            

          }}
        />
          </View>
          <View style={{width: '80%', justifyContent: 'center',}}>
            <Text
              style={{
                marginTop:2,
                fontSize: 17,
                color: colors.black,
              }}>
              FAQs
            </Text>
            
          </View>
          <View style={{borderWidth:0,}}>
          <Image
          source={gratericon}
          style={{
            alignItems: 'center',
            height: 16,
            width: 10,
            marginTop:10
            

          }}
        />

          </View>
        </TouchableOpacity>
     



<TouchableOpacity
          onPress={() => navigation.navigate('Changepassword',{
            uid:11
          })}
          style={{
            borderBottomWidth:0.2,
            flexDirection: 'row',
            paddingHorizontal: 25,
            paddingBottom:10,
            paddingTop:10
          }}>
          <View style={{width: '10%', justifyContent: 'center'}}>
          <Image
          source={lock}
          style={{
            alignItems: 'center',
            height: 24,
            width: 20,
            

          }}
        />
          </View>
          <View style={{width: '80%', justifyContent: 'center',}}>
            <Text
              style={{
                marginTop:2,
                fontSize: 17,
                color: colors.black,
              }}>
              Change Password
            </Text>
            
          </View>
          <View style={{borderWidth:0,}}>
          <Image
          source={gratericon}
          style={{
            alignItems: 'center',
            height: 16,
            width: 10,
            marginTop:10
            

          }}
        />

          </View>
        </TouchableOpacity>
     

<TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicy')}
          style={{
            borderBottomWidth:0.2,
            flexDirection: 'row',
            paddingHorizontal: 25,
            paddingBottom:10,
            paddingTop:10
          }}>
          <View style={{ width: '10%', justifyContent: 'center'}}>
          <Image
          source={privicy}
          style={{
            alignItems: 'center',
            height: 23,
            width: 20,
            
          }}
        />
          </View>
          <View style={{width: '80%', justifyContent: 'center',}}>
            <Text
              style={{
                marginTop:2,
                fontSize: 17,
                color: colors.black,
              }}>
              Privacy notes
            </Text>
            
          </View>
          <View style={{borderWidth:0,}}>
          <Image
          source={gratericon}
          style={{
            alignItems: 'center',
            height: 16,
            width: 10,
            marginTop:10
            

          }}
        />

          </View>
        </TouchableOpacity>
{/*  */}
<TouchableOpacity
          onPress={() => logouthandle()}
          style={{
           
            flexDirection: 'row',
            paddingHorizontal: 25,
            paddingBottom:10,
            paddingTop:10
          }}>
          <View style={{ width: '10%', justifyContent: 'center'}}>
          <Image
          source={logout1}
          style={{
            alignItems: 'center',
            height: 20,
            width: 20,
            
          }}
        />
          </View>
          <View style={{width: '80%', justifyContent: 'center',}}>
            <Text
              style={{
                marginTop:2,
                fontSize: 17,
                color: colors.black,
               
              }}>
              Logout
            </Text>
            
          </View>
          <View style={{borderWidth:0,}}>
          <Image
          source={gratericon}
          style={{
            alignItems: 'center',
            height: 16,
            width: 10,
            marginTop:10
            

          }}
        />

          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    // alignItems: 'center',
    marginTop: '5%',
  },
});


const mapStateToProps = state => {
 
  const {user} = state.auth;
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  logoutSuccess
})(More);
