import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import DangKy from './Screens/DangKy';
import DangNhap from './Screens/DangNhap';
import Main from './Screens/Main';
import QuanLy from './Screens/QuanLy';
import CapNhatUser from './Screens/CapNhatUser';
const Stack=createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName='DangNhap'
        screenOptions={{headerShown:false}}
      >

        <Stack.Screen name="DangKy" component={DangKy} />
         <Stack.Screen name="DangNhap" component={DangNhap} />
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="QuanLy" component={QuanLy} />
        <Stack.Screen name="CapNhatUser" component={CapNhatUser}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
