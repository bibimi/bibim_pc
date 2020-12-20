var quick_cover = document.querySelector('.quick_player_wrap .cover');
var quick_track = document.querySelector('.quick_player_wrap .track');
var quick_artist = document.querySelector('.quick_player_wrap .artist');
var quick_btn_play = document.querySelector('.quick_player_wrap .btn_play');
var quick_btn_pause = document.querySelector('.quick_player_wrap .btn_pause');
var quick_btn_next = document.querySelector('.quick_player_wrap .btn_next');
var quick_btn_prev = document.querySelector('.quick_player_wrap .btn_prev');

var QuickPlayer = function(playlist) {
  this.playlist = playlist;
  this.index = 0;
  quick_track.textContent = this.playlist[this.index].title;
  quick_artist.textContent = this.playlist[this.index].artist;
  quick_cover.src = this.playlist[this.index].cover;
};
QuickPlayer.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: ['./audio/' + data.file + '.mp3'],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
          // Start upating the progress of the track.
          requestAnimationFrame(self.step.bind(self));

          quick_btn_pause.style.display = 'block';
        },
        onload: function() {         
        },
        onend: function() {
          self.skip('next');
        },
        onpause: function() {
        },
        onstop: function() {
        },
        onseek: function() {
          // Start upating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Update the track display.
    quick_track.textContent = data.title;
    quick_artist.textContent = data.artist;
    quick_cover.src = data.cover;

    // Show the pause button.
    if (sound.state() === 'loaded') {
      quick_btn_play.style.display = 'none';
      quick_btn_pause.style.display = 'block';
    } else {
      quick_btn_play.style.display = 'none';
      quick_btn_pause.style.display = 'none';
    }

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Puase the sound.
    sound.pause();

    // Show the play button.
    quick_btn_play.style.display = 'block';
    quick_btn_pause.style.display = 'none';
  },

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip: function(direction) {
    var self = this;

    // Get the next track based on the direction of the track.
    var index = 0;
    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function(index) {
    var self = this;

    // Stop the current track.
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }

    // Play the new track.
    self.play(index);
  },

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume: function(val) {
    var self = this;

    // Update the global volume (affecting all Howls).
    Howler.volume(val);    
  },

  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  seek: function(per) {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    
    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },
};

// Setup our new audio player class and pass it the playlist.
var quickplayer = new QuickPlayer([
  {
    title: '위잉위잉',
    file: 'music1',
    artist:'혁오',
    cover:'./img/cover_dummy.png',
    howl: null
  },
  {
    title: 'music2',
    file: 'music2',
    artist:'zionT',
    cover:'https://picsum.photos/302/302?random=1',
    howl: null
  },
  {
    title: 'music3',
    file: 'music3',
    artist:'moca',
    cover:'https://picsum.photos/302/302?random=2',
    howl: null
  }
]);

// Bind our player controls.
quick_btn_play.addEventListener('click', function() {
  quickplayer.play();
});
quick_btn_pause.addEventListener('click', function() {
  quickplayer.pause();
});
quick_btn_prev.addEventListener('click', function() {
  quickplayer.skip('prev');
});
quick_btn_next.addEventListener('click', function() {
  quickplayer.skip('next');
});

