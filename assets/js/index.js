let customHoursRate;
let hours = [];
let employees = [];
let salaries = [];
let salariesOp = "";
let benefitsOp = "";
let payrolOp = "";
let hiringOp = "";
let equipmentOp = "";
let trainingOp = "";
let prospectingOp = "";
let hiringOpFreel = "";
let onboardingOp = "";
let trainingOpFreel = "";
let managingTimeOp = "";
let monthlyPayOp = "";
let monthlyPayAgOp = "";
let hourlyRate = [47, 27, 44, 30, 35, 28, 45];
let freelancerRate = [80, 45, 50, 50, 50, 50, 70];
let names = ["Full-stack engineer", "Graphic designer", "UX/UI designer", "Video animator", "Marketer", "Copywriter", "Project manager"];
let total = 0;
let service = document.querySelector('input[name="service"]:checked').value;
const accordion = document.getElementsByClassName("accordion");

var app_fireBase = {};
// console.log = function() {}; //disables all console.log

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

let instance = $("#userPhone").intlTelInput({
	autoHideDialCode: true,
	formatOnDisplay: true,
	separateDialCode: true,
	autoHideDialCode: false,
});

for (let i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener("click", function () {
		let content = document.getElementsByClassName("collapsible")[i];
		this.classList.toggle("active");
		if (content.clientHeight === 0) {
			content.style.height = `${content.scrollHeight}px`;
		} else {
			content.style.height = `0px`;
		}
	});
}

async function saveMail() {
	let mail = document.getElementById("userMail").value;
	let name = document.getElementById("userName").value;
	let phone = document.getElementById("userPhone").value;
	let country = $("#userPhone").intlTelInput("getSelectedCountryData");
	let validate = validateEmail(mail);
	console.log(validate);
	if (validate) {
		$("#mailCont").fadeOut(2000);
		/* let saveMail = firebase.functions().httpsCallable("saveMail");
		data = await saveMail({ mail: mail }); */
		let config = {
			method: "POST",
			headers: {
				Authorization: "ukb952oqvjvnbfjjt4i52qp9vg",
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				score: 10,
				properties: [
					{
						name: "name",
						value: name,
						field_type: "TEXT",
						is_searchable: false,
						type: "SYSTEM",
					},
					{
						name: "email",
						value: mail,
						field_type: "TEXT",
						is_searchable: false,
						type: "SYSTEM",
					},
					{
						name: "phone",
						value: `+${country.dialCode} ${phone}`,
						field_type: "TEXT",
						is_searchable: false,
						type: "SYSTEM",
					},
				],
				tags: [{ tag: "TEST" }],
			}),
		};
		let createContact = await fetch(`https://app.engagebay.com/dev/api/panel/subscribers/subscriber`, config);
		createContact = await createContact.json();
		console.log(createContact);
	}
}

function validateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return true;
	}
	alert("You have entered an invalid email address!");
	return false;
}

function getData() {
	salariesOp = "";
	customHoursRate = parseFloat(document.getElementById("customHoursRate").value);
	console.log(customHoursRate);
	customHoursRate = customHoursRate > 0 && customHoursRate != 100 && customHoursRate != NaN ? customHoursRate : 100;
	hours = [];
	employees = [];
	salaries = [];
	for (let i = 0; i <= 6; i++) {
		hours.push(parseFloat(document.getElementById(`hours${i}`).value));
		employees.push(parseInt(document.getElementById(`employees${i}`).value));
		if (employees > 100) {
			alert("The maximum number of employees is 100");
			document.getElementById(`employees${i}`).value = 100;
		}
	}
	console.log(hours);
	for (let i = 0; i < hours.length; i++) {
		hours[i] = hours[i] > 0 && $(`#checkbox${i}`).prop("checked") ? hours[i] : 0;
		employees[i] = employees[i] > 0 && $(`#checkbox${i}`).prop("checked") ? employees[i] : 0;
	}
	console.log(hours);
	console.log(employees);
	for (let i = 0; i < hourlyRate.length; i++) {
		let name = employees[i] > 1 ? `${names[i]}/s` : names[i];
		document.getElementById(`name${i}`).innerText = name;
		salaries.push(employees[i] * 12 * 175 * hourlyRate[i]);
		salariesOp += `<div class="customRow"><div><p>${numberWithCommas(employees[i])} x ${name}</p></div><div><p><span class="opNumber">$${numberWithCommas(
			(employees[i] * 12 * 175 * hourlyRate[i]).toFixed(2)
		)}</span></p></div></div>`;
	}
	console.log(salaries);
	console.log(employees);
}

