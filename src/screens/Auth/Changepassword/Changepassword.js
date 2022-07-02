import React, {useReducer, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Headers1} from '../../../components/Headers1';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../../../components/Button';
import CustomText from '../../../components/Text';
import Modal from 'react-native-modal';
import fonts from '../../../theme/fonts';
// import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Inputchangepassword} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {Header, Badge, Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {updatePassword} from '../../../redux/actions/auth';
//logo
import {
  logo_blue,
  google,
  fb,
  logout,
  eye,
  key,
  user,
  logocolored,
  arrowright,
  Facebook,
  Google,
  Visible_multicolored,
} from '../../../assets';

//redux
import {signin, signin1} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

import {Dimensions} from 'react-native';
// const {height, width} = Dimensions.get('window');
const {height: DEVICE_HEIGHT} = Dimensions.get('window');

const Changepassword = ({
  navigation,
  signin,
  route,
  updatePassword,
  userData,
}) => {
  const [newPass, setNewpass] = useState('');
  const [confPass, setConfpass] = useState('');
  const {uid} = route.params;
  const {screen} = route.params;

  const [secure, setShow] = useState(true);
  const [secure1, setShow1] = useState(true);
  const [cnf, setCnf] = useState('');
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  let userid = '';
  if (screen == 'otp') {
    userid = uid;
  } else {
    userid = userData.u_id;
  }

  console.log('params', userid);
  const [hidePass, setHidePass] = useState(true);
  const [hidePas, setHidePas] = useState(true);
  const alerthandle = async id => {
    if (screen == 'otp') {
      setShowAlert(false);
      navigation.navigate('Login');
    } else {
      setShowAlert(false);
      navigation.navigate('More');
    }
  };

  const handlePress = async id => {
    if (!newPass) {
      setMsg('Kindly Enter New Password');
      setShowAlert(true);
    } else if (!confPass) {
      setMsg('Kindly Confirm Password');
      setShowAlert(true);
    } else if (newPass != confPass) {
      setMsg('Password did not match');
      setShowAlert(true);
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append('u_id', userid);
      formData.append('password', confPass);

      const res = await updatePassword(formData);

      if (res.data.status == true) {
        setMsg('Password Changed');
        setShowAlert(true);
        setLoading(false);
      } else {
        setMsg(res.data.message);
        setShowAlert(true);
        setLoading(false);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex:0.3,justifyContent:'center'}}>
      <Headers1 title="Change password" />
      </View>
      <Loading visible={loading} />

      {loading === false && (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            marginTop: '30%',
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: '85%',
              marginTop: '7%',
              marginLeft: '6%',
            }}>
            <TextInput
              style={{
                height: 40,
                backgroundColor: 'white',
                fontSize: 13,
              }}
              fontFamily={fonts.PoppinsMedium}
              placeholder="New password"
              onChangeText={newpassword => setNewpass(newpassword)}
              secureTextEntry={hidePass ? true : false}
              selectionColor={colors.primary}
              theme={{
                colors: {primary: colors.primary},
              }}
              // onChangeText={text => onChange(text)}
              // value={value}
            />
            <Ionicons
              //name="eye"
              name={hidePass ? 'eye' : 'eye-off'}
              size={20}
              color={colors.gray}
              style={{
                marginLeft: '88%',

                paddingTop: 4,
                position: 'absolute',
              }}
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
          {showAlert == true && (
            <AlertModal
              button1={'OK'}
              form={'OK'}
              heading={msg}
              onOkPress={() => {
                alerthandle();
              }}
            />
          )}

          <View
            style={{
              justifyContent: 'center',
              width: '85%',
              marginTop: '7%',
              marginLeft: '6%',
            }}>
            <TextInput
              style={{
                height: 40,
                backgroundColor: 'white',
                fontSize: 13,
              }}
              onChangeText={confirmpassword => setConfpass(confirmpassword)}
              fontFamily={fonts.PoppinsMedium}
              placeholder="Confirm new password"
              secureTextEntry={hidePas ? true : false}
              selectionColor={colors.primary}
              theme={{
                colors: {primary: colors.primary},
              }}
            />
            <Ionicons
              //name="eye"
              name={hidePas ? 'eye' : 'eye-off'}
              size={20}
              color={colors.gray}
              style={{
                marginLeft: '88%',

                paddingTop: 4,
                position: 'absolute',
              }}
              onPress={() => setHidePas(!hidePas)}
            />
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => handlePress()}>
            <Text style={styles.primaryText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  texthome: {
    color: colors.primary,
    fontSize: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },

  inputContainer: {
    width: '80%',
    marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(212,212,212)',
    marginBottom: 40,
    padding: 5,

    // height: DEVICE_HEIGHT > 600 ? 30 : 25,
    fontSize: 15,
  },
  primaryBtn: {
    width: '88%',
    backgroundColor: colors.primary,
    marginTop: '12%',
    marginLeft: '5%',
    borderRadius: 25,
    height: DEVICE_HEIGHT > 600 ? 48 : 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;

  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  updatePassword,
})(Changepassword);
