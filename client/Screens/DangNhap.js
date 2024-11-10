import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DangNhap = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Đăng nhập thành công
                console.log(data);
                // Lưu tên người dùng và link ảnh vào navigation
                navigation.navigate("Main", { 
                    username: username, // Truyền username
                    avatar: data.avatar // Truyền link ảnh
                }); 

                setUsername("")
                setPassword("")
            } else {
                // Đăng nhập không thành công
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <View>
            <View style={{ marginBottom: 20 }}>
                <Image source={require("../assets/Data/Image20.png")} style={{ height: 200, width: '100%' }} />
            </View>

            <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 40 }}>
                    <Text style={{ fontSize: 30, fontWeight: '600', marginVertical: 10 }}>
                        Welcome
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderRadius: 20, padding: 10 }}>
                        <Icon name="user" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Enter your username"
                            style={{ flex: 1, outlineStyle: 'none' }}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderRadius: 20, padding: 10 }}>
                        <Icon name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Enter your password"
                            secureTextEntry
                            style={{ flex: 1, outlineStyle: 'none' }}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={{ width: '94%', marginLeft: 16, marginTop: 11, backgroundColor: 'rgb(34, 200, 247)', paddingVertical: 11, borderRadius: 20 }}
                    onPress={handleLogin}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ width: '94%', marginLeft: 16, marginTop: 11, backgroundColor: 'rgb(34, 200, 247)', paddingVertical: 11, borderRadius: 20 }}
                    onPress={() => {
                        navigation.navigate("DangKy");
                    }}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                        You don't have an account? Sign Up Here
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default DangNhap;
