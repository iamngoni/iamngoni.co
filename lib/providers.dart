//
//  iamngoni_co
//  providers
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter_bloc/flutter_bloc.dart';

import 'injection.dart';
import 'shared/state/connectivity_status/connectivity_status_bloc.dart';
import 'shared/state/locale/locale_bloc.dart';

List<BlocProvider> providers = [
  BlocProvider<LocaleBloc>(
    lazy: false,
    create: (_) => getIt<LocaleBloc>()..add(LoadLocale()),
  ),
  BlocProvider<ConnectivityStatusBloc>(
    create: (_) => getIt<ConnectivityStatusBloc>(),
  ),
];
