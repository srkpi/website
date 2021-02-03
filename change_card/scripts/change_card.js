// var departments = ["ІПСА" ,"ІТС" ,"ВПІ" ,"ІАТ" ,"ІЕЕ" ,"ІМЗ" ,"ІСЗЗІ" ,"ММІ" ,"ФТІ" ,"ІХФ" ,"ПБФ" ,"РТФ" ,"ТЕФ" ,"ФБМІ" ,"ФБТ" ,"ФЕА" ,"ФЕЛ" ,"ФІОТ" ,"ФЛ" ,"ФММ" ,"ФСП" ,"ФПМ" ,"ФМФ" ,"ХТФ"];
// Змінна для визначення, чи заповнює форму прискоренник.
var associate_degree = false;
// Змінна для збереження стану заповнювача заяви (студентство/аспірантство).
var academic_degree = null;
// Змінна для збереження стану того, для якого банку формують заяву.
var bank_name = null;
// Змінна для збереження повного ПІБ того, хто заповнює заяву.
var full_name = null;
// Змінна для збереження стану того, який курс заповнює форму.
var course_number = null;
// Змінна для збереження стану того, з якого факультету/інституту заповнюють форму.
var departament_name = null;
// Змінна для збереження назви групи.
var cohort = null;
// Змінна для збереження статусу чекбокса.
var checkbox_status = false;

function checkPatronymicCheckbox(){
	document.getElementById('patronymic_checkbox').onchange = function() {
		// Якщо patronymic_checkbox натиснуто - поле patronymic деактивовано.
		document.getElementById('patronymic').disabled = this.checked;
		checkbox_status = true;
	};
	return checkbox_status;
}

function checkSex() {
	var sex = $('input[name=gender_status_radio]:checked').val();
	if(sex === 'Male'){
		document.getElementById('aspirant_label').innerHTML = 'аспіранта';
		document.getElementById('student_label').innerHTML = 'студента';
	} else {
		document.getElementById('aspirant_label').innerHTML = 'аспірантки';
		document.getElementById('student_label').innerHTML = 'студентки';
	}
}

function timeoutCheckSex(){
	setTimeout(checkSex, 0);
}

timeoutCheckSex();

// Конкатенація ПІБ
function getFullName(){
	var firts_name = $('#first_name').val().trim();
	var last_name = $('#last_name').val().trim();
	var patronymic = $('#patronymic').val().trim();
	if(checkbox_status === true){
		full_name_buf = last_name + ' ' + firts_name;
	} else {
		full_name_buf = last_name + ' ' + firts_name + ' ' + patronymic;
	}
	console.log(full_name_buf);
	return full_name_buf;
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

// Фіксація 10 цифр для вводу ідентифікаційного коду
setInputFilter(document.getElementById("tax_number"), function(value) {
	return /^\d*$/.test(value); });

// Формування POST запиту в Google Форму. https://github.com/RGZorzo/Googleformpost/blob/master/script.js

function validGroupName() {
	var ukr_letters = ['А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ь','Ю','Я'];
	cohort = $("#group").val().toLowerCase();
	cohort = cohort.substring(0, 2).toUpperCase() + cohort.substring(2);
	console.log(cohort);
	console.log(isNaN(Number(cohort.substring(3, 5))));
	if (cohort.includes('мн') || cohort.includes('мп')){
		if (cohort.length == 7 
			&& ukr_letters.includes(cohort[0]) 
			&& ukr_letters.includes(cohort[1])
			&& cohort[2] == '-' 
			&& isNaN(Number(cohort.substring(3, 5))) != true 
			&& getCourseNumber(cohort) <= 6) {
			return true;
		} else {
			alert("Error");
			return false;
		}

	} else{
		if (cohort.includes('п')){
			if (cohort.length == 6 
				&& ukr_letters.includes(cohort[0])
				&& ukr_letters.includes(cohort[1])
				&& cohort[2] == '-' 
				&& cohort[3] == 'п'
				&& isNaN(Number(cohort.substring(4, 6))) != true 
				&& getCourseNumber(cohort) <= 4) {
				return true;
			} else {
				alert("Error");
				return false;
			}
		} else{
			if (cohort.length == 5 
				&& ukr_letters.includes(cohort[0])
				&& ukr_letters.includes(cohort[1])
				&& cohort[2] == '-' 
				&& isNaN(Number(cohort.substring(3, 5))) != true 
				&& getCourseNumber(cohort) <= 4) {
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
		var study_status = $("input[name='study_status_radio']").val();
		console.log(study_status);
		var departament = $("#department").val();
		console.log(departament);
		var phone_number = $("#phone").val();
		console.log(phone_number);
		var tax_number = $("#tax_number").val();
		console.log(tax_number);
		var iban_number = bank == "ПриватБанк" ? tax_number : $("#iban_number").val();
		console.log(iban_number);
		create_application(full_name, bank, OKR, cohort, departament, phone_number, tax_number, iban_number);
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

function getCourseNumber(cohort) {
	// https://stackoverflow.com/a/42089547
	function removeCharacterAtIndex(value, index) {
		return value.substring(0, index) + value.substring(index + 1);
	}	// Отримання поточного року та місяця для визначення номеру курсу.
	var last_number_current_year = (new Date().getFullYear()) % 10;
  	var current_month = new Date().getMonth();

  	// Якщо в шифрі групи є «п» (заповнює прискоренник), то видаляємо цю букву.
	if (cohort[3] == 'п') {
		cohort = removeCharacterAtIndex(cohort, 3);
	}
	/* Якщо номер з шифру групи більше, ніж остання цифра поточного року,
	то рік потрібно збільшити на 10 */
  	if (Number(cohort[3]) > last_number_current_year){
    		last_number_current_year += 10;
  	}
	
	/* Номер курсу - це різниця останньої цифри року та першої цифри шифру групи */
  	var course_number = last_number_current_year - Number(cohort[3]);
	
	/* Якщо поточний місяць входить в діапазон липень-грудень, то номер
	курсу потрібно збільшити на 1 */
  	if (current_month >= 6){
    		course_number++;
  	}
	/* Якщо шифр групи відповідає магістратурі, то номер курсу перевести
	з бакалаврату на магістратуру (додати 4 до номеру курсу) */
	if (cohort.includes('мн') || cohort.includes('мп')) {
		course_number += 4;
	}

	return course_number;
}

function create_application(full_name, bank, OKR, cohort, departament,phone_number, tax_number, iban_number) { 
	const str = OKR + " групи " + cohort + " " + departament;
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
				text: OKR+" групи "+cohort+" "+departament ,
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
				[{alignment:'center',border: [ false, false, false,false],text:'____________________\n(дата)'},{border: [ false, false, false,false],text:''},{alignment:'center',border: [ false, false, false,false],text: '____________________\n(підпис)'}],
									
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
    /* Arial: {
    	normal: 'fonts/ArialNarrow.ttf',
    	bold: 'fonts/ArialNarrow-Bold.ttf',
    	italics: 'fonts/ArialNarrow-Italic.ttf',
    	bolditalics: 'fonts/ArialNarrow-BoldItalic.ttf'
    } */

   
    	Roboto: {
    		normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    		bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    		italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    		bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
    	},
	}

	pdfMake.createPdf(docInfo,null,fonts).download('Заява на зміну картки.pdf');
}