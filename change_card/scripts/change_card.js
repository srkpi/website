// var departments = ["ІПСА" ,"ІТС" ,"ВПІ" ,"ІАТ" ,"ІЕЕ" ,"ІМЗ" ,"ІСЗЗІ" ,"ММІ" ,"ФТІ" ,"ІХФ" ,"ПБФ" ,"РТФ" ,"ТЕФ" ,"ФБМІ" ,"ФБТ" ,"ФЕА" ,"ФЕЛ" ,"ФІОТ" ,"ФЛ" ,"ФММ" ,"ФСП" ,"ФПМ" ,"ФМФ" ,"ХТФ"];
// Змінна для визначення, чи заповнює форму прискоренник.
var associate_degree = false;
// Змінна для збереження стану заповнювача заяви (студентство/аспірантство).
var study_status = null;
// Змінна для збереження стану того, для якого банку формують заяву.
var bank_name = null;
// Змінна для збереження повного ПІБ того, хто заповнює заяву.
var full_name = null;
// Змінна для збереження стану того, який курс заповнює форму.
var course_number = null;
// Змінна для збереження стану того, з якого факультету/інституту заповнюють форму.
var departament_name = null;
// Змінна для збереження назви групи.
var group = null;
// Змінна для збереження статусу чекбокса.
var checkbox_status = false;

function checkBank(){
	document.getElementById('main').hidden=false;
	if (document.getElementById('radio-1').checked) 
	{
		document.getElementById('iban_container').hidden=true;
		document.getElementById('card_number_container').hidden=true;
	}
	else if (document.getElementById('radio-2').checked)
	{
		document.getElementById('card_number_container').hidden=false;
		document.getElementById('iban_container').hidden=false;
	}
	else 
	{
		document.getElementById('iban_container').hidden=false;
		document.getElementById('card_number_container').hidden=true;
	}
	
	
}

function checkPatronymicCheckbox(){
	document.getElementById('patronymic_checkbox').onchange = function(event) {
		const checkboxVal = event.target.checked;
		
		// Якщо patronymic_checkbox натиснуто - поле patronymic деактивовано.
		document.getElementById('patronymic').disabled = checkboxVal;
		checkbox_status = checkboxVal;
	};
	return checkbox_status;
}

function checkSex() {
	if (document.getElementById('male_status').checked) 
	{
	  document.getElementById('aspirant_label').innerHTML = 'аспіранта';
	  document.getElementById('student_label').innerHTML = 'студента';
	  document.getElementById('student_label').style = "display: align: center";
	  document.getElementById('aspirant_label').style = "display: align: center";
	}
	else if (document.getElementById('female_status').checked)
	{
	  document.getElementById('aspirant_status').innerHTML = 'аспірантки';
	  document.getElementById('student_label').innerHTML = 'студентки';
	  document.getElementById('student_label').style = "display: align: center";
	  document.getElementById('aspirant_label').style = "display: align: center";
	  
	}
	
	var sex = $('input[name=gender_status_radio]:checked').val();
}

function checkStudyStatus() {
	if($('#student_status').is(':checked')) {
		$("#student_label").text()
	} else {
		$("#aspirant_label").text()
	}
	//var sex = $('input[name=gender_status_radio]:checked').val();
}

function timeoutCheckSex(){
	setTimeout(checkSex, 0);
}

timeoutCheckSex();

// Конкатенація ПІБ.
function getFullName(){
	var first_name = $('#first_name').val().trim();
	var last_name = $('#last_name').val().trim();
	var patronymic = $('#patronymic').val().trim();
	if(checkbox_status === true){
		full_name_buf = last_name + ' ' + first_name;
	} else {
		full_name_buf = last_name + ' ' + first_name + ' ' + patronymic;
	}
	console.log(full_name_buf);
	return full_name_buf;
}

// Отримання номеру карткового рахунку.
function getCardAccountNumber(iban) {
	var card_account_number = iban.substr(15, 28);
	return card_account_number;
}

function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
	  textbox.addEventListener(event, function() {
		if (inputFilter(this.value)) {
		  this.oldValue = this.value;
		  this.oldSelectionStart = this.selectionStart;
		  this.oldSelectionEnd = this.selectionEnd;
		} else if (this.hasOwnProperty("oldValue")) {
		  this.value = this.oldValue;
		  this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
		} else {
		  this.value = "";
		}
	  });
	});
}

