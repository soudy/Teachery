
function Confirm(options){
	var self = this;
	this.element = options.element;
	this.cancelCall = options.cancel || function(){};
	this.confirmCall = options.confirm || function(){};
	this.message = options.message || 'N/A';

	this.yes = this.element.querySelector('.checkbox-confirm'),
	this.no = this.element.querySelector('.checkbox-cancel'),
	this.msg = this.element.querySelector('.checkbox-message');

	this.show = function(){
		this.msg.innerHTML = this.message;
		this.element.classList.add('active');
	}

	this.hide = function(){
		this.msg.innerHTML = '';
		this.element.classList.remove('active');
	}

	this.no.onclick = function(){
		self.hide();
		self.cancelCall();
	}

	this.yes.onclick = function(){
		self.hide();
		self.confirmCall();
	}
}