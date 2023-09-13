import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';
import {View, Text, Image, Animated, Easing} from 'react-native';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import {AllIcons} from '../../../../assets/icons';
import {SongControl} from '../../../types';
import {styles} from './styles';
import {storage} from '../../../storage';

type TrackPropsType = {
  songControl: SongControl;
  setSongControl: React.Dispatch<React.SetStateAction<SongControl>>;
};

async function handleControl(item: any) {
  try {
    const trackStatus = await TrackPlayer.getState();
    if (trackStatus == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  } catch (e) {
    console.log(e);
  }
}

const format = (time: number) => {
  let minutes = Math.trunc(time / 60)
    .toString()
    .padStart(2, '0');
  let second = (Math.trunc(time) % 60).toString().padStart(2, '0');
  return `${minutes}:${second}`;
};

export const TrackControl = ({songControl, setSongControl}: TrackPropsType) => {
  const style = styles();
  const offsetY = React.useRef(new Animated.Value(500)).current;
  const {position, duration} = useProgress();
  React.useEffect(() => {
    return Animated.timing(offsetY, {
      toValue: 0,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const progress = position / duration;
  const [trackProgress, setProgress] = React.useState(progress);

  React.useEffect(() => {
    setProgress(progress);
  }, [progress]);

  React.useEffect(() => {
    const checkCurrentSong = async () => {
      const trackIn = await TrackPlayer.getCurrentTrack();
      const trackStatus = await TrackPlayer.getState();
      if (trackIn != null) {
        const lastTrack = storage.getString('lastTrack');
        const parseTrack = JSON.parse(lastTrack!);
        const track = await TrackPlayer.getTrack(trackIn);
        const lastTrackPro = storage.getString('trackProgress');
        if (lastTrackPro != undefined) {
          const trackPro = JSON.parse(lastTrackPro);
          console.log(trackPro);
          if (track) {
            if (parseTrack.songId != track.id || trackStatus == State.Paused) {
              await TrackPlayer.skip(parseTrack.songIndex, trackPro);
            }
          }
        }
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
    songControl.songIndex != -1 && (
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
            {songControl.songId} {songControl.songTitle}
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
              value={trackProgress}
              onSlidingComplete={value => {
                setProgress(value[0]);
                TrackPlayer.seekTo(value[0] * duration);
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
              handleControl(songControl.songIndex);
              // setSongControl({...songControl, status: !songControl.status});
            }}
            style={style.trackControlPlay}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={
                songControl.status == true
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
