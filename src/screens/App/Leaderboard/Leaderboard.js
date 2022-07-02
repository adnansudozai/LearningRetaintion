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
  RecyclerViewBackedScrollViewBase,
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
//logo
import {
  baloon,
  vercium,
  laptop,
  beautyfulgirl1,
  cperson,
  rperson,
  lperson,
} from '../../../assets';

//redux
import {signin, signupwithfb,getRanking} from '../../../redux/actions/auth';
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
const Leaderboard = ({userData,navigation, signin, route, signupwithfb,getRanking}) => {

  const [loading, setLoading] = useState(true);
  

const [Dataa,setDataa]=useState([]);

const Dataaa=Dataa.slice(3,Dataa.length)
const dataa = Dataa.slice(0,3);


//const map = array.map(element => element * 2);
  // useEffect(() => {

    useFocusEffect(
      React.useCallback(() => {

    setLoading(true);
    (async () => {

      const formData = new FormData();
      formData.append('u_id', userData.u_id);
       
      const res = await getRanking(formData);
  
   console.log("resss",res)
      if (res.data.status == true) {
       setDataa(res.data.data)
       setLoading(false);
      //  alert("check");
      } else {
        setLoading(false);
      }
      
    })();
},[])
  )

  // },[]);
  
 
  const Item =({ item,index }) => { 
 

    return(
     
    <View
      style={{
        flex: 1,
        borderWidth:0,
        paddingRight:10,
        marginHorizontal: 10,
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 12,
        }}>
        <Text style={{fontSize: 16, color: 'white'}}>{index+4}</Text>
        {/* <MaterialIcons
          name="arrow-drop-up"
          color={'white'}
          size={30}
          style={{marginTop: -7}}
        /> */}
      </View>

      <View
        style={{
          
          width: '90%',
          backgroundColor: '#747495',
          flexDirection: 'row',
          borderRadius: 100,
          justifyContent: 'space-between',
          // overflow: 'hidden',
        }}>
        
      {loading === false && (
        <View style={{width: '18%'}}>
          <Image
            source={{
              uri: `${item.dp}`,
            }}
            
            style={{
              height: 60,
              width: 60,
              borderRadius: 60 / 2,
            }}
          />
        </View>
      )}
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
           
            paddingLeft:10,
            marginRight: 45,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: fonts.PoppinsBold,
              fontWeight: '700',
              fontSize:12
            }}>
            {item.name}
           
          </Text>
        </View>
        <View
          style={{
            width: '40%',
            justifyContent: 'center',

            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: fonts.PoppinsBold,
              fontWeight: '700',
            }}>
            {item.score}
          </Text>
        </View>
      </View>
    </View>
   
          )}
  return (
    <SafeAreaView
    style={{flex:1,backgroundColor:'white'}}
   >
      <Headers1
       title="Leaderboard"
       />
    <ScrollView
    style={{backgroundColor: colors.primary,flex:1,}}
     >
<Loading visible={loading} />
      {loading === false && (
        <View
        >
  
   {Dataa!=''?
     <View style={{backgroundColor: colors.primary,flex:1,marginTop:10,marginBottom:140}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '10%',
            width: '80%',
            justifyContent: 'space-between',
          }}>


          <View style={{}}>
          {Dataa.length > 1 &&(

            <View style={{justifyContent: 'center', alignItems: 'center',margin:4}}>
              <Text style={{color: 'white', fontSize: 18}}>2</Text>
            </View>
          )}
          {Dataa.length > 1 &&(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons
                name="arrow-drop-up"
                color={'white'}
                size={30}
                style={{marginTop: -7}}
              />


            </View>
          )}
{Dataa.length > 1 &&(
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '8%',
              }}>
              <Image
                source={{
                  uri: `${dataa[1].dp}`,
                }}
                
                style={{height: 60, width: 60, borderRadius: 50}}
              />
            </View>
)}
{Dataa.length > 1 &&(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  paddingTop: 5,
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: '700',
                }}>
              {dataa[1].name}
              
              </Text>
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 16,
                  paddingTop: 5,
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: '700',
                }}>
               {dataa[1].score}
              </Text>
            </View>
)}
          </View>
          {Dataa.length > 2 &&(
          <View style={{}}>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text style={{color: 'white', fontSize: 18}}>3</Text>
            </View>


            <View style={{alignItems: 'center'}}>
              <MaterialIcons
                name="arrow-drop-down"
                color={'white'}
                size={30}
                style={{marginTop: -7}}
              />
            </View>

            
            <Loading visible={loading} />
            {Dataa.length > 2 &&(
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // paddingTop: '5%',
              }}>
              <Image
                source={{
                  uri: `${dataa[2].dp}`,}}
                style={{height: 60, width: 60, borderRadius: 50}}
              />
            </View>
      )}
      {Dataa.length > 2 &&(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  paddingTop: 5,
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: '700',
                }}>
               
                { dataa[2].name}
              </Text>
              <Text
                style={{
                  color: 'yellow',
                  fontSize: 16,
                  paddingTop: 5,
                  fontFamily: fonts.PoppinsBold,
                  fontWeight: '700',
                }}>
              {dataa[2].score}
              </Text>
            </View>
      )}
          </View>
          )}
        </View>
        {Dataa.length > 0 &&(
        <View
          style={{
            position: 'absolute',
            top: '10%',
          
          }}>
          <View style={{alignItems: 'center'}}>
            <FontAwesome5 name="crown" color={'yellow'} size={30} style={{}} />
          </View>
          {Dataa.length > 0 &&(
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // paddingTop: '5%',
            }}>
            <Image
               source={{
                uri: `${dataa[0].dp}`,
              }}
              style={{height: 100, width: 100, borderRadius: 60}}
            />
          </View>
          )}
          {Dataa.length > 0 &&(
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                // paddingTop: 5,
                fontFamily: fonts.PoppinsBold,
                fontWeight: '700',
              }}>
         
           {  dataa[0].name}
            </Text>
            <Text
              style={{
                color: 'yellow',
                fontSize: 16,
                paddingTop: 5,
                fontFamily: fonts.PoppinsBold,
                fontWeight: '700',
              }}>
              {dataa[0].score}
            </Text>
          </View>
          )}
        </View>
        )}

      </View>

      <View style={{marginBottom: 30}}>
        <FlatList
          data={Dataaa}

          renderItem={Item}
          keyExtractor={item => item}


        />
      </View>
      </View>
      :
      <View><Text style={{paddingLeft:10,padding:20,fontSize:20}}>No Recourd Found!</Text></View>
}
      </View>



      )}
    </ScrollView>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({});


const mapStateToProps = state => {
  console.log("my redux data",state.auth);
  const {user} = state.auth;
  console.log(user,"Usersss")
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getRanking
})(Leaderboard);
