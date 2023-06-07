function synchronizeCalendarWithSheets() {
  const dateOfPlan = getDateOfPlan();

  const sheetsEvents = getTrackedSheetEvents(dateOfPlan);
  const calendarEvents = getCalendarEvents(dateOfPlan);

  const newEvents = sheetsEvents.filter(
    (e1) => !calendarEvents.some((e2) => e2.getTitle() === e1.getTitle())
  );

  const deletedEvents = calendarEvents.filter(
    (e1) => !sheetsEvents.some((e2) => e2.getTitle() === e1.getTitle())
  );

  const otherEventsSheets = sheetsEvents.filter(
    (e1) =>
      !newEvents.some((e2) => e2.getTitle() === e1.getTitle()) &&
      !deletedEvents.some((e2) => e2.getTitle() === e1.getTitle())
  );

  const otherEventsCalendar = calendarEvents.filter((e1) =>
    otherEventsSheets.some((e2) => e1.getTitle() === e2.getTitle())
  );

  updateEvents(otherEventsSheets, otherEventsCalendar);
  newEvents.forEach((event) => event.createEvent());
  deletedEvents.forEach((event) => event.deleteEvent());
}

function updateEvents(
  sheetEvents: SheetEvent[],
  calendarEvents: PCalendarEvent[]
) {
  for (const sheetEvent of sheetEvents) {
    const calendarEvent = calendarEvents.find(
      (e1) => e1.getTitle() === sheetEvent.getTitle()
    );

    const prevStartTime = calendarEvent.getStartTime();
    const prevEndTime = calendarEvent.getEndTime();

    if (
      prevStartTime !== sheetEvent.getStartTime() ||
      prevEndTime !== sheetEvent.getEndTime()
    ) {
      calendarEvent.setTime(sheetEvent.getStartTime(), sheetEvent.getEndTime());
    }
  }
}

function fetchEvents() {
  const dateOfPlan = getDateOfPlan();

  const sheetsEvents = getTrackedSheetEvents(dateOfPlan);
  const calendarEvents = getCalendarEvents(dateOfPlan);

  const newEvents = calendarEvents.filter(
    (e1) => !sheetsEvents.some((e2) => e2.getTitle() === e1.getTitle())
  );
  const otherEvents = calendarEvents.filter((e1) =>
    sheetsEvents.some((e2) => e2.getTitle() === e1.getTitle())
  );

  const matrix = workingTasks;

  const emptyRowsIdxs = findEmptyRowsIdxs(matrix);

  if (emptyRowsIdxs.length < newEvents.length)
    return Browser.msgBox('Not enough space for fetching tasks.');

  // TODO ERROR HANDLING

  for (let i = 0; i < newEvents.length; i++) {
    const event = newEvents[i];

    matrix[emptyRowsIdxs[i]] = event.getSheetRow();
    ``;
  }

  workingTasksRange.setValues(matrix);
}
