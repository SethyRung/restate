import icons from "@/constants/icons";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="h-14 px-2 flex flex-row items-center justify-between gap-2 rounded-lg bg-gray-50/60">
      <Image source={icons.search} className="size-6" />
      <TextInput
        placeholder="Search for anything"
        className="h-full flex-1 font-rubik text-base text-black-300"
        value={search}
        onChangeText={handleSearch}
      />
      <TouchableOpacity className="size-6 flex items-center justify-center">
        <Image source={icons.filter} className="size-6" />
      </TouchableOpacity>
    </View>
  );
}
