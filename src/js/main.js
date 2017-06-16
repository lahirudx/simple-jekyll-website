"use strict";

//////////////// Initialise Google Maps //////////////// 
window.initMap = function(){
  var lida = {lat: -33.865143, lng: 151.209900};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: lida,
    scrollwheel: false,
    //disableDefaultUI: true
  });
  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: lida
  });
};

//////////////// ON PAGE LOAD //////////////// 
document.addEventListener("DOMContentLoaded", function() {

  //////////////// Initialise Smooth Scroll //////////////// 
  smoothScroll.init({
    offset: 96, // Integer. How far to offset the scrolling anchor location in pixels
    updateURL: true,
    callback: function ( toggle, anchor ) { // Function to run after scrolling
      var menuOptions = document.querySelectorAll('.menu ul li');
      var activeMenu = anchor.parentElement;
      
      menuOptions.forEach(function(option) { 
        option.classList.remove('active') 
      });
      activeMenu.classList.add('active');
    }
  });

  //////////////// AUTOPLAY YOUTUBE VIDEOS ////////////////
  var frames = $( "body" ).find( "iframe" );
  var covers = $( "body" ).find( ".cover_video" );

  covers.each(function( i ) {
    $( this ).click(function () {
      $( this ).css('display', 'none');
      frames[i].src += "&autoplay=1";
      $(this).unbind("click");
    });
  });

});

//////////////// Toggle Mobile Menu Icon ////////////////  
var mobilemenu = document.querySelector('.mobile-menu');
var menu = document.querySelector('.menu');
var menuItems = document.querySelectorAll('.menu ul li');

function toogleOpen() {
  document.querySelector('header').classList.toggle('open');
}

function toogleClose() {
  document.querySelector('header').classList.remove('open');
}

function toogleActive() {
  menu.classList.toggle('afteropen');
}
mobilemenu.addEventListener('click', toogleOpen);
mobilemenu.addEventListener('transitionend', toogleActive);

menuItems.forEach(function(item) { 
  item.addEventListener('click', toogleClose) 
});


//////////////// IS SCROLL INTO VIEW ////////////////
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

$(window).scroll(function () {
   $('.anime').each(function () {
      if (isScrolledIntoView(this) === true) {
          $(this).addClass('fadeInUp animated');
      }
   });

  $('.count').each(function () {
    var NumberinView = false;
    var final = $(this).data('number');
    
    if (isScrolledIntoView(this) === true) {
      if (NumberinView) { return; }
      NumberinView = true;
      $(this).prop('Counter',0).animate({
          Counter: final
      }, {
          duration: 1000,
          easing: 'swing',
          step: function (now) {
              $(this).text(formatNumber(now));
          }
      });
    } 
  });

/////////// IF MOBILE SHOW PEOPLE ACTIVE / MOUSEOVER STATE ///////////
  if($(window).innerWidth() <= 1025) {
    $('.people ul li').each(function (){
      var elemTop = $(this).offset().top - ($(window).height() / 2);
      var windowTop = $(window).scrollTop();
      if (windowTop >= elemTop) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

});

function formatNumber(num) {
	var numRounded = Math.round(num);
  return numRounded.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

$( document ).ready(function() {

  $("#contact_form").validate({
    rules: {
      // simple rule, converted to {required:true}
      name: "required",
      // compound rule
      email: {
        required: true,
        email: true
      },
      message: "required",
    },
    messages: {
      name: "This field is required.",
      email: {
        required: "This field is required.",
        email: "Your email address must be in the format of name@domain.com"
      },
      message: "This field is required."
    },
    submitHandler: function(form) {
      $.ajax({
        url: "//formspree.io/hello@ticidesign.com",
        method: "POST",
        data: {
          name: $(form).find("input[name='name']").val(),
          email: $(form).find("input[name='email']").val(),
          message: $(form).find("textarea[name='message']").val()
        },
        dataType: "json",
        success: function() {
          $("#contact_form").trigger("reset");
          $("#submit_success").fadeIn();            
        },
        error: function() {
          $("#submit_errors").fadeIn();
        }
      });
    }
  });
    
});
