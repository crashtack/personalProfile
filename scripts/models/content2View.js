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

content2View.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      // Hide all the articles
      // Fade in the articles that match our filter
      $('article').hide();
      $('article[data-category="'+ $(this).val() +'"]').fadeIn();
    } else {
      // show all the articles except the template
      $('article').not('.template').show();
    }
    // Reset the category-filter:
    $('#page-filter').val('');
  });
};

content2View.handleMainNav = function() {

  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // trigger a click on the first .tab element
};

$(document).ready(function() {
  $('.tab-content').hide();
  $('#content').fadeIn();
  $('article.template').hide();
  content2View.populateFilters();
  content2View.handlePageFilter();
  content2View.handleCategoryFilter();
  //articleView.handleAuthorFilter();
  //articleView.handleCategoryFilter();
  //articleView.handleMainNav();
  //articleView.setTeasers();
});
