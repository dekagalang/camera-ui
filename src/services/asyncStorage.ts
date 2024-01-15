import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log(await _retrieveData(key));
  } catch (error) {
    console.log(error);
    // Error saving data
  }
};

export const _retrieveData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    // console.log(value);
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};

export const _removeData = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
    // if (value !== null) {
    //   // We have data!!
    //   return value;
    // }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};

export const _clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    // if (value !== null) {
    //   // We have data!!
    //   return value;
    // }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};
