$(document).ready( function(){
	var modelApp = new AppModel();
	
	modelApp.submitPinCode = function( model, event, pin ){
		alert("pincode: " + pin );
	}
	
	ko.applyBindings( modelApp );
} );

var AppModel = function(){
	var self = this;
	
	self.nameFirst = ko.observable("Jimi");
	self.nameLast = ko.observable("B");
	self.pinCode = ko.observable("");
}

EventDispatcher.prototype.apply( AppModel.prototype );
