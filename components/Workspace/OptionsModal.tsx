import { View, Text, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, ToastAndroid, Share } from 'react-native'
import React, { useCallback, useContext, useMemo } from 'react'
import { Colors } from '@/constants/Colors'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { ListOfActionContext } from '@/context/ListOfActionContext';

interface OptionsModalProps {
  show?: boolean,
  onClose?: () => void
  style?: StyleProp<ViewStyle>
}

export default function OptionsModal({
  show,
  onClose, 
  style
}: OptionsModalProps ) {
  const { taskList: tasks } = useContext(ListOfActionContext)!

  const generateAndShareTasksFile = useCallback(async () => {
    try {
      let fileContent = 'Id\tLigne\tOperatrice\tAgent\tTitre\tCommentaire\tVideo\n'
      fileContent += tasks.map(task => (
        `${task.id}\t${task.ligneCouture}\t${task.numeroOperatrice}\t${task.agentMethode}\t${task.title}\t${task.comment}\t${task.video}\n`
      )).join('');
  
      const date =  new Date()
      const fileName = 'tasks_'+date.toISOString().slice(0,10)+'_'+date.getTime()+'.txt'

      const filePath = FileSystem.documentDirectory + fileName;
  
      await FileSystem.writeAsStringAsync(filePath, fileContent);
  
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        await Sharing.shareAsync(filePath)
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      } else {
        ToastAndroid.show(
          "Une erreur s'est produite. Veuillez réessayer", 
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.error("Une erreur s'est produite:", error);
      ToastAndroid.show(
        "Une erreur s'est produite. Veuillez réessayer", 
        ToastAndroid.BOTTOM
      );
    }
  }, [tasks]);

  const optionItem = useMemo(() => [
    {
      id: 1,
      name: 'Exporter txt',
      action: generateAndShareTasksFile
    },
  ], [generateAndShareTasksFile])

  return (
    <>
      <TouchableOpacity 
        onPress={onClose} 
        style={[
          styles.slideOut,
          {
            display: show ? 'flex' : 'none',
            opacity: show ? 1 : 0,
          }
        ]} 
      />
      <View style={[
        styles.container,
        style,
        {
          display: show ? 'flex' : 'none',
          opacity: show ? 1 : 0,
        },
      ]}>
        {optionItem.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.action}>
            <Text style={styles.option}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
    borderRadius: 2,
    zIndex: 99,
    elevation: 10
  },
  slideOut: {
    position: 'absolute',
    top: '-999%',
    right: '-999%',
    minWidth: "9999999%",
    minHeight: '9999999%',
    zIndex: 98,
  },
  title: {
    fontFamily: 'poppins-bold',
    color: Colors.DARK,
    fontSize: 15
  },
  option: {
    color: Colors.PRIMARY_GRAY,
    fontSize: 15
  },
})