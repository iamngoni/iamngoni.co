import 'dart:developer';
import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

part 'connectivity_status_event.dart';
part 'connectivity_status_state.dart';

@injectable
class ConnectivityStatusBloc
    extends Bloc<ConnectivityStatusEvent, ConnectivityStatusState> {
  ConnectivityStatusBloc() : super(Connected()) {
    connectivity.onConnectivityChanged.listen(
      (ConnectivityResult result) =>
          [ConnectivityResult.mobile, ConnectivityResult.wifi].contains(result)
              ? add(DeviceConnected())
              : add(DeviceDisconnected()),
    );
    on<DeviceConnected>((
      DeviceConnected event,
      Emitter<ConnectivityStatusState> emit,
    ) {
      emit(Connected());
    });
    on<DeviceDisconnected>((
      DeviceDisconnected event,
      Emitter<ConnectivityStatusState> emit,
    ) {
      emit(Offline());
    });

    on<CheckConnection>((event, emit) async {
      emit(Idle());
      try {
        // use lookup to get the ConnectivityService
        final result = await InternetAddress.lookup('google.com');
        if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
          emit(Connected());
        } else {
          emit(Offline());
        }
      } catch (e, s) {
        log(e.toString(), error: e, stackTrace: s);
        final ConnectivityResult result =
            await Connectivity().checkConnectivity();
        if (result != ConnectivityResult.none) {
          emit(Connected());
        } else {
          emit(Offline());
        }
      }
    });
  }

  final Connectivity connectivity = Connectivity();
}
