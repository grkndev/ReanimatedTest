import HeadBar from '@/components/headbar';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';


const DURATION = 1000;
const DELAY = 500;

export default function Delay() {

  const [isVisible, setIsVisible] = React.useState(false);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);


  const handleDelay = () => {
    if (isVisible) {
      opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
      opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
      opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
    } else {
      opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
      opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
      opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
    }

    setIsVisible(!isVisible);

  }


  return <React.Fragment>
    <HeadBar title='Delay' />
    <View className='flex-1 items-center  gap-4 p-8'>
    
      <View className='justify-start w-full items-start p-4'>

        <Animated.Text style={{ opacity: opacity1 }} className='text-[72px] font-bold'>React</Animated.Text>
        <Animated.Text style={{ opacity: opacity2 }} className='text-[72px] font-bold'>Native</Animated.Text>
        <Animated.Text style={{ opacity: opacity3 }} className='text-[54px] font-bold'>Reanimated</Animated.Text>
      </View>

      <Pressable onPress={handleDelay} className='bg-zinc-900 p-4 rounded-2xl items-center justify-center w-full'>
        <Text className='text-white text-lg font-bold'>Toggle</Text>
      </Pressable>

    </View>
  </React.Fragment>

}