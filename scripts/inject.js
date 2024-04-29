if ('permissions' in navigator && typeof navigator.permissions.query === 'function') {
	const originalQuery = navigator.permissions.query;
	navigator.permissions.query = function(query) {
		if (query.name === 'camera' || query.name === 'microphone') {
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			return new Promise(function(resolve, reject) {
				navigator.getUserMedia({ audio: true, video: true }, function() {
					resolve({ state: 'granted' });
				}, function() {
					resolve({ state: 'denied' });
				});
			});
		} else {
			return originalQuery.call(navigator.permissions, query);
		}
	};
}

if (!navigator.serviceWorker) {
    navigator.serviceWorker = {
        controller: null,
        getRegistration: function() {
            return new Promise(function(resolve) {
                resolve(null);
            });
        },
        getRegistrations: function() {
            return new Promise(function(resolve) {
                resolve([]);
            });
        },
        register: function() {
            return new Promise(function(resolve) {
                resolve();
            });
        },
        addEventListener: function() {},
        removeEventListener: function() {}
    };
}
