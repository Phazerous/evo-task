// Error Handling

function synchronizeCalendarWithSheetsWithErrorHandling() {
  runWithErrorHandling(
    synchronizeCalendarWithSheets,
    'Вы хотите синхронизировать Google Календарь со всеми события из данной таблицы?\\n\\nОбратите внимание, что все события, которые не указаны в таблице будут удалены из календаря.'
  );
}

function fetchEventsWithErrorHandling() {
  runWithErrorHandling(
    fetchEvents,
    'Вы хотите подтянуть все события из Google Календаря?'
  );
}

function runWithErrorHandling(fn: () => void, message: string) {
  try {
    confirmBeforeExecution(fn, message);
  } catch (e) {
    if (e instanceof CustomError) {
      e.show();
    } else {
      Browser.msgBox(e.message);
    }
  }
}

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
