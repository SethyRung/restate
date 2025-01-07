import icons from "@/constants/icons";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import { useGlobalContext } from "@/lib/global-provider";
import Search from "@/components/Search";
import Card from "@/components/Cards/Card";
import FeatureCard from "@/components/Cards/FeatureCard";
import images from "@/constants/images";
import Filters from "@/components/Filters";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/hooks/useAppwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
  const { user } = useGlobalContext();

  const getPartOfDay = () => {
    const hour = dayjs().hour();

    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 17) {
      return "afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "evening";
    } else {
      return "night";
    }
  };

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            image={item.image}
            name={item.name}
            address={item.address}
            price={item.price}
            rating={item.rating}
            onPress={() => handleCardPress(item.$id)}
          ></Card>
        )}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pt-5 px-8 pb-32"
        columnWrapperClassName="flex gap-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <>
            <View className="mb-4 flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-11 rounded-full"
                  resizeMode="contain"
                />
                <View>
                  <Text className="text-sm text-black-200 font-rubik">
                    Good {getPartOfDay()}
                  </Text>
                  <Text className="text-lg font-rubik-semibold">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="relative">
                <Image
                  source={icons.bell}
                  className="size-6"
                  tintColor="#0061FF"
                  resizeMode="contain"
                />
                <View className="size-2 bg-primary-300/80 rounded-full absolute right-0 top-1"></View>
              </TouchableOpacity>
            </View>
            <Search />
            <View className="mt-4">
              <View className=" flex flex-row items-center justify-between">
                <Text className="text-lg font-rubik-bold">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-sm text-primary-300 font-rubik-semibold">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={latestProperties}
                renderItem={({ item }) => (
                  <FeatureCard
                    image={item.image}
                    name={item.name}
                    address={item.address}
                    price={item.price}
                    rating={item.rating}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>
            <View className="mt-8">
              <View className=" flex flex-row items-center justify-between">
                <Text className="text-lg font-rubik-bold">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-sm text-primary-300 font-rubik-semibold">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}
