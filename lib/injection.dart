//
//  iamngoni_co
//  injection
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:injectable/injectable.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:sentry_dio/sentry_dio.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

import 'injection.config.dart';

final GetIt getIt = GetIt.instance
  ..registerSingleton<Dio>(
    Dio()
      ..interceptors.add(
        PrettyDioLogger(
          requestHeader: true,
          requestBody: true,
        ),
      )
      ..options.connectTimeout = 60000.milliseconds
      ..addSentry(
        failedRequestStatusCodes: [
          SentryStatusCode.range(400, 404),
          SentryStatusCode(500),
          SentryStatusCode(502),
          SentryStatusCode(524),
        ],
      ),
  );

@InjectableInit()
void configureInjection() => getIt.init();
