import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, LayoutAnimation } from 'react-native'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Colors } from '@/constants/Colors'
import TaskBox from './TaskBox'
import { useRouter } from 'expo-router'
import { ListOfActionContext } from '@/context/ListOfActionContext'
import VideoModal from '../Util/VideoModal'
import { customAnimationSlow } from '@/constants/Variables'

export default function Body() {
  const router = useRouter()
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false)
  const [videoUri, setVideoUri] = useState<string>("")
  const {
    isLoading, 
    taskList, 
    isSearching, 
    selectedFilter, 
    filteredTasks
  } = useContext(ListOfActionContext)!

  const handleAddTask = () => {
    router.push('/add-action')
  }

  const headlineTitle = useMemo(() => {
    if(isSearching && selectedFilter !== 'Tous') {
      return `Filtrée par ${selectedFilter} (${filteredTasks.length})`
    }
    
    if(isSearching && selectedFilter === 'Tous') {
      return `Resultat de recherche (${taskList.length})`
    }

   return `Toutes les tâches (${taskList.length})`
  
  }, [isSearching, selectedFilter, filteredTasks, taskList])

  const handleShowVideo = useCallback((uri?: string) => {
    LayoutAnimation.configureNext(customAnimationSlow)
    if(isVideoOpen || !uri) {
      setVideoUri('')
      setIsVideoOpen(false)
      return
    }

    setVideoUri(uri!)
    setIsVideoOpen(true)
  }, [isVideoOpen])

  return (
    <>
      <VideoModal 
        uri={encodeURI(videoUri)} 
        show={isVideoOpen}
        onClose={() => handleShowVideo()}
      />
      <View style={styles.headline}>
        <Text style={styles.title}>
          # {headlineTitle}
        </Text>
        <TouchableOpacity
          onPress={handleAddTask}
        >
          <Text style={styles.addBtn}>
            +Ajouter
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{paddingHorizontal: 20, zIndex: -1}}>
        <View style={{gap: 18}}>
          {isLoading ? (
            <ActivityIndicator 
              size={'large'}
              color={Colors.PRIMARY}
              style={{marginTop: 30}}
            />
          ):(isSearching && (
            filteredTasks.length > 0 
              ? filteredTasks.map((item, index) => (
                  <TaskBox key={index} task={item}/>
                )) 
              : (
                <Text style={styles.noDataLabel}>
                  aucune resultat
                </Text>
              )
          ))}
        
          {!isLoading && !isSearching && taskList.length > 0
            ? taskList.map((item, index) => (
                <TaskBox 
                  key={index} 
                  task={item}
                  onPlay={() => handleShowVideo(item.video)}
                />
              ))
            : (
              <Text style={styles.noDataLabel}>
                Aucune tache
              </Text>
            )
          }
        </View>
        <View style={{marginBottom: 300}} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  headline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingTop: 15,
    zIndex: -1
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    color: Colors.DARK
  },
  addBtn: {
    color: Colors.PRIMARY,
    fontFamily: 'poppins-bold'
  },
  noDataLabel: {
    fontFamily: 'poppins-bold',
    fontSize: 15,
    color: Colors.PRIMARY_GRAY,
    textAlign: 'center',
    marginTop: '50%'
  }
})