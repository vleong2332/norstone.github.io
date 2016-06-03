$(document).foundation();
$(function() {
  $('.gallery-drop select').change(function() {
    window.location = $(this).val();
  });

  if ($('.social-share-container').length > 0) {
    var pinterest = {
      url: document.URL,
      media: 'http://' + document.domain + '/' + $('#product-photo img').attr('src'),
      description: $('.photo-container h2').html()
    }
    var href = '//pinterest.com/pin/create/button/?' + $.param(pinterest);
    $('.social-share-container').prepend('<a class="social-share-pinterest" target="_blank" href="' + href + '">Pinterest</a>');
  }
});
