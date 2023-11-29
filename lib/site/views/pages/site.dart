//
//  iamngoni_co
//  site
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../l10n/l10n.dart';
import '../../../shared/configs/colors.dart';
import '../../../shared/models/data/language.dart';
import '../../../shared/state/connectivity_status/connectivity_status_bloc.dart';
import '../../../shared/state/locale/locale_bloc.dart';
import '../../../shared/widgets/device_offline_page.dart';
import '../../../shared/widgets/loader_widget.dart';
import 'landing.dart';

class SitePage extends StatelessWidget {
  const SitePage({super.key});

  @override
  Widget build(BuildContext context) {
    log('SitePage');
    return BlocBuilder<LocaleBloc, Language>(
      builder: (context, state) {
        return MaterialApp(
          title: 'Ngonidzashe Mangudya',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            scaffoldBackgroundColor: SiteColors.dark,
            fontFamily: 'HedvigLettersSerif',
            useMaterial3: true,
          ),
          localizationsDelegates: AppLocalizations.localizationsDelegates,
          supportedLocales: AppLocalizations.supportedLocales,
          locale: Locale(state.code),
          home: BlocBuilder<ConnectivityStatusBloc, ConnectivityStatusState>(
            builder: (context, state) {
              if (state is Idle) {
                log('Idle');
                return const ColoredBox(
                  color: SiteColors.white,
                  child: Center(
                    child: LoaderWidget(),
                  ),
                );
              }

              if (state is Offline) {
                log('Offline');
                return const DeviceOfflinePage();
              }

              if (state is Connected) {
                log('Connected');
                return const LandingPage();
              }

              return const SizedBox.shrink();
            },
          ),
        );
      },
    );
  }
}
