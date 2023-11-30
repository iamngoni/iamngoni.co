class ApplicationError implements Exception {
  ApplicationError(
    this.message, {
    this.title = 'Something went wrong',
  });
  String title;
  String message;
}
