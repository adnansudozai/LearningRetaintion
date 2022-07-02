import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import colors from '../../../theme/colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Video from 'react-native-video';
//logo
import axios from 'axios';
import Slider from '@react-native-community/slider';
import {Headers1} from '../../../components/Headers1';
import {storeurl, baseurl} from '../../../redux/actions/storeurl';
//redux
import {getquestion, getcheckquestion} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';
import {redcross, greentick, beautyfulgirl1} from '../../../assets';
import {Header, Badge} from 'react-native-elements';
import fonts from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const {width, height} = Dimensions.get('window');
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const Music = ({
  navigation,
  signin,
  route,
  signupwithfb,
  getcheckquestion,
  getquestion,
  userData,
}) => {
  const [songindex, setsongindex] = useState(0);
  const playbackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;

  /////////////////////////////////////////track player
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songDetails);
  };
  const togglePlayback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null)
      if (playbackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
  };
  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({value}) => {
      console.log('Scrollx', scrollX);
    });
  }, []);

  const songDetails = {
    id: '1',
    url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    title: 'The Greatest Song',
    album: 'Great Album',
    artist: 'A Great Dude',
    artwork: 'https://picsum.photos/300',
  };

  const renderSongs = ({index, item}) => {
    return (
      <Animated.View
        style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
        {/* <View>
        <Image
        source={item.image} style={{height:110,width:200}}/>
      </View> */}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#222831'}}>
      <View style={styles.container}>
        <View style={{width: 300, height: 340, marginBottom: 25}}>
          <Image
            source={beautyfulgirl1}
            style={{height: '100%', width: '100%'}}
          />
          <Animated.FlatList
            data={songDetails}
            // ref={songSlider}
            renderItem={renderSongs}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentoffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{justifyContent: 'center', marginTop: 20}}
            onPress={() => togglePlayback(playbackState)}>
            <Ionicons
              name={
                playbackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={30}
            />
          </TouchableOpacity>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={100}
            value={10}
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            thumbTintColor="#FFD369"
          />
        </View>
      </View>
      <View
        style={{
          borderTopColor: '#393E46',
          borderTopWidth: 1,
          width: width,
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: 350,
    height: 340,
    marginTop: 25,
    flexDirection: 'row',
  },
  musiccontrol: {
    width: '',
  },
});

const mapStateToProps = state => {
  const {user} = state.auth;
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getcheckquestion,
  getquestion,
})(Music);