/*
Для ПриватБанку IBAN непотрібний. Його замінює ідентифікаційний код.
*/
if($('#student_status').checked) {
	$("#student_label").text()
	console.log($("#student_label").text())
} else {
	$("#aspirant_label").text()
	console.log($("#aspirant_label").text())
}

// Дозволити введення лише цифр.
setInputFilter(document.getElementById("tax_number"), function(value) {
	return /^\d*$/.test(value); });

// Формування POST запиту в Google Форму. https://github.com/RGZorzo/Googleformpost/blob/master/script.js

function validGroupName() {
	var ukr_letters = ['А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ю','Я'];
	group = $("#group").val().toLowerCase();
	group = group.substring(0, 2).toUpperCase() + group.substring(2);
	console.log(group);
	console.log(isNaN(Number(group.substring(3, 5))));
	if (group.includes('мн') || group.includes('мп')){
		if (group.length == 7 
			&& ukr_letters.includes(group[0]) 
			&& ukr_letters.includes(group[1])
			&& group[2] == '-' 
			&& isNaN(Number(group.substring(3, 5))) != true 
			&& getCourseNumber(group) <= 6) {
			return true;
		} else {
			alert("Error");
			return false;
		}

	} else{
		if (group.includes('п')){
			if (group.length == 6 
				&& ukr_letters.includes(group[0])
				&& ukr_letters.includes(group[1])
				&& group[2] == '-' 
				&& group[3] == 'п'
				&& isNaN(Number(group.substring(4, 6))) != true 
				&& getCourseNumber(group) <= 4) {
				return true;
			} else {
				alert("Error");
				return false;
			}
		} else{
			if (group.length == 5 
				&& ukr_letters.includes(group[0])
				&& ukr_letters.includes(group[1])
				&& group[2] == '-' 
				&& isNaN(Number(group.substring(3, 5))) != true 
				&& getCourseNumber(group) <= 4) {
					return true;		
			} else {
				alert("Error");
				return false;
			}
		}
	}
}

function onDownload() {
	if (validGroupName() == true) {
		var bank = $("input[name='bank_select']:checked").val();
		console.log(bank);
		var study_status =  $("input[name='study_status_radio'] :checked").val();
		console.log(study_status);
		var departament = $("#department").val();
		console.log(departament);
		var phone_number = $("#phone").val();
		console.log(phone_number);
		var tax_number = $("#tax_number").val();
		console.log(tax_number);
		var iban_number = bank == "ПриватБанк" ? tax_number : $("#iban_number").val();
		console.log(iban_number);
		var card_number=$("#card_number").val();
		console.log(card_number);
		bank=="Монобанк"? create_application(full_name, bank, study_status, group, departament, phone_number, tax_number, iban_number) :create_application_mono(full_name, bank, study_status, group, departament, phone_number, tax_number, iban_number, card_number);
		//create_application(full_name, bank, study_status, group, departament, phone_number, tax_number, iban_number);
	}
}

// Копіювання e-mail в буфер обміну.
function copyToClipboard(text) {
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
	return false;
}

function getCourseNumber(group) {
	// https://stackoverflow.com/a/42089547
	function removeCharacterAtIndex(value, index) {
		return value.substring(0, index) + value.substring(index + 1);
	}	// Отримання поточного року та місяця для визначення номеру курсу.
	var last_number_current_year = (new Date().getFullYear()) % 10;
  	var current_month = new Date().getMonth();

  	// Якщо в шифрі групи є «п» (заповнює прискоренник), то видаляємо цю букву.
	if (group[3] == 'п') {
		group = removeCharacterAtIndex(group, 3);
	}
	/* Якщо номер з шифру групи більше, ніж остання цифра поточного року,
	то рік потрібно збільшити на 10 */
  	if (Number(group[3]) > last_number_current_year){
    		last_number_current_year += 10;
  	}
	
	/* Номер курсу - це різниця останньої цифри року та першої цифри шифру групи */
  	var course_number = last_number_current_year - Number(group[3]);
	
	/* Якщо поточний місяць входить в діапазон липень-грудень, то номер
	курсу потрібно збільшити на 1 */
  	if (current_month >= 6){
    		course_number++;
  	}
	/* Якщо шифр групи відповідає магістратурі, то номер курсу перевести
	з бакалаврату на магістратуру (додати 4 до номеру курсу) */
	if (group.includes('мн') || group.includes('мп')) {
		course_number += 4;
	}

	return course_number;
}

