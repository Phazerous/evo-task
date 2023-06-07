function confirmBeforeExecution(fn: () => void, message: string) {
  const result = Browser.msgBox(
    'Подтверждение действия',
    message,
    Browser.Buttons.YES_NO
  );

  if (result === 'yes') fn();
}
