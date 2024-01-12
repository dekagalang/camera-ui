import React, {useEffect, useState, useCallback, useRef, Fragment} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  StatusBar,
  // Alert,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import axios from 'axios';
import {
  Heading,
  Box,
  Text,
  Button,
  ButtonText,
  HStack,
  VStack,
  Fab,
  FabIcon,
  AddIcon,
  ScrollView,
  Spinner,
} from '@gluestack-ui/themed';
import {Pressable} from '@gluestack-ui/themed';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const url =
  'https://4000-dekagalang-templateflut-aho3n838iq2.ws-us107.gitpod.io';

function Home({navigation}: any) {
  const [showCamera, setShowCamera] = useState(false);
  const [loadingCapture, setLoadingCapture] = useState(false);
  const [cameraDevice, setCameraDevice] = useState('front');
  const [resImage, setResImage] = useState<any | null>(null);
  // const [box, setBox] = useState<any | null>({
  //   x_max: 0,
  //   x_min: 0,
  //   y_max: 0,
  //   y_min: 0,
  // });
  // const {x_max, x_min, y_max, y_min} = box;
  // const {x_min, y_min} = box;
  // let getSimilarity = false;
  const [imageSource, setImageSource] = useStateCallback('');
  const camera = useRef<any>(null);
  const devices = useCameraDevices();
  const device = cameraDevice === 'back' ? devices.back : devices.front;

  function useStateCallback(initialState: any) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef<any>(null); // init mutable ref container for callbacks

    const setStateCallback = useCallback((value: any, cb: null) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(value);
    }, []); // keep object reference stable, exactly like `useState`

    useEffect(() => {
      // cb.current is `null` on initial render,
      // so we only invoke callback on state *updates*
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null; // reset callback after execution
      }
    }, [state]);

    return [state, setStateCallback];
  }

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
    const backAction = () => {
      if (showCamera === true) {
        setShowCamera(false);
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showCamera]);

  async function upload(photo: any) {
    try {
      var formData = new FormData();
      formData.append('image', {
        uri: `file://'${photo.path}`,
        name: 'test.jpg',
        type: 'image/jpeg',
      });
      formData.append('width', windowWidth);
      // const url = new URL(request.url);
      // const search = new URLSearchParams(url.search);
      // if (!search.get("city")) return redirect("/");
      // const city = search.get("city");
      // const res = await axios.post(url);
      await axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(function (response) {
          //handle success
          console.log(response);
          // setBox(response.data.result[0].box);
          setResImage(response.data);
          setLoadingCapture(false);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          setLoadingCapture(false);
        });

      // return res.data;
      // return { city, type: res.data.weather[0].main, temp: res.data.main.temp };
    } catch (err) {
      // console.error(err);
      // redirect("/");
      // return {};
      setLoadingCapture(false);
    }
  }

  // const createTwoButtonAlert = (msg1: any = '', msg2: any = '') =>
  //   Alert.alert('Alert', `${msg1} ${msg2}`, [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'OK', onPress: () => console.log('OK Pressed')},
  //   ]);

  const capturePhoto = async () => {
    setLoadingCapture(true);
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      // createTwoButtonAlert(photo.width, photo.height);
      setImageSource(photo, (updated: any) => upload(updated));
      setShowCamera(false);
    }
  };

  const reset = () => {
    setShowCamera(true);
    setImageSource('');
    setResImage(null);
  };

  if (resImage !== null) {
    // getSimilarity = resImage.result[0].subjects.some((item: any) => item.similarity <= 0.9 ? false : true)
  }

  if (device == null) {
    return <Spinner size="large" />;
  }

  return (
    <Fragment>
      <StatusBar animated={true} backgroundColor="#6474ff" />
      <ScrollView contentContainerStyle={styles.container}>
        {showCamera ? (
          <>
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={showCamera}
              photo={true}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.camButton}
                onPress={() => capturePhoto()}
              />
            </View>
          </>
        ) : (
          <>
            {loadingCapture ? (
              <Spinner size="large" />
            ) : imageSource !== '' && resImage !== null ? (
              <>
                <Image
                  style={styles.image}
                  source={{
                    uri: `file://'${imageSource.path}`,
                  }}
                />
                {resImage.length > 0 &&
                  resImage.map((item: any) => (
                    <View
                      style={{
                        ...styles.box,
                        top: item.box.y_min,
                        left: item.box.x_min,
                        width: item.box.x_max - item.box.x_min,
                        height: item.box.y_max - item.box.y_min,
                      }}
                    />
                  ))}
              </>
            ) : (
              <View style={styles.containerHome}>
                <Heading
                  marginTop={20}
                  marginBottom={4}
                  marginHorizontal={20}
                  fontSize={20}
                  color="#fff"
                  lineHeight={20}>
                  Halo (username)
                </Heading>
                <Heading
                  marginVertical={0}
                  marginHorizontal={20}
                  fontSize={16}
                  color="#fff"
                  fontWeight="400"
                  lineHeight={20}>
                  Selamat Sore
                </Heading>
                <Box
                  backgroundColor="#fff"
                  marginHorizontal={20}
                  marginTop={16}
                  padding={20}
                  borderRadius={12}>
                  <Heading marginVertical={0} fontSize={18} lineHeight={20}>
                    Jumlah Terdaftar
                  </Heading>
                  <Text marginTop={4} color="black">
                    Total ada (jumlah) wajah yang terdaftar
                  </Text>
                  <Button
                    $active-bg="#dadade"
                    backgroundColor="black"
                    width={140}
                    borderRadius={100}
                    marginTop={20}
                    alignItems="center">
                    <ButtonText color="#fff">Tambah</ButtonText>
                  </Button>
                </Box>
                <VStack marginBottom={20}>
                  <HStack>
                    <Pressable
                      $active-bg="#dadade"
                      flex={1}
                      backgroundColor="#fff"
                      marginHorizontal={20}
                      marginTop={16}
                      padding={20}
                      borderRadius={12}
                      height={200}
                      onPress={() => navigation.navigate('Laporan')}>
                      <Box>
                        <Heading
                          marginVertical={0}
                          fontSize={18}
                          lineHeight={20}>
                          Laporan
                        </Heading>
                        <Text marginTop={4} color="black">
                          Laporan Absensi
                        </Text>
                      </Box>
                    </Pressable>
                    <Box
                      backgroundColor="transparent"
                      borderColor="#dadade"
                      borderWidth={2}
                      marginRight={20}
                      marginTop={16}
                      padding={20}
                      borderRadius={12}
                      flex={1}
                      height={200}>
                      <Heading
                        marginVertical={0}
                        fontSize={18}
                        lineHeight={20}
                        color="#fff">
                        Coming Soon
                      </Heading>
                    </Box>
                  </HStack>
                  <HStack>
                    <Box
                      backgroundColor="transparent"
                      marginLeft={20}
                      borderColor="#dadade"
                      borderWidth={2}
                      marginHorizontal={20}
                      marginTop={16}
                      padding={20}
                      borderRadius={12}
                      flex={1}
                      height={200}>
                      <Heading
                        marginVertical={0}
                        fontSize={18}
                        lineHeight={20}
                        color="#fff">
                        Coming Soon
                      </Heading>
                    </Box>
                    <Box
                      backgroundColor="transparent"
                      borderColor="#dadade"
                      borderWidth={2}
                      marginRight={20}
                      marginTop={16}
                      padding={20}
                      borderRadius={12}
                      flex={1}
                      height={200}>
                      <Heading
                        marginVertical={0}
                        fontSize={18}
                        lineHeight={20}
                        color="#fff">
                        Coming Soon
                      </Heading>
                    </Box>
                  </HStack>
                </VStack>
              </View>
            )}

            {/* <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => reset()}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View> */}
            {/* <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => reset()}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  Retake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() =>
                  setCameraDevice(cameraDevice === 'back' ? 'front' : 'back')
                }>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  {cameraDevice}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={() => reset()}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          </>
        )}
      </ScrollView>
      {!showCamera ? (
        <Fab
          bgColor="black"
          $active-bg="#dadade"
          size="lg"
          placement="bottom center"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          onPress={() => reset()}>
          <FabIcon as={AddIcon} />
        </Fab>
      ) : null}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  box: {
    position: 'absolute',
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  containerHome: {
    backgroundColor: '#6474ff',
    flex: 1,
    width: '100%',
  },
  headingHome: {
    color: '#fff',
    fontSize: 20,
  },
  subHeadingHome: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Home;
