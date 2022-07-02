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
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import Button from '../../../components/Button';
import Modal from 'react-native-modal';
import CustomText from '../../../components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import TrackPlayer, {
//   Capability,
//   Event,
//   RepeatMode,
//   State,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents,
// } from 'react-native-track-player';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, InputPhone} from '../../../components/Input/Input';
import {CommonActions} from '@react-navigation/routers';

import colors from '../../../theme/colors';
import {TextInput, TextInputMask, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';
//logo
import {check} from '../../../assets';

//redux
import {signin, signupwithfb} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';

import {Header, Badge, Slider} from 'react-native-elements';
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
import {Colors} from 'react-native/Libraries/NewAppScreen';
const {width, height} = Dimensions.get('window');

const Submitted = ({navigation, signin, route, signupwithfb}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isPaused, setIsPaused] = useState(true);
  const [value2, setValue2] = useState(0);
  const [checked, setChecked] = useState(0);
  const [songindex, setsongindex] = useState(0);
  const songSlider = useRef(null);
  var gender = [
    'Option goes here',
    'Option goes here',
    'Option goes here',
    'Choose option design',
  ];
  // const setupPlayer = async () => {
  //   await TrackPlayer.setupPlayer();
  //   await TrackPlayer.add(musiclibrary);
  // };
  // const togglePlayback = async PlaybackState => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   if (currentTrack != null) {
  //     if (PlaybackState == State.Paused) {
  //       await TrackPlayer.play();
  //     } else {
  //       await TrackPlayer.pause();
  //     }
  //   }
  // };
  // const togglePlaying = () => {};
  // const scrollX = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   setupPlayer();
  //   scrollX.addListener(({value}) => {
  //     console.log(`DeviceWidth`, width);
  //     const index = Math.round(value / width);
  //     setsongindex(index);
  //   });
  //   return () => {
  //     scrollX.removeAllListeners();
  //   };
  // }, []);
  // const renderSongs = ({index, item}) => {
  //   return (
  //     <Animated.View
  //       style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
  //       {/* <View>
  //       <Image
  //       source={item.image} style={{height:110,width:200}}/>
  //     </View> */}
  //     </Animated.View>
  //   );
  // };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', flex: 1, marginTop: '10%'}}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo
            name={'chevron-left'}
            size={26}
            color={'black'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: colors.primary,
            }}>
            Building Communicaton Skills
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // flex: 1,
            marginTop: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderRadius: 100 / 2,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}>
          <Image
            source={check}
            resizeMode="contain"
            style={{height: 50, width: 50}}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <Text style={{fontSize: 18, color: colors.gray, fontWeight: 'bold'}}>
            Answer Submitted Successfully
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Root')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colors.primary,
              fontFamily: fonts.PoppinsMedium,
            }}>
            Go back
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
  contentView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  labelprogress: {
    width: 290,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progresslbl: {
    color: 'black',
  },
});

export default connect(null, {signupwithfb, signin})(Submitted);
{
  /* <Text>{gender[checked]}</Text> */
}
