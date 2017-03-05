var mode;

function drawGrid(squaresPerSide){
	for(var i=0; i<squaresPerSide; i++){
		$('#sketchpad').append('<div class="row"></div>');
	}
	for(var i=0; i<squaresPerSide; i++){
		$('.row').append('<div class="square"></div>');
	}

	var squareDimension =$('#sketchpad').width()/squaresPerSide;
	$('.square').css({
		'height': squareDimension,
		'width': squareDimension
	});
}

function setMode(newMode){
	mode =newMode;
	$('#' + newMode).addClass('selectedMode').siblings().removeClass('selectedMode');
}

$(document).ready(function(){

	var squaresPerSide = 16;
	drawGrid(squaresPerSide);
	setMode('pen');

	$('#sketchpad').on('mouseenter', '.square', function(){
		var opacity = +$(this).css('opacity');
		switch(mode){
			case 'pen':
			$(this).css({
				'opacity': 1,
				'background-color': 'black'
			});
			break;
			case 'pencil':
			if(opacity + .1<1){
				$(this).css({
					'opacity': opacity + .1
				});
			}
			else{
				$(this).css({
					'opacity': 1
				});
			}
			break;
			case 'rainbow':
				var r= Math.floor(Math.random()*256);
				var g =Math.floor(Math.random() * 256);
				var b =Math.floor(Math.random() * 256);
				$(this).css({
					'opacity': 1,
					'background-color': 'rgb(' + r + ',' + g + ',' + b + ')'
				});
				break;
				case 'eraser':
				if(opacity >0){
					$(this).css({
						'opacity': opacity -.2
					});
				}

				var newOpacity = $(this).css('opacity')
				if(opacity - newOpacity < .015 || newOpacity <0){
					$(this).css({
						'opacity': 0,
						'background-color': 'black'
					});
				}
				break;
		}
	});

	$('#reset').on('click', function(){

		var newSquaresPerSide;
		var invalidInput;
		do{
			newSquaresPerSide = prompt('How many squares per side would you like?', squaresPerSide);
			var isNull= newSquaresPerSide===null;
			var isInteger = $.isNumeric(newSquaresPerSide)&&Number.isInteger(+newSquaresPerSide);
			var isPositive = newSquaresPerSide >0;
			invalidInput = !isNull & !(isInterger && isPositive);
			if(invalidInput){
				aert('Only positive integers');
			}
		}
		while(invalidInput);
		if(newSquaresPerSide !== null){
			squaresPerSide = newSquaresPerSide;
			$('#sketchpad').empty();
			drawGrid(squaresPerSide);
		}
	});

	$('#modes').on('click', 'button', function(){
		setMode($(this).attr('id'));
	});
});