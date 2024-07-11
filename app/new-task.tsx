import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function newTask() {
  const router = useRouter()

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        padding: 20
      }}
    >
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
      
      <Text
        style={{
          color: Colors.DARK,
          fontFamily: 'poppins-bold',
          fontSize: 40,
          marginTop: 100,
          marginBottom: 40
        }}
      >
        New Task
      </Text>

      <View
        style={{
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: Colors.DARK,
              fontFamily: 'poppins-bold',
              fontSize: 18,
            }}
          >
            Operatrice:
          </Text>
          <TextInput 
            placeholder='Sewing thread'
            style={styles.input}
          />
          <TextInput 
            placeholder='Cuturiere registration'
            style={styles.input}
          />
        </View>
        <View>
          <Text
            style={{
              color: Colors.DARK,
              fontFamily: 'poppins-bold',
              fontSize: 18,
            }}
          >
            Task:
          </Text>
          <TextInput 
            placeholder='Title'
            style={styles.input}
          />
          <TextInput 
            placeholder='Description'
            style={styles.textarea}
            multiline={true}
            numberOfLines={4}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}
          >
            <TouchableOpacity
              style={styles.addBtn}
            >
              <FontAwesome5 
                name="plus" 
                size={14} 
                color={Colors.PRIMARY_GRAY} 
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'poppins-bold',
                color: Colors.PRIMARY_GRAY,
                fontSize: 13
              }}
            >
              Add video
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.createBtn}
        >
          <Text
            style={{
              color: '#e2e2e2',
              fontFamily: 'poppins-bold',
              fontSize: 16,
              letterSpacing: 1.5
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  closeBtn: {
    width: 43,
    height: 43,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 2,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 60,
    left: 20
  },
  input: {
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 15,
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.PRIMARY_GRAY
  },
  textarea: {
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 2,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    fontFamily: 'poppins-medium',
    fontSize: 16,
    color: Colors.PRIMARY_GRAY
  },
  addBtn: {
    width: 47,
    height: 47,
    borderColor: Colors.SECONDARY_GRAY,
    borderWidth: 2,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createBtn: {
    width: '100%',
    backgroundColor: '#000',
    marginVertical: 40,
    padding: 13,
    borderRadius: 99,
    alignItems: 'center',
  }
})