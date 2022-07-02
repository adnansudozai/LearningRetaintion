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
import { Headers1 } from '../../../components/Headers1';


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
import {signin, signupwithfb, getNotification, getNotiStatus} from '../../../redux/actions/auth';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const Notifications = ({navigation, signin, route, signupwithfb, getNotification, userData, getNotiStatus}) => {
  const [checked, setChecked] = useState(0);

  const [Dataa,setDataa]=useState([]);
  const [loading, setLoading] = useState(true);
  

  // useEffect(() => {
    useFocusEffect(
      React.useCallback(() => {

    // setLoading(true);
    (async () => {

      const formData = new FormData();
      formData.append('u_id', userData.u_id);
       
      const res = await getNotification(formData);
   
      if (res.data.status == true) {
       setDataa(res.data.data)
       console.log("Noti data", res.data.data)
       setLoading(false);
      } else {
        setLoading(false);
      }
       setLoading(false);
    })();
  },[])
  )
  // }, []);

  const check_status = (item)=>{

    (async () => {

      const formData = new FormData();
      formData.append('notify_id', item.notification_id);
      const res = await getNotiStatus(formData);
   
      if (res.data.status == true) {
        if(item.notifcation_status == "round1" && item.status == 'is_unread')
        {
         navigation.navigate('CommunicationSkills', {
           course_id: item.id,
           courseName: item.lesson_name,
         })
         console.log("Noti Data", res.data)
         setLoading(false);
        }else if(item.notifcation_status == "leaderboard" && item.status == 'is_unread'){

          navigation.navigate('Leaderboard')
          console.log("Noti Data", res.data)
          setLoading(false);

        }
      } else {
        setLoading(false);
      }
       setLoading(false);
    })();
       
  }

 
    const RenderItem =({ item,index }) => { 
     let noticolor=""
     let status=''
     let bordercolor=''
     if (item.status==='is_unread'){
    
       noticolor='#F98D00'
       bordercolor='#F98D00'
       status='unread'
     }
     else{
      
      noticolor='#989590' 
      bordercolor='#989590'
       
       status='read'

     }
    
  

    console.log("dataaa", item.notify_text)
    return (
     
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={()=>check_status(item)}>
        <View
          style={{
            marginLeft: 25,
            marginRight: 25,
            borderWidth: 0,
            marginTop: '4%',
            borderRadius: 10,
            elevation: 1,
            marginBottom: 10,
            paddingBottom: 5,
            backgroundColor: 'white',
            flex: 1,
            borderLeftWidth: 4,
            borderBottomLeftRadius: 2,
            borderTopStartRadius: 2,
            borderLeftColor: bordercolor,
          }}>
          <View
            style={{
              marginLeft: '75%',
              marginRight: 20,
              borderWidth: 0,
              marginTop: '-3%',
              borderRadius: 20,
              height: 20,
              width: 70,
              position: 'absolute',
              backgroundColor: noticolor,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                justifyContent: 'center',
                marginTop: 1,
              }}>
              {status}
            </Text>
          </View>

          <View
            style={{
              marginLeft: 15,
              borderWidth: 0,
              marginTop: 10,
              flex: 1,
              marginRight: 15,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 8,
                color: colors.fontcolor,
              }}>
             {item.notify_text}
            </Text>

           
          </View>
        </View>
        </TouchableOpacity>
        {/* <View
          style={{
            marginLeft: 25,
            marginRight: 25,
            borderWidth: 0,
            marginTop: '4%',
            borderRadius: 10,
            elevation: 1,
            marginBottom: 10,
            paddingBottom: 5,
            backgroundColor: 'white',
            flex: 1,
            borderLeftWidth: 4,
            borderBottomLeftRadius: 2,
            borderTopStartRadius: 2,
            borderLeftColor: '#989590',
          }}>
          <View
            style={{
              marginLeft: '75%',
              marginRight: 20,
              borderWidth: 0,
              marginTop: '-3%',
              borderRadius: 20,
              height: 20,
              width: 70,
              position: 'absolute',
              backgroundColor: '#989590',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                justifyContent: 'center',
                marginTop: 1,
              }}>
              Read
            </Text>
          </View>

          <View
            style={{
              marginLeft: 15,
              borderWidth: 0,
              marginTop: 10,
              flex: 1,
              marginRight: 15,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                marginTop: 8,
                color: colors.fontcolor,
              }}>
              Congratulations! you answered all of the assigned questions
              correctly!
            </Text>

            <Text
              style={{
                fontSize: 13,
                marginTop: 8,
                color: colors.fontcolor,
              }}>
              Check out your position on the leaderboard.
            </Text>
          </View>
        </View> */}
      </SafeAreaView>
     
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.lightGray,
        // paddingHorizontal: 10,
        
      }}>
           <Headers1
       title="Notifications"
       />
        <Loading visible={loading} />
        {Dataa!=''?
    <View>
    {loading === false && (

      <View style={{marginTop: 10,marginBottom:50,paddingBottom:50}}>
        <FlatList

          data={Dataa}
          renderItem={RenderItem}
          keyExtractor={item => item}
        
        />
      </View>

    )}
    </View>
    :
    <View><Text style={{paddingLeft:10,padding:20,fontSize:20}}>No Notification Found!</Text></View>
}
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
  console.log("my redux data",state.auth);
  const {user} = state.auth;
  console.log(user,"Usersss")
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getNotification,
  getNotiStatus
})(Notifications);