function totalHours() {
	let totalHours = 0;
	hours.forEach((el) => {
		totalHours += el;
	});
	document.getElementById("totalHours").innerText = `${totalHours.toFixed(2)}H`;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function operations() {
	//benefitsOp = "";
	//payrolOp = "";
	//hiringOp = "";
	equipmentOp = "";
	trainingOp = "";
	prospectingOp = "";
	hiringOpFreel = "";
	onboardingOp = "";
	trainingOpFreel = "";
	managingTimeOp = "";
	monthlyPayOp = "";
	monthlyPayAgOp = "";
	service = document.querySelector('input[name="service"]:checked').value;
	getData();
	totalHours();
	console.log(service);
	total = 0;
	if (service === "inHouse") {
		let equipment = 0;
		let training = 0;
		let salary = 0;
		console.log(employees);
		for (let i = 0; i < employees.length; i++) {
			equipment += employees[i] * 2800;
			training += employees[i] * 1500;
			salary += salaries[i];
			equipmentOp += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(employees[i] * 2800).toFixed(2)
			)}</span></div></div>`;
			trainingOp += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(employees[i] * 1500).toFixed(2)
			)}</span></div></div>`;
		}
		equipmentOp += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(equipment.toFixed(2))}</span></div></div>`;
		trainingOp += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(training.toFixed(2))}</span></div></div>`;
		salariesOp += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(salary.toFixed(2))}</span></div></div>`;
		/* benefitsOp += `<p>${numberWithCommas(salary.toFixed(2))} - (${numberWithCommas(salary.toFixed(2))} x 30%) = <span>$${numberWithCommas(
			(salary * 0.3).toFixed(2)
		)}</span></p>`;
		payrolOp = `<p>${numberWithCommas(salary.toFixed(2))} - (${numberWithCommas(salary.toFixed(2))} x 8.24%) = <span>$${numberWithCommas(
			(salary * 0.0824).toFixed(2)
		)}</span></p>`;
		hiringOp = `<p>${numberWithCommas(salary.toFixed(2))} - (${numberWithCommas(salary.toFixed(2))} x 10%) = <span>$${numberWithCommas(
			(salary * 0.1).toFixed(2)
		)}</span></p>`;*/
		total += equipment + training + salary + salary * 0.3 + salary * 0.0824 + salary * 0.1;
		document.getElementById("salariesInHouse").innerText = `$${numberWithCommas(salary.toFixed(2))}`;
		document.getElementById("benefitsInHouse").innerText = `$${numberWithCommas((salary * 0.3).toFixed(2))}`;
		document.getElementById("taxesInHouse").innerText = `$${numberWithCommas((salary * 0.0824).toFixed(2))}`;
		document.getElementById("recrutingInHouse").innerText = `$${numberWithCommas((salary * 0.1).toFixed(2))}`;
		document.getElementById("equipment").innerText = `$${numberWithCommas(equipment.toFixed(2))}`;
		document.getElementById("training").innerText = `$${numberWithCommas(training.toFixed(2))}`;
		document.getElementById("totalInHouse").innerText = `$${numberWithCommas(total.toFixed(2))}`;
		document.getElementById("tableBodyCalc0").innerHTML = `${salariesOp}`;
		//document.getElementById("inHouseCalc1").innerHTML = `${benefitsOp}`;
		//document.getElementById("inHouseCalc2").innerHTML = `${payrolOp}`;
		//document.getElementById("inHouseCalc3").innerHTML = `${hiringOp}`;
		document.getElementById("tableBodyCalc4").innerHTML = `${equipmentOp}`;
		document.getElementById("tableBodyCalc5").innerHTML = `${trainingOp}`;
	}
	if (service === "freelancers") {
		let prospecting = 0;
		let hiring = 0;
		let onboarding = 0;
		let trainingF = 0;
		let managing = 0;
		let monthlyPayment = 0;
		for (let i = 0; i < hours.length; i++) {
			console.log(`Custom hourly rate: ${customHoursRate}`);
			prospecting += 5 * employees[i] * customHoursRate;
			hiring += 1 * employees[i] * customHoursRate;
			onboarding += 10 * employees[i] * customHoursRate;
			trainingF += 5 * employees[i] * customHoursRate;
			managing += 3 * 4 * employees[i] * customHoursRate;
			monthlyPayment += hours[i] * employees[i] * freelancerRate[i];
			prospectingOp += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(5 * employees[i] * customHoursRate).toFixed(2)
			)}</span></div></div>`;
			hiringOpFreel += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(1 * employees[i] * customHoursRate).toFixed(2)
			)}</span></div></div>`;
			onboardingOp += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(10 * employees[i] * customHoursRate).toFixed(2)
			)}</span></div></div>`;
			trainingOpFreel += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(5 * employees[i] * customHoursRate).toFixed(2)
			)}</span></div></div>`;
			managingTimeOp += `<div class="customRow"><div>${employees[i]} x ${names[i]}</div><div><span>$${numberWithCommas(
				(3 * 4 * employees[i] * customHoursRate).toFixed(2)
			)}</span></div></div>`;
			monthlyPayOp += `<div class="customRow"><div class="customCol">${hours[i]}h x ${employees[i]} x ${names[i]} x ${
				freelancerRate[i]
			}h</div><div class="customCol2"><span>$${numberWithCommas((hours[i] * employees[i] * freelancerRate[i]).toFixed(2))}</span></div></div>`;
		}
		prospectingOp += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(prospecting.toFixed(2))}</span></div></div>`;
		hiringOpFreel += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(hiring.toFixed(2))}</span></div></div>`;
		onboardingOp += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(onboarding.toFixed(2))}</span></div></div>`;
		trainingOpFreel += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(trainingF.toFixed(2))}</span></div></div>`;
		managingTimeOp += `<div class="customRow totalOp"><div>TOTAL</div> <div><span>$${numberWithCommas(
			managing.toFixed(2)
		)}</span></div></div>`;
		monthlyPayOp += `<div class="customRow totalOp"><div class="customCol">TOTAL</div><div class="customCol2"><span>$${numberWithCommas(
			monthlyPayment.toFixed(2)
		)}</span></div></div>`;
		total += prospecting + hiring + onboarding + trainingF + managing + monthlyPayment;
		console.log(trainingF);
		document.getElementById("prospecting").innerText = `$${numberWithCommas(prospecting.toFixed(2))}`;
		document.getElementById("hiring").innerText = `$${numberWithCommas(hiring.toFixed(2))}`;
		document.getElementById("onboarding").innerText = `$${numberWithCommas(onboarding.toFixed(2))}`;
		document.getElementById("trainingF").innerText = `$${numberWithCommas(trainingF.toFixed(2))}`;
		document.getElementById("managingTime").innerText = `$${numberWithCommas(managing.toFixed(2))}`;
		document.getElementById("monthlyPayment").innerText = `$${numberWithCommas(monthlyPayment.toFixed(2))}`;
		document.getElementById("totalFreelancers").innerText = `$${numberWithCommas(total.toFixed(2))}`;
		document.getElementById("tableBodyCalc6").innerHTML = `${prospectingOp}`;
		document.getElementById("tableBodyCalc7").innerHTML = `${hiringOpFreel}`;
		document.getElementById("tableBodyCalc8").innerHTML = `${onboardingOp}`;
		document.getElementById("tableBodyCalc9").innerHTML = `${trainingOpFreel}`;
		document.getElementById("tableBodyCalc10").innerHTML = `${managingTimeOp}`;
		document.getElementById("tableBodyCalc11").innerHTML = `${monthlyPayOp}`;
		//console.log(trainingOpFreel);
	}
	if (service === "agency") {
		let montlyPaymentAgency = 0;
		for (let i = 0; i < hours.length; i++) {
			montlyPaymentAgency += hours[i] * employees[i] * 150;
			monthlyPayAgOp += `<div class="customRow"><div>${employees[i]} ${names[i]}</div><div><span>$${numberWithCommas(
				(hours[i] * employees[i] * 150).toFixed(2)
			)}</span></div></div>`;
		}
		monthlyPayAgOp += `<div class="customRow totalOp"><div>TOTAL</div><div><span>$${numberWithCommas(
			montlyPaymentAgency.toFixed(2)
		)}</span></div></div>`;
		document.getElementById("montlyPaymentAgency").innerText = `$${numberWithCommas(montlyPaymentAgency.toFixed(2))}`;
		document.getElementById("tableBodyCalc12").innerHTML = `${monthlyPayAgOp}`;
	}
}

function showContent() {
	service = document.querySelector('input[name="service"]:checked').value;
	getData();
	if (service === "inHouse") {
		$("#customHours").hide();
		$(".hours").hide();
		$(".sumHours").hide();
		$("#inHouseCont").show();
		$("#freelancersCont").hide();
		$("#VAsCont").hide();
		$("#agencyCont").hide();
	}
	if (service === "freelancers") {
		$("#customHours").show();
		$(".hours").show();
		$(".sumHours").show();
		$("#inHouseCont").hide();
		$("#freelancersCont").show();
		$("#VAsCont").hide();
		$("#agencyCont").hide();
	}
	if (service === "VAs") {
		$("#customHours").hide();
		$(".hours").show();
		$(".sumHours").show();
		$("#inHouseCont").hide();
		$("#freelancersCont").hide();
		$("#VAsCont").show();
		$("#agencyCont").hide();
	}
	if (service === "agency") {
		$("#customHours").hide();
		$(".hours").show();
		$(".sumHours").show();
		$("#inHouseCont").hide();
		$("#freelancersCont").hide();
		$("#VAsCont").hide();
		$("#agencyCont").show();
	}
	operations();
}

$("input[type=radio][name=service]").change(function () {
	showContent();
});

totalHours();
showContent();
