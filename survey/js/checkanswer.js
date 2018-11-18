$(function(){
	$.getJSON("answer.json", function(response){
		um.set("form",response.data);
		var cache = window.localStorage && JSON.parse(localStorage.htmlCache);
		$.each($("form"),function(i,v){
			$(this).append(cache[i]);
		});
	});
	
	$(document).on("touchstart mousedown",".up,.down",function(){
		$(this).addClass("active");
		setTimeout(function(){
			$(this).removeClass("active");
		}.bind(this),500)
	});

	document.body.addEventListener('touchstart', function () {
    });
});