var file;
var audio = document.getElementById("audio");
var src;
var context;
var analyser;
var canvas;
var ctx;
var timingTemplate;
var fftsize;
function onWindowLoad() {
  audio = document.getElementById("audio");
  file = document.getElementById("audioFile");
  fftsize = 2048;
  console.log(
    "You can change the amount of bars on the screen to be essentially anything! Just know that it has to be a Base 2 value."
  );
  console.log("use fftsize= then whatever value you want");
  const duration = document.getElementById("duration");
  const timeElapsed = document.getElementById("time-elapsed");
}

function toggleLooping() {
  let loopBtn = document.getElementById("loopBtn");
  if (audio.loop == true) {
    audio.loop = false;
    // loopBtn.className = "masterButton toggleLoop";
    loopBtn.value = "Enable Looping";
  } else if (audio.loop == false) {
    audio.loop = true;
    // loopBtn.className = "toggleLoopEnabled masterButton toggleLoop";
    loopBtn.value = "Disable Looping";
  }
}
function resetPlayer() {
  document.getElementById(
    "fileName"
  ).innerHTML = `No audio is playing currently`;
  context.clearRect(0, 0, canvas.width, canvas.height);
  /* Get the snackbar DIV */
  let snackbar = document.getElementById("snackbar");

  /* Add the "show" class to DIV */
  snackbar.className = "show";

  /* After 3 seconds, remove the show class from DIV */
  setTimeout(function() {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}
function onFileChange() {
  var files = file.files;
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
  audio.play();

  context = new AudioContext();
  src = context.createMediaElementSource(audio);
  analyser = context.createAnalyser();
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = fftsize; /* Essentially this just controls the amount of bars on the screen, TECHNICIALLY it does more than that, but on the front end, it just changes the amount of bars displayed. Must be a ^2 value */

  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  var dataArray = new Uint8Array(bufferLength);

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;

  var barWidth = (WIDTH / bufferLength) * 1.35;
  var barHeight = 512;
  var x = 0;

  function renderFrame() {
    requestAnimationFrame(renderFrame);

    x = 0;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      var r = barHeight + 70 * (i / bufferLength);
      var g = 224 * (i / bufferLength);
      var b = 204;

      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(x, HEIGHT - 256 - barHeight, barWidth, barHeight * 2);

      x += barWidth + 1;
    }
  }

  audio.play(); /* Start audio playback */
  /* For some reason, the browser doesn't seem to register the audio ending no matter what I do. Find out why and fix later */
  renderFrame(); //Start the visualizer

  $(audio).on("loadedmetadata", function() {
    let currentDuration = audio.duration;
    let minutes = Math.floor(currentDuration / 60);
    let seconds = Math.floor(currentDuration - minutes * 60);

    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    let finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    document.getElementById("totalTimeDisplay").innerHTML = finalTime;
    document.getElementById(
      "fileName"
    ).innerHTML = `Now Playing: ${file.files[0].name}`;
  });
  $(audio).on("timeupdate", function() {
    let currentDuration = Math.round(audio.currentTime);
    let minutes = Math.floor(currentDuration / 60);
    let seconds = Math.floor(currentDuration - minutes * 60);

    function str_pad_left(string, pad, length) {
      return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    let finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    document.getElementById("timeDisplay").innerHTML = finalTime;
  });
  $(audio).on("ended", function() {
    if (audio.loop == true)
      return; /* If the audio is looping there is no point to reset the title bar. */
    document.getElementById("fileName").innerHTML =
      "No audio is playing currently";
    document.getElementById("totalTimeDisplay").innerHTML = "00:00";
    document.getElementById("timeDisplay").innerHTML = "00:00";

    console.log("Reset audio title bar as no audio is playing.");
  });
}
