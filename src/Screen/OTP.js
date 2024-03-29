import React, { useState } from 'react'
import { View, Text, StatusBar, Image, Alert } from 'react-native'
import { images } from '../assets/images'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from "react-native-responsive-screen"
import { OpenSans_Bold } from '../assets/fonts'
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../component/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomTextInput } from '../component/CustomTextInput'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useApi from '../Hook/useApi'
import { BASE_URL } from '../services/baseUrl'
import AsyncStorage from '@react-native-community/async-storage';

export const OTP = () => {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { top: topInset } = useSafeAreaInsets();
    const route = useRoute();
    const phone = route?.params?.phone;

    const url = `${BASE_URL}/users/api/gatekeeper/verify-otp/`;
    const { Post } = useApi(url);
    const HandleSendOTP = async () => {
        if (!phone) return Alert.alert('Enter a valid Phone Number')
        if (!otp) return Alert.alert('Enter OTP')
        setLoading(true)
        Post({ phone_number: phone, otp: otp }).then(async (res) => {
            setLoading(false)
            console.log('res', res);
            AsyncStorage.setItem('token',`Token ${res.token}`)
                .then(() =>{
                    console.log('successfully stored token');
                    navigation.navigate('EVENT LIST', { phone: phone })
                })
        }).catch((err) => {
            setLoading(false)
            Alert.alert(err.message)
        })
    };

    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <View style={{ flex: 1, backgroundColor: '#FFFBFF', paddingTop: (StatusBar.currentHeight || 0) + topInset }}>
                <View style={{ width: wp('90%'), alignSelf: 'center', height: heightPercentageToDP('100%') }}>
                    <View style={{ alignItems: 'center', marginTop: heightPercentageToDP('10%') }}>
                        <Image resizeMode='contain' source={images.Logo} style={{ width: 100, height: 56 }} />
                    </View>
                    <CustomTextInput type="number-pad" handleTextChange={(value) => setOtp(value)} value={otp} title={'Enter OTP code'} text='OTP Code' />
                    <View style={{ alignItems: 'center', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                        <CustomButton loading={loading} text='Continue' onPress={() => HandleSendOTP()} />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}