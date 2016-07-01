$(document).foundation();

$(function() {
  // Change page on dropdown click in gallery.
  $('.gallery-drop select').change(function() {
    window.location = $(this).val();
  });

  // Add Pinterest social share icon.
  if ($('.social-share-container').length > 0) {
    var pinterest = {
      url: document.URL,
      media: 'http://' + document.domain + '/' + $('#product-photo img').attr('src'),
      description: $('.photo-container h2').html()
    }
    var href = '//pinterest.com/pin/create/button/?' + $.param(pinterest);
    $('.social-share-container').prepend('<a class="social-share-pinterest" target="_blank" href="' + href + '">Pinterest</a>');
  }

  // Smooth scrolling.
  $('a[href*="#"]:not([href="#"])').click(function() {
    // Don't break tabs.
    if ($(this).parents('.tabs').length) {
      return true;
    }
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  // Hamburger menu.
  $('.hamburger').on('click', function (e) {
    $(this)
      .toggleClass('is-open')
      .toggleClass('is-closed');
  });

  // Mobile accordion.
  var $mobile_accordion = $('.mobile-accordion');
  var $mobile_accordion_content = $mobile_accordion.find('[data-tab-content]');
  if (Foundation.MediaQuery.current != 'small') {
    $mobile_accordion_content.removeClass('accordion-content');
  }
  $(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
    if (oldSize == 'small') {
      $('[data-accordion]').foundation('up', $('.accordion-content'));
      $mobile_accordion_content.show().removeClass('accordion-content');
    }
    else if (newSize == 'small') {
      console.log($mobile_accordion_content);
      $mobile_accordion_content.addClass('accordion-content').hide();
    }
  });

  // Scrolling for galleries.
  var $thumbs = $('.orbit-bullets');
  var thumbScrollWidth = $thumbs.width();

  $('.scroll-left').click(function(e) {
    $thumbs.animate(
      { scrollLeft: '-=' + thumbScrollWidth }, 1000
    );

    return false;
  })

  $('.scroll-right').click(function(e) {
    $thumbs.animate(
      { scrollLeft: '+=' + thumbScrollWidth }, 1000
    );

    return false;
  })

  // Fix accordion + equalizer bug.
  setTimeout(function() {
    $('[data-equalizer]').delay(10).foundation('_reflow');
  }, 1000);
});
