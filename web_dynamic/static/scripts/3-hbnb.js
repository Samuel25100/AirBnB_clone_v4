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
  $.ajax({
    url: placesUrl,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(response) {
      $('section.places').empty();
      for (place of response) {
        let $article = $('<article class="pack"></article>');
        let $titleBox = $('<div class="title_box"></div>');
        $titleBox.append(`<h2 class="name">${place.name}</h2>`);
        $titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
        $article.append($titleBox);
        let $information = $('<div class="information"></div>');
        $information.append(`<div class="max_guest">${place.max_guest} Guests</div>`);
        $information.append(`<div class="number_rooms">${place.number_rooms} Rooms</div>`);
        $information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>`);
        $article.append($information);
        let $user = $('<div class="user"><b>Owner:</b></div>');
        $article.append($user);
        $('section.places').append($article);
      }
    }
  });  
});
