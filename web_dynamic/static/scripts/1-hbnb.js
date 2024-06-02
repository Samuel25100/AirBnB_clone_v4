$(function() {
  chkAmenity = {};
  $.on('change', 'data-id', function() {
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
