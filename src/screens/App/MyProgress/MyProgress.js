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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Headers1} from '../../../components/Headers1';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
//logo
import {
  baloon,
  vercium,
  laptop,
  gallery,
  imgicon,
  list,
  check,
  cross,
  playvideoicon,
  video1,
  tick,
  vertical,
  horizental,
} from '../../../assets';

//redux
import {
  checkPhoneNo,
  signin,
  signupwithfb,
  getMyProgres,
} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';

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

const {width, height} = Dimensions.get('window');
const MyProgress = ({
  navigation,
  signin,
  route,
  userData,
  signupwithfb,
  getMyProgres,
}) => {
  const [loading, setLoading] = useState(true);
  const [progressdata, setprogressdata] = useState([]);
  const {course_id} = route.params;
  const {lesson_name} = route.params;

  console.log('Formdata', progressdata);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const formData = new FormData();
      formData.append('u_id', userData.u_id);
      formData.append('course_id', course_id);

      const res = await getMyProgres(formData);

      if (res.data.status == true) {
        setprogressdata(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const RenderItem = ({item, index}) => {
    console.log('items', item);
    let logotype = '';
    let key = '';
    let color = '';

    if (item.question_image != '') {
      logotype = imgicon;
    } else if (item.question_audio != '') {
      logotype = horizental;
    } else if (item.question_video != '') {
      logotype = playvideoicon;
    } else {
      logotype = vertical;
    }

    if (item.if_right === 'Yes') {
      key = tick;
    } else {
      key = cross;
    }

    if (index % 2 == 0) {
      color = '#F6F6F6';
    } else {
      color = 'white';
    }

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CommunicationSkills', {
              course_id: course_id,
              courseName: lesson_name,
              question_id: item.id,
              screen: 'Myprogress',
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              backgroundColor: color,
              padding: 12,
            }}>
            <View style={{width: '40%', borderWidth: 0,paddingLeft:15}}>
              <Image
                source={logotype}
                style={{width: 32, height: 28, marginTop: 5, marginBottom: 5}}
              />
            </View>
            <View style={{width: '20%', borderWidth: 0, alignItems: 'center'}}>
              <Image
                source={key}
                style={{width: 30, height: 20, marginTop: 5, marginBottom: 5}}
              />
            </View>
            <View
              style={{
                width: '40%',
                alignItems: 'center',
                marginTop: -4,
                paddingLeft: 12,
              }}>
              <Text style={{color: colors.primary, fontSize: 14}}>
                {item.question}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{flex: 1, backgroundColor: 'blue',marginTop:30}}>
        <Headers1 title={lesson_name} />
      </View>
      <Loading visible={loading} />
      <SafeAreaView
        style={{
          flex: 1,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            marginVertical: Platform.OS == 'ios' ? '5%' : '5%',
            borderWidth: 0,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 22,
              fontFamily: fonts.PoppinsBold,
            }}>
            See Progress till data
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            width: '100%',
            justifyContent: 'space-between',
            borderWidth: 1,
            backgroundColor: colors.primary,
            padding: 8,
          }}>
          <View
            style={{
              width: '38%',
              borderRightWidth: 1,
              borderRightColor: 'white',
              alignItems: 'center',
              paddingRight: 7,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: fonts.PoppinsMedium,
                fontSize: 15,
              }}>
              Question type
            </Text>
          </View>
          <View
            style={{
              width: '20%',
              borderRightWidth: 1,
              borderRightColor: 'white',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: fonts.PoppinsMedium,
                fontSize: 15,
              }}>
              Key
            </Text>
          </View>
          <View style={{width: '40%', alignItems: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontFamily: fonts.PoppinsMedium,
                fontSize: 15,
              }}>
              Question
            </Text>
          </View>
        </View>

        <FlatList
          data={progressdata}
          renderItem={RenderItem}
          keyExtractor={item => item}
        />
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getMyProgres,
})(MyProgress);
