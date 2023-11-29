//
//  iamngoni_co
//  loader_widget
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:relative_scale/relative_scale.dart';

import '../configs/colors.dart';

class LoaderWidget extends StatelessWidget {
  const LoaderWidget({
    this.color = SiteColors.white,
    super.key,
  });

  final Color color;

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Platform.isMacOS
            ? SizedBox(
                height: sy(15),
                width: sy(15),
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation(
                    color,
                  ),
                ),
              )
            : CupertinoActivityIndicator(
                radius: sy(8),
                color: color,
              );
      },
    );
  }
}
