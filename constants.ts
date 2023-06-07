const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
const activeSheet = activeSpreadsheet.getActiveSheet();

// User Preferences
const systemSheetName = 'sys';
const systemSheet = activeSpreadsheet.getSheetByName(systemSheetName);

const yearOfPlanA1 = 'C3';
const yearOfPlan = systemSheet.getRange(yearOfPlanA1).getValue();

const _workingTasksA1 = 'F3';
const workingTasksA1 = systemSheet.getRange(_workingTasksA1).getValue();
const workingTasksRange = activeSheet.getRange(workingTasksA1);
const workingTasks = workingTasksRange.getValues();

const calendarA1 = 'C4';
const calendarName = systemSheet.getRange(calendarA1).getValue();
let calendar = CalendarApp.getDefaultCalendar();

// if (calendarName === 'default') calendar = CalendarApp.getDefaultCalendar();

// Error Handling

enum CustomErrorEnum {
  INCORRECT_SHEET_NAME,
  INCORRECT_ROW_LENGTH,
  INVALID_TITLE,
  INVALID_START_TIME,
  INVALID_END_TIME,
  INVALID_IS_TRACKED,
}

function getCustomErrorDescription(
  error: CustomErrorEnum,
  arg1: string = ''
): { title: string; message: string; button: GoogleAppsScript.Base.ButtonSet } {
  switch (error) {
    case CustomErrorEnum.INCORRECT_SHEET_NAME:
      return {
        title: `Неправильное название листа`,
        message: `
Задан неправильный формат название листа: ${arg1}.

Название листа должно состоять из 4 цифр и точки.

[месяц].[день]

Например, "06.07" — 6 июля.
        `,
        button: Browser.Buttons.OK,
      };

    case CustomErrorEnum.INCORRECT_ROW_LENGTH:
      return {
        title: 'Неправильная длина строки',
        message: `
Неправильно количество элементов в строке задач.

Это может быть связано с тем, что были удалены какие-то столбцы.

Для корректного выполнения программы необходимо, чтобы рабочая задач состояла из 7 ячеек.

Задача | Время план | Время факт | Отчет о выполнении | Начало | Конец | Google Calendar

Столбцы, которые идут раньше или позже приведенной последовательности не учитываются.
        `,
        button: Browser.Buttons.OK,
      };

    case CustomErrorEnum.INVALID_TITLE:
      return {
        title: 'Ошибка заполнения данных',
        message: `
Название задачи должно быть строкой и содержать как минимум один символ  
      `,
        button: Browser.Buttons.OK,
      };

    case CustomErrorEnum.INVALID_IS_TRACKED:
      return {
        title: 'Ошибка заполнения данных',
        message: `
Отсутствует чек-бокс в строке задачи
      `,
        button: Browser.Buttons.OK,
      };

    case CustomErrorEnum.INVALID_START_TIME:
      return {
        title: 'Ошибка заполнения данных',
        message: `
Время начало события должно быть корректной датой
        `,
        button: Browser.Buttons.OK,
      };

    case CustomErrorEnum.INVALID_END_TIME:
      return {
        title: 'Ошибка заполнения данных',
        message: `
Время окончания события должно быть корректной датой
      `,
        button: Browser.Buttons.OK,
      };

    default:
      return {
        title: ``,
        message: ``,
        button: Browser.Buttons.OK,
      };
  }
}
