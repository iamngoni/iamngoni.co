enum LogLevel {
  debug("DEBUG"),
  info("INFO"),
  warning("WARNING"),
  error("ERROR");

  final String level;
  const LogLevel(this.level);
}
