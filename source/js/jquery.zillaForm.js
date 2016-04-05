/**
 *	zillaForm
 *	@author Steven Monetti | Designzillas
 *	@version 1.3
 *	 
 *	Functionallity: It provides wrappers and events to create
 *	nice form elements
 */
(function($) {
	function log() {
		if (window.console && window.console.log) {
			window.console.log('[zillaForm] ' + Array.prototype.join.call(arguments,' '));
		}
	};

	$.fn.zillaForm = function(options) {
		
		//Internal Settings
		var settings = {
			wrapperName: 'zillaForm-wrapper'
		}; 
		
		//Options
		var defaults = {
			auto: true,
			innerlabels: false,
			drupal: false
		};  
		
		var options = $.extend(defaults, options); 	
		
		//IE6 background flicker fix
		try	{ document.execCommand('BackgroundImageCache', false, true); } catch (e) {}
		
		var z = {
			attachEvents: function(e) {
				//Attatch events to wrapper
				e.hover(function() { 
					e.addClass('hover'); 
				}, function() { 
					e.removeClass('hover');
				})
				.focus(function() {
					e.addClass('focused');
				})
				.blur(function()  {
					e.removeClass('focused');
				});
			},
			convertText: function(e) {			
				var classes = settings.wrapperName + ' ' + settings.wrapperName + '-text ';
				
				//Check if it's disabled
				if(e.attr('disabled')) classes += ' zillaForm-disabled';
				 
				//Add classes for Drupal required and error
				if(options.drupal) {
					if(e.hasClass('required')) {
						classes += ' zillaForm-required';
						var requiredDivHTML = '<div class="zillaForm-fake-required"><div></div></div>';
					}
					
					if(e.hasClass('error')) classes += ' zillaForm-error'; 
				}
				
				//Calculate initial element width
				var elementWidth = e.width();
				
				//Wrap element				
				e.addClass('zillaForm').wrap('<div class="'+classes+'"><div class="zillaForm-right-block"></div></div>');
				
				//Save parent and right element;
				var p = e.parent().parent();
				var r = e.parent();
				
				
				//Add the "reqired" div
				if(e.hasClass('required')) r.prepend(requiredDivHTML);
			    
			    //Set the size to atleast 50; this is for date fields that default to 30
			    //e.attr('size','50').attr('maxlength','50');
			    
			    //If we have labels set to be inside the form field
			    if(options.innerlabels) {
			    	
					//Hide the original label element and remove the span
					
					var label = $("label[for='"+e.attr("id")+"']");
					label.hide();
					label.find('span').remove();
										
					//Inject the fake label field, We do this instead of writing the label to the form field so validation still occurs.
					labelhtml = label.html();
					if(labelhtml == null){labelhtml = '';}
					
					r.prepend('<div class="fakelabel">'+labelhtml+'</div>');
					
					//Attach an event to the fake label, so if it's clicked by accident then focus is put on the field
					var fakeLabel = r.find('.fakelabel');
					fakeLabel.click(function(){
						e.focus();
					});
					
					//Hide the fake label if the form field already contains data (like a default value)
					if(e.val()) fakeLabel.css('opacity','0');
					
					// Attach Events
					e.click(function(){
						fakeLabel.css('opacity','0');
					}).focus(function() {
						fakeLabel.css('opacity','0');
					}).blur(function(){
						if(!e.val()) fakeLabel.css('opacity','100').attr('style','');
					}).change(function() {
						if(e.val() != '') fakeLabel.css('opacity','0');
					});
			    }
			    
			    
			  /**
				* Attempt width auto adjust reading the
				* left padding (left cap width)
				*/
				if(options.auto) {
					var paddingLeft = p.css('padding-left');
					paddingLeft = paddingLeft.substr(0, (paddingLeft.length - 2));
					var newWidthWrapper = parseInt(elementWidth) - parseInt(paddingLeft);
					var newWidthRight = parseInt(elementWidth) - parseInt((paddingLeft * 2));
					
					p.width(newWidthWrapper + 'px');
					e.parent().width(newWidthRight + 'px');
					e.width("100%");
				}
				
			},
			convertTextArea: function (e) {
				var classes = settings.wrapperName + ' ' + settings.wrapperName + '-textarea ';
				
				//e.addClass('zillaForm')
				if(options.drupal){
					e.removeClass('resizable');
				}
				
				e.after('\
						<table class="'+classes+'"> \
							<tr>\
								<td class="zf-top"></td>\
								<td class="zf-top-right"></td>\
							</tr>\
							<tr>\
								<td class="zf-center"></td>\
								<td class="zf-center-right"></td>\
							</tr>\
							<tr>\
								<td class="zf-bottom"></td>\
								<td class="zf-bottom-right"></td>\
							</tr>\
						</table>\
				');				
				e.appendTo(e.parent().find('.'+settings.wrapperName+' .zf-center'));
				
				//Check if it's a drupal required field
				if(e.hasClass('required')) {
					classes += ' zillaForm-required';
					var requireddiv = '<div class="zillaForm-fake-required"><div></div></div>';
				}
				
				//Add the little required div
				if(e.hasClass('required')) e.parent().prepend(requireddiv);
				
				//Fake Labels
				if(options.innerlabels){
			    	
			    	//Hide the original label element
					var label = $("label[for='"+e.attr("id")+"']");
					label.hide();
					label.find('span').remove();
			    	
			    	//Get the value of the stripped down label
					var labelvalue = label.html();
					if(labelvalue == null) labelvalue = '';
			    	
			    	
			    	//Inject the fake label field, We do this instead of writing the label to the form field so validation still occurs.
			    	e.parent().prepend('<div class="fakelabel">'+labelvalue+'</div>');
			    	var fakelabel = e.parent().find('.fakelabel');
			    	
			    	//Attach an event to the fake label, so if it's clicked by accident then focus is put on the field
			    	fakelabel.click(function(){
			    		e.focus();
			    	});
			    	
			    	//Hide the fake label if the form field already contains data (like a default value)
			    	if(e.val()){
			    		fakelabel.hide();
			    	}
			    	
			    	//Set a jQuery event to hide the fake label when we click into the region
			    	e.click(function(){
			    		fakelabel.hide();
			    	}).focus(function() {
			    		fakelabel.hide();
			    	});
			    	
			    	//Show the fake label again if the input is still blank
			    	e.blur(function(){
			    		if(e.val() == ''){
			    			fakelabel.show();
			    		}
			    	});
			    	
			    }
				
				
			   /**
				* Attempt width auto adjust reading the
				* left margin (left cap width)
				*/
				if(options.auto) {
					var marginLeft = e.css('margin-left');
					marginLeft.substr(0, -2);
					var newWidth = e.width() - parseInt(marginLeft);
					e.width(newWidth);
				}
			},
			convertCheckbox: function(e) {
				var classes = settings.wrapperName + ' ' + settings.wrapperName + '-checkbox';
				if(e.is(':disabled')) classes += ' disabled';			
				if(e.is(':checked'))  classes += ' checked';
				
				e.addClass('zillaForm').wrap('<div class="'+classes+'"></div>');
				e.after("<div class='zillaForm-checkbox-image'></div>");
				
				var p = e.parent();
				
				//Bind click function to container
				p.click(function() {
					if(!e.is(':disabled')) {
						if(e.is(':checked')) {
							e.attr('checked', false);
							$(this).removeClass('checked');
							
						} else {
							e.attr('checked', true);
							$(this).addClass('checked');
						}
					}
				}).bind('dragstart', function () {return false;}).bind('mousedown', function () {return false;});
				
				//Bind checkbox click function (if it gets triggered programmatically)
				e.bind('click',   function() {
					if(!e.is(':disabled')) {
						if(e.is(':checked')) p.removeClass('checked');
						else p.addClass('checked');
					}
				});
				
				//Bind disable, enable, check and unceck events (if it gets triggered programmatically)
				//e.bind('disable', function() { alert(''); e.parent().addClass('zillaForm-disabled'); });
				//e.bind('enable',  function() { e.parent().removeClass('zillaForm-disabled'); });
				//e.remove(function() { p.remove(); });
				//e.bind('check',   function() { p.addClass('zillaForm-checked'); });
				//e.bind('uncheck', function() { p.removeClass('zillaForm-checked'); });
			},
			convertRadio: function(e) {
				var classes = settings.wrapperName + ' ' + settings.wrapperName + '-radio ';
				if(e.is(':disabled')) classes += 'disabled';			
				if(e.is(':checked'))  classes += 'checked';
				
				e.addClass('zillaForm').wrap('<div class="'+classes+'"></div>');
				e.after("<div class='zillaForm-radio-image'></div>");
				
				var p = e.parent();
				var name = e.attr('name');
				
				//Bind click function to container
				p.find('.zillaForm-radio-image').click(function() {
					if(!e.is(':disabled')) {
						if(!e.is(':checked')) {
							$("input[name='"+name+"']").attr('checked', false).parent().removeClass('checked');
							e.attr('checked', true);
							$(this).parent().addClass('checked');
						}
					}
				}).bind('dragstart', function () {return false;}).bind('mousedown', function () {return false;});
				
				//Bind checkbox click function (if it gets triggered programmatically)
				e.click(function() {
					if(!e.is(':disabled')) {
						$("input[name='"+name+"']").attr('checked', false).parent().removeClass('checked');
						p.addClass('checked');
						e.attr('checked', true);
					}
				});
				
			},
			
			convertButton: function(e) {
				var classes = settings.wrapperName + ' ' + settings.wrapperName + '-button ';
				e.addClass (classes);
			},
			
			
			convertSelect: function(e) {
				var classes = settings.wrapperName + ' ' + settings.wrapperName + '-select ';
				
				//Hide the original label element
			    e.parents(".form-item").find("label").hide();
			    	
		    	//Remove the required span if it's there
		    	e.parents(".form-item").find("label").find('span').remove();
		    	
		    	//Get the value of the stripped down label
		    	var labelvalue = e.parents(".form-item").find("label").html();
				
				//Rewrite default option
				e.find("option:first").html(labelvalue);
				
				//Add the label as the first selected item
				//e.prepend('<option value="" selected="selected">'+labelvalue+'</option>');
				
/*
				var selected_value = $('option:selected', e).html();
				console.log("Selected:"+selected_value);
*/
				
				e.addClass('zillaForm').wrap('<div class="'+classes+'" tabindex="0"></div>');
				e.after('\
					<div class="zillaForm-select-left">\
						<div class="zillaForm-select-right">\
							<div class="zillaForm-select-value">My selected text</div>\
						</div>\
					</div>\
					<div class="zillaForm-selectbox">\
						<ul></ul>\
					</div>\
				');
				var p  = e.parent();
				var ul = e.parent().find('.zillaForm-selectbox ul');
				
				//Adjust the width of the new selectbox			
				var paddingLeft = p.find('.zillaForm-select-left').css('padding-left');
				var paddingLeftLength = paddingLeft.length;
				var newLength = paddingLeftLength - 2;
				paddingLeft = paddingLeft.substr(0,newLength);
				p.width(e.width() - parseInt(paddingLeft) + 40);
				//end width adjustment
				
				
				//Save all the options
				var selectOptionData = [];
				e.find('option')
				 .each(function(){
					selectOptionData.push({
						value: $(this).attr('value'),
						text: $(this).text(),
						selected: $(this).attr('selected'),
						classes: $(this).attr('class'),
						parentOptGroup: $(this).parent('optgroup').attr('label')
					});
				});
					
				//Append all options as <li>
				for(var i in selectOptionData) {
					var li = $('<li><span>'+ selectOptionData[i].text +'</span></li>')
						.data('index', i)
						.addClass(selectOptionData[i].classes)
						.addClass("option-"+i)
						.mouseup(function(event) {
							
							//Select the option
							var index = $(this).data('index');
							e.find('option:eq('+index+')').attr('selected', 'selected');
							
							
							//Update the text
							var value = e.find('option:eq('+index+')').html();
							p.find('.zillaForm-select-value').html(value);
							
							//Add 'selected' class to <li>
							ul.find('li').each(function() {$(this).removeClass('selected')});
							$(this).addClass('selected');
							
							//Hide on click
							p.find('.zillaForm-selectbox').attr('class','zillaForm-selectbox');
							
							return false;
						})
						.hover(function() {$(this).addClass('hover');} ,function() {$(this).removeClass('hover');}); 
						
					//Add classes for first, last and selected
					if(i == 0) li.addClass('first');
					if(i == (selectOptionData.length - 1)) li.addClass('last');
					if(selectOptionData[i].selected) {
						li.addClass('selected');
						//Update initial selected text
						
						var value = e.find('option:eq('+i+')').html();
						p.find('.zillaForm-select-value').html(value);
					}
					
					li.appendTo(ul);
				}
				
				//Reverse (if it gets triggered programmatically)
				e.bind('change', function() {
					var selectedIndex = $(this).attr("selectedIndex");
					ul.find('li').each(function() {$(this).removeClass('selected')});
					ul.find('li:eq('+selectedIndex+')').addClass('selected');
					
					//Update the text
					var value = e.find('option:eq('+selectedIndex+')').html();
					p.find('.zillaForm-select-value').html(value);
				});
				
				//Foucs function (show selectbox)
				p.focus(function () {
					//p.find('.zillaForm-selectbox').addClass('visible');
				}).blur(function() {
					//p.find('.zillaForm-selectbox').removeClass('visible');
				});
				
				//Parent click event
				p.find('.zillaForm-select-left').click(function() {
					var selectBox = p.find('.zillaForm-selectbox');
					if(selectBox.hasClass('visible')) selectBox.removeClass('visible');
					else selectBox.addClass('visible');
				});
				
				//Key events
				p.keydown(function(event) {
					
					event.preventDefault();
					
					switch (event.keyCode) {
						//ESCAPE
						case 27:
							//Hide dropdown
							p.find('.zillaForm-selectbox').attr('class','zillaForm-selectbox');
						break;
						
						//ENTER
						case 13:
							var selectedIndex = ul.find('li.selected').data('index');
							ul.find('li').each(function() {$(this).removeClass('selected')});
							ul.find('li:eq('+selectedIndex+')').addClass('selected');
							
							//Update the <select>
							e.find('option:eq('+selectedIndex+')').attr('selected', 'selected');
							
							//Update the text
							var value = e.find('option:eq('+selectedIndex+')').html();
							p.find('.zillaForm-select-value').html(value);
							
							//Hide dropdown
							p.find('.zillaForm-selectbox').attr('class','zillaForm-selectbox');
						break;
						
						//LEFT AND UP
						case 37:
						case 38:
							var selectedIndex = ul.find('li.selected').data('index');
							selectedIndex--;
							if(selectedIndex >= 0) {
								ul.find('li').each(function() {$(this).removeClass('selected')});
								ul.find('li:eq('+selectedIndex+')').addClass('selected');
							}
						break;
						
						//RIGHT AND DOWN
						case 39:
						case 40:
							var selectedIndex = ul.find('li.selected').data('index');
							selectedIndex++;
							if(selectedIndex < ul.find('li').length) {
								ul.find('li').each(function() {$(this).removeClass('selected')});
								ul.find('li:eq('+selectedIndex+')').addClass('selected');
							}
						break;	
						
						//LETTER
						default:
							var self = this;
							var code = event.keyCode;
							
							if(!ul.data('prevChar')) { 
								ul.data('prevChar' , ''); 
								ul.data('prevIndex', 0); 
							}
							
							var C = String.fromCharCode(code);
							var c = C.toLowerCase();
							var found = false;
							var foundIndex = 0;
							
							//Find the text
							ul.find('li span').each(function(i) {
								if(!found) {
									var thisText = $(this).text();
									if( thisText.indexOf(C) == 0 || thisText.indexOf(c) == 0) {
										if(ul.data('prevChar') == C) {
											if(ul.data('prevIndex') < i) {
												foundIndex = i;
												found = true;	
												ul.data('prevIndex', i);
											}
										}
										else {
											foundIndex = i;
											found = true;
											ul.data('prevIndex', i);	
										}
									}	
								}
							});
							ul.data('prevChar', C);
							
							//Select the element if found
							if(found) {
								ul.find('li').each(function() {$(this).removeClass('selected')});
								ul.find('li:eq('+foundIndex+')').addClass('selected');
							}
						break;	
					}
				});
				
				//Action when click away from the selectbox (close)
				$("*").live('click', function(e) {
					var element = $(e.target);
					//alert(element.attr('class'));
					if ((!element.hasClass('zillaForm-select-value')) && (!element.hasClass('zillaForm-select-right')) && (!element.hasClass('zillaForm-select-left'))) {
						p.find('.zillaForm-selectbox').attr('class','zillaForm-selectbox');
    				};
				});
			}
		};	
			
		//Begin plugin
		return this.each(function() {
			var element = $(this);
			var type = element.attr('type');
						
			//Check the input type
			switch(type) {
				case 'text':
				case 'password':
					z.convertText(element);
				break;
				
				case 'select-one':
					z.convertSelect(element);
				break;
				
				case 'checkbox':
					z.convertCheckbox(element);
				break;
				
				case 'radio':
					z.convertRadio(element);
				break;
				
				case 'textarea':
					z.convertTextArea(element);
				break;
				
				case 'button':
				case 'submit':
					z.convertButton(element);
				break;
			}
			
			z.attachEvents($('.' + settings.wrapperName));
		});
		
		
	};
})(jQuery);