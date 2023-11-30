import 'package:dio/dio.dart';

import '../models/application_error.dart';

ApplicationError dioErrorToApplicationError(DioException error) {
  late ApplicationError exception;
  switch (error.type) {
    case DioExceptionType.connectionTimeout:
      exception = ApplicationError(
        "Sorry it's taking too long to communicate with the remote resources "
        'at the moment, please check your internet connection 📡 and retry.',
        title: 'Connection Timeout',
      );
    case DioExceptionType.sendTimeout:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Connection Error',
      );
    case DioExceptionType.receiveTimeout:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Connection Error',
      );
    case DioExceptionType.badResponse:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Bad Request',
      );
    case DioExceptionType.unknown:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Network Error',
      );
    case DioExceptionType.cancel:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Cancelled Request',
      );
    case DioExceptionType.badCertificate:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Certificate Error',
      );
    case DioExceptionType.connectionError:
      exception = ApplicationError(
        'Sorry app is unable to communicate with the remote resources at '
        'the moment, please check your internet connection 📡 and retry.',
        title: 'Connection Error',
      );
  }

  return exception;
}
