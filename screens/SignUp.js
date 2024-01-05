import React, { useState } from 'react';
import { Center, View, Text, Box, Heading, FormControl, Input, Button, Image, ScrollView } from 'native-base';
import { TouchableOpacity, Modal } from 'react-native';
import { registerUser } from '../src/actions/AuthAction';

const Register = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const onRegister = async () => {
    if (nama && email && nohp && password) {
      const data = {
        nama: nama,
        email: email,
        nohp: nohp,
        status: "user",
      };

      console.log(data);

      try {
        const user = await registerUser(data, password);
        navigation.replace("Login");
      } catch (error) {
        console.log("Error", error.message);
        toggleAlert(error.message);
      }
    } else {
      console.log("Error", "Data tidak lengkap");
      toggleAlert("Data tidak lengkap");
    }
  };

  return (
    <Center flex={1} w="100%" justifyContent="flex-end">
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
            <ScrollView>
              <FormControl>
                <FormControl.Label>Nama</FormControl.Label>
                  <Input
                    value={nama}
                    onChangeText={setNama}
                    height={35}
                  /> 
              </FormControl>
              
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                  <Input
                      label="Email"
                      value={email}
                      onChangeText={setEmail}
                      height={35}
                    />
              </FormControl>
                
              <FormControl>
                <FormControl.Label>No. Handphone</FormControl.Label>
                  <Input
                    label="No. Handphone"
                    keyboardType="phone-pad"
                    value={nohp}
                    onChangeText={setNohp}
                    height={35}
                  />
              </FormControl>  

              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                    label="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    height={35}
                  />
              </FormControl>  
                
            </ScrollView>

            <Button
              mt="5" colorScheme="indigo"
              onPress={() => { 
                onRegister();
              }}
              width={350} // Atur lebar sesuai yang diinginkan
              height={43} // Atur tinggi sesuai yang diinginkan
            >
              Sign Up
            </Button>
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

export default Register;
