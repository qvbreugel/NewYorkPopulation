const $relativeNoSiPopulation = $(".relativeNoSi-population");

//relativeNoSi time variables
let relativeNoSiTimeWhenLastUpdate;
let relativeNoSiTimeFromLastUpdate;
let relativeNoSiFrameNumber = 1;
let relativeNoSiAnimationStopped = false;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function relativeNoSiStep(startTime) {
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!relativeNoSiAnimationStopped) {
    if (!relativeNoSiTimeWhenLastUpdate)
      relativeNoSiTimeWhenLastUpdate = startTime;
    relativeNoSiTimeFromLastUpdate = startTime - relativeNoSiTimeWhenLastUpdate;

    // then we check if it is time to update the frame
    if (relativeNoSiTimeFromLastUpdate > timePerFrame) {
      // and update it accordingly
      console.log(relativeNoSiFrameNumber);
      $relativeNoSiPopulation.attr(
        "src",
        imagePath + `/relative_population_no_si_${relativeNoSiFrameNumber}.svg`
      );
      $(".relativeNoSi-slider").val(relativeNoSiFrameNumber);
      // reset the last update time
      relativeNoSiTimeWhenLastUpdate = startTime;

      // then increase the frame number or reset it if it is the last frame
      if (relativeNoSiFrameNumber >= totalFrames) {
        relativeNoSiFrameNumber = 1;
      } else {
        relativeNoSiFrameNumber = relativeNoSiFrameNumber + 1;
      }
    }

    requestAnimationFrame(relativeNoSiStep);
  }
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $("body").append(
      `<div id="preload-image-relativeNoSi-${i}" style="background-image: url('${imagePath}/relative_population_no_si_${i}.svg');"></div>`
    );
  }
});

// wait for images to be downloaded and start the animation
$(window).on("load", () => {
  requestAnimationFrame(relativeNoSiStep);
});

$(".relativeNoSi-slider").on("input", () => {
  relativeNoSiAnimationStopped = true;
  $relativeNoSiPopulation.attr(
    "src",
    imagePath +
      `/relative_population_no_si_${$(".relativeNoSi-slider").val()}.svg`
  );
  setTimeout(() => {
    relativeNoSiFrameNumber = parseInt($(".relativeNoSi-slider").val());
    relativeNoSiAnimationStopped = false;
    requestAnimationFrame(relativeNoSiStep);
  }, 2000);
});
