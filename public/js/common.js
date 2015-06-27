ko.bindingHandlers.locals = {
	init : function( element, valueAccessor, allBindings, viewModel, bindingContext ){
		var locals = valueAccessor();
		for( var id in locals ){
			element[id] = locals[id];
		}
	}
}

ko.bindingHandlers.widget = {
	init : function( element, valueAccessor, allBindings, viewModel, bindingContex ){
		//reach up to the parent pinpad and get the options from it
		var widgets = valueAccessor();
		
		for( var id in widgets ){
			(function(id){
				var $widget = $(element).parents( id );
				var options = widgets[ id ];
				var optionsCustom = {};
			
				var widget = $widget.get(0);
				if(widget){
					widget.widget = widget.widget || {};
					widget.model = widget.model || {};
					
					widget.model[id] = viewModel;
					widget.widget[id] = function(){
						$(element)[id].apply( $(element), arguments );
					}
				}
				//read the custom parameters the user passed through
				try{
					eval( "optionsCustom = {" +$widget.attr("options") + "}" );
				}catch(err){
					console.log("Unable to parse parent options", err);
				}
		
				//merge these values
				for( var property in optionsCustom ){
					console.log("\t"+property);
					options[property] = optionsCustom[property];
				}
			
				//apply the widget
				$(element)[id]( options );
			})(id);
		}
		
	}
}

ko.bindingHandlers.onEvent = {
	init : function( element, valueAccessor, allBindings, viewModel, bindingContext ){
		var events = valueAccessor();
		for( var id in events ){
			console.log("binding event:", id);
			(function( id, handlerFunction ){
				viewModel.addEventListener( id, function( event ){
                    if (handlerFunction){
	                    try {
							// Take all the event args, and prefix with the viewmodel
	                        var argsForHandler = ko.utils.makeArray(arguments);
	                        viewModel = bindingContext['$data'];
	                        argsForHandler.unshift(viewModel);
	                        handlerReturnValue = handlerFunction.apply(viewModel, argsForHandler);
	                    } finally {
	                        
	                    }
					}
				} )
			})( id, events[id] )
		}
	}
}
