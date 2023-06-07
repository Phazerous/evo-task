class PCalendarEvent {
  private _event: GoogleAppsScript.Calendar.CalendarEvent;
  private title: string;
  private startTime: Date;
  private endTime: Date;

  constructor(calendarEvent: GoogleAppsScript.Calendar.CalendarEvent) {
    this._event = calendarEvent;
    this.title = calendarEvent.getTitle();
    this.startTime = calendarEvent.getStartTime() as Date;
    this.endTime = calendarEvent.getEndTime() as Date;
  }

  getSheetRow() {
    const planTime = '';
    const factTime = '';
    const reportOfExecution = '';
    const isTracked = true;

    const timeZoneOffset = activeSpreadsheet.getSpreadsheetTimeZone();

    return [
      this.title,
      planTime,
      factTime,
      reportOfExecution,
      Utilities.formatDate(this.startTime, 'GMT+6', 'HH:mm:ss'),
      Utilities.formatDate(this.endTime, 'GMT+6', 'HH:mm:ss'),
      isTracked,
    ];
  }

  getTitle() {
    return this.title;
  }
  getStartTime() {
    return this.startTime;
  }
  getEndTime() {
    return this.endTime;
  }

  setTime(startTime: Date, endTime: Date) {
    return this._event.setTime(startTime, endTime);
  }

  deleteEvent() {
    return this._event.deleteEvent();
  }
}
