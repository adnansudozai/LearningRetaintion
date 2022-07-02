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

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
//logo
import {baloon, vercium, laptop} from '../../../assets';

//redux
import {signin, signupwithfb} from '../../../redux/actions/auth';
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
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const Unanswered = ({signin, route, signupwithfb}) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(0);
  var gender = [
    'Option goes here',
    'Option goes here',
    'Option goes here',
    'Choose option design',
  ];
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
      }}>
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          marginTop: '8%',
          paddingHorizontal: 8,
        }}>
        <View style={{width: '10%'}}>
          <Entypo
            name={'chevron-left'}
            size={26}
            color={'black'}
            onPress={() => {
              navigation.goBack();
            }}
            style={{alignItems: 'center'}}
          />
        </View>
        <View
          style={{
            width: '90%',
            paddingLeft: 50,
            // backgroundColor: 'blue',
          }}>
          <Text style={{fontSize: 20, color: colors.primary}}>
            Unanswered Questions
          </Text>
        </View>
      </View>
      {/* <Header
        containerStyle={{}}
        backgroundColor={'transparent'}
        leftComponent={
          <View
            style={{
              flexDirection: 'row',
              width: 30,
              height: 30,
              alignItems: 'center',
            }}>
            <Entypo
              name={'chevron-left'}
              size={26}
              color={'black'}
              onPress={() => {
                navigation.goBack();
              }}
              style={{alignSelf: 'center'}}
            />
          </View>
        }
        centerComponent={
          <View style={{width: '120%'}}>
            <Text style={{fontSize: 20, color: colors.primary}}>
              Unanswered Questions
            </Text>
          </View>
        }
      /> */}
      <View style={{flex: 1, paddingHorizontal: 18}}>
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? '5%' : '3%',
            width: '100%',
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 19,
              lineHeight: 25,
              fontWeight: 'bold',
            }}>
            Q:Here comes the design for the question.Here comes the design for
            the question.Here comes the design for the question.
          </Text>
        </View>
        <View style={{marginTop: Platform.OS == 'ios' ? '5%' : 0}}>
          <View style={styles.btn}>
            {gender.map((gender, key) => {
              return (
                <View key={gender}>
                  {checked == key ? (
                    <TouchableOpacity style={styles.btn}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          // justifyContent: 'space-between',
                        }}>
                        <View style={{width: '10%'}}>
                          <MaterialIcons
                            name="radio-button-checked"
                            size={28}
                            color={colors.primary}
                          />
                        </View>
                        <View style={{width: '80%', justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.primary,
                              fontFamily: fonts.PoppinsMedium,
                            }}>
                            {gender}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setChecked(key);
                      }}
                      style={styles.btn}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          // justifyContent: 'space-between',
                        }}>
                        <View style={{width: '10%'}}>
                          <MaterialIcons
                            name="radio-button-unchecked"
                            size={28}
                            color={colors.primary}
                          />
                        </View>
                        <View
                          style={{
                            width: '80%',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.primary,
                              fontFamily: fonts.PoppinsMedium,
                            }}>
                            {gender}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          {/* <Text>{gender[checked]}</Text> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Submitted')}
          style={{
            width: '100%',
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            marginBottom: 40,
            marginTop: 40,
          }}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

export default connect(null, {signupwithfb, signin})(Unanswered);
