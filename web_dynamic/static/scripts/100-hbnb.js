let chkAmenity = {};
$(function() {
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

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: "{}",
    success: Filler
  });

  $('button.search').click(function() {
    $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({ 'amenities': Object.keys(chkAmenity), }),
    success: Filler
    });
  });

  function Filler(response) {
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
      let $description = $(`<div class="description">${place.description}</div>`);
      $article.append($user);
      $article.append($description);
      $('section.places').append($article);
    }
  }
});
