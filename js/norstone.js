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
  $('body').on('click', '.scroll-left', function(e) {
    var $thumbs = $('.owl-thumbs');
    var thumbScrollWidth = $thumbs.width();
    $thumbs.animate(
      { scrollLeft: '-=' + thumbScrollWidth }, 1000
    );

    return false;
  });

  $('body').on('click', '.scroll-right', function(e) {
    var $thumbs = $('.owl-thumbs');
    var thumbScrollWidth = $thumbs.width();
    $thumbs.animate(
      { scrollLeft: '+=' + thumbScrollWidth }, 1000
    );

    return false;
  })

  // Fix accordion + equalizer bug.
  if (Foundation.MediaQuery.atLeast('medium')) {
    setTimeout(function() {
      $('[data-equalizer]').delay(10).foundation('_reflow');
    }, 1000);
  }

  var productTypes = {};

  $.getJSON('/gallery/pictured.json')
    .done(function(data) {
      productTypes = data;
      $slider.on('changed.owl.carousel', function(event) {
        var images = $('.owl-item')
        var $slide = $('.orbit-slide', images[event.item.index]);
        if ($slide.attr('data-product-type')) {
          var block = $('.pictured-product .card');
          var type = productTypes[$slide.attr('data-product-type')];

          $('img', block).attr('src', type.image);
          $('.card--title', block).html(type.title);
          $('a', block).attr('href', type.link);
        }
      });
    })
    .fail(function(e) {
      console.log(e);
    });

  var $slider = $('.owl-carousel').owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    navText: false,
    navContainer: '.owl-nav',
    loop: true,
    thumbs: true,
    thumbImage: true
  });

  // Build select list for filter.
  var filterOptions = [];
  $('.orbit-slide').each(function() {
    var $tags = $(this).data('tags');
    if ($tags) {
      for (var i = 0; i < $tags.length; i++) {
        if (filterOptions.indexOf($tags[i]) == -1) {
          filterOptions.push($tags[i]);
        }
      }
    }
  });
  filterOptions.sort();

  if (filterOptions.length > 0) {
    var $select = $('<select><option value="">Sort This Gallery</option>');

    for (var i = 0; i < filterOptions.length; i++) {
      var opt = filterOptions[i];
      $select.append($("<option>").attr('value', opt).text(opt));
    }

    // Add the select list below "Additional Galleries".
    $('.gallery-drop').append($select);

    // Make a clone of slides for filtering.
    $slides = $('.owl-item').clone();

    // Filter the gallery based off the selection.
    $select.on('change', function() {
      var content = '';
      if (this.value != '') {
        $("> div[data-tags*='" + this.value + "']", $slides).each(function() {
          content += this.outerHTML;
        });
      } else {
        $slides.each(function() {
          content += this.outerHTML;
        })
      }

      $slider.trigger('replace.owl.carousel', content);
      $slider.trigger('refresh.owl.carousel');
    });
  }

  // Fade in/out gallery navigation arrows on hover.
  $('.orbit-container').hover(function() {
    $('.orbit-previous', this).fadeIn('slow');
    $('.orbit-next', this).fadeIn('slow');
  }, function() {
    $('.orbit-previous', this).fadeOut('slow');
    $('.orbit-next', this).fadeOut('slow');
  });

  $('.slideshow').hover(function() {
    $('.owl-prev', this).fadeIn('slow');
    $('.owl-next', this).fadeIn('slow');
  }, function() {
    $('.owl-prev', this).fadeOut('slow');
    $('.owl-next', this).fadeOut('slow');
  });
});
