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
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
//logo
import {baloon, vercium, Person,profileimgedit} from '../../../assets';
import { Headers1 } from '../../../components/Headers1';


//redux
import {signin, signupwithfb,updateProfile} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

import {Header, Badge} from 'react-native-elements';
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from '../../../theme/fonts';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');
const ImagePicker = require('react-native-image-picker');
const UpdateProfile = ({signin, route, signupwithfb,updateProfile,userData}) => {

  const [name, setName] = useState(userData.name);
  const [profilePath, setProfilepath] = useState('');
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

 console.log('user dp address',userData.dp)
  const updatePro = async id => {
    if (!name) {
      setMsg('Kindly Enter Your Name');
      setShowAlert(true);
     
    }  else {

      setLoading(true);
      const formData = new FormData();
      console.log("filepath contain nothing",profilePath)
     
    if(profilePath!=''){
      formData.append('name', name);
      formData.append('u_id', userData.u_id);
      formData.append("file", {
        uri: profilePath.uri,
        name: profilePath.fileName,
        type: profilePath.type,
      });
      console.log(" contain nothing",formData)
     
    }
    else{
      formData.append('name', name);
      formData.append('u_id', userData.u_id);
    
     

    }
     
      
    console.log("profilepath",formData)
    

      const res = await updateProfile(formData);
      
      if (res.data.status == true) {
        setMsg(res.data.message);
        setShowAlert(true);
      } else {
      }

      setLoading(false);
    }
  };



  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setProfilepath(source);
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>

        
<Headers1
       title="Update Profile"
       />
       <Loading visible={loading} />
    
    {loading === false && (
<View style={{marginTop:130}}>
      <TouchableOpacity
        onPress={chooseFile}
        activeOpacity={0.7}
        style={{
          alignItems: 'center',
          height: 120,
          width: 120,
          borderRadius: 70,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0,
          borderColor: colors.primary,
       
          alignSelf: 'center',
         
        }}>
          {profilePath=='' &&(
        <Image
          
          source={{uri:userData.dp}}
        
          style={{
            alignItems: 'center',
            height: 120,
            width: 120,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            borderColor: colors.primary,

            borderStyle: 'dashed',
            alignSelf: 'center',
          }}
        />
        )}

{profilePath != '' &&(
        <Image
          
          source={profilePath}
        
          style={{
            alignItems: 'center',
            height: 120,
            width: 120,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            borderColor: colors.primary,

            borderStyle: 'dashed',
            alignSelf: 'center',
          }}
        />
        )}
        <View style={{borderWidth:0,width:50,height:50,position:'absolute',paddingLeft:76,paddingBottom:140}}>
        <Image
          source={profileimgedit}
          style={{
            alignItems: 'center',
            height: 30,
            width: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.primary,

            borderStyle: 'dashed',
            alignSelf: 'center',
          }}
        />
      

        </View>
        {showAlert==true && (
          <AlertModal 
          button1={"OK"}
         
             form={"OK"}
            heading={msg}
          
          onOkPress={() => {
            setShowAlert(false);
          }}
       
          
          />
          )}

      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          marginTop: '8%',
          marginRight:30,
        
        }}>
        <TextInput
        onChangeText={name=>setName(name)}
          style={{height: 40, backgroundColor: 'white',width:'86%',marginLeft:25}}
          
          value={name}
          fontFamily={fonts.PoppinsMedium}
          selectionColor={colors.primary}
          theme={{
            colors: {primary: colors.primary},
          }}
          // onChangeText={text => onChange(text)}
          // value={value}
        />
        <TouchableOpacity style={styles.primaryBtn}
        onPress={()=>updatePro()}>
          <Text style={styles.primaryText}>Update</Text>
        </TouchableOpacity>
      </View>
      </View>


    )}
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
  primaryBtn: {
    width: '90%',
    backgroundColor: colors.primary,
    marginTop: 40,
    borderRadius: 25,
    height: DEVICE_HEIGHT > 600 ? 48 : 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft:20
   
  },
  primaryText: {
    fontFamily:fonts.PoppinsBold,
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 14 : 14,
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  
   return {
     userData: user,
   };
 };
 export default connect(mapStateToProps, {
  updateProfile
 })(UpdateProfile);
 