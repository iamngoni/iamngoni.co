//
//  iamngoni_co
//  landing
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:device_frame/device_frame.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../injection.dart';
import '../../../shared/configs/colors.dart';
import '../../../shared/services/storage.dart';
import '../../../shared/utils/welcome.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  void initState() {
    super.initState();
    FlutterNativeSplash.remove();
    if (getIt<StorageService>().getFromDisk('first_time') == null) {
      final String _ = $welcomeTitles.randomItem();
      final String __ = $welcomeBodies.randomItem();
      // await PushNotifications.showNotification(title, body);
      getIt<StorageService>().saveToDisk('first_time', false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Scaffold(
          body: Container(
            height: context.height,
            width: context.width,
            padding: EdgeInsets.symmetric(
              horizontal: sx(20),
              vertical: sy(20),
            ),
            alignment: Alignment.center,
            child: PageView(
              children: List.generate(5, (index) {
                return Container(
                  margin: EdgeInsets.only(
                    right: sx(20),
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: sx(20),
                    vertical: sy(20),
                  ),
                  decoration: BoxDecoration(
                    color: SiteColors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: SiteColors.dark.withOpacity(0.1),
                        blurRadius: 10,
                        offset: const Offset(0, 5),
                      ),
                    ],
                  ),
                  child: DeviceFrame(
                    device: Devices.ios.iPhone13ProMax,
                    screen: ColoredBox(
                      color: SiteColors.white,
                      child: Center(
                        child: Text(
                          'LFG!!!🔥',
                          style: TextStyle(
                            color: SiteColors.dark,
                            fontWeight: FontWeight.w400,
                            fontSize: sy(30),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),
        );
      },
    );
  }
}
