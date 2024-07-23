import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from '../Util/Input/Checkbox'
import { TaskStatusValues, TaskType } from '@/types'
import { ListOfActionContext } from '@/context/ListOfActionContext'

interface TaskBoxProps {
  task: TaskType,
  onPlay?: () => void
}

export default function TaskBox({
  task,
  onPlay
}: TaskBoxProps ) {
  const { selectedFilter, updateTask, removeTask } = useContext(ListOfActionContext)!
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState(task.status)
  
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOpen((prev) => !prev)
  }

  const handleStatusChange = async (newStatus: TaskStatusValues) => {
    if (status !== newStatus) {
      setStatus(newStatus)
      await updateTask({ ...task, status: newStatus })
    }
  }

  const handleOnPlay = useCallback(() => {
    onPlay && onPlay()
  }, [onPlay])

  const filterText = useMemo(() => {
    let text = `${selectedFilter}: `
    text += selectedFilter === 'Agent' ? task.agentMethode : ''
    text += selectedFilter === 'Ligne' ? task?.ligneCouture : ''
    text += selectedFilter === 'Opératrice' ? task?.numeroOperatrice : ''

    return text
  }, [selectedFilter])


  return (
    <TouchableOpacity
      style={ styles.container }
      onPress={handlePress}
      activeOpacity={1}
    >
      <View>
        {selectedFilter !== 'Tous' && (
          <Text style={styles.filterText}>
            {filterText}
          </Text>
        )}
        <Text style={styles.taskTilte}>
          {task?.title}
        </Text>
        <TouchableOpacity 
          onPress={async () => await removeTask(task.id)}
          style={styles.removeBtn}
        >
          <Ionicons 
            name="trash-outline" 
            size={22} 
            color={Colors.RED} 
          />
        </TouchableOpacity>

        <View style={styles.checkboxWrapper}>
          <Checkbox 
            label='Non fait'
            checked={status === 'Non fait'}
            onClick={() => handleStatusChange('Non fait')}
          />
          <Checkbox 
            label='En cours'
            checked={status === 'En cours'}
            onClick={() => handleStatusChange('En cours')}
          />
          <Checkbox 
            label='Fait'
            checked={status === 'Fait'}
            onClick={() => handleStatusChange('Fait')}
          />
        </View>
      </View>

      {isOpen && (
        <View style={styles.moreInfoWrapper}>
          {task.comment && (
            <View style={styles.subContainer}>
              <Text style={styles.commentText}>
                {task?.comment}
              </Text>
            </View>
          )}
          {task.video && (
            <TouchableOpacity 
              onPress={() => handleOnPlay()}
              style={styles.playWrapper}
            >
              <Ionicons 
                name="play" 
                size={20}
                color={Colors.SECONDARY_GRAY} 
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: Colors.BG_GRAY,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1,
    borderRadius: 6,
    position: 'relative'
  },
  subContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1,
    borderRadius: 4,
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: -6
  },
  filterText: {
    fontSize: 15,
    fontFamily: 'poppins-medium',
    color: Colors.DARK
  },
  taskTilte: {
    fontSize: 24,
    fontFamily: 'poppins-bold',
    color: Colors.DARK
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  moreInfoWrapper: {
    gap: 15,
    marginTop: 15
  },
  commentText: {
    color: Colors.PRIMARY_GRAY,
    fontFamily: 'poppins-medium',
    fontSize: 15
  },
  playWrapper: {
    width: 40,
    height: 39,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 1.5,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  }
})