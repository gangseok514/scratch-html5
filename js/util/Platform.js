define(['lib/jquery', 'lib/jszip'], function(_, JSZip) {
	var detectOS = function(os) {
		return (navigator.appVersion.indexOf(os) !== -1);
	}

	var useCordova = detectOS('Android'),
		project_base = './project/',
		zipObj;

	if(!useCordova) {
		//$('#file').show();
		$('img#openfileimage').show();
		$('#file').change(function(e) {
			var file = e.target.files[0],
				filename = file.name;
				reader = new FileReader();
			reader.onload = function(e) {
				var buffer = e.target.result;
				zipObj = JSZip().load(buffer, {checkCRC32: true});
				console.log(filename + " is loaded(length:"+file.size+")");
			};
			reader.readAsBinaryString(file);
		});
	}

	return {
		zipObj: zipObj,
		loadProject: function(project_id, callback) {
		}
	};
});