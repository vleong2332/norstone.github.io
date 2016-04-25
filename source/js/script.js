---
---

var productTypes = {}
$(document).ready(function() {
  loadProductTypes();

  $("#block-views-banners-block_1 .view-header, #product-photo")
  .before('<div class="nav"><a class="previous" href="#"></a> <a class="next" href="#"></a></div>');

  $(".view-product-photos .nav a.previous").click(function(e) {
  	container = $(".view-product-photos a.active").parents('.views-row');
    if (container.is(':first-child')) {
      if ($('.pager').length != 0 && !$('.pager-current').hasClass('first')) {
        $('.pager-previous a').trigger('click');
        return false;
      } else if ($('.pager').length != 0 && $('.pager-current').hasClass('first')) {
        return false;
      } else {
  	    var prev = container.siblings(':last').find('a');
      }
    } else {
  	  var prev = container.prev().find('a');
    }
  	loadImage(prev);
    loadSidebar(prev);
  	e.preventDefault();
  });

  $(".view-product-photos .nav a.next").click(function(e) {
    container = $(".view-product-photos a.active").parents('.views-row');
    if (container.is(':last-child')) {
      if ($('.pager').length != 0 && !$('.pager-current').hasClass('last')) {
        $('.pager-next a').trigger('click');
        return false;
      } else if ($('.pager').length != 0 && $('.pager-current').hasClass('last')) {
        return false;
      } else {
  	    var next = container.siblings(':first').find('a');
      }
    } else {
      var next = container.next().find('a');
    }
  	loadImage(next);
    loadSidebar(next);
  	e.preventDefault();
  });

  $("#block-views-landing_slideshow-block_1 .view-content")
  .before('<div class="nav"><a class="previous" href="#"></a> <a class="next" href="#"></a></div><div id="cycle-pager"></div>');

  $(".view-landing-slideshow .nav a.previous").click(function(e) {
    container = $(".view-landing-slideshow a.active").parents('.views-row');
    if (container.is(':first-child')) {
      if ($('.pager').length != 0 && !$('.pager-current').hasClass('first')) {
        $('.pager-previous a').trigger('click');
        return false;
      } else if ($('.pager').length != 0 && $('.pager-current').hasClass('first')) {
        return false;
      } else {
        var prev = container.siblings(':last').find('a');
      }
    } else {
      var prev = container.prev().find('a');
    }
    loadImage(prev);
    loadSidebar(prev);
    e.preventDefault();
  });

  $(".view-landing-slideshow .nav a.next").click(function(e) {
    container = $(".view-landing-slideshow a.active").parents('.views-row');
    if (container.is(':last-child')) {
      if ($('.pager').length != 0 && !$('.pager-current').hasClass('last')) {
        $('.pager-next a').trigger('click');
        return false;
      } else if ($('.pager').length != 0 && $('.pager-current').hasClass('last')) {
        return false;
      } else {
        var next = container.siblings(':first').find('a');
      }
    } else {
      var next = container.next().find('a');
    }
    loadImage(next);
    loadSidebar(next);
    e.preventDefault();
  });

  //-------------------------------------------------------------------------------------------|
  //  End Image Carousel
  //-------------------------------------------------------------------------------------------|

  //-------------------------------------------------------------------------------------------|
  //  Fancybox Links
  //-------------------------------------------------------------------------------------------|

  $(".fancybox").fancybox({
    'transitionIn': 'none',
    'transitionOut': 'none'
  });

  //-------------------------------------------------------------------------------------------|
  //  End Fancybox Links
  //-------------------------------------------------------------------------------------------|

	//-------------------------------------------------------------------------------------------|
	//  Cycle Plugin
	//-------------------------------------------------------------------------------------------|

		//Cycle Pager
		$("#block-views-banners-block_1 .view-content").cycle({
				fx: 'fade',
				pause: true,
				pager: '#cycle-pager',
				timeout: 8000,
				prev: '.previous',
				next: '.next',
				pagerAnchorBuilder: function(idx, slide) {
					return '<a href="#"><span>'+(idx + 1)+'</span></a>';
		    	}
			});
    $("#block-views-landing_slideshow-block_1 .view-content").cycle({
        fx: 'fade',
        pause: true,
        pager: '#cycle-pager',
        timeout: 5000,
        prev: '.previous',
        next: '.next',
        pagerAnchorBuilder: function(idx, slide) {
          return '<a href="#"><span>'+(idx + 1)+'</span></a>';
          }
      });

	//-------------------------------------------------------------------------------------------|
	//  End Cycle Plugin
	//-------------------------------------------------------------------------------------------|


	//-------------------------------------------------------------------------------------------|
	//  Tabbed Techinical info Box
	//-------------------------------------------------------------------------------------------|

		$( "#tabs" ).tabs();


	//-------------------------------------------------------------------------------------------|
	//  End Tabbed Techinical info Box
	//-------------------------------------------------------------------------------------------|

	//-------------------------------------------------------------------------------------------|
	//  Contact Form
	//-------------------------------------------------------------------------------------------|
		/* Change form submit text */
		$("#block-block-2 .form-submit[value='Save']").attr('value','Submit');

	//-------------------------------------------------------------------------------------------|
	//  End Contact Form
	//-------------------------------------------------------------------------------------------|

	//-------------------------------------------------------------------------------------------|
	//  FAQ Page Jquery
	//-------------------------------------------------------------------------------------------|

	//ACCORDION BUTTON ACTION
			//This handles the opening/closing
			$('div.section-header').click(function() {
				if ($(this).next().is(':visible')) {
					$('div.section-body').slideUp('normal');
				} else {
					$('div.section-body').slideUp('normal');
					$(this).next().slideDown('normal');
				}
			});

			//This handles the "down"/"up" arrow

			$('div.section-header h2').click(function() {


			//If we click on an open item

				if($(this).hasClass("active")){
					//Close everything
					$('div.section-header h2').removeClass('active');
				}
			//If we click on a closed item
				else{
					//Close Everything
					$('div.section-header h2').removeClass('active');
					//Open the current one
					$(this).addClass('active');
				}
			});


	//HIDE THE DIVS ON PAGE LOAD
			$("div.section-body").hide();

	//SHOW THE ABOUT US DIV ON PAGE LOAD
			$("div.open").show();

	//-------------------------------------------------------------------------------------------|
	//  End FAQ Page Jquery
	//-------------------------------------------------------------------------------------------|

	//-------------------------------------------------------------------------------------------|
	//  Gallery
	//-------------------------------------------------------------------------------------------|
		$(".view-product-photos a.thumb").click(function(e) {
			loadImage($(this));
      loadSidebar($(this));
			e.preventDefault();
			return false;
		});


		$(".view-product-photos a.thumb:first").trigger('click');


		// Shadow
		$(".node-type-project .view-product-photos ul li a .absolute .shadow").css('opacity', 0);

		$(".node-type-project .view-product-photos ul li a").hover(function() {
			$(".shadow", $(this)).stop().animate({'opacity': 1}, 300);
		}, function() {
			$(".shadow", $(this)).stop().animate({'opacity': 0}, 300);
		});
	//-------------------------------------------------------------------------------------------|
	//  End Gallery
	//-------------------------------------------------------------------------------------------|


	//-------------------------------------------------------------------------------------------|
	//  Dropdown
	//-------------------------------------------------------------------------------------------|
		$(".dropdown .dropdown-box").not('.processed').addClass('processed').click(function() {
			$(".list", $(this).parent()).stop().slideToggle(200);
		});

		$("*").not(".dropdown .dropdown-box, .dropdown .list").click(function() {
			$(".dropdown .list").hide();
		});

    $('.gallery-drop select').change(function() {
      window.location = $(this).val();
    });

    $('#block-views--exp-gallery_full-page_15 #edit-tid-wrapper select').change(function() {
      $('#edit-submit-gallery-full').trigger('submit');
    });

    $('#block-qtproducts-projects select, #block-qtproducts-applications select').change(function() {
      window.location = $(this).val();
    });

	//-------------------------------------------------------------------------------------------|
	//  End Dropdown
	//-------------------------------------------------------------------------------------------|

    $('#views-exposed-form-gallery-full-page-15 #edit-tid option[value="All"]').html('Sort This Gallery');

    	//-------------------------------------------------------------------------------------------|
		//  Tags
		//-------------------------------------------------------------------------------------------|
        	$("#block-views--exp-gallery_full-page_1").prepend('<span class="label">Or, Select A Tag:</span>');
    	//-------------------------------------------------------------------------------------------|
		//  End Tags
		//-------------------------------------------------------------------------------------------|
		//-------------------------------------------------------------------------------------------|
		//  Contact us text area - tell us about your project - onblur / onfocus remove and add back text
		//-------------------------------------------------------------------------------------------|

			$("#edit-field-message-0-value").focus(function() {
			    if($(this).text() == "Tell us about your project." ) {
			        $(this).text("");
			    }
			});

			/*
			$("#edit-field-message-0-value").blur(function() {
			    if($(this).text() == "" ) {
			        $(this).text("Tell us about your project.");
			    }
			});
			*/


		//-------------------------------------------------------------------------------------------|
		//  End Contact us text area - tell us about your project
		//-------------------------------------------------------------------------------------------|

	//-------------------------------------------------------------------------------------------|
	//  Glide
	//-------------------------------------------------------------------------------------------|

  $.localScroll();

	//-------------------------------------------------------------------------------------------|
	//  End Glide
	//-------------------------------------------------------------------------------------------|

	//-------------------------------------------------------------------------------------------|
	//  Products Cycle
	//-------------------------------------------------------------------------------------------|

  $('.quicktabs_main').each(function() {
    $this = $(this);
    var pager = '#' + $this.parent().attr('id') + ' .quicktabs_tabs';
    $(this).cycle({
      fx: 'scrollHorz',
      speed: 'fast',
      timeout: 0,
      activePagerClass: 'activeslide',
      pager: pager,
      pagerAnchorBuilder: function(idx, slide) {
        //return '#quicktabs-qtproducts_rockpanels li:eq(' + idx + ') a';
        return pager + ' li:eq(' + idx + ') a';
      },
      pagerEvent: 'mouseover'
    });
  });

  $('#quicktabs_tabpage_2_0,#quicktabs_tabpage_2_1, #quicktabs_tabpage_2_2').css('background-color', '');
	// IE Fix for Inline Style

	//-------------------------------------------------------------------------------------------|
	//  End Products Cycle
	//-------------------------------------------------------------------------------------------|

  //-------------------------------------------------------------------------------------------|
  //  Pinterest Share button
  //-------------------------------------------------------------------------------------------|

  if ($('.social-share-container').length > 0) {
    var pinterest = {
      url: document.URL,
      media: 'http://' + document.domain + '/' + $('#product-photo img').attr('src'),
      description: $('.photo-container h2').html()
    }
    var href = '//pinterest.com/pin/create/button/?' + $.param(pinterest);
    $('.social-share-container').prepend('<a class="social-share-pinterest" target="_blank" href="' + href + '">Pinterest</a>');
  }

  //-------------------------------------------------------------------------------------------|
  //  End Pinterest Share button
  //-------------------------------------------------------------------------------------------|

    });


function loadImage(a) {
			$("#product-photo").addClass('showLoader');

			var image_src = a.attr('href');

    	var img = new Image();

    	img = $(img);

    	img.hide();
    	img.attr('src', image_src);

    	$("#product-photo").html(img);

    	img.load(function() {
    		$("#product-photo").removeClass('showLoader');
       	$(this).stop().fadeIn(500);
       	$(".view-product-photos a.thumb").removeClass('active');
       	a.addClass('active');
    	});

}

function loadSidebar(a) {
  if ($(a).is("[data-product-type]") && Object.keys(productTypes).length !== 0) {
    var block = $('#block-block-58');
    var type = productTypes[$(a).attr('data-product-type')];
    console.log(productTypes);
    console.log(type);

    $('img', block).attr('src', type.image);
    $('.pictured-product-title a', block).html(type.title);
    $('.pictured-product a', block).attr('href', type.link);
  }
}

function loadProductTypes() {
  return $.ajax({
    type: 'GET',
    url: '{{ site.domain }}/gallery/pictured.json',
    dataType: 'json',
    success: function (data) {
      productTypes = data;
    }
  });
}
