var trackable_rhedaMarker01 = new RTTrackable("marker1");
var audioaroff = new RTImage("assets/audioaroff.png", 1, options_audioaroff, trackable_rhedaMarker01);
var sound = new AR.Sound("assets/audio.mp3");
sound.load();
audioaroff.onClickAdditions=function(){
  sound.play();
  audioARon.addToCam();
  audioaroff.removeFromCam();
};

audioARon.onClickAdditions=function(){
  sound.pause();
  audioaroff.addToCam();
  audioARon.removeFromCam();
};

sound.onFinishedPlaying=function(){
  audioaroff.addToCam();
  audioARon.removeFromCam();
}
audioaroff.addToCam();
