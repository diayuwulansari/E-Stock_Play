import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Box, HStack, Heading, Center } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, withBack = false }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar barStyle="light" backgroundColor="transparent" translucent />
      <Box bg="transparent" p="4" borderBottomWidth={1} borderBottomColor="white">
        <HStack justifyContent="space-between">
          {!withBack ? null : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <Box mr={"3"}>
                <Ionicons name="arrow-back-outline" size={28} color="grey" />
              </Box>
            </TouchableOpacity>
          )}
          <Heading color={"white"} flex={1}>{title}</Heading>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default Header;
