import React, {useState, useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../Screen/Login";
import { OTP } from '../Screen/OTP';
import { EventList } from '../Screen/EventList';
import { TicketValidator } from '../Screen/TicketValidator';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
export const AuthStack = () => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const stackOptions = {headerShown: false};
 
  const isToken = () => {
    AsyncStorage.getItem('token').then((token) =>{
      setToken(token)
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }

  useEffect(() => {
    isToken()
  }, [])

  if (loading) {
    return  null 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'EVENT LIST': 'Login'}>
        <Stack.Screen name="Login" component={Login} options={stackOptions} />
        <Stack.Screen name="otp" component={OTP} options={stackOptions} />
        <Stack.Screen name="EVENT LIST" component={EventList} options={stackOptions}  />
        <Stack.Screen name="Validate Ticket" component={TicketValidator} options={stackOptions}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}