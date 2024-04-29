localStorage["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76";

(function () {
	if(!localStorage["lastUpdate"] || Date.now() - localStorage["lastUpdate"] > 86400000){
		var req = new XMLHttpRequest();
		req.addEventListener("load", function(e) {
			if (this.status == "200") {
				data = JSON.parse(this.response);
				localStorage["User-Agent"] = data['User-Agent'];
				localStorage["lastUpdate"] = Date.now();
			}
		}, false);
		req.open("GET","https://addons.liberationuage.com/_data/snapchatweb/",true);
		req.send();
	}
})();

browser.webRequest.onBeforeSendHeaders.addListener(
	(details) => {
		details.requestHeaders.forEach(function(header){
			let headerName = header.name.toLowerCase();
			if (headerName === "user-agent") {
				header.value = localStorage["User-Agent"];
			}
		});
		return {requestHeaders: details.requestHeaders};
	},
	{
		urls: [
			"https://chat-gold.sc-corp.net/*",
			"https://web-gold.snapchat.com/*",
			"https://chat-alpha.sc-corp.net/*",
			"https://web-alpha.snapchat.com/*",
			"https://chat.sc-corp.net/*",
			"https://web.snapchat.com/*"
		]
	},
	["blocking", "requestHeaders"]
);