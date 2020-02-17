
/* select transform */

if($('body').find('.selectField').length != 0){
  $('.selectField').each(function(ind, elem){
    var select = $(elem).find('select');
    var option = $(elem).find('option');

    $(select).hide();
    $(elem).append('<div class="select_dropdown">'+
                    '<div class="dropdown_caption"></div>'+
                    '<ul class="dropdown_list"></ul>'+
                    '</div> ');

    $.each(option, function(i, e) {

      $(elem).find('.dropdown_list').append('<li class="dropdown_list_item">'+$(e).html()+'</li>');
    });
  });

}

/* select transform END */


/* dropdown */
  
$('body').on('click', '.dropdown_caption', function() {
  $(this).siblings('.dropdown_list').slideToggle('fast');
  $(this).toggleClass('active');
});
$(document).mouseup(function (e){
  var div = $(".dropdown_list, .dropdown_caption"); 
  if (!div.is(e.target) 
  && div.has(e.target).length === 0) { 
    // div.slideUp('fast'); 
    $(".dropdown_list").slideUp('fast')
    $(".dropdown_caption").removeClass('active')
  }
});

/* dropdown END */