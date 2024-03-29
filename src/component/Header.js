import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Back, Flash, Next } from '../assets/svgs';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ leftIcon, notShowImage, onPressLeftIcon = () => { }, rightIcon, onPressRightIcon = () => { }, logOut, title, style = {}, hasBack = true, EditButton, eventScreen, onPressTittle = () => { }, ...props }) => {
    const { top: topInset } = useSafeAreaInsets();
    // paddingTop: (StatusBar.currentHeight || 0) + topInset, 
    const navigation = useNavigation()

    return (
        <View style={{ width: wp('100%'), paddingTop: (StatusBar.currentHeight || 0), backgroundColor: '#FFFBFF', paddingTop: (StatusBar.currentHeight || 0) + topInset, ...style }} {...props}>
            <View style={styles.headerRow}>
                {leftIcon && <TouchableOpacity hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }} onPress={() => navigation.goBack()} style={[styles.btnDefault, style]} {...props}>
                    <Back />
                </TouchableOpacity>
                }
                {title && <TouchableOpacity onPress={onPressTittle}><Text style={{ fontSize: 22, color: '#1B1B1B', fontFamily: 'OpenSans-Medium' }}>{title}</Text></TouchableOpacity>}
                {rightIcon && <TouchableOpacity hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }} onPress={onPressRightIcon} style={[styles.btnDefault, style]} {...props}>
                    {eventScreen ? <Next /> : <Flash />}
                </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerLogo: {
        marginTop: hp('1%'),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerRow: {
        height: 48,
        paddingHorizontal: wp('7.7%'),
        marginTop: hp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    addButton: {
        width: 66,
        height: 44,
        position: 'absolute',
        right: 30
    },
});