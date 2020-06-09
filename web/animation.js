const imagePath = "../maps/svg";
const totalFrames = 10;
const animationDuration = 10000;
const timePerFrame = animationDuration / totalFrames;

const $relativePopulation = $(".relative-population");

//Relative time variables
let relativeTimeWhenLastUpdate;
let relativeTimeFromLastUpdate;
let relativeFrameNumber = 1;
let relativeAnimationStopped = false;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function relativeStep(startTime) {
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!relativeAnimationStopped) {
    if (!relativeTimeWhenLastUpdate) relativeTimeWhenLastUpdate = startTime;
    relativeTimeFromLastUpdate = startTime - relativeTimeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (relativeTimeFromLastUpdate > timePerFrame) {
      // and update it accordingly
      console.log(relativeFrameNumber);
      $relativePopulation.attr(
        "src",
        imagePath + `/relative_population_${relativeFrameNumber}.svg`
      );
      $(".relative-slider").val(relativeFrameNumber);
      // reset the last update time
      relativeTimeWhenLastUpdate = startTime;

      // then increase the frame number or reset it if it is the last frame
      if (relativeFrameNumber >= totalFrames) {
        relativeFrameNumber = 1;
      } else {
        relativeFrameNumber = relativeFrameNumber + 1;
      }
    }

    requestAnimationFrame(relativeStep);
  }
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $("body").append(
      `<div id="preload-image-relative-${i}" style="background-image: url('${imagePath}/relative_population_${i}.svg');"></div>`
    );
  }
});

// wait for images to be downloaded and start the animation
$(window).on("load", () => {
  requestAnimationFrame(relativeStep);
});

$(".relative-slider").on("input", () => {
  relativeAnimationStopped = true;
  $relativePopulation.attr(
    "src",
    imagePath + `/relative_population_${$(".relative-slider").val()}.svg`
  );
  setTimeout(() => {
    relativeFrameNumber = parseInt($(".relative-slider").val());
    relativeAnimationStopped = false;
    requestAnimationFrame(relativeStep);
  }, 2000);
});
