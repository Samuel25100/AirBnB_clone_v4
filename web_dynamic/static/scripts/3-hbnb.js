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

  const url1 = 'http://0.0.0.0:5000/api/v1/places_search';
  $.get(url1, function(response, status) {
    if (response.status === "OK" && status === "success") {
      for (let i; i < length(response); i++) {
        let $article = $('article.pack');
        $('article .title_box h2.name').text(response[i].name);
        $('article .title_box div.price_by_night').text(response[i].price_by_night);
        $('article .information div.max_guest').text(response[i].max_guest);
        $('article .information div.number_rooms').text(response[i].number_rooms);
        $('article .information div.number_bathrooms').text(response[i].number_bathrooms);
        $('article .user div.description').text(response[i].description);

        $('section.places').append($article);
      }
    }
  });  
});
