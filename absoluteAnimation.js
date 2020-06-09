const $absolutePopulation = $(".absolute-population");

//absolute time variables
let absoluteTimeWhenLastUpdate;
let absoluteTimeFromLastUpdate;
let absoluteFrameNumber = 1;
let absoluteAnimationStopped = false;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function absoluteStep(startTime) {
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!absoluteAnimationStopped) {
    if (!absoluteTimeWhenLastUpdate) absoluteTimeWhenLastUpdate = startTime;
    absoluteTimeFromLastUpdate = startTime - absoluteTimeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (absoluteTimeFromLastUpdate > timePerFrame) {
      // and update it accordingly
      console.log(absoluteFrameNumber);
      $absolutePopulation.attr(
        "src",
        imagePath + `/absolute_population_${absoluteFrameNumber}.svg`
      );
      $(".absolute-slider").val(absoluteFrameNumber);
      // reset the last update time
      absoluteTimeWhenLastUpdate = startTime;

      // then increase the frame number or reset it if it is the last frame
      if (absoluteFrameNumber >= totalFrames) {
        absoluteFrameNumber = 1;
      } else {
        absoluteFrameNumber = absoluteFrameNumber + 1;
      }
    }

    requestAnimationFrame(absoluteStep);
  }
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $("body").append(
      `<div id="preload-image-absolute-${i}" style="background-image: url('${imagePath}/absolute_population_${i}.svg');"></div>`
    );
  }
});

// wait for images to be downloaded and start the animation
$(window).on("load", () => {
  requestAnimationFrame(absoluteStep);
});

$(".absolute-slider").on("input", () => {
  absoluteAnimationStopped = true;
  $absolutePopulation.attr(
    "src",
    imagePath + `/absolute_population_${$(".absolute-slider").val()}.svg`
  );
  setTimeout(() => {
    absoluteFrameNumber = parseInt($(".absolute-slider").val());
    absoluteAnimationStopped = false;
    requestAnimationFrame(absoluteStep);
  }, 2000);
});
