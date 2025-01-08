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
import Filters from "@/components/Filters";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/hooks/useAppwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

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
              <TouchableOpacity
                className="size-11 flex justify-center items-center rounded-full bg-primary-200"
                onPress={() => router.back()}
              >
                <Image
                  source={icons.backArrow}
                  className="size-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text className="text-base font-rubik-semibold text-center">
                Search for Your Ideal Home
              </Text>
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
              <Filters />
              <Text className="mt-4 text-lg font-rubik-bold">
                Found {properties?.length} Properties
              </Text>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}
