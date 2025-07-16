import HeadBar from '@/components/headbar'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

export default function Spring() {
  const width = useSharedValue(100)

  const handleIncrease = () => {
    if (width.value >= 300) return
    // width.value += 50 //Default
    width.value = withSpring(width.value + 50) // With animation
  }

  const handleDecrease = () => {
    if (width.value <= 0) return
    // width.value -= 50 //Default
    width.value = withSpring(width.value - 50) // With animation
  }

  return (
    <React.Fragment>
      <HeadBar title='Spring' />
      <View className='flex-1 items-center  gap-4 p-8'>
        <Animated.View
          style={{
            width,
            height: 100,
            backgroundColor: 'violet',
          }}
          className={`rounded-2xl items-center justify-center`}
        />
        <Pressable onPress={handleIncrease} className='bg-blue-500 p-2 rounded-2xl w-1/2 items-center justify-center'>
          <Text className='text-white text-lg font-bold'>Increase</Text>
        </Pressable>
        <Pressable onPress={handleDecrease} className='bg-red-500 p-2 rounded-2xl w-1/2 items-center justify-center'>
          <Text className='text-white text-lg font-bold'>Decrease</Text>
        </Pressable>
      </View>
    </React.Fragment>
  )
}