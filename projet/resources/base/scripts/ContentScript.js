class ContentScript {

	constructor() {
		trace("start content script");
		this.tabId = -1;
		this.port = new ContentPort(this.onMessage.bind(this));
	}

	async start() {

	}
	/**
	 * @method getDataOffsetKey : get current tweet input field data-offset-key
	 * @param {*} data : message data
	 */
	getDataOffsetKey(data){
		if(data.target=="data-offset-key"){
			let target = document.evaluate("//div[@class='public-DraftStyleDefault-block public-DraftStyleDefault-ltr']", document.body , null, XPathResult.ANY_TYPE,null);
			if(target){
				console.log("target find")
				target = target.iterateNext();
				if(target){
					console.log(target);
					let dataOffsetKey =target.getAttribute("data-offset-key"); 
					return dataOffsetKey;
				}
			}
		}else{ console.log("target mismatch");}

	}

	fillTweetInputField(key){
		let target = document.evaluate("//div[@class='public-DraftStyleDefault-block public-DraftStyleDefault-ltr']", document.body , null, XPathResult.ANY_TYPE,null);
		target = target.iterateNext();
		let span = document.createElement("span");
		span.setAttribute("data-offset-key", key);
		let spanChild = document.createElement("span");
		spanChild.setAttribute("data-text", "true");

		spanChild.innerText = "hello world";//todo tweet generation
		span.appendChild(spanChild);
		target.appendChild(span);
	}

	/**
	 * @method onMessage : message received
	 * @param {number} from : background web popup
	 * @param {string} type : message type
	 * @param {*} data : message data
	 * @param {number} tabId : emitter id
	 */
	async onMessage(from, type, data, tabId) {
		trace(type, "from", _name(from), "tab", tabId);
		let result = null;
		switch(type) {
			case "start":
				await this.start();
				result = true;

				let key = this.getDataOffsetKey(data);
				if(key){
					console.log(key);
					this.fillTweetInputField(key);
				}
				break;
		}

		return result;
	}

}