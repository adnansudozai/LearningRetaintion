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

import {useNavigation} from '@react-navigation/native';
import {baloon, vercium, Person, Congrats} from '../../../assets';
import {Headers1} from '../../../components/Headers1';
//redux
import {connect} from 'react-redux';
import {getFaqs, getFaqs1} from '../../../redux/actions/app';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import {ScrollView} from 'react-native-gesture-handler';
const failed = ({params, getFaqs, getFaqs1, route}) => {
  const navigation = useNavigation();
  const {courseName, message} = route.params;
  console.log('message==>', message);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Headers1 title={courseName} />
      <ScrollView>
        <View
          style={{backgroundColor: 'white', borderWidth: 0, marginTop: '40%'}}>
          <Image
            source={Congrats}
            style={{
              alignItems: 'center',
              height: 180,
              width: 180,

              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: colors.primary,

              borderStyle: 'dashed',
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{marginTop: 120, alignItems: 'center', borderWidth: 0}}>
          <Text
            style={{fontSize: 22, fontWeight: 'bold', color: colors.primary}}>
            Oops
          </Text>
          <Text style={{marginTop: 10, padding: 10}}>{message}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Root')}
            style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  const {faqs} = state.app;
  return {faqs};
};
export default connect(mapStateToProps, {getFaqs, getFaqs1})(failed);
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
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryText: {
    fontFamily: fonts.PoppinsMedium,
    color: colors.white,
    fontSize: 14,
  },
});
