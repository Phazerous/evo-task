const createEvent = (sheetEvent: SheetEvent) => {
  return calendar.createEvent(
    sheetEvent.getTitle(),
    sheetEvent.getStartTime(),
    sheetEvent.getEndTime()
  );
};

function isValidRow(row: any[]) {
  if (!(row && row.length === 7))
    throw new CustomError(CustomErrorEnum.INCORRECT_ROW_LENGTH);

  const [
    title,
    planTime,
    factTime,
    reportOfExecution,
    startTime,
    endTime,
    isTracked,
  ] = row;

  if (typeof isTracked !== 'boolean')
    throw new CustomError(CustomErrorEnum.INVALID_IS_TRACKED);
  else if (!isTracked) {
    return true;
  }

  if (typeof title !== 'string' || title.length === 0)
    throw new CustomError(CustomErrorEnum.INVALID_TITLE);

  if (!(startTime instanceof Date))
    throw new CustomError(CustomErrorEnum.INVALID_START_TIME);

  if (!(endTime instanceof Date))
    throw new CustomError(CustomErrorEnum.INVALID_END_TIME);

  return true;
}

function parseSheetEvent(row: any[], dateOfPlan: Date) {
  isValidRow(row);

  let [
    title,
    planTime,
    factTime,
    reportOfExecution,
    startTime,
    endTime,
    isTracked,
  ] = row;

  startTime = setCurrentTime(startTime, dateOfPlan);
  endTime = setCurrentTime(endTime, dateOfPlan);

  return new SheetEvent(title, startTime, endTime, isTracked);
}

function getTrackedSheetEvents(dateOfPlan: Date) {
  const allEvents = workingTasks
    .filter((row) => !isArrayEmpty(row))
    .map((row) => parseSheetEvent(row, dateOfPlan));
  const trackedEvents = allEvents.filter((e) => e.isTracked());

  return trackedEvents;
}

function getCalendarEvents(date: Date) {
  const events: any[] = calendar.getEventsForDay(date);

  const calendarEvents = events.map((event) => new PCalendarEvent(event));

  return calendarEvents;
}
