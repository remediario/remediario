import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAtom } from "jotai";
import { remediosAtom } from "@/atoms";

export default function Index() {
  const [remedios] = useAtom(remediosAtom);
  return (
    <View className="flex p-8 gap-8">
      <View className="flex flex-row gap-4 items-center">
        <FontAwesome6 name="pills" size={32} color="black" />
        <Text className="font-bold text-3xl">Meus remédios</Text>
      </View>

      {remedios.length === 0 && (
        <View className="bg-white shadow-sm rounded-lg p-8 gap-6 items-center">
          <MaterialCommunityIcons
            name="hand-wave-outline"
            size={64}
            color="black"
          />
          <View className="gap-2">
            <Text className="text-xl font-bold">
              Parece que você é novo por aqui
            </Text>
            <Text className="">
              Comece tirando uma foto da sua receita para adicionar um remédio.
            </Text>
          </View>

          <Link href="/add" className="bg-rose-600 p-4 text-white rounded-lg">
            <View className="flex flex-row gap-2 items-center">
              <FontAwesome6 name="camera" size={18} color="white" />
              <Text className="text-white">Adicionar remédio</Text>
            </View>
          </Link>
        </View>
      )}

      {remedios.length > 0 && (
        <View className="gap-8">
          <Link href="/add" className="bg-rose-600 p-4 text-white rounded-lg">
            <View className="flex flex-row gap-2 items-center">
              <FontAwesome6 name="camera" size={18} color="white" />
              <Text className="text-white">Adicionar remédio</Text>
            </View>
          </Link>

          <View className="grid grid-cols-1 gap-2">
            {remedios.map((remedio, index) => (
              <View
                key={index}
                className="bg-white shadow-sm rounded-lg p-4 flex-row gap-4 items-center"
              >
                <MaterialCommunityIcons name="pill" size={28} color="black" />
                <View>
                  <Text className="font-bold text-xl">{remedio.nome}</Text>
                  <Text className="text-gray-500">
                    {remedio.principioAtivo}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
