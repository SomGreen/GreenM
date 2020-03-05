//for partners slider on home page
var destroy = true;


$(document).ready(function(){
  
  /* header */
  // $('.header_nav_item__link.with_list').hover(function(){
  //   $(this).parents('.header_nav_item').find('.submenu_list_container').slideDown();
  // }, 
  // function(){
  //   $(this).parents('.header_nav_item').find('.submenu_list_container').slideUp();
  // })
  $(document).click(function (e){
    var div = $(".menu_btn"); 
    var seccond_div = $('.header_bottom');
    if (
      !div.is(e.target) 
      && div.has(e.target).length === 0 || !seccond_div .is(e.target) 
      && dseccond_diviv.has(e.target).length === 0
      ) {
        if($(window).outerWidth() < 931){
          div.removeClass('active');
          $('.header_bottom').slideUp();
        } 
      }
    });  
    
    $('.menu_btn').on('click', function(){
      $(this).toggleClass('active');
      $('.header_bottom').slideToggle();
      
    });
    $(window).on('resize', function() {
      if($(window).outerWidth() > 930 ){
        $('.header_bottom').removeAttr('style');
      } 
    })
    
    
    
    $('.registration_mob_link a').on('click', function (event) {
      
      var currentLink = window.location.href;
      var currentLinkWithoutAncor = '';
      var targetLink = event.target.href;
      var ancorTagIndex;
      var ancor = '';
      
      ancorTagIndex = targetLink.indexOf('#');
      currentLinkWithoutAncor = currentLink.slice(0, ancorTagIndex);
      
      if(ancorTagIndex != -1){
        ancor = targetLink.slice(ancorTagIndex, targetLink.length);
        var distanceToObject = $('body').find(ancor).offset().top;
        $('html, body').animate({
          scrollTop: distanceToObject
        }, 1000);   
      }
      else{
        window.location.href = currentLinkWithoutAncor;
      }
    });
    
    
    /* header END */
    
    
    /* timer */
    if($('div').is('.jumbo_timer_clock')){
      $('.jumbo_timer_clock').lightTimer({
        language: 'ru',
        deadline: '20 Jun 2020 09:00:00 GMT+0300'
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
    
    
    $('body').on('click', '.dropdown_caption', function () {
      // $(this).siblings('.dropdown_list').slideToggle('fast');
      // $(this).toggleClass('active');
      var valid = true;
      if ($(this).parents(".selectField").is(".distanceField")) {
        valid = checkRequiredFieldsForDistance($(this).parents(".selectField"));
      }
      
      if ($(this).is('.active')) {
        $(this).siblings('.dropdown_list').slideUp('fast');
        $(this).removeClass('active');
        
      } else {
        if (valid) {
          $('.dropdown_list').slideUp('fast');
          $('.dropdown_caption').removeClass('active');
          
          $(this).siblings('.dropdown_list').slideDown('fast');
          $(this).addClass('active');
        }
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
      //  console.log('change select');
      $(this).parents('.requiredField').removeClass('error_field');
      //  console.log($(this).val());
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
      
      //  console.log(number);
      if(!number){
        number = 0;
      }
      $(this).parents('.phoneBlock').find('.requiredField input').val(code+number);
    });
    
    
    $('body').on('click', '.checkForm button', function(e) {
      //  console.log('submit');
      
      e.preventDefault();
      var tempValidIdent;
      var validIdentArray = [];
      
      $(this).parents('form').find('.requiredField').not('.hidenRequired').each(function(i, e) {
        tempValidIdent = validateField($(e));
        validIdentArray.push(tempValidIdent);	
      });
      
      var invalid = $.inArray(false, validIdentArray);
      
      if(invalid == -1){
        // $('.registration_form form').submit();
        var step = $(this).parents('.container').next();
        showStep(step);
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
      //  console.log('funcActionSelectType');
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
    
    
    
    /* first slider */
    $('.big_slider_content').slick({
      slideToShow: 1,
      slideToScroll: 1,
      arrows: true
    });
    /* first slider END */
    
    
    slideDetect();
    
    $(window).resize(function() {
      slideDetect();
    });
    
    /* moscow gallery */

    $('body').on('click', '.moscow_gallery_loadMore a', function() {
      $('.moscow_gallery_grid_col').slideDown();
    });
    $('body').on('click', '.moscow_gallery_item',  function() {
      var src = $(this).find('img').attr('src');
      $('body').append('<div class="moscowModalImg"><img src="'+src+'"></div>')
      $('.moscowModalImg').css({
        'position': 'fixed',
        'top': '50%',
        'left': '50%',
        'width': '100%',
        'height': '100%',
        'transform': 'translate(-50%, -50%)',
        'background': 'rgba(0, 0, 0, 0.6)'
      });
      $('.moscowModalImg img').css({
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'width': '80%',
        'transform': 'translate(-50%, -50%)'
      })
    });
    $('body').on('click', '.moscowModalImg', function() {
      $('.moscowModalImg').remove();
    });
    $(window).on('scroll', function() {
      $('.moscowModalImg').remove();
    });

    /* moscow gallery END */
    
    
    /* town vote */

    $('body').on('click', '.town_vote_item__btn.green', function(e) {
      e.preventDefault();
      if($(this).parents('.town_vote_block').is('.voted')){
        return false;
      }
      else{
        $(this).parents('.town_vote_item').addClass('active');
        $(this).parents('.town_vote_block').addClass('voted');
        var text = $(this).parents('.town_vote').find('.site_h').data('vote');
        $(this).parents('.town_vote').find('.site_h').html(text);
      }
    })

    $('.town_result_list_block').mCustomScrollbar();  
    /* town vote END */


    /* FAQ */

    $('body').on('click', '.faq_item_h', function() {
      // $(this).toggleClass('active');
      if(!$(this).is('.active')){
        $('.faq_item_text').slideUp();
        $(this).parents('.faq_item').find('.faq_item_text').slideDown();
        $('.faq_item_h').removeClass('active');
        $(this).addClass('active');
        
      }
      else{
        $(this).removeClass('active');
        $(this).parents('.faq_item').find('.faq_item_text').slideUp();
      }
    });

    /* FAQ END */


    
  });