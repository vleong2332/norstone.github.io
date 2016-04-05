Drupal.behaviors.rabbitHole = function (context) {  
  // Only show the redirect options if the user has selected redirect as the
  // behavior.
  var $redirectFieldset = $('fieldset.rabbit-hole-redirect-options');
  if ($('input[name=rabbit_hole_action]:checked').val() != Drupal.settings.rabbitHole.redirectValue) {
    $redirectFieldset.css('display', 'none');
  }
  $('input[name=rabbit_hole_action]').change(function() {
    if ($(this).val() == Drupal.settings.rabbitHole.redirectValue) {
      $redirectFieldset.show();
    }
    else {
      $redirectFieldset.hide();
    }
  });
}