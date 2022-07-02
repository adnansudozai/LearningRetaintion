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
import {
  signin,
  signupwithfb,
  getPrivacyPolicy,
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
import {Headers1} from '../../../components/Headers1';
const {width, height} = Dimensions.get('window');
const PrivacyPolicy = ({
  navigation,
  signin,
  route,
  signupwithfb,
  getPrivacyPolicy,
}) => {
  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await getPrivacyPolicy('', user.id, '');
      if (res.data.status == true) {
        // setallarticles(res.data.data);
        // setSelected('top');
      } else {
      }
      // setLoading(false);
    })();
  }, []);
  const B = props => (
    <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.children}</Text>
  );
  const doticon = <Entypo name="dot-single" size={10} color="black" />;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        // paddingHorizontal: 10,
      }}>
      <ScrollView>
        <Headers1 title=" Privacy Policy" />

        <View
          style={{marginTop: 30, marginLeft: '8%', marginRight: '8%', flex: 1}}>
          <Text
            style={{fontSize: 15, fontWeight: 'bold', color: colors.primary}}
            fontFamily={fonts.PoppinsBold}>
            Please read our privacyp policy below
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              lineHeight: 30,

              color: colors.fontcolor,
            }}
            fontFamily={fonts.PoppinsMedium}>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You. We use Your Personal data to provide and improve the
            Service. By using the Service, You agree to the collection and use
            of information in accordance with this Privacy Policy.
          </Text>
          <View>
            <Text
              style={{fontSize: 22, fontWeight: 'bold', color: colors.primary}}>
              Interpretation and Definitions
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.primary,
                marginTop: 10,
              }}>
              Interpretation:
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 10,
                lineHeight: 30,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural
            </Text>
          </View>

          <View style={{borderWidth: 0, marginBottom: -15}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.primary,
                marginTop: 10,
              }}>
              Definitions:
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 10,
                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              For the purposes of this Privacy Policy:{'\n'}
              <B>{doticon} Account </B> means a unique account created for You
              to access our Service or parts of our Service. {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Affiliate </B> means an entity that controls, is
              controlled by or is under common control with a party, where
              "control" means ownership of 50% or more of the shares, equity
              interest or other securities entitled to vote for election of
              directors or other managing authority. {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Application </B> means the software program provided
              by the Company downloaded by You on any electronic device, named
              Learning Retention. {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Company </B> (referred to as either "the Company",
              "We", "Us" or "Our" in this Agreement) refers to Learning
              Retention Bussness, Civic center Block D. {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Country </B>refers to: Pakistan {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Device </B> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.{' '}
              {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Personal Data </B> is any information that relates to
              an identified or identifiable individual. {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Service </B> refers to the Application. {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Service Provider </B> means any natural or legal
              person who processes the data on behalf of the Company. It refers
              to third-party companies or individuals employed by the Company to
              facilitate the Service, to provide the Service on behalf of the
              Company, to perform services related to the Service or to assist
              the Company in analyzing how the Service is used.{'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} Usage Datar </B> refers to data collected
              automatically, either generated by the use of the Service or from
              the Service infrastructure itself (for example, the duration of a
              page visit).{'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} You </B> means the individual accessing or using the
              Service, or the company, or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
              {'\n'}
            </Text>
          </View>

          <View style={{borderWidth: 0}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
              }}>
              Collecting and Using Your Personal Data
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginLeft: 10,
              }}>
              Types of Data Collected
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 5,
                paddingBottom: 6,
              }}>
              {doticon} Personal Data
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
              {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 14,

                color: colors.fontcolor,
                marginLeft: 10,
              }}>
              {doticon} Email address
            </Text>
            <Text
              style={{
                fontSize: 14,

                color: colors.fontcolor,
                marginLeft: 10,
              }}>
              {doticon} First name and last name
            </Text>
            <Text
              style={{
                fontSize: 14,

                color: colors.fontcolor,
                marginLeft: 10,
              }}>
              {doticon} Usage Data
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                paddingBottom: 10,
              }}>
              {doticon} Usage Data
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              Usage Data is collected automatically when using the Service.
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data. When You access the Service by or
              through a mobile device, We may collect certain information
              automatically, including, but not limited to, the type of mobile
              device You use, Your mobile device unique ID, the IP address of
              Your mobile device, Your mobile operating system, the type of
              mobile Internet browser You use, unique device identifiers and
              other diagnostic data. We may also collect information that Your
              browser sends whenever You visit our Service or when You access
              the Service by or through a mobile device.
              {'\n'}
            </Text>
          </View>

          <View style={{borderWidth: 0}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
              }}>
              Information Collected while Using the Application:
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              While using Our Application, in order to provide features of Our
              Application, We may collect, with Your prior permission:
              {'\n'}
              {doticon}Pictures and other information from your Device's camera
              and photo library{'\n'} We use this information to provide
              features of Our Service, to improve and customize Our Service. The
              information may be uploaded to the Company's servers and/or a
              Service Provider's server or it may be simply stored on Your
              device.{'\n'} You can enable or disable access to this information
              at any time, through Your Device settings.
            </Text>
          </View>

          <View style={{borderWidth: 0}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
              }}>
              Use of Your Personal Data
            </Text>

            <Text
              style={{
                color: colors.fontcolor,
                marginTop: 10,
              }}>
              The Company may use Personal Data for the following purposes:
            </Text>
            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} To provide and maintain our Service </B> including to
              monitor the usage of our Service. {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} To manage Your Account: </B> to manage Your
              registration as a user of the Service. The Personal Data You
              provide can give You access to different functionalities of the
              Service that are available to You as a registered user. {'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} For the performance of a contract: </B> the
              development, compliance and undertaking of the purchase contract
              for the products, items or services You have purchased or of any
              other contract with Us through the Service.{'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon} To contact You: </B> To contact You by email,
              telephone calls, SMS, or other equivalent forms of electronic
              communication, such as a mobile application's push notifications
              regarding updates or informative communications related to the
              functionalities, products or contracted services, including the
              security updates, when necessary or reasonable for their
              implementation.{'\n'}{' '}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}To provide You </B> with news, special offers and
              general information about other goods, services and events which
              we offer that are similar to those that you have already purchased
              or enquired about unless You have opted not to receive such
              information.
              {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}To manage Your requests: </B> To attend and manage
              Your requests to Us.
              {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}For business transfers: </B> TWe may use Your
              information to evaluate or conduct a merger, divestiture,
              restructuring, reorganization, dissolution, or other sale or
              transfer of some or all of Our assets, whether as a going concern
              or as part of bankruptcy, liquidation, or similar proceeding, in
              which Personal Data held by Us about our Service users is among
              the assets transferred.
              {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}For other purposes: </B> We may use Your information
              for other purposes, such as data analysis, identifying usage
              trends, determining the effectiveness of our promotional campaigns
              and to evaluate and improve our Service, products, services,
              marketing and your experience. We may share Your personal
              information in the following situations:
              {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}With Service Providers: </B> We may share Your
              personal information with Service Providers to monitor and analyze
              the use of our Service, to contact You.
              {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}For business transfers: </B> We may share or transfer
              Your personal information in connection with, or during
              negotiations of, any merger, sale of Company assets, financing, or
              acquisition of all or a portion of Our business to another
              company.
              {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}With Affiliates: </B> We may share Your information
              with Our affiliates, in which case we will require those
              affiliates to honor this Privacy Policy. Affiliates include Our
              parent company and any other subsidiaries, joint venture partners
              or other companies that We control or that are under common
              control with Us.
              {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}With business partners </B> We may share Your
              information with Our business partners to offer You certain
              products, services or promotions.
              {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}With other users: </B> when You share personal
              information or otherwise interact in the public areas with other
              users, such information may be viewed by all users and may be
              publicly distributed outside.
              {'\n'}
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              <B>{doticon}With Your consent: </B> We may disclose Your personal
              information for any other purpose with Your consent.
              {'\n'}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
              }}>
              Retention of Your Personal Data
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,
                marginTop: 10,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies. {'\n'}{' '}
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods. {'\n'}{' '}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
              }}>
              Disclosure of Your Personal Data
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Business Transactions
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              If the Company is involved in a merger, acquisition or asset sale,
              Your Personal Data may be transferred. We will provide notice
              before Your Personal Data is transferred and becomes subject to a
              different Privacy Policy.
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Law enforcement
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Other legal requirements
            </Text>

            <Text
              style={{
                fontSize: 14,
                lineHeight: 25,
                color: colors.fontcolor,
                marginTop: 10,
              }}>
              The Company may disclose Your Personal Data in the good faith
              belief that such action is necessary to: {'\n'}
              {doticon} Comply with a legal obligation {'\n'}
              {doticon} Protect and defend the rights or property of the Company{' '}
              {'\n'}
              {doticon} Prevent or investigate possible wrongdoing in connection
              with the Service {'\n'}
              {doticon} Protect the personal safety of Users of the Service or
              the public {'\n'}
              {doticon} Protect against legal liability {'\n'}
            </Text>
          </View>

          <View style={{marginBottom:20}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginBottom: 10,
              }}>
              Security of Your Personal Data
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Children's Privacy
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers.{'\n'} If We need to rely on consent as a legal basis
              for processing Your information and Your country requires consent
              from a parent, We may require Your parent's consent before We
              collect and use that information.
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Links to Other Websites
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third party link, You will be
              directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit. We have no
              control over and assume no responsibility for the content, privacy
              policies or practices of any third party sites or services.
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
              Changes to this Privacy Policy
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy. You are
              advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.fontcolor,
                marginTop: 10,
                marginBottom: 10,
              }}>
            Contact Us
            </Text>

            <Text
              style={{
                fontSize: 15,

                lineHeight: 25,

                color: colors.fontcolor,
              }}
              fontFamily={fonts.PoppinsMedium}>
             If you have any questions about this Privacy Policy, You can contact us:{'\n'}

             {doticon} By email: admin@gmail.com
            </Text>

            
          </View>
        </View>
      </ScrollView>
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

export default connect(null, {signupwithfb, signin})(PrivacyPolicy);
