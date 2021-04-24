// Властивості заяв для різних банків
const bank_properties = {
	"АТ КБ «ПРИВАТБАНК»": {
		"iban_number": true,
		"card_number": false,
		"tax_number": true,
		"date_of_birdth": false,
		"phone": false
	},
	"АТ «Універсал Банк» (monobank)": {
		"iban_number": true,
		"card_number": true,
		"tax_number": true,
		"date_of_birdth": true,
		"phone": true
	},
	"ВАТ «Альфа Банк»": {
		"iban_number": true,
		"card_number": false,
		"tax_number": true,
		"date_of_birdth": false,
		"phone": false
	},
	"АТ «Ощадбанк»": {
		"iban_number": true,
		"card_number": false,
		"tax_number": true,
		"date_of_birdth": false,
		"phone": false
	}
};

// Повертає дату у форматі '05 травня 2021'
function GetDate(date) {
	return date.toLocaleString('ukr', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Повертає відступ зліва для імен у заяві
function GetMargin(name_length, place_of_study_length) {
	return 564 - (place_of_study_length > name_length ?
		8 * place_of_study_length : 9 * name_length);
}

class Application {
	constructor() {
		this.err = false;
		// Змінна для визначення, чи заповнює форму прискоренник.
		this.associate_degree = false;
		// Змінна для карткового рахунку.
		this.iban_number = '';
		// Змінна для збереження стану заповнювача заяви (студентство/аспірантство).
		this.study_status = null;
		// Змінна для збереження стану того, для якого банку формують заяву.
		this.bank_name = '';
		// Змінна для збереження повного ПІБ того, хто заповнює заяву.
		this.full_name = '';
		// Змінна для збереження стану того, який курс заповнює форму.
		this.course_number = null;
		// Змінна для збереження стану того, з якого факультету/інституту заповнюють форму.
		this.departament_name = null;
		// Змінна для збереження назви групи.
		this.group = '';
		// Змінна для збереження статусу чекбокса.
		this.checkbox_status = false;
		// Сьогоднішня дата
		this.date = GetDate(new Date());
		// День народження
		this.birth_day = null;
		// Стать : 1 - чоловік, 0 - жінка
		this.sex = 0;
	}

	GetTemplateByBank() {
		return [
			{
				style: 'tableExample',
				table: {

					alignment: 'right',
					widths: ['auto', '*'],
					body: [
						[{ border: [false, false, false, false], text: 'на рахунок №' }, { alignment: 'left', border: [false, false, false, true], text: 'UA' + this.iban_number }],

					]
				}
			},
			{
				style: 'tableExample',
				table: {

					alignment: 'right',
					widths: ['auto', '*'],
					body: [
						[{ border: [false, false, false, false], text: 'номер картки' }, { alignment: 'left', border: [false, false, false, true], text: this.card_number }],

					]
				}
			},
			{
				style: 'tableExample',
				table: {

					alignment: 'right',
					widths: ['auto', '*'],
					body: [
						[{ border: [false, false, false, false], text: 'ідентифікаційний номер (РНОКПП)' }, { alignment: 'left', border: [false, false, false, true], text: this.tax_number }],

					]
				}
			},
			{
				style: 'tableExample',
				table: {

					alignment: 'right',
					widths: ['auto', '*'],
					body: [
						[{ border: [false, false, false, false], text: 'дата народження' }, { alignment: 'left', border: [false, false, false, true], text: GetDate(this.birth_day) }],

					]
				}
			},
			{
				style: 'tableExample',
				table: {

					alignment: 'right',
					widths: ['auto', '*'],
					body: [
						[{ border: [false, false, false, false], text: 'тел. ' }, { alignment: 'left', border: [false, false, false, true], text: this.phone_number }],

					]
				}
			}
		];
	}

	ToPDF() {
		const place_of_study = `${this.study_status} ${this.course_number} курсу, групи ${this.group}, ${this.departament_name}`;
		const left_margin = GetMargin(this.full_name.length, place_of_study.length);
		let bank_template = this.GetTemplateByBank();
		let document = {
			info: {
				title: 'Заява для зміни банківської картки',
				author: 'Студентська рада КПІ ім. Ігоря Сікорського',
			},

			pageSize: 'A4',
			pageOrientation: 'portrait',
			pageMargins: [30, 20, 30, 20],

			content: [
				{
					text: "Головному бухгалтеру",
					fontSize: 14,
					margin: [left_margin, 20, 0, 0]
				},
				{
					text: "КПІ ім. Ігоря Сікорського",
					fontSize: 14,
					margin: [left_margin, 0, 0, 0]
				},
				{
					text: "Людмилі СУББОТІНІЙ",
					fontSize: 14,
					margin: [left_margin, 0, 0, 0]
				},
				{
					text: place_of_study,
					fontSize: 14,
					margin: [left_margin, 10, 0, 0]
				},
				{
					text: this.full_name,
					fontSize: 14,
					margin: [left_margin, 0, 0, 0]
				},
				{
					text: "ЗАЯВА",
					fontSize: 14,
					bold: true,
					alignment: 'center',
					margin: [0, 50, 0, 0]
				},
				{
					text: "",
					fontSize: 14,
					bold: true,
					alignment: 'center',
					margin: [0, 20, 0, 0]
				},
				{
					style: 'tableExample',
					table: {
						alignment: 'right',
						widths: ['auto', '*'],
						body: [
							[{ border: [false, false, false, false], text: 'Прошу перерархувати доходи до ' },
							{ alignment: 'center', border: [false, false, false, true], text: this.bank_name }],
						]
					}
				},
				bank_template,
				{
					style: 'tableExample',
					table: {
						widths: ['auto', '*', 'auto'],
						body: [
							[
								{ alignment: 'center', border: [false, false, false, false], text: this.date },
								{ border: [false, false, false, false], text: '' },
								{ alignment: 'center', border: [false, false, false, false], text: '____________________\n(підпис)' }],
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

		pdfMake.createPdf(document, null, fonts).download('Заява на зміну картки.pdf');
	}
}

class FormController {
	constructor(application) {
		this.application = application;
	}

	async GetGroup() {
		const group = $("#group").val();
		if (!group) alert("Ти забув ввести групу.");
		else {
			const url = `https://api.rozklad.org.ua/v2/groups/${group}`;
			let response = await fetch(url);
			let group_info = await response.json();
			if (group_info.message == 'Ok') return group.toUpperCase();
			else alert("Такої групи немає. Перевір та спробуй ще.");
		}
		return '';
	}

	GetBank() {
		this.application.bank_name = document.getElementById("bank_select").value;
	}

	GetDepartment() {
		this.application.departament_name = $("#department").val();
		if (!this.application.departament_name) {
			this.application.err = true;
			alert("Ти забув обрати факультет/інститут.");
		}
	}

	GetID() {
		const tax_number = $("#tax_number").val();
		if (tax_number.length != 10) {
			this.application.err = true;
			alert("Ідентифікаційний код завжди містить 10 цифр.");
			return;
		}
		this.application.tax_number = tax_number;
		this.application.sex = tax_number[8] % 2; // ПередостаннЯ цифра ІПН кодує стать власника
	}

	GetStatus() {
		this.application.study_status = (this.application.group.slice(-1)) == 'ф' ? 'аспірант' : 'студент';
		this.application.study_status += (this.application.sex == 0) ? 'ки' : 'а';
	}

	GetCourse() {
		let group_code = this.application.group.replace(/[^+\d]/g, ''); // Видалити усі НЕ цифри з коду групи
		let last_number_current_year = (new Date().getFullYear()) % 10;
		let current_month = new Date().getMonth();
		if (Number(group_code[0]) > last_number_current_year)
			last_number_current_year += 10;
		/* Номер курсу - це різниця останньої цифри року та першої цифри шифру групи */
		let course_number = last_number_current_year - Number(group_code[0]);
		/* Якщо поточний місяць входить в діапазон липень-грудень, то номер
		курсу потрібно збільшити на 1 */
		if (current_month >= 6)
			course_number++;
		/* Якщо шифр групи відповідає магістратурі, то номер курсу перевести
		з бакалаврату на магістратуру (додати 4 до номеру курсу) */
		if (this.application.group.includes('мн') || this.application.group.includes('мп'))
			course_number += 4;
		this.application.course_number = course_number;
	}

	GetFullName() {
		const anthroponym = {
			gender: this.application.sex ? 'male' : 'female',
			firstName: $('#first_name').val().trim(),
			lastName: $('#last_name').val().trim(),
			middleName: $('#patronymic').val().trim()
		};
		const full_name_in_genetive = shevchenko.inGenitive(anthroponym); // Отримуємо ім'я в родовому відмінку
		this.application.full_name = `${full_name_in_genetive.lastName} ${full_name_in_genetive.firstName} ${full_name_in_genetive.middleName}`;
	}

	GetPhoneNumber() {
		let phone = $("#phone").val().replace(/[^\d]/g, ''); // Видалити усі НЕ цифри з номера телефону;
		if (phone.length != 12 || phone.substring(0, 2) != '38') {
			this.application.err = true;
			alert("Треба записати номер телефону, починаючи з +380.");
			return;
		}
		this.application.phone_number = `+38(${phone.substring(2, 5)})${phone.substring(5, 8)}-${phone.substring(8, 10)}-${phone.substring(10, 12)}`;

	}

	GetIBAN() {
		let iban = $("#iban_number").val().replace(/[^\d]/g, ''); // Видалити усі НЕ цифри з IBAN;
		if (iban.length != 27) {
			this.application.err = true;
			alert("IBAN має складатися з 27 цифр.");
			return;
		}
		this.application.iban_number = iban;
	}

	GetCardNumber() {
		let card_number = $("#card_number").val().replace(/[^\d]/g, ''); // Видалити усі НЕ цифри з номера картки;
		if (card_number.length != 16) {
			this.application.err = true;
			alert("Номер картки має складатися з 16 цифр.");
			return;
		}
		this.application.card_number = card_number;
	}

	// Обрахунок дня народження з Ідентифікаційним кодом
	GetBirthDay() {
		let duration = Number(this.application.tax_number.substring(0, 5));
		let base_date = new Date(1899, 11, 31);
		this.application.birth_day = new Date(base_date.getFullYear(), base_date.getMonth(), base_date.getDate() + duration);
	}
}

class Mapping {
	constructor() {
		// Обробка чекбоксу для по-батькові
		this.patronymic_checker = document.getElementById("patronymic_checkbox").addEventListener('click', function () {
			let patronymic_input_field = document.getElementById("patronymic");
			patronymic_input_field.disabled = this.checked;
			patronymic_input_field.value = '';
		})
	}
}

async function OnDownload() {
	let application = new Application();
	let controller = new FormController(application);

	application.group = await controller.GetGroup();
	if (!application.group) application.err = true;

	controller.GetBank();
	controller.GetDepartment();
	controller.GetID();
	controller.GetPhoneNumber();
	controller.GetIBAN();
	controller.GetCardNumber();

	if (!application.err) {
		controller.GetStatus();
		controller.GetCourse();
		controller.GetFullName();
		controller.GetBirthDay();
	}

	if (!application.err)
		application.ToPDF();
}

let map = new Mapping();