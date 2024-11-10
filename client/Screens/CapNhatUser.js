import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const CapNhatUser = ({ route, navigation }) => {
  const { userId } = route.params;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
        // Kiểm tra cấu trúc dữ liệu trả về từ API
        if (response.data) {
          setUsername(response.data.username);
          setEmail(response.data.email);
          setAvatar(response.data.avatar); // Đường dẫn đến avatar
        } else {
          alert("Không tìm thấy thông tin người dùng.");
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        alert("Có lỗi xảy ra khi tải thông tin người dùng.");
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Cập nhật tất cả các trường
      await axios.put(`http://localhost:4000/api/users/${userId}`, { username, email, avatar });
      alert("Người dùng đã được cập nhật thành công!");
      navigation.goBack(); // Quay lại màn hình trước
    } catch (error) {
      console.error('Error updating user:', error);
      alert("Có lỗi xảy ra trong quá trình cập nhật người dùng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin người dùng</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nhập tên người dùng"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={avatar}
        onChangeText={setAvatar}
        placeholder="Nhập URL avatar"
      />
      <Button title="Cập nhật" onPress={handleUpdate} disabled={loading} />
      
      {/* Hiển thị avatar nếu có */}
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default CapNhatUser;
