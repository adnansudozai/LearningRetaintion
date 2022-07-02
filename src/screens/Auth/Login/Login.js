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
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';
import messaging from '@react-native-firebase/messaging';
import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
//logo
import {baloon1, newlogo1, smalllogo, lr} from '../../../assets';

//redux
import {signin, signupwithfb,getLogintext} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';

import {Loading} from '../../../components/Loading';
import Entypo from 'react-native-vector-icons/Entypo';
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from '../../../theme/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


import AsyncStorage from '@react-native-community/async-storage';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
import {
  notificationListener,
  requestUserPermission,
} from '../../../components/Notificationservice';
const Login = ({navigation, signin, route, signupwithfb,getLogintext}) => {
  const userRememberData = null;
  const from = route?.params?.from;
  const message = route?.params?.message;
  const [checked, setChecked] = useState(true);
  const [mailPhone, setMailPhone] = useState(
    userRememberData ? userRememberData?.phone : '',
  );
  const [pass, setPass] = useState(
    userRememberData ? userRememberData?.phone : '',
  );
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState(message ? message : '');
  const [loading, setLoading] = useState(false);

  const [LoginText, setLoginText] = useState('');
  

  const handleLogin = async() => {
    if (!mailPhone) {
      setMsg('Kindly Enter Email');
      setShowAlert(true);
    } else if (!pass) {
      setMsg('Kindly Enter Password');
      setShowAlert(true);
    } else {
      const fcmToken = await messaging().getToken();
      console.log(`the old token on home`, fcmToken);
     

      
      setLoading(true)
      const formData = new FormData();
    
      formData.append('email', mailPhone);
      formData.append('password', pass);
      formData.append('fcmToken', fcmToken);
      // navigation.navigate('Root')
      new Promise((rsl, rej) => {
        signin(formData, rsl, rej);
      })
        .then(async res => {
          setLoading(false);

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Root'}],
            }),
          );
        })
        .catch(err => {
          setMsg(err);
          setShowAlert(true);
          setLoading(false);
        });
     
    }
  };


  useEffect(() => {
   
  
    (async () => {
      
      setLoading(true);
    const res = await getLogintext();
      console.log("resss ult",LoginText)
      
      if (res.data.status == true) {
        setLoginText(res.data.data[0].heading_one)
       
        setLoading(false);
      } else {
        setLoading(false);
      }
   
       
    })();
   

  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  const [hidePass, setHidePass] = useState(true);
  return (
    <ScrollView style={styles.mainContainer}>
      <KeyboardAwareScrollView>
        {/* <Image source={logo_blue} style={styles.logo_blue} /> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: -5,
            marginRight: -5,
            // backgroundColor: 'green',
          }}>
          <Image
            source={baloon1}
            resizeMode="contain"
            style={{
              height: 90,
              width: 90,
            }}
          />
        </View>

        <Loading visible={loading} />
        {loading === false && (
          <View style={{marginLeft: 5, marginRight: 5}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                // backgroundColor: 'green',
              }}>
              <Image
                source={lr}
                resizeMode="contain"
                style={{
                  height: 160,
                  width: 120,
                  marginTop: '-10%',
                  marginBottom: 30,
                }}
              />
            </View>

            <View style={{paddingHorizontal: 25, marginTop: '-7%'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  lineHeight: 27,
                  textAlign: 'center',
                }}>
                {LoginText}
              </Text>
            </View>

            {showAlert == true && (
              <AlertModal
                button1={'OK'}
                form={'OK'}
                heading={msg}
                onOkPress={() => {
                  setShowAlert(false);
                }}
              />
            )}
            <View
              style={{
                flex: 1,
                // justifyContent: 'center',
                paddingTop: '5%',
                paddingLeft: 29,
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 25,
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: '500',
                }}>
                Login
              </Text>

              <Text
                style={{
                  color: colors.fontcolor,
                  fontSize: 13,
                }}>
                Please sign in to continue
              </Text>

              <View
                style={{
                  marginTop: '7%',
                  marginLeft: '3%',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    backgroundColor: 'white',
                    fontSize: 13,
                    width: '90%',
                    paddingLeft: 15,
                  }}
                  placeholder="loremipsum@gmail.com"
                  onChangeText={email => setMailPhone(email)}
                  value={mailPhone}
                  selectionColor={colors.primary}
                  theme={{
                    colors: {primary: colors.primary},
                  }}
                />
                <MaterialCommunityIcons
                  name="email"
                  color={colors.gray}
                  size={16}
                  style={{
                    paddingLeft: 1,
                    paddingTop: 12,
                    position: 'absolute',
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  marginTop: '4%',
                  marginLeft: '3%',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    backgroundColor: 'white',
                    fontSize: 13,
                    width: '90%',
                    paddingLeft: 15,
                  }}
                  onChangeText={password => setPass(password)}
                  value={pass}
                  placeholder="password"
                  selectionColor={colors.primary}
                  //secureTextEntry={true}
                  secureTextEntry={hidePass ? true : false}
                  theme={{
                    colors: {primary: colors.primary},
                  }}
                />
                <Fontisto
                  name="locked"
                  size={12}
                  color={colors.gray}
                  style={{
                    paddingLeft: 5,
                    paddingTop: 4,
                    position: 'absolute',
                  }}
                />
                <Ionicons
                  //name="eye"
                  name={hidePass ? 'eye' : 'eye-off'}
                  size={12}
                  color={colors.gray}
                  style={{
                    marginLeft: '85%',
                    paddingRight: '10%',
                    paddingTop: 4,
                    position: 'absolute',
                  }}
                  onPress={() => setHidePass(!hidePass)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginTop: '4%',
                paddingRight: '8%',
              }}
              onPress={() => navigation.navigate('Forget')}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: 'bold',
                  fontSize: 13,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <View style={{marginVertical: 50, paddingHorizontal: 30}}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Root')}
                onPress={() => handleLogin()}
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};
const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: '110%',
    width: '110%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  inputContainer: {
    justifyContent: 'center',
  },
  input: {
    height: 50,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});

export default connect(null, {signupwithfb, signin,getLogintext})(Login);
