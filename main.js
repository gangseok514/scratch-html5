require.config({
	baseUrl: 'js',
	paths : {
		lib : 'lib'
	}
});


require(['lib/jquery', /*'util/Platform',*/
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
	'../soundbank/Instr',
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
		$('body').height($(window).height() - 30); // TODO : handle landscape mode
//		$('#player-container').top
		$(document).ready(function() {
			$('#player-container').show();
    	var project_id = location.hash && parseInt(location.hash.substr(1));
			//if(project_id) {
    		var scratch = new Scratch(project_id);
			//}
  	});

		/*
    $('#load-project').click(function() {
			var project_id = $('#project-id').val();
      var scratch = new Scratch(project_id);
    });

		$(document).on('scratch.sb2loaded', function(e, project_id) {
			new Scratch(project_id);
		});*/
	});
