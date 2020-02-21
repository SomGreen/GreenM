function validateField(inputFieldContainer) {

  // var inputFieldContainer = $(inputField).parents('.requiredField');
  var inputField = $(inputFieldContainer).find('select, input');
  console.log('inputField');
  console.log(inputField);
	var email;
	var valid = true;

  if(inputFieldContainer.is('.radioField')){
    var checkedRadio = false;
    $.each(inputField, function(i, e) {
      if($(e).prop('checked')){
        checkedRadio = true;
      }
    });
    if(!checkedRadio){
      inputFieldContainer.addClass('error_field');
			valid = false;
    }
  }

	if(inputField.is('.emailInput') == true){
		email = inputField.val();
		var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!pattern.test(email)){
			inputFieldContainer.addClass('error_field');
			valid = false;
		}
	}
	if(inputField.is('.phoneInput') == true){
		var pattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,15}(\s*)?$/;
    phone = $(inputField).val();
    console.log(phone);
		if(!pattern.test(phone)){
			inputFieldContainer.parents('.phoneBlock').addClass('error_field');
			valid = false;
		}
  }

	if(inputField.is('.checkboxField') == true){
    console.log('checked',$(inputField).prop('checked'));
    if(!$(inputField).prop('checked')){
      $(inputField).siblings('label').addClass('error');
			valid = false;

    }
  }

  if(inputField.is('select')){
    var selectVal = parseInt(inputField.val());
    console.log(selectVal);
    if(selectVal == -1){
      inputFieldContainer.addClass('error_field');
			valid = false;
    }
  }

	if($.trim($(inputField).val()).length == 0){
		$(inputFieldContainer).addClass('error_field');
	}

	return valid;

}
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
$('body').on('change', '.radioField input', function() {
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
  
  $(this).parents('form').find('.requiredField').not('.hidenRequired').each(function(i, e) {
    tempValidIdent = validateField($(e));
    validIdentArray.push(tempValidIdent);	
  });
  
  var invalid = $.inArray(false, validIdentArray);

  if(invalid == -1){
    $('.registration_form form').submit();
  }
});

$('.telInput input').mask('9(999)999-99-99');


/*
var formClass = ".registration-form";
function regSelect(select) {
  return $(formClass + " " + select);
}
function funcSetMinorType() {
  regSelect("#form-lastname").attr("name", "child[-1][lastname]");
  regSelect("#form-firstname").attr("name", "child[-1][firstname]");
  regSelect("#form-middlename").attr("name", "child[-1][middlename]");
  regSelect("#form-age-id").attr("name", "child[-1][age]");
  regSelect("#form-gender-id").attr("name", "child[-1][gender_id]");
  setRegAge(true);
}
function setRegAge(isChild) {
  var countAgeData = regSelect("#form-age-id").attr("data-count-main");
  var _countAge = 0;
  regSelect("#form-age-id").parent().find("li").each(function (i, e) {
      var value = $(e).attr("data-value");
      if (value != -1) {
          if (isChild) {
              if (_countAge < countAgeData) {
                  $(e).hide();
              } else {
                  $(e).show();
              }
          } else {
              if (_countAge < countAgeData) {
                  $(e).show();
              } else {
                  $(e).hide();
              }
          }
          _countAge++;
      }
  });
}
function funcActionSelectType() {
  console.log('funcActionSelectType');
  let id = $(this).val();
  // setDistances();
  // funcSetDefaulType();
  switch (id) {
      case "1":
          regSelect("#adult_form").hide();
          regSelect("#children_form").hide();
          regSelect(".add_kid_form_btn").hide();
          break;
      case "2":
          regSelect("#adult_form").show();
          regSelect("#children_form").hide();
          regSelect(".add_kid_form_btn").hide();
          funcSetMinorType();
          break;
      case "3":
          regSelect("#adult_form").hide();
          regSelect("#children_form").show();

          var count = regSelect("#children_form").attr("data-count");

          if (!count || count * 1 < 5 - 1) {
              regSelect(".add_kid_form_btn").show();
          }
          if (!count) {
              regSelect("#children_form").attr("data-count", 1);

              var count = regSelect("#children_form").attr("data-count");
              for (var c = 0; c < count; c++) {
                  regSelect("#children_form .children-form-" + c).addClass("active");
              }
          }
          break;
  }
}
function funcAddChildren() {
  var count = regSelect("#children_form").attr("data-count") * 1;

  regSelect("#children_form .children-form-" + count).addClass("active");

  count++;
  if (count < 5) {
      regSelect("#children_form").attr("data-count", count);
  } else {
      regSelect(".add_kid_form_btn").hide();
  }
}
$('.registration-form select[name="type_id"]').on('change', funcActionSelectType);
regSelect("").on("click", ".add_kid_form_btn", funcAddChildren);
*/

/* registration form END */