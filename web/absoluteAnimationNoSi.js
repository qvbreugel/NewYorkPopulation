const $absoluteNoSiPopulation = $(".absoluteNoSi-population");

//absoluteNoSi time variables
let absoluteNoSiTimeWhenLastUpdate;
let absoluteNoSiTimeFromLastUpdate;
let absoluteNoSiFrameNumber = 1;
let absoluteNoSiAnimationStopped = false;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function absoluteNoSiStep(startTime) {
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!absoluteNoSiAnimationStopped) {
    if (!absoluteNoSiTimeWhenLastUpdate)
      absoluteNoSiTimeWhenLastUpdate = startTime;
    absoluteNoSiTimeFromLastUpdate = startTime - absoluteNoSiTimeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (absoluteNoSiTimeFromLastUpdate > timePerFrame) {
      // and update it accordingly
      console.log(absoluteNoSiFrameNumber);
      $absoluteNoSiPopulation.attr(
        "src",
        imagePath + `/absolute_population_no_si_${absoluteNoSiFrameNumber}.svg`
      );
      $(".absoluteNoSi-slider").val(absoluteNoSiFrameNumber);
      // reset the last update time
      absoluteNoSiTimeWhenLastUpdate = startTime;

      // then increase the frame number or reset it if it is the last frame
      if (absoluteNoSiFrameNumber >= totalFrames) {
        absoluteNoSiFrameNumber = 1;
      } else {
        absoluteNoSiFrameNumber = absoluteNoSiFrameNumber + 1;
      }
    }

    requestAnimationFrame(absoluteNoSiStep);
  }
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $("body").append(
      `<div id="preload-image-absoluteNoSi-${i}" style="background-image: url('${imagePath}/absolute_population_no_si_${i}.svg');"></div>`
    );
  }
});

// wait for images to be downloaded and start the animation
$(window).on("load", () => {
  requestAnimationFrame(absoluteNoSiStep);
});

$(".absoluteNoSi-slider").on("input", () => {
  absoluteNoSiAnimationStopped = true;
  $absoluteNoSiPopulation.attr(
    "src",
    imagePath +
      `/absolute_population_no_si_${$(".absoluteNoSi-slider").val()}.svg`
  );
  setTimeout(() => {
    absoluteNoSiFrameNumber = parseInt($(".absoluteNoSi-slider").val());
    absoluteNoSiAnimationStopped = false;
    requestAnimationFrame(absoluteNoSiStep);
  }, 2000);
});
