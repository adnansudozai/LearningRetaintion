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

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';

//logo
import {baloon, vercium, smalllogo, sales} from '../../../assets';
import {storeurl, baseurl} from '../../../redux/actions/storeurl';
//redux
import {signin, signupwithfb, getCourses} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

import {Header, Badge} from 'react-native-elements';
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from '../../../theme/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Headers1} from '../../../components/Headers1';

import {useNavigation} from '@react-navigation/native';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';

const ViewCourses = ({signin, route, signupwithfb, getCourses, userData}) => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const {passdata} = route.params;
  console.log('Pass data', passdata);
  const [Dataa, setDataa] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const formData = new FormData();
      formData.append('u_id', userData.u_id);
      formData.append('status', passdata);

      const res = await getCourses(formData);
      console.log('dadadda', res.data);

      if (res.data.status == true) {
        setDataa(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, []);
  // AsyncStorage.getItem('remember').then(res => {
  //   console.log('res', res);
  // });
  const userRememberData = null;
  const from = route?.params?.from;
  const message = route?.params?.message;
  const [checked, setChecked] = useState(true);

  const [showAlert, setShowAlert] = useState(from == 'ban' ? true : false);
  const [msg, setMsg] = useState(message ? message : '');

  const RenderItem = ({item, index}) => {
    console.log('dataatata', item);

    return (
      <View
        style={{
          marginTop: '7%',
          flex: 0.5,
          paddingHorizontal: 12,
          marginBottom: 10,
        }}>
        {passdata === 'completed' ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MyProgress', {
                course_id: item.id,
                lesson_name: item.lesson_name,
              })
            }
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,

              elevation: 2,
            }}>
            <Image
              source={{
                uri: `${baseurl + item.course_image}`,
              }}
              resizeMode="cover"
              style={{height: 150, width: ' 100%', borderRadius: 10}}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                //fontFamily: fonts.PoppinsBold,
                fontWeight: '700',
                color: colors.primary,
                textAlign: 'left',
                paddingLeft: 20,
                paddingVertical: 10,
              }}>
              {item.lesson_name}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommunicationSkills', {
                course_id: item.id,
                courseName: item.lesson_name,
              })
            }
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,

              elevation: 2,
            }}>
            <Image
              source={{
                uri: `${baseurl + item.course_image}`,
              }}
              resizeMode="cover"
              style={{height: 150, width: ' 100%', borderRadius: 10}}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                //fontFamily: fonts.PoppinsBold,
                fontWeight: '700',
                color: colors.primary,
                textAlign: 'left',
                paddingLeft: 20,
                paddingVertical: 10,
              }}>
              {item.lesson_name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        <View style={{backgroundColor:'blue',flex:1,marginTop:'10%'}}>
      <Headers1 title={passdata} />
      </View>
      <Loading visible={loading} />

      {loading === false && (
        <View
          style={{flex: 1, paddingHorizontal: '5%', backgroundColor: 'white'}}>
          <View style={{marginVertical: '5%', marginTop: 30}}>
            <Text
              style={{color: colors.primary, fontSize: 20, fontWeight: 'bold'}}>
              See {passdata} tasks
            </Text>
          </View>
        </View>
      )}
      {Dataa != '' ? (
        <View>
          <FlatList
            data={Dataa}
            renderItem={RenderItem}
            keyExtractor={item => item}
            numColumns={2}
          />
        </View>
      ) : (
        <View>
          <Text style={{paddingLeft: 30, padding: 10, fontSize: 20}}>
            No {passdata} courses Found!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
const mapStateToProps = state => {
  const {user} = state.auth;

  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getCourses,
})(ViewCourses);
