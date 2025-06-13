import * as ImagePicker from 'expo-image-picker';
import AuthStackStore from '../../Context/Zustand/ZustandStore';

const useImageUploader = () => {
  const setUploadedImage = AuthStackStore((state) => state.setUploadedImage);

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      await setUploadedImage(selectedAsset.uri);
      return selectedAsset;
    }

    return null;
  };

  return uploadImage;
};

export default useImageUploader;
