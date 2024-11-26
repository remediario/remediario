import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";

import { useRouter } from "expo-router";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AddScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [takingPhoto, setTakingPhoto] = useState(false);

  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View className="p-8 h-full flex-1 gap-8">
      <View className="bg-gray-100 rounded-lg p-4 border border-gray-300 flex-row gap-4 items-center">
        <FontAwesome6 name="circle-info" size={24} color="#4b5563" />
        <Text className="text-lg text-gray-600">
          Tire uma foto da sua receita. Vamos identificar o remédio para você.
        </Text>
      </View>

      <View className="flex-1 overflow-hidden rounded-2xl">
        <CameraView
          facing="back"
          style={{ height: "100%", width: "100%" }}
          ref={(ref) => setCameraRef(ref)}
          animateShutter={true}
        ></CameraView>
      </View>

      {takingPhoto && <ActivityIndicator size="large" color="#e11d48" />}

      {!takingPhoto && (
        <TouchableOpacity
          className="bg-rose-600 p-4 flex-row items-center justify-center rounded-lg gap-2"
          onPress={async () => {
            if (takingPhoto) return;
            setTakingPhoto(true);
            const photoData = await cameraRef?.takePictureAsync({
              base64: true,
            });
            if (!photoData) return Alert.alert("Error", "No photo taken");
            setPhoto(photoData.uri);
            setModalVisible(true);
            setTakingPhoto(false);
          }}
        >
          <FontAwesome6 name="camera" size={20} color="white" />
          <Text className="text-white text-xl">Tirar foto</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView>
          {photo && (
            <View className="p-8 gap-4 w-full h-full bg-white">
              <Text className="text-4xl font-bold">Que tal esta?</Text>
              <View className="bg-gray-100 rounded-lg p-4 border border-gray-300 flex-row gap-4 items-center">
                <FontAwesome6 name="circle-info" size={24} color="#4b5563" />
                <Text className="text-lg text-gray-600">
                  Precisamos de uma foto legível para identificar seu remédio.
                </Text>
              </View>
              <Image
                source={{ uri: photo }}
                className="w-full flex-1 rounded-xl"
              />
              <View className="gap-2">
                <TouchableOpacity
                  className=" flex-row gap-4 items-center bg-rose-600 p-4 rounded-lg"
                  onPress={() => {
                    setModalVisible(false);
                    router.dismissTo("/");
                  }}
                >
                  <FontAwesome6 name="circle-check" size={22} color="white" />
                  <Text className="text-white font-bold">
                    Está boa, vamos lá
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row gap-4 items-center bg-gray-200 p-4 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesome6 name="backward" size={22} color="black" />
                  <Text>Voltar e tirar outra foto</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default AddScreen;
