class ExtensionContentScript extends ContentScript {

	constructor() {
		super();
	}

	async start() {
		await super.start();

		trace("START CONTENT");
		// ready !
		// start here

	}


	onMessage(from, type, data, tabId) {
		let result = super.onMessage(from, type, data, tabId);
		//trace(result)
		// message from background, web or popup
		switch(type) {

			case "test":
				trace("In content.js, test from", _name(from));
				trace(data);
				break;

		}
		return result;
	}




}

new ExtensionContentScript();