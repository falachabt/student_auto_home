import React, { Component } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      lesson: props.lesson,
      videoState: {
        play: false,
        pause: true,
        prevTime: sessionStorage.getItem('prevtime') || 0,
        currentTime: 0,
      },
    };
  }

  componentDidMount() {
    const videoUrl = this.state.lesson.video_src;
    // initialize the player
    const player = videojs(this.videoNode, {
      sources: [{ src: videoUrl, type: "video/mp4" }],
      controls: true,
      autoplay: false,
      preload: "auto",
      responsive: true,
      // fluid: true,
    });

    if(this.state.videoState.prevTime){
      player.currentTime(this.state.videoState.prevTime)
      player.play();
    }

    // store the player object in state
    this.setState({ player });

    // when the user change the video time
    player.on("seeked", () => {
      // const currentTime = player.currentTime();
    });

    player.on("pause", () => {
      this.pauseVideo();
    });

    player.on("play", () => {
      this.playVideo();
    });

    // getting the video time:
    player.on("timeupdate", () => {
      sessionStorage.setItem('prevtime', player.currentTime())


      this.setState({
        videoState: {
          ...this.state.videoState,
          prevTime: this.state.videoState.currentTime,
          currentTime: player.currentTime(),
        },
      });
    });
  }

  pauseVideo = () => {
    this.setState({ videoState: { play: false, pause: true } });
  };

  playVideo = () => {
    this.setState({ videoState: { play: true, pause: false } });
  };

  render() {
    return (
      <div data-vjs-player className=" video flex w-full justify-start p-2 ">
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js vjs-big-play-centered max-h-[450px] w-[95%] p-2  "
        />
      </div>
    );
  }
}

export default VideoPlayer;
