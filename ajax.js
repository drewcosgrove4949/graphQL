		function refreshServerInfo() {
		
		console.log ("started refresh");
		
			const req = new XMLHttpRequest();
			req.addEventListener('load', function() {
				// TODO: put these values into HTML
				console.log(this.responseText);
			});
			req.open('GET', 'http://localhost:7070', true);
			req.send();
		}
		
		console.log ("started");
		
		refreshServerInfo();