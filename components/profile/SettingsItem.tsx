import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";

export default function SettingsItem({
  icon,
  title,
  showArrow = true,
  onPress,
}: {
  icon: ImageSourcePropType;
  title: string;
  showArrow?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-7 flex flex-row items-center justify-between mt-6"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className="text-lg font-rubik-medium text-black-300">
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-4" />}
    </TouchableOpacity>
  );
}
