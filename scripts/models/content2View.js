// Configure a view object, to hold functions ofr synamic updates and content related event handlebars

var content2View = {};

content2View.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('section.page').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#page-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

content2View.handlePageFilter = function() {
  $('#page-filter').on('change', function() {
    if ($(this).val()) {
      // Hide all the articles
      // Fade in the articles that match our filter
      $('article').hide();
      $('article[data-page="'+ $(this).val() +'"]').fadeIn();
    } else {
      // show all the articles except the template
      $('article').not('.template').show();
    }
    // Reset the category-filter:
    $('#category-filter').val('');
  });
};

$(document).ready(function() {
  content2View.populateFilters();
  //articleView.handleAuthorFilter();
  //articleView.handleCategoryFilter();
  //articleView.handleMainNav();
  //articleView.setTeasers();
});
