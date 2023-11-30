import 'log_level.dart';

class Log {
  final String id;
  final String timestamp;
  final LogLevel logLevel;
  final String message;
  final String stacktrace;

  Log({
    required this.id,
    required this.timestamp,
    required this.logLevel,
    required this.message,
    this.stacktrace = "",
  });

  @override
  String toString() {
    List<String> result = [];
    result.add("[LOGGING] ${logLevel.toString()} $timestamp Message: $message");
    if (stacktrace.isNotEmpty) {
      result.add("[LOGGING] StackTrace: $stacktrace");
    }
    return result.join("\n");
  }
}
