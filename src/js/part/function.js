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
    }
  }

  if(inputField.is('select')){
    var selectVal = parseInt(inputField.val());
    console.log(selectVal);
    if(selectVal == -1){
			inputFieldContainer.addClass('error_field');
    }
  }

	if($.trim($(inputField).val()).length == 0){
		$(inputFieldContainer).addClass('error_field');
	}

	return valid;

}