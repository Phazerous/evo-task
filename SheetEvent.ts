class SheetEvent {
  constructor(
    private title: string,
    private startTime: Date,
    private endTime: Date,
    private _isTracked: boolean = false
  ) {}

  getTitle() {
    return this.title;
  }
  getStartTime() {
    return this.startTime;
  }
  getEndTime() {
    return this.endTime;
  }
  isTracked() {
    return this._isTracked;
  }

  createEvent() {
    return calendar.createEvent(this.title, this.startTime, this.endTime);
  }
}
