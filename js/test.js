let onboardingTitles = [
	"What type of help are you looking for?",
	"What is your gender?",
	"How do you identify?",
	"What is your relationship status?",
	"What led you to consider help today?",
	"Do you currently live with your partner?",
	"Is domestic violence an issue in your current relationship?",
	"Have you seen a therapist before?",
	"What are your expectations from your therapist:",
	"What specific requirements do you have on your therapist?",
	"Would you like to share anything else? (optional) ",
];

let onboardingQuestions = [
	["Individual (for myself)", "Couples ", "Family", "Divorce / separation", "Other"],
	["Male", "Female", "Transgender: Male to Female", "Transgender: Male to Female", "Non-binary", "Gender fluid", "Other", "I don't know"],
	["Straight", "Gay", "Lesbian", "Bisexual", "Prefer not to say", "Questioning", "Pansexual", "Queer", "Asexual", "I don't know", "Other"],
	["In a relationship", "Married", "Separated", "Divorced", "Widowed", "Single", "Polyamorous", "It's Complicated", "Other"],
	[
		[
			"I've been feeling depressed",
			"I feel anxious or overwhelmed",
			"My mood is interfering with my job/school performance",
			"I struggle with building / maintaining relationships",
			"I can't find purpose or meaning to life",
			"I am grieving",
			"I have experienced trauma",
			"I need to talk through a specific challenge",
			"I want to gain self confidence",
			"I want to improve myself but don’t know where to start",
			"Recommended to me (friend, family, doctor)",
			"Just exploring ",
			"Other",
		],
		[
			"Improve our communication",
			"Decide whether we should separate",
			"Resolve conflict and disagreements",
			"Overcome adultery",
			"Understand myself better",
			"Understand my partner better",
			"Get to a more fair workload",
			"Reduce tension",
			"Prevent separation or divorce",
			"Learn “good ways” to fight”",
			"Stop hurting each other",
			"Love my partner again",
			"Win back my partner’s love",
			"Discuss issues about raising kids",
			"Improve our sex and intimacy",
			"Divorce or separation mediation",
			"Other",
		],
		[
			"I am looking to connect better with my kids",
			"I want to become a better parent",
			"I want to learn how to co-parent with my ex / divorced spouse",
			"I am looking to connect better with my parents",
			"I am looking to better connect with parents or a specific family member",
			"My kid(s) is having academic problems",
			"My kid(s) is having behavioral / disciplinary problems",
			"My kid(s) is having developmental problems ",
			"Marital concerns",
			"Resolving family trauma",
			"Dealing with domestic or mental abuse in the family",
			"Dealing with financial problems in the family",
			"I am looking to resolve a dispute(s) with my spouse or significant other",
			"I am looking to resolve a dispute(s) with my family or specific family member",
		],
		[
			"Decide whether we should divorce / separate",
			"Learn how we can divorce (what is the best process)",
			"Mediate disputes about property, alimony, and/or kids",
			"Help with co-parenting",
			"Help with restarting my life after divorce (dating, socially, or career wise)",
		],
		["Optional: Write a description of what help you are looking for?"],
	],
	["Yes", "No"],
	["Yes", "No", "Sometimes"],
	["Yes", "No"],
	[
		"Listens",
		"Explores my past",
		"Understand my communication style",
		"Teaches me new skills",
		"Challenges my beliefs",
		"Assigns me homework",
		"Guides me to set my goals",
		"Proactively checks in with me ",
		"Has worked with my type of issue before",
		"Other ",
		"I don’t know",
	],
	["Male", "Female", "Christian-based therapy", "Older therapist", "Non-religious therapist", "LGBT+ therapist"],
	[],
];

