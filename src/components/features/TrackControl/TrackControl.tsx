import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';
import {View, Text, Image, Animated, Easing} from 'react-native';
import TrackPlayer, {State, Track, useProgress} from 'react-native-track-player';
import {AllIcons} from '../../../../assets/icons';
import {styles} from './styles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

type TrackPropsType = {
  activeTrackProp: Track;
  status : "PLAYING" | "PAUSED" |"BUFFERING" | "OTHER"
};



const format = (time: number) => {
  let minutes = Math.trunc(time / 60)
    .toString()
    .padStart(2, '0');
  let second = (Math.trunc(time) % 60).toString().padStart(2, '0');
  return `${minutes}:${second}`;
};

export const TrackControl = ({activeTrackProp ,status}: TrackPropsType) => {
  const style = styles();
  const offsetY = React.useRef(new Animated.Value(500)).current;
  const {position, duration} = useProgress();
  const {activeTrackPosition} =
  useAppSelector(state => state.music);

  React.useEffect(() => {
    return Animated.timing(offsetY, {
      toValue: 0,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const progress = position / duration;
  const [trackProgress, setProgress] = React.useState(0);

  async function handleControl() {
    try {
      
      // const trackStatus = await TrackPlayer.getState();
      if (status == 'PLAYING') {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    if(position)
    {
    setProgress(position);
    }
  }, [position]);

  React.useEffect(() => {
    const checkCurrentSong = async () => {
      const trackIn = await TrackPlayer.getCurrentTrack();
      // const trackStatus = await TrackPlayer.getState();
      if (trackIn != null) { 
        const track = await TrackPlayer.getTrack(trackIn); 
        console.log("TrackControl Component" , activeTrackProp , "Status :",status);
        if (track && activeTrackProp.id != "" && activeTrackProp.id != undefined) {
          if (
            activeTrackProp.id != track.id ||
            status == 'PAUSED' 
            ) {
                await TrackPlayer.skip(trackIn, activeTrackPosition);
              }
            }
          }
          else{
            console.log("first");
          }
    };
  
    checkCurrentSong();
   
  }, []);

  const handleNext = async () => {
    await TrackPlayer.skipToNext();
    TrackPlayer.play();
  };

  const handlePrevious = async () => {
    await TrackPlayer.skipToPrevious();
    TrackPlayer.play();
  };

  return (
    activeTrackProp && (
      <Animated.View
        style={[
          style.trackControlContainer,
          {
            opacity: offsetY.interpolate({
              inputRange: [0, 125, 250, 500],
              outputRange: [1, 0.3, 0.3, 0],
            }),
            transform: [{translateY: offsetY}],
          },
        ]}>
        <View>
          <Text style={style.trackTitle}>
            {activeTrackProp.id} {activeTrackProp.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <View style={{width: '11%', alignItems: 'center'}}>
            <Text style={style.trackProgressText}>{format(position)}</Text>
          </View>
          <View style={{width: '75%'}}>
            <Slider
              trackStyle={{width: '100%', height: 3.5, borderRadius: 10}}
              animateTransitions={true}
              animationType="timing"
              minimumTrackTintColor="#DBB159"
              maximumTrackTintColor="#78788029"
              thumbStyle={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#70eaff',
                elevation: 5,
                height: 25,
                width: 25,
                borderRadius: 28,
              }}
              trackClickable={false}
              minimumValue={0}
              maximumValue={duration}
              value={trackProgress}
              onValueChange={async(value)=>{
                setProgress(value[0]);
              }}
              onSlidingComplete={async(value) => {
                await TrackPlayer.seekTo(value[0]);
                setProgress(value[0]);
              }}
            />
          </View>
          <View style={{width: '11%', alignItems: 'center'}}>
            <Text style={style.trackProgressText}>{format(duration)}</Text>
          </View>
        </View>
        <View style={style.trackForwardControl}>
          <View onTouchEnd={() => handlePrevious()} style={style.forwardImage}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={AllIcons.ForwardControl}
            />
          </View>
          <View
            onTouchEnd={() => {
              handleControl();
            }}
            style={style.trackControlPlay}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={
               status == 'PLAYING'
                  ? AllIcons.TrackPause
                  : AllIcons.TrackPlay
              }
            />
          </View>
          <View
            onTouchEnd={() => handleNext()}
            style={[
              style.forwardImage,
              {
                transform: [{rotate: '180deg'}],
              },
            ]}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={AllIcons.ForwardControl}
            />
          </View>
        </View>
      </Animated.View>
    )
  );
};
