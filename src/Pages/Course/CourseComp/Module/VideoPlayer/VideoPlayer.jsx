import { Forward10, Replay10 } from "@mui/icons-material";
import React, { Component } from "react";
import { IconButton } from '@mui/material';

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./videoPlayer.css"
import { updateData } from "../../../../../Firebase/functions/firestoreFunc";
import { getAuth } from "firebase/auth";

const ComponentVid = videojs.getComponent('Component');

class TitleBar extends ComponentVid {

  // The constructor of a component receives two arguments: the
  // player it will be associated with and an object of options.
  constructor(player, options = {}) {

    // It is important to invoke the superclass before anything else, 
    // to get all the features of components out of the box!
    super(player, options);

    // If a `text` option was passed in, update the text content of 
    // the component.
    if (options.text) {
      this.updateTextContent(options.text);
    }
  }

  // The `createEl` function of a component creates its DOM element.
  createEl() {
    return videojs.dom.createEl('div', {

      // Prefixing classes of elements within a player with "vjs-" 
      // is a convention used in Video.js.
      className: 'vjs-title-bar  '
    });
  }

  // This function could be called at any time to update the text 
  // contents of the component.
  updateTextContent(text) {

    // If no text was provided, default to "Title Unknown"
    if (typeof text !== 'string') {
      text = 'Title Unknown';
    }

    // Use Video.js utility DOM methods to manipulate the content
    // of the component's element.
    videojs.emptyEl(this.el());
    videojs.appendContent(this.el(), text);
  }
}

// videojs.registerComponent('TitleBar', TitleBar);

class VideoPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player: null,
			lesson: props.lesson,
			videoState: {
				play: false,
				pause: true,
				prevTime: sessionStorage.getItem("prevtime") || 0,
				currentTime: 0,
			},
		};
		
		this.video_end = {
			updateLessonProgress: props.updateLessonProgress || null,
			error: false,
			allow_callback: this.state.lesson.progress.text !== true,
			has_start: false,
			has_end: false,
		}
	}

	custumControl() {
		

		var video = this.videoNode
		var seekBackButton = createButton('<div className = " p-1 rounded-full bg-main-dark-bg box-shadow text-blue-500 " >-10</div>');
		var seekForButton = createButton(<div>{+10}</div>);
		
		seekBackButton.onclick = function () {
				video.currentTime -= 5;
		}
		seekForButton.onclick = function () {
			video.currentTime += 5;
		}

		var playBackRate = document.querySelector('.vjs-playback-rate');
		insertAfter(seekBackButton, playBackRate);
		// insertAfter(seekForButton, seekBackButton);



		function createButton(icon) {
			var button = document.createElement('button');
			
			button.classList.add('vjs-menu-button', 'p-2', 'rounded-full', 'bg-main-dark-bg', 'text-blue-500');
			button.innerHTML = icon;
			button.style.fontSize = "1.5em";
			return (button);
		}

		function insertAfter(newEl, element) {
			element.parentNode.insertBefore(newEl, element.nextSibling)
		}

	}

	onEnd() {

		// return if we don't need to open the text
		if(!this.video_end.allow_callback)
			return;

		const player = this.videoNode
		const time = (0.5 * (player.currentTime + this.getPlayedTime()));
		const comp = this;
		
		if (time >= 0.95 * player.duration  && (!this.video_end.has_start) && this.video_end.updateLessonProgress ){
						
				function update_success() {
					comp.video_end.has_end = true
				};

				function update_error() {
					comp.video_end.error = true;
					comp.video_end.has_end = true;
					comp.video_end.has_start = false;
				};

				this.video_end.has_start = true;
				this.video_end.updateLessonProgress('text', update_success, update_error)
		}
	}

	getPlayedTime() {
		const played = this.videoNode.played
		let i = played.length;
		let playedTime = 0;

		while (i--)
			playedTime += played.end(i) - played.start(i);

		return (playedTime);
	}

	
	componentDidMount() {
		const videoUrl = this.state.lesson.video_src;
		// initialize the player
		const player = videojs(this.videoNode, {
			sources: [{ src: videoUrl, type: "video/mp4" }],
			controls: true,
			autoplay: false,
			controlBar: {
				progressControl: {
					seekBar: {
						playProgressBar: true,
						loadProgressBar: true,
					},
				},
			currentTimeDisplay: true,
			durationDisplay: true,
			chaptersButton: true,
			skipButtons: true,
			},
			poster: "https://th.bing.com/th/id/R.19feddba3b4293b4cdf3a7f566fb2e93?rik=A%2ftxOPLoz%2fNLwA&pid=ImgRaw&r=0",
			playbackRates: [0.5, 0.75, 1, 1.5],
			fluid: true,
		});

		
		// add the title bar to the palyer 
  		// player.addChild('TitleBar', {text: this.state.lesson.title}, 0);

		// set the video where the use leave it
		if (this.state.videoState.prevTime) {
			player.currentTime(this.state.videoState.prevTime);
		}

		// store the player object in state
		this.setState({ player });

		// when the user change the video time
		player.on("seeked", () => {
			const currentTime = player.currentTime();
			
		});

		player.on("pause", () => {
			this.pauseVideo();
			this.getPlayedTime();
			
		});

		player.on("play", () => {
			this.playVideo();
		});

		// getting the video time:
		player.on("timeupdate", () => {
			// sessionStorage.setItem("prevtime", player.currentTime());

			this.onEnd();
			

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
			<div id = "lesson_video" data-vjs-player className=" video flex w-full justify-start p-2 ">
				<video
					ref={(node) => (this.videoNode = node)}
					className="video-js vjs-big-play-centered max-h-[300px] w-[100%]   "
				/>
			</div>
		);
	}
}

export default VideoPlayer;
