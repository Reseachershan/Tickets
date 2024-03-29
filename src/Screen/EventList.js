import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient';
import { Location, Next } from '../assets/svgs'
import { Header } from '../component/Header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../services/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const EventList = () => {
    const [token, setToken] = useState('')
    const [events, setEvents] = useState('')
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();
    

    useEffect(async() => {
        const value = await AsyncStorage.getItem('token');
        setToken(value)
    }, [])

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/users/api/gatekeeper/events/`, {
              headers: {
                'Authorization':  token,
                'Content-Type': 'application/json',
              },
            });
            console.log('response.data', response.data);
            setEvents(response.data)
            setLoading(false)
            console.log(response.data);
          } catch (error) {
            setLoading(false)
            console.error(error);
          }
        };
        if(token) {
        fetchData(); 
        }
      }, [token]);

    const handleLogout = () => {
        AsyncStorage.clear()
            .then(() => {
                console.log('AsyncStorage cleared successfully.');
                navigation.navigate('Login')
            })
            .catch((error) => {
                console.log('Error clearing AsyncStorage: ', error);
            });
    }


    return (
        <View style={{ backgroundColor: '#FFFBFF', height: heightPercentageToDP('105%'), paddingBottom: insets.bottom + 40 }}>
            <Header title='Event Lists' eventScreen={true} rightIcon={true} onPressRightIcon={() => handleLogout()} />
            <View style={{ flex: 1, width: widthPercentageToDP('90%'), alignSelf: 'center', alignItems: 'center' }}>
                {
                    loading ? <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size='large' /></View> : !events.length
                        ? <Text>No Event Found</Text>
                        :
                        <FlatList
                            data={events}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Validate Ticket', {event_id: item?.id})}>
                                    <LinearGradient
                                        colors={['rgba(51, 75, 226, 0.05)', 'rgba(51, 75, 226, 0.05)', '#FFFBFF']}
                                        style={styles.container}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <Image
                                                    resizeMode='cover'
                                                    source={{ uri: item?.cover_image }}
                                                    style={{ borderRadius: 20, borderColor: '#777680', borderWidth: 2, width: 65, height: 65 }}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 20 }}>
                                                <Text style={{ fontSize: 16, color: '#1B1B1F', fontFamily: 'OpenSans-Medium' }}>{item?.title}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 12, color: '#777680', fontFamily: 'OpenSans-Medium' }}>{item?.date}</Text>
                                                    <View
                                                        style={{
                                                            backgroundColor: '#1935D1',
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: 100,
                                                            opacity: 0.5,
                                                            marginLeft: 20,
                                                        }}
                                                    ></View>
                                                    <Text style={{ fontSize: 12, marginLeft: 10, color: '#777680', fontFamily: 'OpenSans-Medium' }}>{item?.category?.name}</Text>
                                                </View>
                                                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                                                    <Location />
                                                    <Text style={{ fontSize: 12, marginLeft: 10, color: '#777680', fontFamily: 'OpenSans-Medium' }}>{item?.venue?.name}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 20, position: 'absolute', bottom: 15 }}>
                                            <View>
                                                <Text style={{ fontSize: 16, color: '#777680', fontFamily: 'OpenSans-Medium' }}>Event number</Text>
                                                <Text style={{ fontSize: 16, color: '#1B1B1F', fontFamily: 'OpenSans-Medium' }}>{item?.id}</Text>
                                            </View>
                                            <View style={{ marginLeft: widthPercentageToDP('15%') }}>
                                                <Text style={{ fontSize: 16, color: '#777680', fontFamily: 'OpenSans-Medium' }}>Date</Text>
                                                <Text style={{ fontSize: 16, color: '#1B1B1F', fontFamily: 'OpenSans-Medium' }}>{moment(item?.date).format('Do [of] MMM. YYYY')}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginVertical: 16,
        width: 358,
        height: 158,
        backgroundColor: '#FFFBFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.12)',
    },
});
