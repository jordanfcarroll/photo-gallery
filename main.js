
var images = ["cat1.jpg", "cat2.jpg","cat3.jpg"];



function View (tagName, obj) {
	this.element = document.createElement(tagName);
	this.data = obj || null;
}

View.prototype.render = function () {};
View.prototype.bindEvents = function () {};
View.prototype.destroy = function () {
	$(this).remove();
};






function PhotoGallery () {
	View.apply(this, arguments);
}

PhotoGallery.prototype = Object.create(View.prototype);
PhotoGallery.prototype.render = function() {
	$(this.element).html("");
	var _this = this;
	this.element.id = "photo-gallery";
	$(this.element).addClass("cf");
	$("body").append(this.element);

	var bigImage = document.createElement("img");
	$(bigImage).addClass("big-image");
	$(bigImage).attr("src", this.data[0]);
	$(bigImage).addClass("cf");

	$(this.element).append(bigImage);

	var galleryWrapper = document.createElement("div");
	$(galleryWrapper).addClass("wrapper");
	$(galleryWrapper).addClass("cf");
	$(this.element).append(galleryWrapper);

	if (!$(bigImage).hasClass("fullscreen")) {
		this.data.forEach(function (value) {
			var thumbnailView = new Thumbnail("img", value);


			thumbnailView.render();

			$(galleryWrapper).append(thumbnailView.element);
		})
	}
	this.bindEvents();
}

PhotoGallery.prototype.bindEvents = function () {
	var _this = this;
	$(".big-image").on("click", function () {
		$(".big-image").toggleClass("fullscreen");
	})
	// _this.render();
}



function Thumbnail () {
	View.apply(this, arguments);
}

Thumbnail.prototype = Object.create(View.prototype);
Thumbnail.prototype.render = function () {
	$(this).empty();
	$(this.element).attr("src", this.data);
	$(this.element).addClass("thumbnail");
	this.bindEvents();
}
Thumbnail.prototype.bindEvents = function () {
	var _this = this;
	$(this.element).on("click", function () {
		$('.big-image').attr('src', _this.data);
		$(this).toggleClass("selected-thumbnail");
		$(this).siblings().removeClass("selected-thumbnail");
	});
}

	




var galleryView = new PhotoGallery ("div", images); 
galleryView.render();
