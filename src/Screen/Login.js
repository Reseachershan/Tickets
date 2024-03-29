import React, { useEffect, useState } from 'react'
import { View, StatusBar, Image } from 'react-native'
import { images } from '../assets/images'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from "react-native-responsive-screen"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../component/CustomButton'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CustomTextInput } from '../component/CustomTextInput';
import { Alert } from 'react-native';
import useApi from '../Hook/useApi';
import { BASE_URL } from '../services/baseUrl'

export const Login = () => {
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { top: topInset } = useSafeAreaInsets();

    const url = `${BASE_URL}/users/api/gatekeeper/send-otp/`;
    const { Post } = useApi(url);
    const HandleSendOTP = async () => {
        if (!phone) return Alert.alert('Enter a valid Phone Number')
        setLoading(true)
        Post({ phone_number: phone }).then((res) => {
            setLoading(false)
            Alert.alert(res.message)
            navigation.navigate('otp', { phone: phone })
        }).catch((err) => {
            setLoading(false)
            if (err.detail) {
                Alert.alert(err.detail)
            } else if (Alert.alert(err.phone_number[0])) {
                Alert.alert(err.phone_number[0])
            }
            console.log(err);
        })
    };


    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true}>
            <View style={{ flex: 1, backgroundColor: '#FFFBFF', paddingTop: (StatusBar.currentHeight || 0) + topInset }}>
                <View style={{ width: wp('90%'), alignSelf: 'center', height: heightPercentageToDP('100%') }}>
                    <View style={{ alignItems: 'center', marginTop: heightPercentageToDP('10%') }}>
                        <Image resizeMode='contain' source={images.Logo} style={{ width: 100, height: 56 }} />
                    </View>
                    <CustomTextInput handleTextChange={(value) => setPhone(value)} value={phone} title={'Enter Phone Number'} text='Phone Number' />
                    <View style={{ alignItems: 'center', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                        <CustomButton loading={loading} text='GET OTP' onPress={() => HandleSendOTP()} />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}