import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type ProfilePictureProps = {
    picture: string;
    tyHeight: Animated.SharedValue<number>;
}

const {width} = Dimensions.get('window');
const IMAGE_HEIGHT = 300;

const ProfilePicture: React.FC<ProfilePictureProps> = ({tyHeight, picture}) => {
    const animatedStyles = useAnimatedStyle(() => {
        const height = interpolate(
            tyHeight.value,
            [0, 120],
            [IMAGE_HEIGHT, IMAGE_HEIGHT + 120],
            Extrapolate.CLAMP
        )

        return {height}
    })

    return (
        <Animated.Image 
            source={{uri: picture}}
            style={[styles.profilePicture, animatedStyles]}
        />
    )
}

export default ProfilePicture;

const styles = StyleSheet.create({
    profilePicture: {
        width,
        height: 200
    }
})