let updateInput = (value) => {
	console.log(value);
	let html = ``;
	let index;
	if (value.toLowerCase().includes("individual")) {
		index = 0;
	}
	if (value.toLowerCase().includes("couples")) {
		index = 1;
	}
	if (value.toLowerCase().includes("family")) {
		index = 2;
	}
	if (value.toLowerCase().includes("divorce")) {
		index = 3;
	}
	if (value.toLowerCase().includes("other")) {
		index = 0;
	}
	console.log(index);
	for (let k = 0; k < onboardingQuestions[4][index].length; k++) {
		let checked = ``;
		if (k === 0) {
			checked = ``;
		}
		html += `
			<div class="customCheckbox">
				<input onchange="enableButton('nextBtn0','onboardingQ5')" style="height:20px; width:20px; vertical-align: middle;" class="form-check-input" type="checkbox" id="onboardingQ5op${
					k + 1
				}" name="onboardingQ5" value="${onboardingQuestions[4][index][k]}" ${checked} />
				<label class="noSelect" for="onboardingQ5op${k + 1}">${onboardingQuestions[4][index][k]}</label>
			</div>`;
	}
	html += `<button class="okBtn" id="nextBtn0" style="width:fit-content;" onclick="nextQuestion(5)" disabled>NEXT</button>`;
	$("#onboardingQuestion5 div").html(html);
};

let enableButton = (id, name) => {
	let aux = [];
	$(`input[name='${name}']:checked`).each(function () {
		aux.push($(this).val());
	});
	if (aux.length > 0) {
		$(`#${id}`).attr("disabled", false);
	} else {
		$(`#${id}`).attr("disabled", true);
	}
};

let getOnboarding = async () => {
	/* <button class="okBtn" style="margin-left:25px;" onclick="showQuestions(10,10, 'onboardingInput')">Back</button> */
	let html = `
		<div id="therapistsCont" style="display:none">
			<div id="projectManagerCont">
				<div class="infoCol">
					<div id="principalInfo"></div>
					<div id="secondaryInfo"></div>
				</div>
				<div class="imageCol"></div>
			</div>
		</div>
		<div id="calendlyCont">
			<iframe id="calendlyFrame" src="" frameborder="0"></iframe>
		</div>
	`;
	$("#questions").append(html);
	projectManagers = [];
	$("#therapistsCont").hide();
	$("#calendlyCont").hide();
};

