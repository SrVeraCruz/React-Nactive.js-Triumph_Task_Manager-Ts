import { SuiviDesActionType, TaskType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'

interface ListOfActionContextProviderProps {
  children: React.ReactNode
}

type StatusUpdate = 'loading' | 'error' | 'success' | null

interface ListOfActionContextValue {
  isLoading: boolean, 
  updatedStatus: StatusUpdate, 
  addSuiviDesAction: (suiviDesAction: SuiviDesActionType) => Promise<void>,
  removeTask: (id: number) => void,
  taskList: TaskType[], 
  listSuiviDesActions: SuiviDesActionType[], 
  setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>, 
  setListSuiviDesActions: React.Dispatch<React.SetStateAction<SuiviDesActionType[]>>
}


export const ListOfActionContext = createContext<ListOfActionContextValue | null>(null)

export default function ListOfActionContextProvider({
  children
}: ListOfActionContextProviderProps ) {
  const [listSuiviDesActions, setListSuiviDesActions] = useState<SuiviDesActionType[]>([])
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [updatedStatus, setUpdatedStatus] = useState<StatusUpdate>(null)

  const getSuiviDesActions = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await AsyncStorage.getItem('suiviDesActions')
      if (res) {
        const parsedRes: SuiviDesActionType[] = JSON.parse(res)
        setListSuiviDesActions(parsedRes.reverse())
      }
    } catch (error) {
      console.error('Failed to fetch suivi des actions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateListOfActions = useCallback(async (updatedList: SuiviDesActionType[]) => {
    try {
      await AsyncStorage.setItem('suiviDesActions', JSON.stringify(updatedList)).then(() => {
        setListSuiviDesActions(updatedList)
      })
    } catch (error) {
      console.error('Failed to update suivi des actions:', error)
    }
  }, [setListSuiviDesActions])
  
  const getSuiviByTaskId = useCallback((id: number) => {
    return listSuiviDesActions.find(action => action.tasks.some(task => task.id === id))
  }, [listSuiviDesActions])

  const addSuiviDesAction = useCallback(async (suiviDesAction: SuiviDesActionType) => {
    setUpdatedStatus('loading')
    const updatedList = [...listSuiviDesActions, suiviDesAction];
    updateListOfActions(updatedList)
    .then(() => setUpdatedStatus('success'))
    .catch(() => setUpdatedStatus('error'))
  }, [listSuiviDesActions, updateListOfActions])

  const removeTask = useCallback(async (taskId: number) => {
    const suivi = getSuiviByTaskId(taskId)
    if(!suivi) {
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer", 
        ToastAndroid.BOTTOM
      )
      return
    } 

    const updatedList = listSuiviDesActions.map((action) =>
      action.id === suivi.id
      ? { ...action, tasks: action.tasks.filter(task => task.id !== taskId) }
      : action
    )
    
    await updateListOfActions(updatedList)
  }, [listSuiviDesActions, getSuiviByTaskId, updateListOfActions])

  useEffect(() => {
    getSuiviDesActions()
  }, [getSuiviDesActions])

  useEffect(() => {
    setTaskList([])

    const tasks = listSuiviDesActions.flatMap(action => action.tasks)
    setTaskList(tasks.reverse())
  }, [listSuiviDesActions])

  return (
    <ListOfActionContext.Provider
      value={{
        isLoading, 
        updatedStatus, 
        addSuiviDesAction,
        removeTask,
        taskList, 
        listSuiviDesActions, 
        setTaskList, 
        setListSuiviDesActions
      }}
    >
      {children}
    </ListOfActionContext.Provider>
  )
}