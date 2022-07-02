import React from 'react';
import {View, SafeAreaView} from 'react-native';

import {Header} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from './Text';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';
export const Headers1 = props => {
  const navigation = useNavigation();

  return (
    // <SafeAreaView style={{backgroundColor:'red',borderBottomWidth:0.1,elevation:5,}}>
    <Header
      containerStyle={{
        // height: 80,
        // shadowColor: '#000000',
        // shadowOffset: {
        //   width: 0,
        //   height: 4,
        // },
        // shadowOpacity: 0.32,
        // shadowRadius: 5.46,

        // elevation: 1,
        marginTop: Platform.OS == 'ios' ? -40 : 0,
      }}
      backgroundColor="white"
      leftComponent={
        <View
        style={{
          flexDirection: 'row',
          width: 500,
          alignItems: 'center',
        }}>
        <Ionicons
          name={'chevron-back'}
          size={24}
          color={colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
          style={{paddingTop: 4}}
        />
        {/* <View> */}
          <CustomText
            title={props.title}
            type={'large'}
            color={colors.primary}
            style={{
              fontSize: 20,
              marginLeft: 6,
              fontWeight: 'bold',
            }}
          />
        {/* </View> */}
      </View>
      }
   
    />
  );
};
/////////////////////////////Old Header///////////////////////////
 // </View
  //   <Header
  //     containerStyle={
  //       {
  //         marginVertical: 10,
  //         backgroundColor:'white'
  //       }
  //     }
  //     //   backgroundColor={"white"}
  //     //   leftComponent={
  //     //     <View
  //     //       style={{
  //     //         flexDirection: "row",
  //     //         width: '100%',
  //     //         alignItems: "center",
  //     //         paddingBottom:0,
  //     //         borderWidth:0,
  //     //         backgroundColor:'red'
  //     //       }}>
  //     //       <Ionicons
  //     //         name={"chevron-back"}
  //     //         size={24}
  //     //         color={colors.primary}
  //     //         onPress={() => {
  //     //           navigation.goBack();
  //     //         }}
  //     //         style={{ paddingTop: 4 }}
  //     //       />
  //     //       <View style={{borderWidth:0,width:'350%'}}>
  //     //         <CustomText
  //     //           title={props.title}
  //     //           type={"large"}
  //     //           color={colors.primary}
  //     //           style={{
  //     //             fontSize: 17,
  //     //             marginLeft: 6,
  //     //             fontWeight: "bold",
  //     //           }}
  //     //         />
  //     //       </View>

  //     //     </View>

  //     //   }
  //     // />
  //     leftComponent={
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: 500,
  //           alignItems: 'center',
  //         }}>
  //         <Ionicons
  //           name={'chevron-back'}
  //           size={24}
  //           color={colors.primary}
  //           onPress={() => {
  //             navigation.goBack();
  //           }}
  //           style={{paddingTop: 4}}
  //         />
  //         <View>
  //           <CustomText
  //             title={props.title}
  //             type={'large'}
  //             color={colors.primary}
  //             style={{
  //               fontSize: 20,
  //               marginLeft: 6,
  //               fontWeight: 'bold',
  //             }}
  //           />
  //         </View>
  //       </View>
  //     }
  //   />
    // </SafeAreaView>