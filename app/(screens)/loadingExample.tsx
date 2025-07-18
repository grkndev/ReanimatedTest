import HeadBar from '@/components/headbar'
import Icons from '@/components/ui/icons'
import React from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

interface IStep {
    id: number,
    status: 'success' | 'error' | 'loading' | 'pending'
    name: string
}

const initialSteps: IStep[] = [
    {
        id: 1,
        status: 'pending',
        name: 'Initializing'
    },
    {
        id: 2,
        status: 'pending',
        name: 'Creating'
    },
    {
        id: 3,
        status: 'pending',
        name: 'Building'
    },
    {
        id: 4,
        status: 'pending',
        name: 'Uploading'
    },
]

export default function LoadingExample() {
    const [steps, setSteps] = React.useState<IStep[]>(initialSteps)
    const [isAnimating, setIsAnimating] = React.useState(false)

    const handleStart = () => {
        if (isAnimating) return

        // Reset all steps to pending
        setSteps(initialSteps)
        setIsAnimating(true)

        // Start the sequential animation
        startSequentialAnimation()
    }

    const startSequentialAnimation = () => {
        let currentStepIndex = 0

        const processNextStep = () => {
            if (currentStepIndex >= steps.length) {
                setIsAnimating(false)
                return
            }

            // Set current step to loading
            setSteps(prev => prev.map((step, index) =>
                index === currentStepIndex
                    ? { ...step, status: 'loading' as const }
                    : step
            ))

            // After 1.5 seconds, set to success and immediately start next step
            setTimeout(() => {
                setSteps(prev => prev.map((step, index) =>
                    index === currentStepIndex
                        ? { ...step, status: 'success' as const }
                        : step
                ))

                currentStepIndex++

                // Immediately start next step for simultaneous font transitions
                processNextStep()
            }, 3000)
        }

        processNextStep()
    }

    const handleReset = () => {
        setSteps(initialSteps)
        setIsAnimating(false)
    }

    return (
        <React.Fragment>
            <HeadBar title='Example 1' />
            <View className='flex-1 items-center justify-center gap-4 p-4'>
                <FlatList
                    data={steps}
                    renderItem={({ item }) => (
                        <StepComponent item={item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10, alignItems: 'flex-start', justifyContent: 'center', flexGrow: 1 }}
                    centerContent={true}
                />

                <View className='flex-row gap-4 w-full '>
                    <Pressable
                        onPress={handleStart}
                        disabled={isAnimating}
                        className={`flex-1 p-4 rounded-2xl items-center justify-center ${isAnimating ? 'bg-zinc-400' : 'bg-zinc-950'}`}
                    >
                        <Text className='text-white text-lg font-bold'>
                            {isAnimating ? 'Animating...' : 'Start Animation'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </React.Fragment>
    )
}

function StepComponent({ item }: { item: IStep }) {
    const fontSize = useSharedValue(20) // text-xl = 20px
    const fontWeight = useSharedValue(400) // normal weight
    const opacity = useSharedValue(1) // opacity for skeleton animation

    React.useEffect(() => {
        // Animate font size and weight based on status
        if (item.status === 'loading') {
            fontSize.value = withTiming(21.5, { duration: 300 }) // text-2xl = 24px
            // fontWeight.value = withTiming(700, { duration: 300 }) // bold

            // Skeleton animation for loading state
            opacity.value = withRepeat(
                withTiming(0.3, { duration: 800 }),
                -1, // infinite
                true // reverse
            )
        } else if (item.status === 'success') {
            fontSize.value = withTiming(20, { duration: 300 }) // back to text-xl
            // fontWeight.value = withTiming(400, { duration: 300 }) // back to normal

            // Reset opacity to normal
            opacity.value = withTiming(1, { duration: 300 })
        } else {
            fontSize.value = withTiming(20, { duration: 300 }) // text-xl
            // fontWeight.value = withTiming(400, { duration: 300 }) // normal

            // Reset opacity to normal
            opacity.value = withTiming(1, { duration: 300 })
        }
    }, [item.status])

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            fontSize: fontSize.value,
            fontWeight: fontWeight.value.toString() as any,
            opacity: opacity.value,
        }
    })

    return (
        <View className='flex-row items-center gap-2'>
            {getIcon(item.status)}
            <Animated.Text
                style={[
                    animatedTextStyle,
                    { color: getItemColor(item.status) }
                ]}
            >
                {item.name}
            </Animated.Text>
        </View>
    )
}

const getItemColor = (status: IStep['status']) => {
    switch (status) {
        case 'success':
            return '#15803d' // text-green-700
        case 'error':
            return '#ef4444' // text-red-500
        case 'loading':
            return '#000000' // black
        case 'pending':
            return '#6b7280' // text-gray-500
    }
}

const getIcon = (status: IStep['status']) => {
    switch (status) {
        case 'success':
            return <Icons name='CircleCheck' size={18} color='black' />
        case 'error':
            return <Icons name='CircleX' size={18} color='black' />
        case 'loading':
            return <ActivityIndicator size='small' color='black' />
        case 'pending':
            return <Icons name='CircleDashed' size={18} color='black' />
    }
}