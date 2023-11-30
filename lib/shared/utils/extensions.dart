//
//  xash
//  extensions
//
//  Created by Ngonidzashe Mangudya on 02/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';

import '../configs/colors.dart';

extension ContextExtensions<T> on BuildContext {
  Future<T?> goTo({required Widget page}) => Navigator.of(this).push(
        MaterialPageRoute(builder: (_) => page),
      );

  Future<T?> goToAndReplace({required Widget page}) =>
      Navigator.of(this).pushReplacement(
        MaterialPageRoute(builder: (_) => page),
      );

  Future<T?> goToAndRemoveUntil({required Widget page}) =>
      Navigator.of(this).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => page),
        (route) => false,
      );

  void goBack({dynamic value}) => Navigator.of(this).pop(value);

  // notify
  void notify(
    String message, {
    Duration duration = const Duration(seconds: 3),
    bool isError = false,
  }) =>
      ScaffoldMessenger.of(this).showSnackBar(
        SnackBar(
          content: Text(
            message,
            style: const TextStyle(
              color: SiteColors.white,
              fontWeight: FontWeight.w500,
            ),
          ),
          duration: duration,
          backgroundColor: isError ? SiteColors.red : SiteColors.green,
        ),
      );
}
