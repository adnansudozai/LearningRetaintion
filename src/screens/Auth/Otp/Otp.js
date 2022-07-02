import React, {useReducer, useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Keyboard,
  Dimensions,
  FlatList,
} from 'react-native';
import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import styles from './styles';
import {SocialButton} from '../../../components/SocialButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {logo_blue, call, arrowright, key} from '../../../assets';
import {InputPhone} from '../../../components/Input/Input';
import AlertModal from '../../../components/AlertModal';
import fonts from '../../../theme/fonts';
import {Header, Badge} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height: DEVICE_HEIGHT} = Dimensions.get('window');
import {Headers1} from '../../../components/Headers1';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {GradientsigninButton} from '../../../components/GradientButton';
import {Loading} from '../../../components/Loading';
import {connect} from 'react-redux';
import {
  signInWithPhone,
  verify_otp,
  forgetPassword,
} from '../../../redux/actions/auth';
import RBSheet from 'react-native-raw-bottom-sheet';
import {storeurl} from '../../../redux/actions/storeurl';
import axios from 'axios';
const Otp = ({navigation, route, verify_otp}) => {
  const [email, setemail] = useState(route.params.email);
  const [otp, setotp] = useState('');
  const [loading, setLoading] = useState(false);
  const [screen, setscreen] = useState(1);
  const [password, setpassword] = useState('');

  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  console.log('route', route.params.email);

  const handleforget = async id => {
    if (!otp) {
      setMsg('Kindly Enter Otp');
      setShowAlert(true);
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp);

      const res = await axios.post(`${storeurl}verify_otp`, formData, {});
      console.log('formData', res);
      // const res = await forgetPassword(formData);

      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);

        setLoading(false);
        setscreen(2);
      } else {
        setMsg(res.data.message);
        setShowAlert(true);
        setLoading(false);
      }
    }
  };

  const changepassword = async id => {
    if (!password) {
      setMsg('Kindly Enter password');
      setShowAlert(true);
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const res = await axios.post(
        `${storeurl}update_password_new`,
        formData,
        {},
      );
      console.log('formData', res);
      // const res = await forgetPassword(formData);

      if (res.data.status == true) {
        alert(res.data.message);

        setLoading(false);
        navigation.navigate('Login');
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        // paddingHorizontal: 10,
      }}>
      {screen == 1 && <Headers1 title="Enter OTP" />}

      {screen == 2 && <Headers1 title="Change Password" />}

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
      <Loading visible={loading} />
      {loading === false && (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            marginTop: '55%',
          }}>
          {screen == 1 && (
            <View
              style={{
                justifyContent: 'center',
                width: '88%',
                marginTop: '7%',
                marginLeft: '5%',
              }}>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: 'white',
                  fontSize: 14,
                }}
                placeholder="Enter Otp sent to your email"
                selectionColor={colors.primary}
                onChangeText={eml => setotp(eml)}
                theme={{
                  colors: {primary: colors.primary},
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
          )}
          {screen == 1 && (
            <TouchableOpacity
              style={{
                width: '92%',
                backgroundColor: colors.primary,
                marginTop: '11%',
                marginLeft: '3%',
                borderRadius: 25,
                height: DEVICE_HEIGHT > 600 ? 44 : 44,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handleforget();
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: DEVICE_HEIGHT > 600 ? 14 : 10,
                }}>
                Proceed
              </Text>
            </TouchableOpacity>
          )}

          {screen == 2 && (
            <View
              style={{
                justifyContent: 'center',
                width: '88%',
                marginTop: '7%',
                marginLeft: '5%',
              }}>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: 'white',
                  fontSize: 14,
                }}
                placeholder="Enter New password"
                selectionColor={colors.primary}
                onChangeText={eml => setpassword(eml)}
                theme={{
                  colors: {primary: colors.primary},
                }}
                // onChangeText={text => onChange(text)}
                // value={value}
              />
            </View>
          )}
          {screen == 2 && (
            <TouchableOpacity
              style={{
                width: '92%',
                backgroundColor: colors.primary,
                marginTop: '11%',
                marginLeft: '3%',
                borderRadius: 25,
                height: DEVICE_HEIGHT > 600 ? 44 : 44,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                changepassword();
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: DEVICE_HEIGHT > 600 ? 14 : 10,
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const {user} = state.auth;
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  verify_otp,
})(Otp);
