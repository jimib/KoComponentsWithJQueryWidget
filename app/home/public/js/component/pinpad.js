ko.components.register("pinpad", {
	viewModel : function( params ){
		var self = this;
		
		params = params || {};
		//we may be passed an external observable to populate input - otherwise uses local copy
		self.input = params.input || ko.observable("");
		//can respond to changes on the observable
		self.input.subscribe(function(value){
			console.log("Input changed",value);
		});
		//and provide computed observables
		self.inputLength = ko.computed(function(){
			return (self.input() || "").length;
		});
	},
	template : {element:"component-pinpad"}
});

$.widget("pixel.pinpad", {
	options : {
		maxLength: 4,
		viewModel : null
	},
	submit : function(){
		this.element.parents("pinpad").trigger("submit", this.viewModel.input());
	},
	viewModel : function(){
		return (this.options || {}).viewModel;
	},
	_create : function(){
		var self = this,
			maxLength = self.options.maxLength,
			input = self.viewModel().input,
			inputLength = self.viewModel().inputLength;
			
		//display our options
		this.element.append("<p>"+JSON.stringify(_.pick(self.options,"maxLength"))+"</p>")
		
		var $progress = this.element.find(".progress");
		//build up our progress bar based on the maximum pin code length
		for( var i = 0; i < maxLength; i++ ){
			$progress.append("<li></li>");
		}
		//update the progress pips based on the input length
		input.subscribe( updateProgress );
		
		updateProgress();
		
		function updateProgress( ){
			//update the 
			$progress.find("li").each( function( index, item ){
				$(item)[
					( index < inputLength() ) ? "addClass" : "removeClass"
				]("enabled");
			});
			//update the progress
			if( inputLength() == maxLength ){
				//auto submit the keys when we hit the max
				self.submit();
			}
		}
		
		self.element.find("[data-pinpad-key]").on("click", function( evt ){
			//which button was pressed
			var $target = $( this );
			var key = $target.attr("data-pinpad-key");
			
			switch(key){
			case "submit":
				self.submit();
				break;
			case "cancel":
				
				break;
			case "reset":
				input("");
				break;
			default:
				if( inputLength() < maxLength ){
					input( (input() || "") + key );
				}
				break;
			}
			
		});
	}
})