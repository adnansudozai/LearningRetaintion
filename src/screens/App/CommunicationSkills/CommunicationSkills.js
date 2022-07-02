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
import {redcross, greentick} from '../../../assets';
import {Header, Badge} from 'react-native-elements';
import fonts from '../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage, {showMessage} from 'react-native-flash-message';
// import {
//   useTrackPlayerEvents,
//   useTrackPlayerProgress
// } from 'react-native-track-player/lib/hooks';
// import TrackPlayer, {

//   usePlaybackState,
//   useProgress,
//   TrackPlayerEvents,
//   STATE_PLAYING,

// } from 'react-native-track-player';
const {width, height} = Dimensions.get('window');
// const playbackState = usePlaybackState();
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
const CommunicationSkills = ({
  navigation,
  signin,
  route,
  signupwithfb,
  getcheckquestion,
  getquestion,
  userData,
}) => {
  const [loading, setLoading] = useState(true);
  const [questions, setquestions] = useState([]);
  const {course_id} = route.params;
  const {courseName} = route.params;
  const {question_id} = route.params;
  const {screen} = route.params;

  const [isModalVisible, setModalVisible] = useState(true);
  const [modalmsg, setmodalmsg] = useState('');
  const [flashmsg, setflashmsg] = useState(false);
  // const playbackState= usePlaybackState();

  // const playbackState = usePlaybackState();
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;

  const [isPaused, setIsPaused] = useState(true);
  const [value2, setValue2] = useState(0);
  const [checked, setChecked] = useState(0);
  const [rand, setrand] = useState('');
  const [is_answer, setis_answer] = useState(true);
  const [buttonvalue, setbuttonvalue] = useState('Submit');
  const [nextquestion, setnextquestion] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');

  const songSlider = useRef(null);
  //correct_answer  Yes
  const [index1, setIndex] = useState('');
  const [answer, setanswer] = useState([]);
  const [correctanswer, setcorrectanswer] = useState([]);

  const [updateflatlist, setupdateflatlistmenu] = useState([]);
  const [myseelctedoption, setmyseelctedoption] = useState([]);
  const [qid, setqid] = useState('');
  const [explanationshow, setexplanationshow] = useState(false);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [responsedata, setresponsedata] = useState('');

  const [questionstatus, setquestionstatus] = useState(false);
  // const {position, duration} = useTrackPlayerProgress(250);
  if (screen === 'Myprogress') {
    useEffect(() => {
      (async () => {
        const formData = new FormData();
        formData.append('question_id', question_id);
        console.log('question_id', formData);

        const res = await getcheckquestion(formData);

        if (res.data.status == true) {
          setis_answer(false);
          setexplanationshow(true);
          setmyseelctedoption(res.data.data[0].selected_anwer);
          setquestions(res.data.data);
          setanswer(res.data.data[0].answers);
          setqid(res.data.data[0].id);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }, []);
  } else {
    useEffect(() => {
      (async () => {
        const formData = new FormData();

        formData.append('u_id', userData.u_id);
        formData.append('course_id', course_id);

        const res = await getquestion(formData);
        console.log('response from api', res);
        if (res.data.status == true) {
          setquestions(res.data.data);
          setanswer(res.data.data[0].answers); ////all answers
          setqid(res.data.data[0].id);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
    }, []);
  }

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
  // const { position, bufferedPosition, duration } = useTrackPlayerProgress(1000, null)
  // this hook updates the value of the slider whenever the current position of the song changes
  // useEffect(() => {
  //   if (!isSeeking && position && duration) {
  //     setSliderValue(position / duration);
  //   }
  // }, [position, duration]);

  // useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
  //   if (event.state === STATE_PLAYING) {
  //     setIsPlaying(true);
  //   } else {
  //     setIsPlaying(false);
  //   }
  // });

  // const slidingStarted = () => {
  //   setIsSeeking(true);
  // };

  // const slidingCompleted = async value => {
  //   await TrackPlayer.seekTo(value * duration);
  //   setSliderValue(value);
  //   setIsSeeking(false);
  // };
  // ///////////

  const songDetails = {
    id: '1',
    url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    title: 'The Greatest Song',
    album: 'Great Album',
    artist: 'A Great Dude',
    artwork: 'https://picsum.photos/300',
  };

  // const trackPlayerInit = async () => {
  //   await TrackPlayer.setupPlayer();
  //   TrackPlayer.updateOptions({
  //     stopWithApp: true,
  //     capabilities: [
  //       TrackPlayer.CAPABILITY_PLAY,
  //       TrackPlayer.CAPABILITY_PAUSE,
  //       TrackPlayer.CAPABILITY_JUMP_FORWARD,
  //       TrackPlayer.CAPABILITY_JUMP_BACKWARD,
  //     ],
  //   });

  //   return true;
  // };

  // const onButtonPressed = async audio => {
  //   if (!isPlaying) {
  //     await TrackPlayer.add({
  //       id: songDetails.id,
  //       url: `${audio}`,
  //       type: 'default',
  //       title: songDetails.title,
  //       album: songDetails.album,
  //       artist: songDetails.artist,
  //       artwork: songDetails.artwork,
  //     });
  //     TrackPlayer.play();
  //     //setIsPlaying(true);
  //   } else {
  //     TrackPlayer.pause();
  //     //setIsPlaying(false);
  //   }
  // };

  // useEffect(() => {
  //   const startPlayer = async () => {
  //     let isInit = await trackPlayerInit();
  //     setIsTrackPlayerInit(isInit);
  //   };
  //   startPlayer();
  // }, []);

  // // ////////////

  // const scrollX = useRef(new Animated.Value(0)).current;

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

  let correctarr = [];

  useEffect(() => {
    answer.map(value => {
      if (value.correct_answer === 'Yes') {
        correctarr.push(value.id);
      }
      setcorrectanswer(correctarr);
    });
  }, [answer]);

  const handlePress = async id => {
    correctanswer.sort();
    myseelctedoption.sort();
    const result =
      JSON.stringify(correctanswer) == JSON.stringify(myseelctedoption);
    let statuss = '';

    if (myseelctedoption == '') {
      setMsg('Please select an option');
      setShowAlert(true);
    } else {
      if (result) {
        statuss = 'true';
      } else {
        statuss = 'false';
      }

      console.log('buttonvalue', buttonvalue);

      if (buttonvalue == 'Submit') {
        const obj = [
          {
            u_id: userData.u_id,
            course_id: course_id,
            question_id: qid,
            status: statuss,
            answers: myseelctedoption,
          },
        ];
        var myJSON = JSON.stringify(obj);

        const formData = new FormData();

        formData.append('data', myJSON);
        console.log('formData', formData);

        setLoading(true);
        const res = await axios.post(`${storeurl}submit_answer`, formData, {});
        console.log('from api res', res);

        if (res.data.status == true || res.data.status == 'Wrong') {
          setquestionstatus(res.data.status);
          setis_answer(false);
          setLoading(false);
          setexplanationshow(true);
          setnextquestion(res.data.data);
          setqid(res.data.data[0].id);
          setbuttonvalue('Proceed Next');
          if (res.data.status == true) {
            showMessage({
              message: 'Success',
              description: res.data.message,
              backgroundColor: '#008000',
              // type: "success",
            });
          } else {
            showMessage({
              message: 'Failed',
              description: res.data.message,
              backgroundColor: '#a81c07',
              // type: "success",
            });
          }
        } else if (res.data.status == 'Finished') {
          console.log('====>', res.data);

          setresponsedata(res.data);
          setbuttonvalue('Finished');
          setis_answer(false);
          setLoading(false);
          setexplanationshow(true);
          // setmodalmsg(res.data.message);
          if (res.data.newstatus == '1') {
            showMessage({
              message: 'Success',
              description: res.data.message,
              backgroundColor: '#008000',
            });
          } else if (res.data.newstatus == '2') {
            showMessage({
              message: 'Failed',
              description: res.data.message,
              backgroundColor: '#a81c07',
            });
          } else {
            //all question are ok then this code will be fired
            showMessage({
              message: 'Success',
              description: res.data.message,
              backgroundColor: '#008000',
            });
          }
        } else {
          setLoading(false);
          alert(res.data.status.message);
        }
      } else if (buttonvalue == 'Proceed Next') {
        setquestions(nextquestion);
        setis_answer(true);
        setbuttonvalue('Submit');
        setmyseelctedoption([]);
        setLoading(false);
        setexplanationshow(false);
        console.log('next Question', nextquestion);
      } else {
        console.log('responsedata', responsedata);

        if (responsedata.newstatus == '3') {
          // navigation.navigate('Root');
          navigation.navigate('Success', {
            courseName: courseName,
            message: responsedata.additional_message,
          });
        } else {
          console.log('message==>123', responsedata);
          navigation.navigate('failed', {
            courseName: courseName,
            message: responsedata.additional_message,
          });
        }
      }
    }
  };

  let newarray = [];
  // setmyseelctedoption.push(item.id);

  const pushselectedvalue = id => {
    if (screen != 'Myprogress') {
      if (myseelctedoption.includes(id) === true) {
        console.log('if condition true', myseelctedoption);
        const updatedArr = myseelctedoption.filter(e => e !== id);

        setmyseelctedoption(updatedArr);
      } else {
        // newarray.push(id);
        var array1 = [...myseelctedoption, id];
        console.log('if component reloaded', newarray);
        setmyseelctedoption(array1);
        console.log('if component reloaded1', newarray);
      }
    }
  };
  const [showModal, setshowModal] = useState('');
  const RenderItem = ({item, index}) => {
    setshowModal(item.correct_answer);

    console.log('check the data', item.correct_answer);
    return (
      <View style={{...styles.btn}}>
        {showAlert == true && (
          <AlertModal
            button1={'OK'}
            form={'OK'}
            heading={msg}
            onOkPress={() => {
              setShowAlert(false);
            }}
          />
        )}
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              pushselectedvalue(item.id);
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',

                // justifyContent: 'space-between',
              }}>
              {/* <Image style={{height:20,width:20,position:'absolute',marginLeft:'80%',marginTop:5}} 
              resizeMode="contain" source={greentick} /> */}

              {is_answer == false && (
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    position: 'absolute',
                    marginLeft: '92%',
                    marginRight: 5,
                    marginTop: 2,
                  }}
                  resizeMode="contain"
                  source={item.correct_answer == 'Yes' ? greentick : redcross}
                />
              )}

              <View style={{width: '10%'}}>
                {myseelctedoption.includes(item.id) === true && (
                  <Fontisto
                    name="checkbox-active"
                    size={20}
                    color={colors.primary}
                  />
                )}

                {myseelctedoption.includes(item.id) === false && (
                  <Fontisto
                    name="checkbox-passive"
                    size={20}
                    color={colors.primary}
                  />
                )}
              </View>
              <View style={{width: '80%', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.primary,
                    fontFamily: fonts.PoppinsMedium1,
                  }}>
                  {item.answers}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Headers1 title={courseName} />
      <Loading visible={loading} />

      <View>
        {questionstatus == 'Wrong' ? (
          <FlashMessage position="top" floating={true} />
        ) : (
          <FlashMessage position="top" floating={true} />
          // questionstatus == true
        )}
      </View>

      {loading === false && (
        <ScrollView>
          {questions != '' && (
            <View style={{flex: 1, paddingHorizontal: 18}}>
              {questions[0].question_image != '' && (
                <View style={{marginTop: 10}}>
                  <Image
                    source={{
                      uri: `${baseurl + questions[0].question_image}`,
                    }}
                    resizeMode="cover"
                    style={{width: '100%', height: height / 4}}
                  />
                </View>
              )}

              {questions[0].explanantion != '' && (
                <View style={{marginTop: '3%'}}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 18,
                      lineHeight: 25,
                    }}>
                    {questions[0].explanantion}
                  </Text>
                </View>
              )}
              {/* mynewcode starts here */}
              {questions[0].question_video != '' && (
                <View
                  style={{
                    resizeMode: 'contain',
                    width: '100%',
                    borderColor: colors.primary,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    height: 220,
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setIsPaused(!isPaused);
                  }}>
                  <TouchableWithoutFeedback>
                    <Video
                      paused={isPaused}
                      style={{
                        width: '100%',
                        height: height / 4,
                      }}
                      resizeMode="cover"
                      source={{
                        uri: `${baseurl + questions[0].question_video}`,
                      }}
                    />
                  </TouchableWithoutFeedback>
                  <Ionicons
                    onPress={() => {
                      setIsPaused(!isPaused);
                    }}
                    name={isPaused ? 'play-circle' : 'pause-circle-sharp'}
                    color="gray"
                    size={40}
                    style={{position: 'absolute'}}
                  />
                </View>
              )}

              {questions[0].question_audio != '' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 40,
                  }}>
                  <View style={styles.mainContainer}>
                    {/* <TouchableOpacity
                      onPress={() =>
                        onButtonPressed(baseurl + questions[0].question_audio)
                      }
                      style={{
                        width: '10%',
                        marginTop: 4,
                        position: 'absolute',
                      }}>
                      <Ionicons
                        name={
                          !isPlaying ? 'ios-play-circle' : 'ios-pause-circle'
                        }
                        color={colors.primary}
                        size={30}
                      />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{justifyContent: 'center'}}
                      onPress={() => togglePlayback(playbackState)}
                      >
                      <Ionicons
                        name={
                          playbackState === State.Playing
                            ? 'ios-pause-circle'
                            : 'ios-play-circle'
                        }
                        size={30}
                      />
                    </TouchableOpacity>
                    {/* <Slider
                      style={styles.progressBar}
                      minimumValue={0}
                      maximumValue={1}
                      value={sliderValue}
                      minimumTrackTintColor="#111000"
                      maximumTrackTintColor="#000000"
                      onSlidingStart={slidingStarted}
                      onSlidingComplete={slidingCompleted}
                      thumbTintColor="#000"
                    /> */}
                    <Slider
                      style={styles.progressBar}
                      minimumValue={0}
                      maximumValue={progress.duration}
                      minimumTrackTintColor="#111000"
                      maximumTrackTintColor="#000000"
                      thumbTintColor="#000"
                      value={progress.position}
                      onSlidingComplete={async(value)=>{
                        await TrackPlayer.seekTo(value);
                      }}
                    />
                  </View>
                </View>
              )}
              {/* my new code ends here */}
              {questions[0].question != '' && (
                <View style={{marginTop: '3%', width: '100%'}}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 16,
                      lineHeight: 25,
                      fontWeight: 'bold',
                    }}>
                    Q:{questions[0].question}
                  </Text>
                </View>
              )}
              <View>
                <FlatList
                  data={questions[0].answers}
                  renderItem={RenderItem}
                  extraData={updateflatlist}
                  keyExtractor={item => item}
                />
              </View>
              {screen != 'Myprogress' && (
                <TouchableOpacity
                  onPress={() => handlePress()}
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    marginBottom: 40,
                    marginTop: 30,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {buttonvalue}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {explanationshow == true && (
            <View style={{}}>
              {questions[0].explanation_image != '' &&
                questions[0].explanation_details != '' && (
                  <View style={{paddingLeft: 20, marginBottom: 15}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: colors.primary,
                      }}>
                      Explanation
                    </Text>
                  </View>
                )}
              {questions[0].explanation_image != '' && (
                <View>
                  <Image
                    source={{
                      uri: `${baseurl + questions[0].explanation_image}`,
                    }}
                    resizeMode="cover"
                    style={{width: '100%', height: height / 4}}
                  />
                </View>
              )}
              {questions[0].explanation_details != '' && (
                <View
                  style={{
                    marginTop: '3%',
                    borderWidth: 0,
                    flex: 1,
                    marginHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 18,
                      lineHeight: 25,
                      paddingBottom: 40,
                    }}>
                    {questions[0].explanation_details}
                  </Text>
                </View>
              )}
            </View>
          )}
          <Animated.FlatList
            ref={songSlider}
            // data={questions[0].question_audio}
            data={songDetails}
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
        </ScrollView>
      )}
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
  mainContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 40,
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    justifyContent: 'flex-start',
  },
  albumImage: {
    width: 200,
    height: 20,
    alignSelf: 'center',
    borderRadius: 40,
  },
  progressBar: {
    height: 4,
    width: '80%',
    paddingBottom: 0,
    marginLeft: 30,
    marginRight: 30,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
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
})(CommunicationSkills);
