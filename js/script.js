/*global alert:true */

var formSent = false;

jQuery(document).ready(function($){
	
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	// hide or show the "back to top" link
	$(window).scroll(function() {
		if($(this).scrollTop() > offset) {
			$back_to_top.addClass('cd-is-visible');
		}
		else {
			$back_to_top.removeClass('cd-is-visible cd-fade-out');
		}
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('cd-fade-out');
		}
	});

	// smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	// project overlay
  $(".project-box").mouseenter(function(){
      $(this).addClass("hover");
  }).mouseleave(function(){
      $(this).removeClass("hover");
  });

  // form validation
	$("form").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message;
				if(errors === 1) {
					message = 'Il manque un champ. Il a été surligné en rouge ci-dessous.';
				} else {
					message = 'Il manque ' + errors + ' champs.  Ils ont été surlignés en rouge ci-dessous.';
				}
				$("div.error span").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		},
		submitHandler: function() {
			$("div.error").hide();
			if(formSent) {
				alert('Votre message a déjà été envoyé.');
			} else {
				$('.form').ajaxSubmit();
			}
		}
	});

	// smooth scroll
	$('.navbar a').smoothScroll();

});

// form ajax call
$(document).on('submit', 'form.form', function(e) {
	$.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: $(this).serialize(),
        success: function() {
        	formSent = true;
        	$('form.form').append('<div class="row success"><div class="col-md-12"><span> Votre message a bien été envoyé. </span></div></div>');
        }
    });
    e.preventDefault();	
});

