import { View, Text, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { Colors } from '@/constants/Colors'
import { ListOfActionContext } from '@/context/ListOfActionContext'
import { FilterValues } from '@/types'

interface FilterModalProps {
  show?: boolean,
  onClose?: () => void
  style?: StyleProp<ViewStyle>
}

export default function FilterModal({
  show,
  onClose,
  style
}: FilterModalProps ) {
  const { selectedFilter, setSelectedFilter } = useContext(ListOfActionContext)!

  const handleFilterPress = (filter: FilterValues) => {
    if(selectedFilter === filter) return
    
    switch(filter) {
      case 'Tous':
        setSelectedFilter('Tous')
        break;
      case 'Ligne':
        setSelectedFilter('Ligne')
        break;
      case 'Operatrice':
        setSelectedFilter('Operatrice')
        break;
      case 'Agent':
        setSelectedFilter('Agent')
        break;
    }

    onClose && onClose()
  }

  const isTousSelected = useMemo(() => {
    return selectedFilter === 'Tous' ? true : false 
  }, [selectedFilter])

  const isLigneSelected = useMemo(() => {
    return selectedFilter === 'Ligne' ? true : false 
  }, [selectedFilter])

  const isOperatriceSelected = useMemo(() => {
    return selectedFilter === 'Operatrice' ? true : false 
  }, [selectedFilter])

  const isAgentSelected = useMemo(() => {
    return selectedFilter === 'Agent' ? true : false 
  }, [selectedFilter])

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
        <Text style={styles.title}>
          Filter par:
        </Text>
        <TouchableOpacity onPress={() => handleFilterPress('Tous')}>
          <Text 
            style={[
              styles.filtre,
              {fontFamily: isTousSelected ? 'poppins-bold' : 'poppins'}
            ]}
          >
            Tous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterPress('Ligne')}>
          <Text 
            style={[
              styles.filtre,
              {fontFamily: isLigneSelected ? 'poppins-bold' : 'poppins'}
            ]}
          >
            Ligne
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterPress('Operatrice')}>
          <Text 
            style={[
              styles.filtre,
              {fontFamily: isOperatriceSelected ? 'poppins-bold' : 'poppins'}
            ]}
          >
            Opératrice
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterPress('Agent')}>
          <Text 
            style={[
              styles.filtre,
              {fontFamily: isAgentSelected ? 'poppins-bold' : 'poppins'}
            ]}
          >
            Agent
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 2,
    zIndex: 99,
    elevation: 10
  },
  slideOut: {
    position: 'absolute',
    minWidth: "1000%",
    minHeight: '1000%',
    zIndex: 98,
  },
  title: {
    fontFamily: 'poppins-bold',
    color: Colors.DARK,
    fontSize: 15
  },
  filtre: {
    color: Colors.PRIMARY_GRAY,
    fontSize: 15
  },
})