function create_application(full_name, bank, study_status, group, departament,phone_number, tax_number, iban_number) { 
	full_name = getFullName();
	let today = new Date(); 
	let year = today.getFullYear();
	let month0 = today.getMonth()+1;
	let month = (month0 < 10 ? "0"+month0 : month0);
	let day0 = today.getDate();
	let day=(day0<10 ? "0"+day0 : day0);
	let date = day+ "." + month + "." + year;
	
	const str = study_status + " групи " + group + " " + departament;
	var HText = str.length;
	var HFName = full_name.length;
	var HText123 = 564 - (HText > HFName ? 8 * HText : 8.5 * HFName);

	console.log(`${HText} ${HFName}  ${HText123}`);
	var docInfo = {
		info: {
			title:'Заява для зміни банківської картки',
			author:'Студентська рада КПІ ім. Ігоря Сікорського',
		},
		
		pageSize:'A5',
		pageOrientation:'landscape',
		pageMargins:[30,20,30,20],
		
		
		content: [
			{
				text: "Головному бухгалтеру",
				fontSize:14,
				//alignment:'left',
				margin: [ HText123, 20, 0, 0 ]
				
			},
			{
				text: "КПІ ім. Ігоря Сікорського",
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
				//pageBreak:'after'
			},
			{
				text: "Людмилі СУББОТІНІЙ",
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
				//pageBreak:'after'
			},
			{
				text: study_status + " групи " + group + " " +departament ,
				fontSize:14,
				margin: [ HText123, 10, 0, 0 ]
				//pageBreak:'after'
			},
			{
				text: full_name,
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
			},
			{
				text: phone_number,
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
			},
			
			{
				text: "ЗАЯВА",
				fontSize:14,
				bold:true,
				alignment:'center',
				margin: [ 0, 50, 0, 0 ]
			},
			
			{
				text: "",
				fontSize:14,
				bold:true,
				alignment:'center',
				margin: [ 0, 20, 0, 0 ]
			},
					
				
		{
				style: 'tableExample',
				table: {
					
					alignment:'right',
					widths: [ 'auto','*'],
					body: [
				[ {border: [ false, false, false,false],text:'Прошу перерархувати доходи до '},{alignment:'center',border: [ false, false, false,true],text: bank}],
						
					]
				}
		},	

		{
				style: 'tableExample',
				table: {
					
					alignment:'right',
					widths: [ 'auto','*'],
					body: [
				[ {border: [ false, false, false,false],text:'на рахунок №'},{alignment:'center',border: [ false, false, false,true],text: iban_number}],
						
					]
				}
		},

		
		
		{
				style: 'tableExample',
				table: {
					
					alignment:'right',
					widths: [ 'auto','*'],
					body: [
				[ {border: [ false, false, false,false],text:'Ідентифікаційний номер (РНОКПП)'},{alignment:'center',border: [ false, false, false,true],text: tax_number}],
						
					]
				}
		},
		
		{
				text: "",
				fontSize:14,
				bold:true,
				alignment:'center',
				margin: [ 0, 30, 0, 0 ]
			},
		
		{
				style: 'tableExample',
				table: {
					
					//alignment:'right',
					widths: [ 'auto','*','auto'],
					body: [
				[{alignment:'center',border: [ false, false, false,false],text:date},{border: [ false, false, false,false],text:''},{alignment:'center',border: [ false, false, false,false],text: '____________________\n(підпис)'}],
									
					]
				}
		},	
		],
		
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10]
			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableExample: {
				margin: [0, 5, 0, 0]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
	}
	
	pdfMake.fonts = {
		Roboto: {
			normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
			bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
			italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
			bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
		},
	}

	pdfMake.createPdf(docInfo,null,fonts).download('Заява на зміну картки.pdf');
}

