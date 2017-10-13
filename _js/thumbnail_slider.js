$(function($, global) {

  // Compensate for the owl-made clones that are placed before and after the actual items.
  function calcOffsetActiveIndex(item) {
    return item.index - Math.round(item.count / 2);
  }

  function calcVisibleRange(container) {
    var width = container.width();
    return {
      start: container.scrollLeft(),
      end: container.scrollLeft() + width
    };
  }

  function thumbnailSlider(slider) {
    // Bouncer
    if (!slider) {
      return;
    }

    // Capture variables that are unlikely to change
    var thumbContainer = $('.owl-thumbs', slider)
    var thumbWidth = $('.owl-thumb-item', slider).width();
    var minIndex = 0;
    var scrollSpeedInMs = 150;

    slider.on('changed.owl.carousel refreshed.owl.carousel', function(event) {
      var visibleRange = calcVisibleRange(thumbContainer);

      var maxIndex = event.item.count - 1;

      var activeIndex = calcOffsetActiveIndex(event.item);

      // Compensate for the owl-made clone at the beginning which allows index -1 instead of circling
      // back to the last index.
      if (activeIndex === minIndex - 1) {
        activeIndex = maxIndex;
      }

      // From this point on, position refers to x-axis position

      var previousIndex = activeIndex === minIndex
        ? minIndex
        : activeIndex - 1;
      var prevThumbStartPos = previousIndex * thumbWidth;

      var nextIndex = activeIndex === maxIndex
        ? maxIndex
        : activeIndex + 1;
      var nextThumbStartPos = nextIndex * thumbWidth;
      var nextThumbEndPos = nextThumbStartPos + thumbWidth;

      // Scroll active (plus next or prev, if available) thumbnail into view
      var shouldScrollLeft = nextThumbEndPos > visibleRange.end;
      var shouldScrollRight = prevThumbStartPos < visibleRange.start;

      if (shouldScrollLeft) {
        var distanceToTravel = nextThumbEndPos - visibleRange.end;
        thumbContainer
          .stop()
          .animate({
            scrollLeft: thumbContainer.scrollLeft() + distanceToTravel
          }, scrollSpeedInMs);
      } else if (shouldScrollRight) {
        var distanceToTravel = visibleRange.start - prevThumbStartPos;
        thumbContainer
          .stop()
          .animate({
            scrollLeft: thumbContainer.scrollLeft() - distanceToTravel
          }, scrollSpeedInMs);
      }
    });
  }

  global.thumbnailSlider = thumbnailSlider;

}(jQuery, window));
