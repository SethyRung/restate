import SettingsItem from "@/components/profile/SettingsItem";
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 pt-5 px-8"
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <View className="relative">
            <Image
              source={icons.bell}
              className="size-6"
              tintColor="#0061FF"
              resizeMode="contain"
            />
            <View className="size-2 bg-primary-300/80 rounded-full absolute right-0 top-1"></View>
          </View>
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10 border-t border-primary-200">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col mt-10 border-t border-primary-200">
          {settings.map((item, index) => (
            <SettingsItem icon={item.icon} title={item.title} key={index} />
          ))}
        </View>
        <View className="flex flex-col mt-10 border-t border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
