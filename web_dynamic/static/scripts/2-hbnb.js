$(function() {
  chkAmenity = {};
  $(document).on('change', 'input[type="checkbox"][data-id]', function() {
    if (this.checked) {
      chkAmenity[$(this).data('id')] = $(this).data('name');
    } else {
      delete chkAmenity[$(this).data('id')];
    }
    let line = Object.values(chkAmenity);
    if (line.length > 0) {
      $('div.amenities > h4').text(Object.values(chkAmenity));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});
$(function() {
  const url = `http://localhost:5001/api/v1/status/`;
  $.get(url, function(response, status) {
    if (response.status === "OK" && status === "success") {
      $('#api_status').css('background-color', '#FF5A5F');
    } else {
      $('#api_status').css('background-color', '#cccccc');
    }
  });
});
