var departments = ["ІПСА" ,"ІТС" ,"ВПІ" ,"ІАТ" ,"ІЕЕ" ,"ІМЗ" ,"ІСЗЗІ" ,"ММІ" ,"ФТІ" ,"ІХФ" ,"ПБФ" ,"РТФ" ,"ТЕФ" ,"ФБМІ" ,"ФБТ" ,"ФЕА" ,"ФЕЛ" ,"ФІОТ" ,"ФЛ" ,"ФММ" ,"ФСП" ,"ФПМ" ,"ФМФ" ,"ХТФ"];
// Змінна для визначення, чи заповнює форму прискоренник.
var associate_degree = false;
// Змінна для збереження стану заповнювача заяви (студентство/аспірантство).
var academic_degree = null;
// Змінна для збереження стану того, для якого банку формують заяву.
var bank_name = null;
// Змінна для збереження стану того, який курс заповнює форму.
var course_number = null;
// Змінна для збереження стану того, з якого факультету/інституту заповнюють форму.
var departament_name = null;

function ValidPhone() {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var myPhone = document.getElementById('phone_number').value;
    var valid = re.test(myPhone);
    if (valid) output = 'Номер телефона введен правильно!';
    else output = 'Номер телефона введен неправильно!';
	alert(output);
    document.getElementById('message').innerHTML = document.getElementById('message').innerHTML+'<br />'+output;
    return valid;
}  

function onDownload() {
    var full_name = $('#full_name').val();
	
    var bank = $("input[name='chkBank']:checked").val();
    var OKR = $("input[name='chkOKR']:checked").val();
    var cohort = $("#group").val();
	var departament=$("#department").val();
    var phone_number = $("#phone_number").val();
    var tax_number = $("#tax_number").val();
    var iban_number = $("#iban_number").val();
		if (bank=="ПриватБанк")
		{
			iban_number=tax_number;
		}
    // $.post('change_card.php', {
        // full_name:full_name, 
        // bank: bank,
        // OKR: OKR,
        // cohort: cohort,
        // phone_number: phone_number,
        // tax_number: tax_number,
        // iban_number,
        // }, 

	 //ValidPhone();
	create_application(full_name, bank, OKR, cohort,departament, phone_number, tax_number, iban_number);
}

// Copy email to clipboard.
function copyToClipboard(text) {
	var dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = text;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
	return false;
}

// Створення JSON для подальшої аналітики.
function createJSON(gender, OKR, cohort, department) {
	// Формування JSON під студентство.
	var obj = '{'
		'"gender" : "Raj",'
		'"OKR" : "",'
		+
	   +'}';
	// Формування JSON під аспірантства.
}



function getCourseNumber(cohort) {
	// https://stackoverflow.com/a/42089547
	function removeCharacterAtIndex(value, index) {
		return value.substring(0, index) + value.substring(index + 1);
	}

	// Отримання поточного року для визначення номеру курсу.
	var current_year = new Date().getFullYear();

	// Якщо в групі є «п» (заповнює прискоренник), то цю букву потрібно видалити.
	if (cohort.chartAt(3) == "п") {
		var filtered_group_name = removeCharacterAtIndex(input, 3);
	}
	else {

	}

	/* Якщо  */
	if (cohort.includes('мн') || cohort.includes('мп')) {
		/* 1 курс магістратури.
		Якщо перша цифра в номері групи така ж, як і остання цифра в номері року, 
		то функція повертає 5 курс */
		if (cohort.charAt(3) == current_year.charAt(3)) {
			course_number = 5;
			return course_number;
		}

		/* 2 курс магістратури.
		 */
		/*
		if (() = 2) {
			// аргументи повинні рахуватись по модулю
			course_number = 6;
			return course_number;
		}*/
	}

	return course_number;
}

function create_application(full_name, bank, OKR, cohort, departament,phone_number, tax_number, iban_number) { 
	const str=OKR+" групи "+cohort+" "+departament;
	var HText=str.length;
	var HFName=full_name.length;
	if (HText>HFName)
	{
		var HText123=564-8*HText;
	}
	else 
	{
		var HText123=564-8.5*HFName;
	}

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
