function isArrayEmpty(arr: any[]) {
  if (arr.length === 0) return true;

  return arr.every((value) => value === '' || value === false);
}

function findEmptyRowsIdxs(matrix: any[][]) {
  return matrix.reduce((result, row, idx) => {
    if (isArrayEmpty(row)) {
      result.push(idx);
    }

    return result;
  }, []);
}

const sheetNameRegexPattern = /^\d{2}.\d{2}$/;

function getDateOfPlan() {
  const sheetName = activeSheet.getSheetName();

  if (!sheetNameRegexPattern.test(sheetName))
    throw new CustomError(CustomErrorEnum.INCORRECT_SHEET_NAME);

  const [day, month] = sheetName.split('.').map((val) => parseInt(val));

  const date = new Date(yearOfPlan, month, day);

  return date;
}

function setCurrentTime(time: Date, currentDate: Date) {
  const date = new Date(currentDate);

  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  date.setSeconds(0);

  return date;
}
