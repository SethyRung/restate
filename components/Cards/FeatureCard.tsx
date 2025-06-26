import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

export default function FeatureCard({
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
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: image }}
        className="w-64 h-80 rounded-3xl overflow-hidden"
        resizeMode="cover"
      >
        <Image
          source={images.cardGradient}
          className="size-full rounded-2xl absolute bottom-0"
        />
        <View className="px-2 py-1 absolute top-4 right-4 flex flex-row items-center gap-2 bg-white rounded-full">
          <Image source={icons.star} className="size-3.5" />
          <Text className="text-xs font-rubik-bold text-primary-300">
            {rating}
          </Text>
        </View>
        <View className="w-full p-4 absolute bottom-0 left-0 flex gap-1">
          <Text className="text-white text-xl font-rubik-semibold">{name}</Text>
          <Text className="text-gray-100 text-xl font-rubik">{address}</Text>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white text-xl font-rubik-semibold">
              ${price}
            </Text>
            <TouchableOpacity>
              <Image source={icons.heart} className="size-6" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
