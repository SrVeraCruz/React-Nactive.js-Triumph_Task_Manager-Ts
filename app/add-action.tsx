import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ToastAndroid, LayoutAnimation } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Button from '@/components/Util/Button/Button'
import { SuiviDesActionType, TaskType } from '@/types'
import { ListOfActionContext } from '@/context/ListOfActionContext'
import * as ImagePicker from 'expo-image-picker';
import VideoModal from '@/components/AddAction/VideoModal'
import { customAnimationSlow } from '@/constants/Variables'
import useVideoManager from '@/hooks/useVideoManager'
 
export default function AddTask() {
  const router = useRouter()
  const { addSuiviDesAction } = useContext(ListOfActionContext)!
  const { saveVideoToFileSystem } = useVideoManager()
  const [ligne, setLigne] = useState<string>("")
  const [operatrice, setOperatrice] = useState<string>("")
  const [agent, setAgent] = useState<string>("")
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false)
  const [videoUri, setVideoUri] = useState<string>("")

  useEffect(() => {
    setTasks([ 
      { 
        id: Date.now(),
        title: '', 
        comment: '',
        video: '',
        ligneCouture: '',
        numeroOperatrice: '',
        agentMethode: '',
        status: 'Non fait', 
        createdAt: Date()
      }
    ])
  }, [])

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

  const handleAddOtherTask = useCallback(() => {
    const task: TaskType = {
      id: Date.now(),
      title: '',
      comment: '',
      video: '',
      ligneCouture: '',
      numeroOperatrice: '',
      agentMethode: '',
      status: 'Non fait',
      createdAt: Date()
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTasks((prev) => (
      [...prev, task]
    ))
  }, [])

  const handleRemoveTask = useCallback((id: number) => {
    if(tasks.length <= 1) {
      return
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTasks((prev) => {
      return prev.filter((task) => task.id !== id)
    })
  }, [tasks])

  const handleChangeTitle = useCallback((value: string, index: number) => {
    setTasks((prev) => {
      const prevTasks = [...prev]
      prevTasks[index].title = value
      return prevTasks
    })
  }, [])

  const handleChangeDesc = useCallback((value: string, index: number) => {
    setTasks((prev) => {
      const prevTasks = [...prev]
      prevTasks[index].comment = value
      return prevTasks
    })
  }, [])
  
  const handleChangeVideo = useCallback(async (uri: string, index: number) => {
    LayoutAnimation.configureNext(customAnimationSlow)
    setTasks((prev) => {
      const prevTasks = [...prev]
      prevTasks[index].video = uri
      return prevTasks
    })
  }, [])
  
  const onVideoPicker = useCallback(async (index: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleChangeVideo(result.assets[0].uri, index)
    }
  }, [handleChangeVideo])

  const handleSubmit = useCallback(async () => {
    if(!ligne) {
      ToastAndroid.show(
        "Voullez rentrer la ligne de couture",
        ToastAndroid.BOTTOM
      )
      return
    }
    
    if(!operatrice) {
      ToastAndroid.show(
        "Voullez rentrer le numéro de la operatrice",
        ToastAndroid.BOTTOM
      )
      return
    }
    
    if(!agent) {
      ToastAndroid.show(
        "Voullez rentrer le numéro d'Agent de methode",
        ToastAndroid.BOTTOM
      )
      return
    }

    for(let i=0; i<tasks.length; i++) {
      if(!tasks[i].title) {
        ToastAndroid.show(
          `Voullez saisir le titre de la tache ${i+1}`,
          ToastAndroid.BOTTOM
        )
        return
      }
      
      tasks[i].ligneCouture = ligne
      tasks[i].numeroOperatrice = operatrice
      tasks[i].agentMethode = agent
      if(tasks[i].video) {
        const uri = await saveVideoToFileSystem(tasks[i].video!, tasks[i].title);
        uri && (tasks[i].video = uri)
      }
    }

    const suiviDesAction: SuiviDesActionType = {
      id: Date.now(),
      ligneCouture: ligne,
      numeroOperatrice: operatrice,
      agentMethode: agent,
      tasks,
      createdAt: Date()
    }

    await addSuiviDesAction(suiviDesAction)
    .then(() => {
      ToastAndroid.show("Ajouté avec sucess", ToastAndroid.BOTTOM)
      router.push('/workspace')
    }) 
    .catch(() => {
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer",
        ToastAndroid.BOTTOM
      ) 
    })

  }, [
    ligne, 
    operatrice, 
    agent, 
    tasks, 
    router, 
    saveVideoToFileSystem, 
    addSuiviDesAction
  ])

  return (
    <>
      <VideoModal 
        uri={videoUri} 
        show={isVideoOpen}
        onClose={() => handleShowVideo()}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeBtn}
          >
            <Ionicons
              name="close" 
              size={23} 
              color={Colors.DARK} 
            />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={{padding: 20}}>
          <Text style={styles.title}>
            Suivi des action
          </Text>

          <View style={{gap: 10, paddingBottom: 50}}>
            <View style={{gap: 10}}>
              <View>
                <Text style={styles.label}>
                  Ligne de couture:
                </Text>
                <TextInput 
                  value={ligne}
                  onChangeText={(value) => setLigne(value)}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.label}>
                  Numéro d'operatrice:
                </Text>
                <TextInput 
                  value={operatrice}
                  onChangeText={(value) => setOperatrice(value)}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.label}>
                Numéro d'agent de methode:
                </Text>
                <TextInput 
                  value={agent}
                  onChangeText={(value) => setAgent(value)}
                  style={styles.input}
                />
              </View>
            </View>
            {tasks.map((task, index) => (
              <View key={task.id}>
                <View style={styles.line} />
                <View style={styles.taskHeader}>
                  <Text style={styles.label}>
                    Tache {index+1}:
                  </Text>
                  {tasks.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleRemoveTask(task.id)}
                    >
                      <Ionicons 
                        name="close" 
                        size={20} 
                        color={Colors.DARK}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{gap: 10}}>
                  <TextInput 
                    placeholder='Titre'
                    style={styles.input}
                    
                    onChangeText={
                      (value) => handleChangeTitle(value,index)
                    }
                    />
                  <TextInput 
                    placeholder='Commentaire'
                    style={styles.textarea}
                    multiline={true}
                    numberOfLines={4}
                    
                    onChangeText={
                      (value) => handleChangeDesc(value,index)
                    } 
                  />
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    {task.video && ( 
                      <>
                        <TouchableOpacity 
                          activeOpacity={0.3}
                          style={styles.videoWrapper}
                          onPress={() => handleShowVideo(task.video!)}
                        >
                          <View style={styles.addVideoBtn}>
                            <FontAwesome5 
                              name="play"  
                              size={14} 
                              color={Colors.PRIMARY_GRAY} 
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          activeOpacity={0.3}
                          onPress={() => handleChangeVideo("", index)}
                        >
                          <Text style={styles.videoText}>
                            Annuler
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                    <TouchableOpacity 
                      activeOpacity={0.3}
                      style={task.video ? {} : styles.videoWrapper }
                      onPress={() => onVideoPicker(index)}
                    >
                      {!task.video && (
                        <View style={styles.addVideoBtn}>
                          <FontAwesome5 
                            name="plus" 
                            size={14} 
                            color={Colors.PRIMARY_GRAY} 
                          />
                        </View>
                      )}
                      <Text style={styles.videoText}>
                        {task.video ? 'Changer' : 'Ajouter video'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity 
              onPress={handleAddOtherTask}
              style={styles.addOtherTaskBtn}
            >
              <Text style={styles.addOtherTaskText}>
                +Autre tache
              </Text>
            </TouchableOpacity>
            <Button 
              variant='back' 
              onPress={() => handleSubmit()} 
            >
              Enregistrer action
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.SECONDARY_GRAY,
    paddingTop: 40,
    paddingBottom: 15
  },
  closeBtn: {
    width: 43,
    height: 43,
    borderColor: Colors.SECONDARY_GRAY,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  title: {
    color: Colors.DARK,
    fontFamily: 'poppins-bold',
    fontSize: 32,
    marginBottom: 20
  },
  line: {
    backgroundColor: Colors.SECONDARY_GRAY,
    width: '85%',
    height: 1,
    marginHorizontal: 'auto',
    marginVertical: 15
  },
  taskHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  label: {
    color: Colors.DARK,
    fontFamily: 'poppins-bold',
    fontSize: 15,
  },
  input: {
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1.5,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.PRIMARY_GRAY
  },
  textarea: {
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1.5,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.PRIMARY_GRAY
  },
  videoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  addVideoBtn: {
    width: 47,
    height: 47,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 2,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoText: {
    fontFamily: 'poppins-bold',
    color: Colors.PRIMARY_GRAY,
    fontSize: 13
  },
  addOtherTaskBtn: {
    marginTop: 6,
    marginBottom: 10,
    marginHorizontal: 'auto',
    padding: 8,
    width: 'auto',
  },
  addOtherTaskText: {
    fontFamily: 'poppins-bold',
    color: Colors.PRIMARY_GRAY,
    fontSize: 13,
    textAlign: 'center'
  }
})