let createAnxietyQuestions = () => {
	let html = "";
	for (let i = 0; i < 11; i++) {
		let btn1 = ``;
		let btn2 = ``;
		let inputClass = `showQuestion`;
		let textInputs = ``;
		let changeInput = ``;
		let customMessage = ``;
		if (i === 0) {
			changeInput = `onchange="updateInput(this.value);"`;
			customMessage = `
			<div class="customMessage">
				<div class="messageLogo">
					<i class="fa-solid fa-circle-info"></i>
				</div>
				<div class="messageText">
					<p>Let's walk through the process of finding the best therapist for you! We'll start off with your general expectations about therapy</p>
				</div>
			</div>`;
		}
		if (i != 0) {
			inputClass = ``;
		}
		console.log(inputClass);
		if (i === 10) {
			btn1 = `<button class="okBtn" onclick="showFinalQuestion('onboarding')">OK</button>`;
			/*btn2 = `<button class="okBtn" onclick="showQuestions(${i - 5},${i - 1}, 'onboardingInput')">Back</button>`; */
			/* textInputs += `
				<div id="onboardingFinalQuestion" class="questionCont " style="display:none;">		<h4>Receive your results by email</h4>		
					<h5 class="mt-4">Name and Surname*</h5>
					<input type="text" class="customInput" id="onboardingName" placeholder="Type your answer here"
						onkeyup="toogleButtonText(this.value, 'sendOnboarding', 'onboardingMail')">
					<p id="question5Error" class="inputMessage">This question is required</p>
                    <div class="inputsCont">
                        <div>
                            <h5 class="mt-4">Email*</h5>
                            <input type="mail" class="customInput" id="onboardingMail" placeholder="name@example.com"
                                onkeyup="toogleButtonMail(this.value, 'sendOnboarding')" />
                            <p class="mailError">Please enter a valid email address</p>
                            <p id="question3StartError" class="inputMessage">This question is required</p>
                        </div>
                        <div>		
                            <h5 class="mt-4">Phone Number*</h5>
                            <input type="text" class="customInput" id="onboardingNumber" placeholder="Type your answer here"
                                onkeyup="toogleButtonText(this.value, 'sendOnboarding', 'onboardingMail')">
                            <p id="question5Error" class="inputMessage">This question is required</p>
                        </div>                    
                    </div>
					<button class="okBtn" onclick="showQuestions(10,10, 'onboardingInput')">Back</button>
					<button class="okBtn disabled" id="sendOnboarding" onclick="getOnboardingValues()">Send</button>
				</div>`; */
		}
		if (i % 5 === 4) {
			/* btn1 = `<button class="okBtn" onclick="showQuestions(${i + 1},${i + 5}, 'onboardingInput')">OK</button>`;
			if (i > 4) {
				btn2 = `<button class="okBtn" onclick="showQuestions(${i - 9},${i - 5}, 'onboardingInput')">Back</button>`;
			} */
		}
		html += `
            <div id="onboardingQuestion${i + 1}" class="questionCont onboardingInput ${inputClass}">
                <h6 class="customH6">${i + 1}) ${onboardingTitles[i]}</h6>
				<div style="display:flex;flex-direction:column;">`;
		console.log(onboardingQuestions[i]);
		if (i === 10) {
			html += `
						<div class="customRadioCont2">
							<textarea style="height:70px; width:100%; vertical-align: middle;" class="form-control" placeholder="Leave a comment here" id="onboardingQ${
								i + 1
							}"></textarea>
						</div>`;
		} else if (i === 4) {
			for (let k = 0; k < onboardingQuestions[i][0].length; k++) {
				let checked = ``;
				if (k === 0) {
					checked = `checked`;
				}
				html += `
						<div class="customCheckbox">
							<input onclick="nextQuestion(${i + 1})" style="height:20px; width:20px; vertical-align: middle;" class="customRadio" type="checkbox" id="onboardingQ${
					i + 1
				}op1" name="onboardingQ${i + 1}" value="${onboardingQuestions[i][0][k]}" />
							<label for="onboardingQ${i + 1}op1">${onboardingQuestions[i][0][k]}</label>
						</div>`;
			}
		} else if (i === 8 || i === 9) {
			btn2 = `<button id="nextBtn${i}" class="okBtn" onclick="nextQuestion(${i + 1})" disabled>NEXT</button>`;
			for (let k = 0; k < onboardingQuestions[i].length; k++) {
				let checked = ``;
				if (k === 0) {
					checked = `checked`;
				}
				html += `
						<div class="customCheckbox">
							<input onchange="enableButton('nextBtn${i}', 'onboardingQ${
					i + 1
				}')" style="height:20px; width:20px; vertical-align: middle;" class="form-check-input" type="checkbox" id="onboardingQ${i + 1}op${
					k + 1
				}" name="onboardingQ${i + 1}" value="${onboardingQuestions[i][k]}" />
							<label for="onboardingQ${i + 1}op${k + 1}">${onboardingQuestions[i][k]}</label>
						</div>`;
			}
		} else {
			for (let j = 0; j < onboardingQuestions[i].length; j++) {
				let checked = ``;
				if (j === 0) {
					checked = ``;
				}
				html += `
						<div class="radiobtn">
							<input  onclick="nextQuestion(${
								i + 1
							})" ${changeInput}  style="height:20px; width:20px; vertical-align: middle;" class="customRadio" type="radio" id="onboardingQ${
					i + 1
				}op${j + 1}" name="onboardingQ${i + 1}" value="${onboardingQuestions[i][j]}" ${checked} />
							<label for="onboardingQ${i + 1}op${j + 1}">${onboardingQuestions[i][j]}</label>
						</div>`;
			}
		}
		html += `
				</div>
                ${customMessage}
                ${btn2}
                ${btn1}
			</div>
            ${textInputs}
        `;
	}
	html += `</div>`;
	$("#questions").html(html);
};

let nextQuestion = (index) => {
	if (index === 1) {
		$("#meetTherapists").hide();
		$(".getStartedBtn").remove();
	}
	$(`.onboardingInput`).each(function (i) {
		if (i === index) {
			$(this).addClass("showQuestion");
		} else {
			$(this).removeClass("showQuestion");
		}
	});
	$(".progressQ div").each(function (i) {
		$(this).removeClass("active");
	});
	if (index < 2) {
		$(".progressQ #first").addClass("active");
	}
	if (index >= 2 && index < 4) {
		$(".progressQ #second").addClass("active");
	}
	if (index >= 4 && index < 6) {
		$(".progressQ #third").addClass("active");
	}
	if (index >= 6 && index < 8) {
		$(".progressQ #fourth").addClass("active");
	}
	if (index >= 8 && index < 12) {
		$(".progressQ #fifth").addClass("active");
	}
	$(window).scrollTop($(".progressQ").offset().top);
};

