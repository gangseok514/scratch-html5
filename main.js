require.config({
	baseUrl: 'js',
	paths : {
		lib : 'lib'
	}
});


require(['lib/jquery', 'util/Platform',
	'util/Timer', 	
	'util/OffsetBuffer', 
	'util/Color', 
	'util/Rectangle', 
	'Sprite', 
	'Reporter', 
	'Stage', 
	'sound/WAVFile', 
	'sound/SoundDecoder', 
	'sound/SoundBank', 
	'sound/NotePlayer', 
	'IO', 
	'primitives/VarListPrims', 
	'primitives/MotionAndPenPrims', 
	'primitives/LooksPrims', 
	'primitives/SensingPrims', 
	'primitives/SoundPrims', 
	'primitives/Primitives', 
	'Interpreter', 
	'Runtime', 
	'Scratch'], function() {
		//console.log(Scratch);
		$(document).ready(function() {
  		});
	});