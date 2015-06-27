ko.components.register("keyboard", {
	viewModel : function( params ){
		var self = this;
		self.target = ko.observable();
	},
	template : {element:"component-keyboard"}
});

$.widget("pixel.keyboard", {
	options : {
		viewModel : null,
		excludeKeys : []
	},
	_create : function(){
		var self = this;
		self.viewModel = self.options.viewModel;
			
		var	maxLength = self.options.maxLength,
			target = self.viewModel.target;
		
		//display our options
		this.element.append("<p>"+JSON.stringify(_.pick(self.options,"excludeKeys"))+"</p>")
		
		//link to the parent element
		var $keyboard = this.element.parents("keyboard");
		
		//if the target changes then we change the state of the keyboard
		target.subscribe(function(value){
			if( value ){
				$keyboard.fadeIn();
			}else{
				$keyboard.fadeOut();
			}
		});
		//set default state of the keyboard
		$keyboard[ target() ? "show" : "hide" ]();
		
		//listen for events on our keys
		self.element.find("[data-keyboard-key]").on("click", function( evt ){
			//maintain focus on input
			evt.preventDefault();
			//which button was pressed
			var $target = $( this );
			var key = $target.attr("data-keyboard-key");
			
			switch(key){
			case "submit":
				$keyboard.trigger("submit");
				break;
			case "cancel":
				
				break;
			default:
				if( target() ){
					var $target = $( target() );
					$target.val( $target.val() + key );
					$target.trigger("change");
				}
				break;
			}
			
		});
	}
})