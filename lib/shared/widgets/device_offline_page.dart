//
//  iamngoni_co
//  device_offline_page
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:lottie/lottie.dart';
import 'package:relative_scale/relative_scale.dart';

import '../configs/colors.dart';
import '../state/connectivity_status/connectivity_status_bloc.dart';
import 'site_button.dart';

class DeviceOfflinePage extends StatelessWidget {
  const DeviceOfflinePage({super.key});

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Scaffold(
          body: SafeArea(
            child: Container(
              height: height,
              width: width,
              alignment: Alignment.center,
              constraints: BoxConstraints(
                maxWidth: context.width * 0.7,
              ),
              padding: EdgeInsets.symmetric(
                horizontal: sx(20),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Lottie.asset(
                    'assets/lottie/searching-connection.json',
                    width: sy(50),
                    height: sy(50),
                  ),
                  Text(
                    'Device Offline',
                    style: TextStyle(
                      color: SiteColors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: sy(12),
                    ),
                  ),
                  SizedBox(
                    height: sy(3),
                  ),
                  Text(
                    'Your device is currently offline and not connected to the '
                    'internet. Please check your connection.',
                    style: TextStyle(
                      color: SiteColors.white,
                      fontWeight: FontWeight.w400,
                      fontSize: sy(10),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(
                    height: sy(20),
                  ),
                  SiteButton(
                    text: 'All Better Now?',
                    onTap: () {
                      context
                          .read<ConnectivityStatusBloc>()
                          .add(CheckConnection());
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
