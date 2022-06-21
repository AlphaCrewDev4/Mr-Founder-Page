(function () {
	var config = {
		apiKey: "AIzaSyDO9m47u1ZO2lpKcMKX-BnYOw5T1sftRl8",
		authDomain: "dashboard-project-aedff.firebaseapp.com",
		projectId: "dashboard-project-aedff",
		storageBucket: "dashboard-project-aedff.appspot.com",
		messagingSenderId: "961403023345",
		appId: "1:961403023345:web:07f6c93cdd8b078a15de50",
	};
	firebase.initializeApp(config);

	app_fireBase = firebase;
})();
const db = firebase.firestore();

let proofHtmlG = [];

getVerifiedEvents(2);

function getVerifiedEvents(option) {
	//1 for signUps
	//2 for purchaes
	//3 for both

	let tempDoc = "";
	let refDB;
	if (option == 1) {
		tempDoc = "signUps";
	} else if (option == 2) {
		tempDoc = "purchases";
	} else if (option == 3) {
		tempDoc = "both";
	}

	if (tempDoc == "both") {
		for (let i = 0; i <= 1; i++) {
			if (i == 0) {
				tempDoc = "signUps";
			} else if (i == 1) {
				tempDoc = "purchases";
			}
			refDB = db.collection("usersProof").doc(tempDoc);
			readProof(refDB, tempDoc);
		}
	} else {
		refDB = db.collection("usersProof").doc(tempDoc);
		readProof(refDB, tempDoc);
	}
}

function readProof(refDB, eventType) {
	refDB.get().then((doc) => {
		let allProofs = doc.data();
		let eventTComment = "";
		let htmlLink = "";
		let nameClient = "";
		let cityClient = "";
		let regionClient = "";
		let verifyBy = "";
		if (eventType == "signUps") {
			eventTComment = "Recently Signed Up to AlphaCrew Studio";
			verifyBy =
				'<a href="https://cloud.google.com/"  target="_blank"><span style="color:#0095f7"><span class="ml-2 mr-1"><i class="fas fa-check-circle" ></i></span>Authenticated with Google</span> </a>';
		} else if (eventType == "purchases") {
			eventTComment = "Recently Made A Purchase";
			verifyBy =
				'<a href="https://stripe.com/"  target="_blank"><span style="color:#0095f7"><span class="ml-2 mr-1"><i class="fas fa-check-circle" ></i></span>Processed via Stripe</span> </a>';
		}
		let proofCounter = 0;
		let currentTime = firebase.firestore.Timestamp.fromDate(new Date());

		currentTime = moment.unix(firebase.firestore.Timestamp.fromDate(new Date()).seconds).format("MM/DD/YYYY HH:mm:ss");

		Object.keys(allProofs)
			.reverse()
			.forEach((proof) => {
				let html = "";
				proofCounter++;

				if (allProofs[proof].name == null || allProofs[proof].name == "" || allProofs[proof].name == undefined) {
					nameClient = "Someone";
				} else {
					nameClient = allProofs[proof].name;
				}

				cityClient = allProofs[proof].city;
				regionClient = allProofs[proof].region;
				let oldTime = allProofs[proof].time.seconds;
				oldTime = moment.unix(oldTime).format("MM/DD/YYYY HH:mm:ss");
				// console.log(orderDate.type);
				// oldTime = oldTime.toString().split(" ");
				// oldTime = oldTime.splice(1, 4).join(" "); // Nov 05 2019 14:44:08

				let ms = moment(currentTime, "MM/DD/YYYY HH:mm:ss").diff(moment(oldTime, "MM/DD/YYYY HH:mm:ss"));
				let d = moment.duration(ms);
				let tempTime = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");

				tempTime = tempTime.split(":");
				let h = tempTime[0];
				let m = tempTime[1];

				h = parseInt(h);
				m = parseInt(m);

				if (h >= 24) {
					timePassed = h / 24;
					timePassed = Math.floor(timePassed);
					if (timePassed == 1) {
						timePassed = "One Day Ago";
					} else if (timePassed > 1 || timePassed <= 3) {
						timePassed = timePassed + " Days Ago";
					} else {
						timePassed = "A few Days Ago";
					}
				} else if (h < 1) {
					if (m == 1) {
						timePassed = "One Minute Ago";
					} else {
						timePassed = m + " Minutes Ago";
					}
				} else {
					if (h == 1) {
						timePassed = "One Hour Ago";
					} else {
						timePassed = h + " Hours Ago";
					}
				}

				html +=
					'<div class="tt-box-top">' +
					"  <p>" +
					nameClient +
					" from " +
					cityClient +
					", " +
					regionClient +
					" </p>" +
					"<p>" +
					'  <a href="https://mrfound3r.io/login">' +
					eventTComment +
					" </a>" +
					" </p>" +
					"  </div>" +
					'<div class="tt-info">' +
					timePassed +
					"  " +
					verifyBy +
					" </div>";

				proofHtmlG.push(html);
			});

		initProof(eventType);
	});
}

function initProof(eventType) {
	let counter = 1;
	let imgLink = [];

	if (eventType == "signUps") {
		imgLink = [
			"./social/images/custom-ac/icons/1.svg",
			"./social/images/custom-ac/icons/2.svg",
			"./social/images/custom-ac/icons/3.svg",
			"./social/images/custom-ac/icons/4.svg",
			"./social/images/custom-ac/icons/5.svg",
			"./social/images/custom-ac/icons/6.svg",
			"./social/images/custom-ac/icons/7.svg",
			"./social/images/custom-ac/icons/8.svg",
			"./social/images/custom-ac/icons/9.svg",
			"./social/images/custom-ac/icons/10.svg",
		];
	} else {
		//for purchases
		imgLink = [
			"./social/images/custom-ac/icons/11.svg",
			"./social/images/custom-ac/icons/12.svg",
			"./social/images/custom-ac/icons/13.svg",
			"./social/images/custom-ac/icons/14.svg",
			"./social/images/custom-ac/icons/15.svg",
			"./social/images/custom-ac/icons/16.svg",
			"./social/images/custom-ac/icons/17.svg",
			"./social/images/custom-ac/icons/18.svg",
			"./social/images/custom-ac/icons/19.svg",
			"./social/images/custom-ac/icons/20.svg",
		];
	}

	$("#proofContainer").show();
	$("#proofContainer").fadeTo("90", 1);
	initProofHtml(proofHtmlG[0], imgLink[0]);
	setInterval(function () {
		if (counter < proofHtmlG.length * 2) {
			if (counter % 2 == 0) {
				let tempCounter = counter / 2;

				$("#proofContainer").fadeTo("90", 1);
				$("#proofContainer").show();
				initProofHtml(proofHtmlG[tempCounter], imgLink[tempCounter]);
			} else if (counter != 0) {
				$("#proofContainer").fadeTo("90", 0);
				$("#proofContainer").hide();
			}
			counter++;
		} else {
			counter = 0;
		}

		return;
	}, 4000);
}

function initProofHtml(html, imgLink) {
	$("#proofImage").attr("src", imgLink);
	$("#proofImage").attr("data-src", imgLink);
	$("#proofDescr").empty().html(html);
}
