import { FilterValues, SuiviDesActionType, TaskType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'
import { debounce, DebouncedFunc } from 'lodash'
import useVideoManager from '@/hooks/useVideoManager'

interface ListOfActionContextProviderProps {
  children: React.ReactNode
}

type StatusUpdate = 'loading' | 'error' | 'success' | null

interface ListOfActionContextValue {
  isLoading: boolean, 
  addSuiviDesAction: (suiviDesAction: SuiviDesActionType) => Promise<void>,
  updateTask: (updatedTask: TaskType) => Promise<void>,
  removeTask: (id: number) => Promise<void>,
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
  const { saveVideoToFileSystem, deleteVideoFromFileSystem } = useVideoManager()
  const [listSuiviDesActions, setListSuiviDesActions] = useState<SuiviDesActionType[]>([])
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([])
  const [selectedFilter, setSelectedFilter] = useState<FilterValues>('Tous')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sortTasksByCreatedAt = useCallback((tasks: TaskType[]): TaskType[] => {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
 
      return dateB.getTime() - dateA.getTime();
    });
  }, []); 
 
  const getSuiviDesActions = useCallback(async (): Promise<void> => { 
    setIsLoading(true)
    try {
      const res = await AsyncStorage.getItem('suiviDesActions')
      if (res) {
        const parsedRes: SuiviDesActionType[] = JSON.parse(res)
        setListSuiviDesActions(parsedRes)
      }
    } catch (error) {
      console.error('Failed to fetch suivi des actions:', error)
    } finally {  
      setIsLoading(false)
    }
  }, [saveVideoToFileSystem, sortTasksByCreatedAt])

  const getSuiviByTaskId = useCallback((id: number): SuiviDesActionType | null => {
    return listSuiviDesActions.find(action => action.tasks.some(task => task.id === id)) || null
  }, [listSuiviDesActions])

  const findExistingActionIndex = useCallback((
    existingActions: SuiviDesActionType[],
    newAction: SuiviDesActionType
  ): number => {
    return existingActions.findIndex((action) =>
      action.ligneCouture === newAction.ligneCouture && 
      action.agentMethode === newAction.agentMethode && 
      action.numeroOperatrice === newAction.numeroOperatrice 
    );
  }, [])

  const updateListOfActions = useCallback(async (updatedList: SuiviDesActionType[]): Promise<void> => {   
    try {
      await AsyncStorage.setItem('suiviDesActions', JSON.stringify(updatedList)).then(() => {
        setListSuiviDesActions(updatedList) 
      })  
    } catch (error) {
      console.error('Failed to update suivi des actions:', error)     
    }  
  }, []) 
  
  const addSuiviDesAction = useCallback(async (suiviDesAction: SuiviDesActionType): Promise<void> => {
    const existingIndex = findExistingActionIndex(listSuiviDesActions, suiviDesAction)
 
    let updatedList: SuiviDesActionType[] = []
    if (existingIndex !== -1) {
      updatedList = [...listSuiviDesActions];
      updatedList[existingIndex].tasks = [...updatedList[existingIndex].tasks, ...suiviDesAction.tasks]
    } else {
      updatedList = [...listSuiviDesActions, suiviDesAction]
    }
 
    await updateListOfActions(updatedList) 
  }, [listSuiviDesActions, findExistingActionIndex, updateListOfActions])

  const updateTask = useCallback(async (updatedTask: TaskType): Promise<void> => {
    updatedTask.status === 'En cours' && (updatedTask.updatedAt = Date())
    updatedTask.status === 'Fait' && (updatedTask.finishedAt = Date())

    const updatedList = listSuiviDesActions.map(action => {
      const updatedTasks = action.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ) 
      return { ...action, tasks: updatedTasks }
    })
    
    await updateListOfActions(updatedList)
  }, [listSuiviDesActions, updateListOfActions])

  const removeTask = useCallback(async (taskId: number): Promise<void> => {
    const suivi = getSuiviByTaskId(taskId)
    if(!suivi) {
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer", 
        ToastAndroid.BOTTOM
      )
      return
    } 

    const updatedList = await Promise.all(listSuiviDesActions.map(async action => {
      if (action.id === suivi.id) {
        const updatedTasks = await Promise.all(action.tasks.map(async task => {
          if (task.id === taskId && task.video) {
            await deleteVideoFromFileSystem(task.video);
          }
          return task.id !== taskId ? task : null;
        })); 

        const filteredTasks = updatedTasks.filter(task => task !== null); 

        if (filteredTasks.length > 0) {
          return { ...action, tasks: filteredTasks };
        } else { 
          return null; 
        }  
      }
      return action; 
    }));

    const finalUpdatedList = updatedList.filter(action => action !== null);
 
    await updateListOfActions(finalUpdatedList)  
  }, [listSuiviDesActions, getSuiviByTaskId, deleteVideoFromFileSystem, updateListOfActions])
  
 
  const fetchResults = useCallback((searchQuery: string): void => {
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
      case 'Opératrice':
        taskList.filter((task) => {
          task.numeroOperatrice.includes(searchQuery) && searchResult.push(task)
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
    if(listSuiviDesActions.length > 0) {
      const tasks = listSuiviDesActions.flatMap(action => action.tasks)
      setTaskList(sortTasksByCreatedAt(tasks))  
    } 
  }, [listSuiviDesActions]) 

  return (
    <ListOfActionContext.Provider
      value={{
        isLoading, 
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