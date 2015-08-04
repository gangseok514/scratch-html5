define(['lib/jquery', 'lib/jszip'], function(_, JSZip) {
	var detectOS = function(os) {
		return (navigator.appVersion.indexOf(os) !== -1);
	}

	var useCordova = detectOS('Android'),
		project_base = './project/',
		zipObj;

	var projects = {};

	function unZip(file, buffer) {
		zipObj = JSZip().load(buffer, {checkCRC32: true});
		var project_id = file.name.substring(0, file.name.lastIndexOf('.'));
		projects[project_id] = zipObj;
		console.log(file.name + " is loaded(length:"+file.size+")");
		$(document).trigger('scratch.sb2loaded', [project_id]);
	}

	if(!useCordova) {
		//$('#file').show();
		$('img#openfileimage').show();
		$('#file').change(function(e) {
			var file = e.target.files[0],
					reader = new FileReader();
			reader.onload = function(e) {
				var buffer = e.target.result;
				unZip(file, buffer);
			};
			reader.readAsBinaryString(file);
		});
	} else {
		// TODO : Cordova
		unZip(file, buffer);
	}

	return {
		getJSON: function(project_id, callback) {
				if(!projects[project_id])
					throw new Error(project_id + " is not valid");

				var json = JSON.parse(projects[project_id].file('project.json').asText());
				callback(json);
		}
	};
});
