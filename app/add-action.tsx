import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Button from '@/components/Util/Button/Button'
import { SuiviDesActionType, TaskType } from '@/types'
import { ListOfActionContext } from '@/context/ListOfActionContext'

const defaultTask: TaskType[] = [
  {
    id: Date.now(),
    title: '',
    description: '',
    status: 'Non fait'
  }
]
export default function AddTask() {
  const router = useRouter()
  const { updatedStatus, addSuiviDesAction } = useContext(ListOfActionContext)!
  const [ligne, setLigne] = useState("")
  const [cuturiere, setCuturiere] = useState("")
  const [agent, setAgent] = useState("")
  const [tasks, setTasks] = useState(defaultTask)
  
  const handleAddOtherTask = useCallback(() => {
    const task: TaskType = {
      id: Date.now(),
      title: '',
      description: '',
      status: 'Non fait'
    }

    setTasks((prev) => (
      [...prev, task]
    ))
  }, [])

  const handleRemoveTask = useCallback((id: number) => {
    if(tasks.length <= 1) {
      return
    }
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
      prevTasks[index].description = value
      return prevTasks
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    if(!ligne) {
      ToastAndroid.show(
        "Voullez rentrer la ligne de couture",
        ToastAndroid.BOTTOM
      )
      return
    }
    
    if(!cuturiere) {
      ToastAndroid.show(
        "Voullez rentrer le numéro de la cuturiere",
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
      if(!tasks[i].description) {
        ToastAndroid.show(
          `Voullez saisir la description de la tache ${i+1}`,
          ToastAndroid.BOTTOM
        )
        return
      }
    }

    const suiviDesAction: SuiviDesActionType = {
      id: Date.now(),
      ligneCouture: ligne,
      numeroCuturiere: cuturiere,
      agentMethode: agent,
      tasks
    }

    await addSuiviDesAction(suiviDesAction).then(() => {
      ToastAndroid.show("Ajouté avec sucess", ToastAndroid.BOTTOM)
      router.push('/workspace')
      return
    })

    if(updatedStatus === 'error') {
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer",
        ToastAndroid.BOTTOM
      )
      return
    }

  }, [ligne, cuturiere, agent, tasks, addSuiviDesAction])

  return (
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
                Numéro de la cuturiere:
              </Text>
              <TextInput 
                value={cuturiere}
                onChangeText={(value) => setCuturiere(value)}
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
            <View key={task.id} /*style={styles.taskWrapper}*/>
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
                  placeholder='Description'
                  style={styles.textarea}
                  multiline={true}
                  numberOfLines={4}
                  
                  onChangeText={
                    (value) => handleChangeDesc(value,index)
                  }
                />
                <TouchableOpacity 
                  activeOpacity={0.3}
                  style={styles.videoWrapper}
                >
                  <View style={styles.addVideoBtn}>
                    <FontAwesome5 
                      name="plus" 
                      size={14} 
                      color={Colors.PRIMARY_GRAY} 
                    />
                  </View>
                  <Text style={styles.addVideoText}>
                    Ajouter video
                  </Text>
                </TouchableOpacity>
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
  // taskWrapper: {
    // borderTopWidth: 1,
    // borderColor: Colors.SECONDARY_GRAY,
    // paddingTop: 15,
    // marginTop: 15,
  // },
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
  addVideoText: {
    fontFamily: 'poppins-bold',
    color: Colors.PRIMARY_GRAY,
    fontSize: 13
  },
  addOtherTaskBtn: {
    marginTop: 10,
    marginBottom: 20
  },
  addOtherTaskText: {
    fontFamily: 'poppins-bold',
    color: Colors.PRIMARY_GRAY,
    fontSize: 13,
    textAlign: 'center'
  }
})