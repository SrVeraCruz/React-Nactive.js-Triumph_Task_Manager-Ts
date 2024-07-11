import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { GetStartedContext } from '@/context/GetStartedContext';
import { useRouter } from 'expo-router';

export default function Index() {
  const context = useContext(GetStartedContext)
  const router = useRouter()

  if (!context) {
    throw new Error('useContext must be used within a GetStartedContextProvider');
  }

  const { isLoading, isFirstTime, setFirstTimeStatus } = context;

  const hadleOnPress = async () => {
    await setFirstTimeStatus(false)
  }

  useEffect(() => {
    if(!isFirstTime && !isLoading) {
      router.push('/home')
    }
  }, [isFirstTime, isLoading])

  if (isLoading) {
    return (
      <ActivityIndicator 
        size={'large'}
        color={Colors.PRIMARY}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff'
        }}
      />
    );
  }

  if(!isFirstTime) {
    return (
      <ActivityIndicator 
        size={'large'}
        color={Colors.PRIMARY}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff'
        }}
      />
    )
  }
  
  return (
    <View
      style={{
        height: '100%',
        padding: 25,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
      }}
    >
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'poppins-medium',
            fontSize: 13
          }}
        >
          WELCOME TO THE
        </Text>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'poppins-bold',
            fontSize: 44
          }}
        >
          CheckList
        </Text>
      </View>

      <Image 
        source={require('../assets/images/getStated-logo.png')}
        style={{
          height: 480,
          width: 330,
          marginHorizontal: 'auto',
          marginTop: 20,
          marginBottom: 35
        }}
      />

      <TouchableOpacity
        onPress={hadleOnPress}
        style={{
          width: '100%',
          borderColor: '#fff',
          borderWidth: 1,
          padding: 13,
          borderRadius: 99,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'poppins-bold',
            fontSize: 16,
            letterSpacing: 1.5
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