function create_application_mono(full_name, bank, study_status, group, departament,phone_number, tax_number, iban_number,card_number) { 
	full_name = getFullName();
	let today = new Date(); 
	let year = today.getFullYear();
	let month0 = today.getMonth()+1;
	let month = (month0 < 10 ? "0"+month0 : month0);
	let day0 = today.getDate();
	let day=(day0<10 ? "0"+day0 : day0);
	let date = day+ "." + month + "." + year;
	
	const str = study_status + " групи " + group + " " + departament;
	var HText = str.length;
	var HFName = full_name.length;
	var HText123 = 564 - (HText > HFName ? 8 * HText : 8.5 * HFName);

	console.log(`${HText} ${HFName}  ${HText123}`);
	var docInfo = {
		info: {
			title:'Заява для зміни банківської картки',
			author:'Студентська рада КПІ ім. Ігоря Сікорського',
		},
		
		pageSize:'A5',
		pageOrientation:'landscape',
		pageMargins:[30,20,30,20],
		
		
		content: [
			{
				text: "Головному бухгалтеру",
				fontSize:14,
				//alignment:'left',
				margin: [ HText123, 20, 0, 0 ]
				
			},
			{
				text: "КПІ ім. Ігоря Сікорського",
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
				//pageBreak:'after'
			},
			{
				text: "Людмилі СУББОТІНІЙ",
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
				//pageBreak:'after'
			},
			{
				text: study_status + " групи " + group + " " +departament ,
				fontSize:14,
				margin: [ HText123, 10, 0, 0 ]
				//pageBreak:'after'
			},
			{
				text: full_name,
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
			},
			{
				text: phone_number,
				fontSize:14,
				margin: [ HText123, 0, 0, 0 ]
			},
			
			{
				text: "ЗАЯВА",
				fontSize:14,
				bold:true,
				alignment:'center',
				margin: [ 0, 50, 0, 0 ]
			},
			
			{
				text: "",
				fontSize:14,
				bold:true,
				alignment:'center',
				margin: [ 0, 20, 0, 0 ]
			},
					
				
		{
				style: 'tableExample',
				table: {
					alignment:'right',
					widths: [ 'auto','*'],
					body: [
				[ {border: [ false, false, false,false],text:'Прошу перерархувати доходи до '},{alignment:'center',border: [ false, false, false,true],text: bank}],
						
					]
				}
		},	

		{
				style: 'tableExample',
				table: {
					alignment:'right',
					widths: [ 'auto','*','auto'],
					body: [
				[ {border: [ false, false, false,false],text:'на рахунок №'},{alignment:'center',border: [ false, false, false,true],text: iban_number},{border: [ false, false, false,false],text:';'}],
						
					]
				}
		},

		{
				style: 'tableExample',
				table: {
					alignment:'right',
					widths: [ 'auto','*','auto'],
					body: [
				[ {border: [ false, false, false,false],text:'номер картки'},{alignment:'center',border: [ false, false, false,true],text: iban_number},{border: [ false, false, false,false],text:'.'}],
						
					]
				}
		},
		
		{
				style: 'tableExample',
				table: {
					alignment:'right',
					widths: [ 'auto','*'],
					body: [
				[ {border: [ false, false, false,false],text:'Ідентифікаційний номер (РНОКПП)'},{alignment:'center',border: [ false, false, false,true],text: tax_number}],
						
					]
				}
		},
		
		{
				text: "",
				fontSize:14,
				bold:true,
				alignment:'center',
				margin: [ 0, 30, 0, 0 ]
			},
		
		{
				style: 'tableExample',
				table: {
					
					//alignment:'right',
					widths: [ 'auto','*','auto'],
					body: [
				[{alignment:'center',border: [ false, false, false,false],text:date},{border: [ false, false, false,false],text:''},{alignment:'center',border: [ false, false, false,false],text: '____________________\n(підпис)'}],
									
					]
				}
		},	
		],
		
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10]
			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableExample: {
				margin: [0, 5, 0, 0]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
	}
	
	pdfMake.fonts = {
		Roboto: {
			normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
			bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
			italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
			bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
		},
	}

	pdfMake.createPdf(docInfo,null,fonts).download('Заява на зміну картки.pdf');
}


