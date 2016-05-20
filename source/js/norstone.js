$(document).foundation();
$(function() {
  $('.gallery-drop select').change(function() {
    window.location = $(this).val();
  });
});
