import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import CustomText from '../../../components/Text';
import {Header} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {
  updown,
  Chevron_multicolor_up,
  Chevron_multicolor_down,
} from '../../../assets';
import {Headers1} from '../../../components/Headers1';
//redux
import {connect} from 'react-redux';
import {getFaqs, getFaqs1, Faqs} from '../../../redux/actions/auth';
import {Loading} from '../../../components/Loading';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
const FAQs = ({params, Faqs}) => {
  const navigation = useNavigation();
  const [index1, setIndex] = useState('');
  const [loading, setLoading] = useState(false);

  const [faqs, setfaqs] = useState([]);
  useEffect(() => {
    // setLoading(true);
    (async () => {
      const res = await Faqs();

      console.log('res', res);
      setfaqs(res.data.data);
      console.log('res1', res.data.data);
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Headers1 title="Frequently asked question" />
      {/* <View style={{marginTop: 25,flex:1,backgroundColor:'red'}}>
      
      </View> */}
      <FlatList
          data={faqs}
          keyExtractor={item => item}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  paddingHorizontal: 25,
                  paddingBottom: 10,
                  borderWidth: 0,
                  marginTop: 15,
                }}
                backgroundColor={index == index ? 'white' : '#EEEEEE'}>
                <View
                  style={{
                    borderWidth: 0,
                    borderRadius: 10,
                    backgroundColor: '#EEEEEE',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1.25,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                  backgroundColor={index == index1 ? 'white' : '#EEEEEE'}>
                  <TouchableOpacity
                    onPress={() => {
                      setIndex(index);
                    }}>
                    <View
                      style={{
                        ...styles.question,
                        borderWidth: 0,
                        marginTop: 6,
                        borderRadius: 10,
                        backgroundColor: '#EEEEEE',

                        backgroundColor: 'white',
                      }}
                      backgroundColor={index == index1 ? 'white' : '#EEEEEE'}>
                      <View
                        style={{
                          width: '85%',
                          height: 50,
                          justifyContent: 'center',
                          paddingLeft: 15,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: fonts.PoppinsBold,
                            color: index == index1 ? colors.primary : 'black',
                          }}>
                          {index + 1 + '' + '.'}{' '}
                          {/* {'How do i accept the offer of admission?'} */}
                          {item.question}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '15%',
                          justifyContent: 'center',
                        }}>
                        <AntDesign
                          onPress={() => {
                            setIndex(index);
                          }}
                          name={index == index1 ? 'up' : 'down'}
                          size={15}
                          color={index == index1 ? colors.primary : 'grey'}
                          style={{alignSelf: 'center'}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {index1 == index && (
                    <View
                      style={{
                        borderWidth: 0,
                        width: '100%',

                        paddingLeft: 14,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: fonts.PoppinsMedium,
                          lineHeight: 23,
                          color: '#2C2B2B',
                        }}>
                        {item.answer}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  const {faqs} = state.app;
  return {faqs};
};
export default connect(mapStateToProps, {getFaqs, getFaqs1, Faqs})(FAQs);
const styles = StyleSheet.create({
  question: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
