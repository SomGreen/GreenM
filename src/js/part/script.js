/* timer */
if($('div').is('.jumbo_timer_clock')){
  $('.jumbo_timer_clock').lightTimer({
    language: 'ru',
    deadline: '31 Jul 2020 23:59:00 GMT+0300'
  });
}

/* timer END */

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
    
    $(elem).find('.dropdown_caption').html($(option).first().html());
    $.each(option, function(i, e) {
      
      $(elem).find('.dropdown_list').append('<li class="dropdown_list_item" data-value="'+$(e).val()+'">'+$(e).html()+'</li>');
    });
  });
  
}

/* select transform END */


/* dropdown */

$('body').on('click', '.dropdown_caption', function() {
  // $(this).siblings('.dropdown_list').slideToggle('fast');
  // $(this).toggleClass('active');

  if($(this).is('.active')){
    $(this).siblings('.dropdown_list').slideUp('fast');
    $(this).removeClass('active');

  }
  else{
    $('.dropdown_list').slideUp('fast');
    $('.dropdown_caption').removeClass('active');

    $(this).siblings('.dropdown_list').slideDown('fast');
    $(this).addClass('active');
    
  }

});
$('body').on('click', '.dropdown_list_item', function() {
  $(this).parents('.dropdown_list').slideUp('fast');
  $(this).parents('.dropdown_list').siblings('.dropdown_caption').removeClass('active');
  $(this).parents('.dropdown_list').siblings('.dropdown_caption').html($(this).html());
  
  $(this).parents('.selectField').find('select').val($(this).data('value'));
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