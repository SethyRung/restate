import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Card({
  image,
  name,
  address,
  price,
  rating,
  onPress,
}: {
  image: any;
  name: string;
  address: string;
  price: number;
  rating: number;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="w-full min-w-40 flex-1 mt-4 p-3 rounded-3xl bg-white shadow-lg shadow-black-100/70 relative"
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: image }}
        className="w-full h-40 rounded-xl overflow-hidden"
        resizeMode="cover"
      >
        <View className="px-2 py-1 absolute top-2 right-2 flex flex-row items-center gap-2 bg-white rounded-full">
          <Image source={icons.star} className="size-3.5" />
          <Text className="text-xs font-rubik-bold text-primary-300">
            {rating}
          </Text>
        </View>
      </ImageBackground>
      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">{name}</Text>
        <Text className="text-xs font-rubik text-black-100">{address}</Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            ${price}
          </Text>
          <TouchableOpacity>
            <Image
              source={icons.heart}
              className="size-6"
              tintColor="#191D31"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
