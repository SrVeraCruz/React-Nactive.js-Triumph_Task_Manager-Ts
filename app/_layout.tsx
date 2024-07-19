import { Colors } from "@/constants/Colors";
import { GetStartedContextProvider } from "@/context/GetStartedContext";
import ListOfActionContextProvider from "@/context/ListOfActionContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function RootLayout() {
  const [ fontsLoaded ] = useFonts({
    'poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf')
  })

  if(!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.PRIMARY}/>
      </View>
    )
  }

  return (
    <GetStartedContextProvider>
      <ListOfActionContextProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="index" />
        </Stack>
      </ListOfActionContextProvider>
    </GetStartedContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  }
})