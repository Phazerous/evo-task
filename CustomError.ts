class CustomError extends Error {
  constructor(private errorType: CustomErrorEnum) {
    super('');
  }

  show() {
    const errorOpts = getCustomErrorDescription(this.errorType);

    errorOpts.message = this.formatMessage(errorOpts.message);

    if (errorOpts.title && errorOpts.button) {
      Browser.msgBox(errorOpts.title, errorOpts.message, errorOpts.button);
    } else {
      Browser.msgBox(errorOpts.message);
    }
  }

  private formatMessage(message: string) {
    return message.replaceAll('\n', '\\n');
  }
}
