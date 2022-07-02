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
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
// import FlashMessage from "react-native-flash-message";
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
//logo
import {
  Visible_multicolored,
  smalllogo,
  lr,
  curve,
  sales,
} from '../../../assets';
import {
  notificationListener,
  requestUserPermission,
} from '../../../components/Notificationservice';

import {storeurl, baseurl} from '../../../redux/actions/storeurl';
//redux
import {signin, getAllCourses, signupwithfb} from '../../../redux/actions/auth';
import {connect} from 'react-redux';
import AlertModal from '../../../components/AlertModal';
import {Loading} from '../../../components/Loading';

import AsyncStorage from '@react-native-community/async-storage';
import {Header, Badge} from 'react-native-elements';
// import ChooseCode from '../../../components/ChooseCode';
// import countrypicker from '../../../components/countrypicker';
import fonts from '../../../theme/fonts';

import Foreground from '../../../components/Foreground';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {TestScheduler} from 'jest';

const Home = ({signin, userData, route, getAllCourses}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [pendingDataa, setpendingDataa] = useState([]);
  const [progresDataa, setprogresDataa] = useState([]);
  const [completeDataa, setcompleteDataa] = useState([]);
  const [HomeText, setHomeText] = useState('');
  const [notibage, setnotibage] = useState('');

  // useEffect(() => {
  useFocusEffect(
    React.useCallback(() => {
      // setLoading(true);
      (async () => {
        const formData = new FormData();
        formData.append('u_id', userData.u_id);

        const res = await getAllCourses(formData);

        if (res.data.status == true) {
          setpendingDataa(res.data.data.pending_courses);
          setprogresDataa(res.data.data.inprogress_courses);
          setcompleteDataa(res.data.data.completed_courses);
          setHomeText(res.data.data.generaltext);
          setnotibage(res.data.data.notification);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })();
      // }, []);
    }, []),
  );
  //////////////////////notification code signup
  messaging().onMessage(async remoteMessage => {
    console.log('push notification 0', remoteMessage.data);
    // console.log(`received in foreground data123 `);
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('push notification 2', remoteMessage.data); //ye tb fire hogajb hm notification ko click krien gy
  });
  useEffect(() => {
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('push notification 3', remoteMessage); //jb background me hogi app to ye fire hoga
    });

    PushNotification.configure({
      onNotification: notification => {},
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('first', remoteMessage);
      });
  }, [notificationListener]);
  //////////////////////notification code home

  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });
  //   messaging().onMessage(async remoteMessage => {
  //     console.log(`received in foreground`, remoteMessage);
  //   });
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //   PushNotification.configure({
  //     onNotification: notification => {
  //       notification.foreground == true;

  //       if (notification.userInteraction == true) {
  //         console.log(
  //           'Notification caused app to open from background state:',
  //           notification,
  //         );
  //       }
  //     },
  //   });
  // }, [notificationListener]);

  //////////////////////////////////
  const PendingRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: '7%',
          flex: 0.5,
          marginBottom: 10,
          paddingHorizontal: 13,
        }}>
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
            style={{
              fontSize: 16,
              fontFamily: fonts.PoppinsBold,
              fontWeight: '700',
              color: colors.primary,
              textAlign: 'left',
              paddingLeft: 20,
              paddingVertical: 10,
            }}
            numberOfLines={1}>
            {item.lesson_name}
          </Text>
          <View
            style={{
              width: '55%',
              height: 28,
              backgroundColor: 'gray',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              right: 7,
              top: 15,
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              pending
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const InprogresRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: '7%',
          flex: 0.5,
          marginBottom: 10,
          paddingHorizontal: 13,
        }}>
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
            style={{
              fontSize: 16,
              fontFamily: fonts.PoppinsBold,
              fontWeight: '700',
              color: colors.primary,
              textAlign: 'left',
              paddingLeft: 20,
              paddingVertical: 10,
            }}
            numberOfLines={1}>
            {item.lesson_name}
          </Text>
          <View
            style={{
              width: '55%',
              height: 28,
              backgroundColor: colors.yellow,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              right: 7,
              top: 15,
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              in progress
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const CompleteRenderItem = ({item, index}) => {
    console.log('Images', item.notification_days);
    return (
      <View
        style={{
          marginTop: '7%',
          flex: 0.5,
          marginBottom: 10,
          paddingHorizontal: 13,
        }}>
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
            style={{
              fontSize: 16,
              fontFamily: fonts.PoppinsBold,
              fontWeight: '700',
              color: colors.primary,
              textAlign: 'left',
              paddingLeft: 20,
              paddingVertical: 10,
            }}
            numberOfLines={1}>
            {item.lesson_name}
          </Text>
          <View
            style={{
              width: '55%',
              height: 28,
              backgroundColor: 'green',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              right: 7,
              top: 15,
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              completed
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
      <Foreground />
      <View style={{backgroundColor: 'white'}}>
        <Header
          containerStyle={{
            height: 100,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 4,
            marginTop: Platform.OS == 'ios' ? -30 : 0,
          }}
          backgroundColor="white"
          leftComponent={
            <Image
              source={lr}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
              }}
            />
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              <FontAwesome
                name="bell-o"
                color={colors.primary}
                size={24}
                style={{marginBottom: Platform.OS == 'ios' ? 20 : 0}}
              />
              {notibage != '' && notibage != 0 && (
                <Badge
                  size={100}
                  status="warning"
                  value=" "
                  containerStyle={{
                    position: 'absolute',
                    right: -5,
                    bottom: -5,
                    scaleX: 0.7,
                    scaleY: 0.7,
                  }}
                />
              )}
            </TouchableOpacity>
          }
        />
      </View>
      {/* <View>
      <FlashMessage position="top" floating={true}
      style={{
        // position: 'absolute',
        // marginBottom: 0,
        // marginTop: "160%"
      }}
      /> 
      
    </View> */}
      <Loading visible={loading} />
      {loading === false && (
        <ScrollView>
          <View style={{flex: 1, paddingHorizontal: '5%', borderWidth: 0}}>
            {userData != null && (
              <View style={{marginTop: '10%'}}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 20,
                    fontFamily: fonts.PoppinsBold,
                    fontWeight: '700',
                  }}>
                  Hello {userData.name},
                </Text>
                <Text
                  style={{
                    color: colors.menu,
                    fontSize: 16,
                    fontFamily: fonts.PoppinsMedium1,
                    paddingTop: 3,
                  }}>
                  Did you know?
                </Text>
                <Text
                  style={{
                    color: colors.menu,
                    fontSize: 16,
                    fontFamily: fonts.PoppinsMedium1,
                    paddingTop: 3,
                    lineHeight: 25,
                  }}>
                  {HomeText[0].heading_two}
                </Text>
              </View>
            )}
          </View>
          <View style={{flex: 1, marginVertical: 0, marginHorizontal: 15}}>
            <Image
              source={curve}
              resizeMode="contain"
              style={{height: 292, width: '100%'}}
            />
          </View>
          <View style={{flex: 1, marginVertical: 10, marginHorizontal: 15}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 20,
                fontFamily: fonts.PoppinsBold,
                fontWeight: '700',
              }}>
              How V-Retains Work?
            </Text>
            <Text
              style={{
                color: colors.menu,
                fontSize: 16,
                fontFamily: fonts.PoppinsMedium1,
                paddingTop: 3,
                lineHeight: 25,
              }}>
              {HomeText[0].heading_two}
            </Text>
          </View>

          {/* Pending Courses  */}

          <View style={{paddingHorizontal: 15}}>
            <Text
              style={{fontSize: 24, fontWeight: 'bold', color: colors.primary}}>
              Assigned Tasks
            </Text>
            {pendingDataa != '' ? (
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: colors.menu,
                    paddingVertical: 5,
                    lineHeight: 25,
                  }}>
                  You have been the assigned the following tasks, tap the icon
                  to get started
                </Text>

                <FlatList
                  data={pendingDataa.slice(0, 2)}
                  renderItem={PendingRenderItem}
                  keyExtractor={item => item}
                  numColumns={2}
                />

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: '6%',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewCourses', {
                        passdata: 'pending',
                      })
                    }
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },

                      shadowOpacity: 0.32,
                      shadowRadius: 5.46,
                      elevation: 2,
                      backgroundColor: colors.grey,
                      width: '25%',
                      height: 30,
                      borderRadius: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.primary,
                      }}>
                      View all
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={{paddingLeft: 10, padding: 20, fontSize: 20}}>
                  No tasks assigned yet
                </Text>
              </View>
            )}
          </View>

          {/*Inprogress Courses */}

          <View
            style={{
              paddingHorizontal: 15,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                Tasks in progress
              </Text>
              {progresDataa != '' ? (
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.menu,
                      paddingVertical: 5,
                      lineHeight: 25,
                    }}>
                    The tasks below are still in progress, tap the icon to
                    resume
                  </Text>

                  <FlatList
                    data={progresDataa.slice(0, 2)}
                    renderItem={InprogresRenderItem}
                    keyExtractor={item => item}
                    numColumns={2}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: '6%',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ViewCourses', {
                          passdata: 'inprogress',
                        })
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.32,
                        shadowRadius: 5.46,
                        elevation: 2,
                        backgroundColor: colors.grey,
                        width: '25%',
                        height: 30,
                        borderRadius: 7,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: colors.primary,
                        }}>
                        View all
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={{paddingLeft: 10, padding: 20, fontSize: 20}}>
                    No Tasks Found!
                  </Text>

                  {/* <View style={{ flex: 1 }}>
      
      <Button
        onPress={() => {
          showMessage({
            message: "Hi Farhan",
            description: "This is our second message",
            type: "success",
          }, 9000);
        }}
        title="Request Details"
        color="red"
      />
      <Button style={{color:"black", backgroundColor:"yellow"}}
        onPress={() => {
          showMessage({
            message: "Alert!",
            description: "This is our last warning...",
            type: "success",
            backgroundColor: "red"
          });
        }}
        title="Red alert!"
        color="red"
      />
    </View> */}
                </View>
              )}
            </View>
          </View>

          {/* completed Courses */}

          <View
            style={{
              paddingHorizontal: 15,
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                Tasks completed
              </Text>
            </View>
            {completeDataa != '' ? (
              <View>
                {/* <Text
            style={{
              fontWeight: 'bold',
              color: colors.menu,
              paddingVertical: 5,
              lineHeight: 25,
            }}>
            You have been the assigned the following tasks,tap the icon to get
            started
          </Text> */}

                <FlatList
                  data={completeDataa.slice(0, 2)}
                  renderItem={CompleteRenderItem}
                  keyExtractor={item => item}
                  numColumns={2}
                />

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: '6%',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ViewCourses', {
                        passdata: 'completed',
                      })
                    }
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.32,
                      shadowRadius: 5.46,
                      elevation: 2,
                      backgroundColor: colors.grey,
                      width: '25%',
                      height: 30,
                      borderRadius: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.primary,
                      }}>
                      View all
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={{paddingLeft: 10, padding: 20, fontSize: 20}}>
                  No Tasks Found!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
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
});

const mapStateToProps = state => {
  console.log('my redux data', state.auth);
  const {user} = state.auth;
  return {
    userData: user,
  };
};
export default connect(mapStateToProps, {
  getAllCourses,
})(Home);
