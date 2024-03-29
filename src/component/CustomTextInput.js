
import React from 'react'
import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from "react-native-responsive-screen"
import { TextInput } from "@react-native-material/core";

export const CustomTextInput = ({ title, text, handleTextChange, value, type }) => {
    return (
        <View style={{ height: heightPercentageToDP('50%'), justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 24, color: '#1B1B1F', lineHeight: 24 }}>{title}</Text>
            <View style={{ marginTop: heightPercentageToDP('8%') }}>
                <TextInput
                    onChangeText={(text) => handleTextChange(text)}
                    value={value}
                    label={text}
                    variant="outlined" 
                    keyboardType={type ? type : 'default'}
                    color='#777680'
                    style={{
                        color: '#777680',
                        borderRadius: 12,
                        fontFamily: 'OpenSans-Bold',
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#FFFBFF',
                    }}
                    underlineColorAndroid="transparent"
                />
            </View>
        </View>
    )
}