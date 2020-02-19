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

    $(elem).find('.dropdown_list').mCustomScrollbar();
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


/* registration form */
$('body').on('click', '.select_dropdown .dropdown_list_item', function() {
  $(this).parents('.selectField').find('select').change();
});

$('body').on('change', '.registration_form select', function() {
  console.log('change select');
  $(this).parents('.requiredField').removeClass('error_field');
  console.log($(this).val());
  var val = parseInt($(this).val());
  if(val == -1){
    $(this).parents('.requiredField').addClass('error_field');
  }

});
$('body').on('blur', '.requiredField input', function() {
  var inputField = $(this).parents('.requiredField');
  validateField(inputField);
});
$('body').on('focus', '.requiredField input', function() {
  $(this).parents('.requiredField').removeClass('error_field');
});

$('body').on('blur', '.telInput input', function() {
  // var inputField = $(this).parents('.phoneBlock').find('.requiredField');
  // validateField(inputField);
});
$('body').on('focus', '.telInput input', function() {
  $(this).parents('.phoneBlock').removeClass('error_field');
});

$('body').on('blur', '.telInput input', function() {
  var code = $(this).parents('.phoneBlock').find('select').val();
  var number = $(this).val();
  $(this).parents('.phoneBlock').find('.requiredField input').val(code+number);
  var inputField = $(this).parents('.phoneBlock').find('.requiredField');
  validateField(inputField);
});
$('body').on('change', '.telCodeSelect select', function() {
  var code = $(this).val();
  var number = $(this).parents('.phoneBlock').find('.telInput input').val();
  
  console.log(number);
  if(!number){
    number = 0;
  }
  $(this).parents('.phoneBlock').find('.requiredField input').val(code+number);
});


$('body').on('click', '.formSubmit button', function(e) {
  console.log('submit');
  
  e.preventDefault();
  var tempValidIdent;
  var validIdentArray = [];
  
  $('.requiredField').not('.hidenRequired').each(function(i, e) {
    tempValidIdent = validateField($(e));
    validIdentArray.push(tempValidIdent);	
  });
  
  var invalid = $.inArray(false, validIdentArray);

  if(invalid == -1){
    $('.registration_form form').submit();
  }
});

$('.telInput input').mask('9(999)999-99-99');
/* registration form END */
