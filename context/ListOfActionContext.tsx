import { FilterValues, SuiviDesActionType, TaskType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { debounce, DebouncedFunc } from 'lodash'

interface ListOfActionContextProviderProps {
  children: React.ReactNode
}

type StatusUpdate = 'loading' | 'error' | 'success' | null

interface ListOfActionContextValue {
  isLoading: boolean, 
  updateStatus: StatusUpdate, 
  addSuiviDesAction: (suiviDesAction: SuiviDesActionType) => Promise<void>,
  updateTask: (updatedTask: TaskType) => Promise<void>,
  removeTask: (id: number) => void,
  debouncedFetchResults: DebouncedFunc<(searchQuery: string) => void>,
  taskList: TaskType[], 
  isSearching: boolean
  filteredTasks: TaskType[], 
  selectedFilter: FilterValues,
  listSuiviDesActions: SuiviDesActionType[], 
  setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>, 
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterValues>>,
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  setListSuiviDesActions: React.Dispatch<React.SetStateAction<SuiviDesActionType[]>>
}

export const ListOfActionContext = createContext<ListOfActionContextValue | null>(null)

export default function ListOfActionContextProvider({
  children
}: ListOfActionContextProviderProps ) {
  const [listSuiviDesActions, setListSuiviDesActions] = useState<SuiviDesActionType[]>([])
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([])
  const [selectedFilter, setSelectedFilter] = useState<FilterValues>('Tous')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<StatusUpdate>(null) 
 
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
    // updatedList.map((action) => {
    //   action.tasks.map((task) => {
    //     console.log('upd: '+task.id) 
    //     console.log('upd: '+task.title)
    //   })
    // }) 
    try {
      await AsyncStorage.setItem('suiviDesActions', JSON.stringify(updatedList)).then(() => {
        setListSuiviDesActions(updatedList)
      }) 
    } catch (error) {
      console.error('Failed to update suivi des actions:', error)  
    }  
  }, [])
  
  const getSuiviByTaskId = useCallback((id: number) => {
    return listSuiviDesActions.find(action => action.tasks.some(task => task.id === id))
  }, [listSuiviDesActions])

  const addSuiviDesAction = useCallback(async (suiviDesAction: SuiviDesActionType) => {
    setUpdateStatus('loading')

    let actionExists = false

    const updatedList = listSuiviDesActions.map(action => {
      if (
        action.ligneCouture === suiviDesAction.ligneCouture && 
        action.agentMethode === suiviDesAction.agentMethode && 
        action.agentMethode === suiviDesAction.agentMethode
      ) {
        actionExists = true
        return {
          ...action,
          tasks: [...action.tasks, ...suiviDesAction.tasks]
        }
      }
      return action
    })

    if (!actionExists) {
      updatedList.push(suiviDesAction)
    }

    updateListOfActions(updatedList)
    .then(() => setUpdateStatus('success'))
    .catch(() => setUpdateStatus('error'))
}, [listSuiviDesActions, updateListOfActions])

  const updateTask = useCallback(async (updatedTask: TaskType) => {
    const updatedList = listSuiviDesActions.map(action => {
      const updatedTasks = action.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
      return { ...action, tasks: updatedTasks }
    })
    
    await updateListOfActions(updatedList)
  }, [listSuiviDesActions, getSuiviByTaskId])

  const removeTask = useCallback(async (taskId: number) => {
    const suivi = getSuiviByTaskId(taskId)
    if(!suivi) {
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer", 
        ToastAndroid.BOTTOM
      )
      return
    } 

    const updatedList = listSuiviDesActions.map(action => {
      if (action.id === suivi.id) {
        const updatedTasks = action.tasks.filter(task => task.id !== taskId)
        if (updatedTasks.length > 0) {
          return { ...action, tasks: updatedTasks }
        } else {
          return null
        }
      }
      return action
  }).filter(action => action !== null)
    
    await updateListOfActions(updatedList)  
  }, [listSuiviDesActions, getSuiviByTaskId, updateListOfActions])

  const fetchResults = useCallback((searchQuery: string) => {
    const searchResult: TaskType[] = []
    switch(selectedFilter) {
      case 'Tous':
        taskList.filter((task) => {
          task.title.includes(searchQuery) && searchResult.push(task)
        })
        break;
      case 'Ligne': 
        taskList.filter((task) => {
          task.ligneCouture.includes(searchQuery) && searchResult.push(task)
        })
        break;
      case 'Operatrice':
        taskList.filter((task) => {
          task.numeroCuturiere.includes(searchQuery) && searchResult.push(task)
        })
        break;
      case 'Agent':
        taskList.filter((task) => {
          task.agentMethode.includes(searchQuery) && searchResult.push(task)
        })
        break; 
    }
 
    
    setFilteredTasks(searchResult)   
  }, [taskList, selectedFilter]) 
 
  const debouncedFetchResults = useCallback(debounce(fetchResults,300),[fetchResults])

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
        updateStatus, 
        addSuiviDesAction,
        updateTask,
        removeTask,
        debouncedFetchResults,
        taskList, 
        selectedFilter,
        isSearching,
        filteredTasks,
        listSuiviDesActions, 
        setTaskList, 
        setFilteredTasks,
        setSelectedFilter,
        setIsSearching,
        setListSuiviDesActions
      }}
    >
      {children}
    </ListOfActionContext.Provider>
  )
}