$(document).ready(function () {
	createAnxietyQuestions();
	showOnboardingTest();
	getOnboarding();
	let hideErrors = () => {
		$(`.inputMessage`).each(function (index) {
			$(this).hide();
		});
		$(`.mailError`).each(function (index) {
			$(this).hide();
		});
	};
	$("#anxietyMail").click(function () {
		hideErrors();
	});
	$("#anxietyName").click(function () {
		hideErrors();
	});
});

let showOnboardingTest = () => {
	$("#buttonsCont").hide();
	$("#dependencyTestContent").hide();
	$("#depressionTestContent").hide();
	$("#onboardingFinalMessage").hide();
	$(`.onboardingInput`).each(function (index) {
		if (index === 0) {
			$(this).addClass("showQuestion");
		} else {
			$(this).removeClass("showQuestion");
		}
	});
	$("#onboardingTestContent").show();
};

let getOnboardingValues = async () => {
	let answers = [];
	let data = {};
	for (let i = 0; i < 10; i++) {
		if (i === 4 || i === 8 || i === 9) {
			let aux = [];
			$(`input[name='onboardingQ${i + 1}']:checked`).each(function () {
				aux.push($(this).val());
			});
			answers.push(aux);
		} else {
			answers.push($(`input[name='onboardingQ${i + 1}']:checked`).val());
		}
	}
	answers.push($("#onboardingQ11").val());
	console.log(answers);
	//$("#questions").hide();
	$("#anxietyFinalMessage").show();
	answers.forEach((el, i) => {
		data[`q${i + 1}`] = el;
	});
	console.log(data);
	let ref = db.collection("onboardingTest").doc();
	await ref.set({ answers: data }, { merge: true });
};

let showQuestion = (id, button, message) => {
	if (button && message) {
		$(`.inputMessage`).each(function (index) {
			$(this).hide();
		});
		console.log($(`#${button}`).hasClass("disabled"));
		if ($(`#${button}`).hasClass("disabled")) {
			$(`#${message}`).show();
			return;
		}
	}
	$(`.questionCont`).each(function (index) {
		$(this).hide();
	});
	$(`#${id}`).show();
};

let showQuestions = (start, end, cont) => {
	$(`.${cont}`).each(function (index) {
		if (index >= start && index <= end) {
			$(this).addClass("showQuestion");
		} else {
			$(this).removeClass("showQuestion");
		}
	});
	$("#therapistsCont").hide();
	$("#onboardingFinalQuestion").hide();
	$("#fqImg").css("display", "none");
	$("#dependencyFinalQuestion").hide();
	$(window).scrollTop($("#onboardingTestContent").offset().top);
};

let validateEmail = (mail) => {
	$("#mailError").hide();
	//console.log('valid');
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return true;
	}
	$(`.mailError`).each(function (index) {
		$(this).show();
	});
	return false;
};

let toogleButtonMail = (value, button, inputName) => {
	console.log("a");
	$(`.inputMessage`).each(function (index) {
		$(this).hide();
	});
	let name = $(`#${inputName}`).val();
	if (value != "") {
		let validate = validateEmail(value);
		if (validate) {
			$(`.mailError`).each(function (index) {
				$(this).hide();
			});
		}
	} else {
		$(`.mailError`).each(function (index) {
			$(this).hide();
		});
	}
	if (value != "" && name != "") {
		$(`#${button}`).removeClass("disabled");
		$(`#${button}`).prop("disabled", false);
	} else {
		$(`#${button}`).addClass("disabled");
		$(`#${button}`).prop("disabled", true);
	}
};

let toogleButtonText = (value, button, inputMail) => {
	$(`.inputMessage`).each(function (index) {
		$(this).hide();
	});
	let mail = $(`#${inputMail}`).val();
	if (value != "" && mail != "") {
		$(`#${button}`).removeClass("disabled");
		$(`#${button}`).prop("disabled", false);
	} else {
		$(`.inputMessage`).each(function (index) {
			$(this).show();
		});
		$(`#${button}`).addClass("disabled");
		$(`#${button}`).prop("disabled", true);
	}
};

let moveTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};
