import React, { useCallback, useEffect, useState } from 'react'
import { SuiviDesActionType, TaskType } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'

type StatusUpdate = 'loading' | 'error' | 'success' | null

export default function useListOfActions() {
  const [listSuiviDesActions, setListSuiviDesActions] = useState<SuiviDesActionType[]>([])
  const [taskList, setTaskList] = useState<TaskType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<StatusUpdate>(null)

  const getSuiviDesActions = useCallback(async () => {
    setIsLoading(true)
    setListSuiviDesActions([])
    setTaskList([])

    const res = await AsyncStorage.getItem('suiviDesActions')
    if(res) {
      const parsedRes: SuiviDesActionType[] = JSON.parse(res)
      setListSuiviDesActions(parsedRes)

      parsedRes.map((sAction) => {
        sAction.tasks.map((task) => {
          setTaskList((prev) => (
            [...prev, task]
          ))
        })
      })
    }
    setIsLoading(false)
  }, [AsyncStorage])
  
  const getSuiviByTaskId = useCallback((id: number) => {
    for(let i=0; i<listSuiviDesActions.length; i++) {
      for(let j=0; j<listSuiviDesActions[i].tasks.length; j++) {
        if(listSuiviDesActions[i].tasks[j].id === id) {
          return listSuiviDesActions[i]
        }
      }
    }
  }, [listSuiviDesActions])

  const updateSuiviDesActions = useCallback(async () => {
    setUpdateStatus('loading')
    await AsyncStorage.setItem(
      'suiviDesActions',
      JSON.stringify(listSuiviDesActions)
    )
    .then(() => setUpdateStatus('success'))
    .catch(() => setUpdateStatus('error'))
  }, [AsyncStorage, listSuiviDesActions])

  const removeTask = useCallback((taskId: number) => {
    const suivi = getSuiviByTaskId(taskId)
    if(!suivi) {
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer", 
        ToastAndroid.BOTTOM
      )
      return
    } 

    const updatedTaskList = taskList.filter((task) => task.id !== taskId)
    const updatedSuivi: SuiviDesActionType[] = []
    listSuiviDesActions.map((action) => {
      if(action.id === suivi.id) {
        action.tasks = updatedTaskList
      }
      updatedSuivi.push(action)
    })
    // console.log(updatedSuivi)
    setListSuiviDesActions(updatedSuivi)
  }, [taskList, listSuiviDesActions, ToastAndroid])

  useEffect(() => {
    if(isLoading || listSuiviDesActions.length <= 0) return;
    updateSuiviDesActions()
  }, [listSuiviDesActions])

  useEffect(() => {
    getSuiviDesActions()
  }, [getSuiviDesActions])

  return { 
    isLoading, 
    updateStatus, 
    removeTask,
    taskList, 
    listSuiviDesActions, 
    setTaskList, 
    setListSuiviDesActions,
  }
}