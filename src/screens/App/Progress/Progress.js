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
import {Headers1} from '../../../components/Headers1';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
//logo
import {baloon, vercium, smalllogo, sales} from '../../../assets';
import {storeurl, baseurl} from '../../../redux/actions/storeurl';
//redux
import {
  signin,
  signupwithfb,
  getAllProgress,
} from '../../../redux/actions/auth';
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
import {useNavigation} from '@react-navigation/native';
import {Settings, LoginManager, Profile} from 'react-native-fbsdk-next';
const Progress = ({signin, userData, route, signupwithfb, getAllProgress}) => {
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const [Dataa, setDataa] = useState([]);
  // AsyncStorage.getItem('remember').then(res => {
  //   console.log('res', res);
  // });
  const userRememberData = null;
  const from = route?.params?.from;
  const message = route?.params?.message;
  const [showAlert, setShowAlert] = useState(from == 'ban' ? true : false);
  const [msg, setMsg] = useState(message ? message : '');
  const [loading, setLoading] = useState(true);
  const [progressText, setprogressText] = useState('');
  const [CourseStatus, setCourseStatus] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const hidemodal = () => {
    setModalVisible(false);
  }
  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await getAllProgress(userData.u_id);

      console.log('data is from user gett all courses', res.data.data);
      if (res.data.status == true) {
        setDataa(res.data.data);
        setprogressText(res.data.generaltext[0].heading_three);
        setCourseStatus(res.data.data[0].is_completed)
      }
      setLoading(false);
    })();
  }, []);

  const opencourse = (item) => {
    if(item.is_completed == "yes")
    {
      navigation.navigate('MyProgress', {
              course_id: item.id,
              lesson_name: item.lesson_name,
            })
            console.log("data was the>", item.is_completed)
    } else{
      setModalVisible(true);
    }
  }

  const RenderItem = ({item, index}) => {
    console.log('Item Id', item);
    return (
      <View
        style={{
          marginTop: 30,
          flex: 0.5,
          paddingHorizontal: 15,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => opencourse(item)}
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
              fontFamily: fonts.PoppinsBold,
              fontWeight: '700',
              color: colors.primary,
              paddingLeft: 5,
              paddingVertical: 10,
            }}>
            {item.lesson_name}
          </Text>
          <View
            style={{
              width: 41,
              flex: 1,
              height: 41,
              borderRadius: 50 / 2,
              backgroundColor: colors.yellow,
              position: 'absolute',
              top: -15,
              right: -10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                flex: 0.5,
                color: 'white',
                fontSize: 10,
                marginTop:-4,
                fontWeight: 'bold',
              }}>
              {item.score}
              {'\n'}     pts
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Headers1 title=" Retention Progress" />

        <Loading visible={loading} />

        {loading === false && (
          <View style={{paddingHorizontal: 18, backgroundColor: 'white'}}>
            <View style={{marginVertical: '5%'}}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Your Tasks
              </Text>
            </View>
            {Dataa != '' ? (
              <View>
                <Text
                  style={{
                    color: colors.menu,
                    fontSize: 16,
                    lineHeight: 25,
                    paddingTop: '2%',
                  }}>
                  {progressText}
                </Text>
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
                  No Progress Found!
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

   {/* model  */}

   <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              // flex: 0.37,
              backgroundColor: 'white',
              width: '75%',
              height: '35%',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
                <View
                  style={{
                    borderWidth: 0,
                    marginLeft: 15,
                    marginRight: 15,
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: 15,
                      textAlign: 'center',
                      fontFamily: fonts.PoppinsBold,
                      paddingTop: '35%',
                    }}>
                    You will be able to see progress once you complete all rounds.
                  </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => hidemodal()}
                    style={{
                      width: '50%',
                      backgroundColor: colors.primary,
                      marginTop: 30,
                      borderRadius: 25,
                      height: 48,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: '20%',
                    }}>
                    <Text style={{color: colors.white}}>OK</Text>
                  </TouchableOpacity>
              </View>
        </Modal>

    </SafeAreaView>
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
  console.log('my redux data', state.auth);
  const {user} = state.auth;
  console.log(user, 'Usersss');
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getAllProgress,
})(Progress);
