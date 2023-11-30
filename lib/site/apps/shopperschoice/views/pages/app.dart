//
//  iamngoni_co
//  app
//
//  Created by Ngonidzashe Mangudya on 30/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';

import '../../core/configs/app_theme.dart';
import 'get_started.dart';

class ShoppersChoiceApp extends StatelessWidget {
  const ShoppersChoiceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Shopper's Choice",
      theme: appTheme,
      home: const GetStartedPage(),
    );
  }
}
