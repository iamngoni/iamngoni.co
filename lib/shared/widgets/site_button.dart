//
//  iamngoni_co
//  site_button
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:relative_scale/relative_scale.dart';

import '../configs/colors.dart';

class SiteButton extends StatelessWidget {
  const SiteButton({
    required this.text,
    this.onTap,
    this.color = SiteColors.dark,
    this.backgroundColor = SiteColors.white,
    this.borderRadius = 5,
    this.verticalPadding = 7,
    super.key,
  });

  final String text;
  final VoidCallback? onTap;
  final Color color;
  final Color backgroundColor;
  final double borderRadius;
  final double verticalPadding;

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return GestureDetector(
          onTap: onTap,
          child: Container(
            alignment: Alignment.center,
            padding: EdgeInsets.symmetric(
              horizontal: sx(20),
              vertical: sy(verticalPadding),
            ),
            decoration: BoxDecoration(
              color: backgroundColor,
              borderRadius: BorderRadius.circular(borderRadius),
            ),
            child: Text(
              text,
              style: TextStyle(
                color: color,
                fontWeight: FontWeight.w500,
                fontSize: sy(10),
              ),
            ),
          ),
        );
      },
    );
  }
}
