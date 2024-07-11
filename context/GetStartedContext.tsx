import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useEffect, useState } from "react";

interface GetStartedContextProviderProps {
  children: React.ReactNode
}

interface GetStartedContextValues {
  isLoading: boolean,
  isFirstTime: boolean,
  setIsFirstTime: React.Dispatch<React.SetStateAction<boolean>>,
  setFirstTimeStatus: (value: boolean) => Promise<void>
}

export const GetStartedContext = createContext<GetStartedContextValues | null>(null)

export function GetStartedContextProvider({
  children
}: GetStartedContextProviderProps ) {
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const checkFirstTimeStatus = useCallback(async () => {
    try {
      const status = await AsyncStorage.getItem('firstTime');
      setIsFirstTime(status === null);
    } catch (error) {
      console.error("Failed to get first time status:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setFirstTimeStatus = useCallback(async (value: boolean) => {
    try {
      setIsLoading(true);
      if (value === true) {
        await AsyncStorage.removeItem('firstTime');
        setIsFirstTime(true);
      } else {
        await AsyncStorage.setItem('firstTime', 'false');
        setIsFirstTime(false);
      }
    } catch (error) {
      console.error("Failed to set first time status:", error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    checkFirstTimeStatus();
  } ,[checkFirstTimeStatus])

  return (
    <GetStartedContext.Provider
      value={{
        isLoading,
        isFirstTime,
        setIsFirstTime,
        setFirstTimeStatus
      }}
    >
      {children}
    </GetStartedContext.Provider>
  )
}