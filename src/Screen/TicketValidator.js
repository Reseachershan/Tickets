import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert, Platform, Linking, Image } from 'react-native';
import { Header } from '../component/Header';
import { Bottomleft, Bottomright, Success, Topleft, Topright, Error } from '../assets/svgs';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '../services/baseUrl';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { captureRef } from 'react-native-view-shot';
import moment from "moment"
import { ActivityIndicator } from '@react-native-material/core';
import { images } from '../assets/images';

export const TicketValidator = () => {
  const [isTourch, setIsTourch] = useState(false);
  const [uri, setUri] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [ticketData, setTicketData] = useState()
  const refSuccessQrCode = useRef();
  const viewShotRef = useRef();

  useEffect(() => {
    const isToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
      } catch (err) {
        console.log(err);
      }
    };

    isToken();
  }, []);

  useEffect(() => {
    requestCameraPermission()
  }, []);

  const requestCameraPermission = async () => {
    try {
      console.log('asking for permissions');
      const status = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
      console.log('Camera permission status:', status);
      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access for the app in your device settings.',
          [
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ]
        );

      }

      if (status === RESULTS.GRANTED) {
        // Permission granted, you can proceed with accessing the camera
      } else {
        // Permission denied or unavailable
      }
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
  };


  const route = useRoute();
  const event_id = route?.params?.event_id;
  console.log('event_id', event_id);
  const url = `${BASE_URL}/users/api/gatekeeper/${event_id}/qrcode-scan/`;

  const onSuccess = (data) => {
    captureRef(viewShotRef, {
      format: 'jpg',
      quality: 0.9,
    })
      .then((uri) => {
        setUri(uri);
        postData(data);
      })
      .catch((err) => {
        console.error('Oops, snapshot failed', err);
      });
  };

  const postData = async (data) => {
    console.log('token', token);
    try {
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const requestData = {
        secret_key: data.data,
      };

      const response = await axios.post(url, requestData, { headers });
      setIsLoading(false);
      setTicketData(response.data);
      refSuccessQrCode?.current?.open();
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || error.message;
      setTimeout(() => {
        Alert.alert(errorMessage);
      }, 100);
      const responseData = error.response?.data || '';
      setTicketData(responseData);
      refSuccessQrCode?.current?.open();
    }
  };



  const scanNewTicket = () => {
    refSuccessQrCode?.current?.close();
    setTicketData()
    setUri('');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Validate Ticket"
        // onPressTittle={onSuccess}
        rightIcon={true}
        leftIcon={true}
        onPressRightIcon={() => setIsTourch(!isTourch)}
      />
      {uri ? (
        <ImageBackground source={{ uri: uri }} style={{ flex: 1 }} />
      ) : (
        <View ref={viewShotRef} style={{ width: widthPercentageToDP('100%'), height: '100%' }}>
          <View style={{ height: heightPercentageToDP('40%'), width: widthPercentageToDP('100%'), alignSelf: 'center' }}>
            <View style={{ position: 'absolute', top: heightPercentageToDP('30%'), left: '10%', zIndex: 11 }}>
              <Topleft />
            </View>
            <View style={{ position: 'absolute', top: heightPercentageToDP('30%'), right: '10%', zIndex: 11 }}>
              <Topright />
            </View>
            <View style={{ position: 'absolute', top: heightPercentageToDP('55%'), left: '10%', zIndex: 11 }}>
              <Bottomleft />
            </View>
            <View style={{ position: 'absolute', top: heightPercentageToDP('55%'), right: '10%', zIndex: 11 }}>
              <Bottomright />
            </View>
            <View style={{ width: widthPercentageToDP('100%'), height: heightPercentageToDP('100%') }}>
              <QRCodeScanner
                cameraProps={{ captureAudio: false }}
                onRead={onSuccess}
                flashMode={isTourch ? 'torch' : 'off'}
                cameraStyle={{ width: widthPercentageToDP('100%'), height: heightPercentageToDP('100%') }}
              />
            </View>
          </View>
        </View>
      )}

      <BottomSheet refSuccessQrCode={refSuccessQrCode} scanNewTicket={scanNewTicket} ticketData={ticketData} isLoading={isLoading} />
    </View>
  );
};

const BottomSheet = ({ refSuccessQrCode, scanNewTicket, ticketData, isLoading }) => {
  console.log('ticketData', ticketData);
  return (
    <RBSheet
      ref={refSuccessQrCode}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#E6E6E6',
          width: 82,
        },
        container: {
          backgroundColor: 'white',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: 520,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 50,
        },
      }}
    >
      {
        isLoading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View> :
          ticketData?.message == "Ticket not found" || ticketData?.message == undefined ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, color: '#1B1B1F', marginTop: 10 }}>
                {ticketData?.message ? ticketData?.message : 'Ticket not found'}
              </Text>
              <TouchableOpacity style={{ marginTop: heightPercentageToDP('10%'), alignSelf: 'center', borderWidth: 2, borderColor: '#1935D1', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 24 }} onPress={scanNewTicket}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 24, color: '#1935D1' }}>Try again</Text>
              </TouchableOpacity>
            </View>
            :
            <>
              <View style={{ marginTop: heightPercentageToDP('2%'), width: '100%', alignItems: 'center' }}>
                {ticketData?.message === "Ticket scanned successfully" ? <Success /> : <Error />}
                <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, color: '#1B1B1F', marginTop: 10 }}>
                  {ticketData?.message === "Ticket scanned successfully" ? 'Valid Ticket' : 'Invalid Ticket'}
                </Text>
              </View>
              <View style={{ width: widthPercentageToDP('85%'), alignSelf: 'center', flexDirection: 'row', marginTop: heightPercentageToDP('5%'), justifyContent: 'space-between' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, marginTop: 10 }}>Name</Text>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, color: '#1B1B1F' }}>{ticketData?.ticket?.event?.collectible_owner}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, marginTop: 10 }}>Date</Text>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, color: '#1B1B1F' }}>{moment(ticketData?.ticket?.event?.date).format('Do [of] MMM. YYYY')}</Text>
                </View>
              </View>
              <View style={{ width: widthPercentageToDP('85%'), alignSelf: 'center', flexDirection: 'row', marginTop: heightPercentageToDP('2%'), justifyContent: 'space-between' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, marginTop: 10 }}>Event</Text>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, color: '#1B1B1F' }}>{ticketData?.ticket?.event?.title}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, marginTop: 10 }}>Time</Text>
                  <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 22, color: '#1B1B1F' }}>{moment(ticketData?.ticket?.booked_at).format('h:mm A')}</Text>
                </View>
              </View>
              <TouchableOpacity style={{ marginTop: heightPercentageToDP('10%'), alignSelf: 'center', borderWidth: 2, borderColor: '#1935D1', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 24 }} onPress={scanNewTicket}>
                <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 24, color: '#1935D1' }}>Scan New Ticket</Text>
              </TouchableOpacity>
            </>
      }

    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TicketValidator;
