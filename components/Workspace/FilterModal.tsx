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

interface filterItemType {
  id: number,
  name: FilterValues,
  action: ()=> void
}

export default function FilterModal({
  show,
  onClose, 
  style
}: FilterModalProps ) {
  const { selectedFilter, setSelectedFilter } = useContext(ListOfActionContext)!

  const filterItem: filterItemType[] = useMemo(() => [
    {
      id: 1,
      name: 'Tous',
      action: ()=> setSelectedFilter('Tous')
    },
    { 
      id: 2,
      name: 'Ligne',
      action: ()=> setSelectedFilter('Ligne')
    },
    { 
      id: 3,
      name: 'Opératrice',
      action: ()=> setSelectedFilter('Opératrice')
    },
    { 
      id: 4,
      name: 'Agent',
      action: ()=> setSelectedFilter('Agent')
    },
  ], [])

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
        {filterItem.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.action}>
            <Text 
              style={[
                styles.filtre,
                {fontFamily: selectedFilter === item.name ? 'poppins-bold' : 'poppins'}
              ]}
            >
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