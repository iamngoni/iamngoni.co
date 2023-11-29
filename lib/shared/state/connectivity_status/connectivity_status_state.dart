part of 'connectivity_status_bloc.dart';

@immutable
abstract class ConnectivityStatusState {}

class Idle extends ConnectivityStatusState {}

class Connected extends ConnectivityStatusState {}

class Offline extends ConnectivityStatusState {}
