/*global alert:true, Modernizr:true */

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
  if (Modernizr.touch) {
	  // show the close overlay button
	  
	  $(".close-overlay").removeClass("hidden");
	  // handle the adding of hover class when clicked
	  $(".project-box").click(function(){
	      if (!$(this).hasClass("hover")) {
	          $(this).addClass("hover");
	      }
	  });
	  // handle the closing of the overlay
	  $(".close-overlay").click(function(e){
	      e.preventDefault();
	      e.stopPropagation();
	      if ($(this).closest(".project-box").hasClass("hover")) {
	          $(this).closest(".project-box").removeClass("hover");
	      }
	  });
	} else {
	  // handle the mouseenter functionality
	  $(".project-box").mouseenter(function(){
	      $(this).addClass("hover");
	  })
	  // handle the mouseleave functionality
	  .mouseleave(function(){
	      $(this).removeClass("hover");
	  });
	}

  // form validation
	$("form").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message;
				if(errors === 1) {
					message = 'You missed 1 field. It has been highlighted';
				} else {
					message = 'You missed ' + errors + ' fields. They have been highlighted';
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
				alert('You already sent the message.');
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
        	$('form.form').append('<div class="row success"><div class="col-md-12"><span> Message sent. </span></div></div>');
        }
    });
    e.preventDefault();	
});

