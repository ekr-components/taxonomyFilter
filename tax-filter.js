var components = components || {};

jQuery(document).ready(function() {
	jQuery('[data-component="taxonomy-filter"]').each(function() {
		var tf = new components.taxonomyFilter(this);
	});
});

components.taxonomyFilter = function(el) {
	var self = this;
	self.el = jQuery(el);
	self.taxContainer = self.el.find('[data-tf="tax-container"]');
	self.taxonomies = self.el.find('[data-tf-tax]');
	self.closeButton = self.el.find('[data-tf="close"]');
	self.left = self.el.find('[data-tf="left"]');
	self.right = self.el.find('[data-tf="right"]');
	self.currentTax = false;
	self.currentPos = 0;
	self.inOpen = false;
	self.init();
};
components.taxonomyFilter.prototype = {
	init: function() {
		var self = this;
		jQuery(window).on('resize.tf', function() {
			self.resize();
		});
		self.resize();
	},
	init: function() {
		var self = this;
		self.el.show();
		self.el.find('[data-tf-target]').each(function() {
			var tax = jQuery(this).data('tf-target');
			jQuery(this).off('.tf').on('click.tf', function() {
				self.open(tax);
			});
		});
		self.closeButton.off('.tf').on('click.tf', function() {
			self.close();
		});
		self.left.off('.tf').on('click.tf', function() {
			self.slide('left');
		});
		self.right.off('.tf').on('click.tf', function() {
			self.slide('right');
		});
	},
	open: function(tax) {
		var self = this;
		var target = self.el.find('[data-tf-tax="' + tax + '"]');
		self.currentTax = target;
		self.currentPos = 0;
		self.taxonomies.removeClass('visible').css('left', self.currentPos);
		self.taxContainer.addClass('open');
		self.currentTax.addClass('visible');
		self.isOpen = true;
		self.reset();
	},
	close: function() {
		var self = this;
		self.taxContainer.removeClass('open');
		self.currentPos = 0;
		self.taxonomies.removeClass('visible').css('left', self.currentPos);
		self.isOpen = false;
	},
	reset: function() {
		var self = this;
		if(self.isOpen) {
			self.currentTax.css('left', self.currentPos);
			if(self.currentTax.width() > self.viewportWidth) {
				self.maxPos = (self.currentTax.width() - self.viewportWidth) * -1;
			} else {
				self.maxPos = 0;
			}
			if(self.currentPos == 0) {
				self.left.hide();
			} else {
				self.left.show();
			}
			if(self.currentTax.width() < self.viewportWidth) {
				self.right.hide();
			} else {
				if(self.currentPos == self.maxPos) {
					self.right.hide();
				} else {
					self.right.show();
				}
			}
		}
	},
	slide: function(direction) {
		var self = this;
		var slideDistance = Math.floor(jQuery(window).width() / 2);
		if(direction == 'left') {
			var newPos = (self.currentPos + slideDistance > 0) ?
				0 :
				self.currentPos + slideDistance;
		} else {
			var newPos = (self.currentPos - slideDistance < self.maxPos) ? 
				self.maxPos : 
				self.currentPos - slideDistance;
		}
		self.currentPos = newPos;
		self.currentTax.css('left', self.currentPos);
		self.reset();
	},
	resize: function() {
		var self = this;
		self.viewportWidth = 
			jQuery(window).width() -
			self.left.width() -
			self.right.width() -
			self.closeButton.width();
		self.currentPos = 0;
		self.reset();
	},
	destroy: function() {
		var self = this;
		self.el.hide();
	}
};
