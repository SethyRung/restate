import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { login } from "@/lib/appwrite";
import { Redirect } from "expo-router";

export default function Auth() {
  const { isLogged, loading, refetch } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/" />;
  const handlelogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Image
          source={images.onboarding}
          className="w-full h-[498px]"
          resizeMode="contain"
        />
        <View className="p-4">
          <Text className="text-base text-black-200 font-rubik uppercase text-center">
            Welcome To Real Scout
          </Text>
          <Text className="mt-2 text-3xl text-black-300 font-rubik-bold text-center">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to Real Scout with Google
          </Text>
          <TouchableOpacity
            onPress={handlelogin}
            className="bg-white shadow-md shadow-zinc-400 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
