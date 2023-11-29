//
//  iamngoni_co
//  bootstrap
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'dart:async';
import 'dart:developer';
import 'dart:ui';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:iamngoni_co/providers.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

import 'injection.dart';

class AppBlocObserver extends BlocObserver {
  const AppBlocObserver();

  @override
  void onChange(BlocBase<dynamic> bloc, Change<dynamic> change) {
    super.onChange(bloc, change);
    log('onChange(${bloc.runtimeType}, $change)');
  }

  @override
  void onError(BlocBase<dynamic> bloc, Object error, StackTrace stackTrace) {
    log('onError(${bloc.runtimeType}, $error, $stackTrace)');
    super.onError(bloc, error, stackTrace);
  }
}

Future<void> bootstrap(FutureOr<Widget> Function() builder) async {
  WidgetsFlutterBinding.ensureInitialized();

  await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  log('Setting preferred orientations ✅');

  configureInjection();

  FlutterError.onError = (details) {
    log(details.exceptionAsString(), stackTrace: details.stack);
    Sentry.captureException(details.exception, stackTrace: details.stack);
  };

  PlatformDispatcher.instance.onError = (error, stack) {
    log(error.toString(), error: error, stackTrace: stack);
    Sentry.captureException(error, stackTrace: stack);
    return true;
  };

  Bloc.observer = const AppBlocObserver();

  runApp(
    MultiBlocProvider(
      providers: providers,
      child: SentryScreenshotWidget(
        child: await builder(),
      ),
    ),
  );
}
