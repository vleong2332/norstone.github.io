if (Drupal.jsEnabled) {
	Drupal.behaviors.zillaFormBehavior = function (context) {	
		var elements = Drupal.settings.zillaForm.elements;
		var exclude  = Drupal.settings.zillaForm.exclude;
		
		if(elements != false) {
			$(elements).not(exclude).zillaForm({
				drupal: true,
				innerlabels: Drupal.settings.zillaForm.innerlables,
				auto: Drupal.settings.zillaForm.auto
			});
		}
	}
}