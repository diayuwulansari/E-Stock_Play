import React, { useState } from 'react';
import { 
  Center,
  View,
  Box,
  Heading, 
  VStack, 
  FormControl, 
  Input, 
  Button, 
  HStack, 
  Text, 
  Image,
} from 'native-base';
import { TouchableOpacity, Modal } from 'react-native';
import { loginUser } from '../src/actions/AuthAction';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const login = () => {
    if (email && password) {
      loginUser(email, password)
        .then((user) => {
          // Pengguna berhasil login, alihkan ke halaman Home
          navigation.replace("Home");
        })
        .catch((error) => {
          // Terjadi kesalahan saat login, tampilkan pesan kesalahan
          console.log("Error", error.message);
          toggleAlert(error.message);
        });
    }
  };

  return (
    <Center flex={1} w="100%" justifyContent="flex-end">
      {/* untuk mengatur baground image */}
      <Image
        source={require('../assets/bgLogin.jpg')}
        alt="Background Image"
        resizeMode="cover"
        height="50%"
        width="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-1}
      />
      
      <Box safeArea p="8" py="8" w="100%" maxW="100%" bg="white" borderRadius="30" borderBottomRadius="0" >
        <Heading size="xl" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
          Welcome
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={password} onChangeText={setPassword} secureTextEntry />
          </FormControl>
          <Button mt="5" colorScheme="indigo" onPress={() => login()}>
            Login
          </Button>

          {/* Tautan untuk SignUp */}
          <HStack justifyContent="center" mt="3">
            <Text fontSize="md" color="coolGray.600">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text fontSize="md" color="indigo.500">
                SignUp
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Box>

      {/* Show Alert */}
      <Modal
      visible={showAlert}
      transparent={true}
      animationType="fade"
      onRequestClose={() => toggleAlert()}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>Error!</Text>
            <Text>{alertMessage}</Text>
            <TouchableOpacity onPress={() => toggleAlert()} style={{ marginTop: 10, backgroundColor: 'blue', padding: 8, alignItems: 'center', borderRadius: 5 }}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Center>
  );
};

export default Login;
