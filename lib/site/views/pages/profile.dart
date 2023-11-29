//
//  iamngoni_co
//  profile
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../shared/configs/colors.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Container(
          height: context.height,
          width: context.width * 0.7,
          padding: EdgeInsets.symmetric(
            horizontal: sx(20),
            vertical: sy(20),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: EdgeInsets.symmetric(
                  horizontal: sx(5),
                  vertical: sy(2),
                ),
                decoration: BoxDecoration(
                  color: SiteColors.green,
                  boxShadow: [
                    BoxShadow(
                      color: SiteColors.white.withOpacity(0.2),
                      spreadRadius: 1,
                      blurRadius: 1,
                      offset: const Offset(4, 4),
                    ),
                  ],
                ),
                child: Text(
                  'Backend & Mobile Developer',
                  style: TextStyle(
                    color: SiteColors.dark,
                    fontWeight: FontWeight.w400,
                    fontSize: sy(10),
                  ),
                ),
              ),
              SizedBox(
                height: sy(20),
              ),
              Text(
                'Talk is cheap.',
                style: TextStyle(
                  color: SiteColors.white,
                  fontWeight: FontWeight.w400,
                  fontSize: sy(60),
                ),
              ),
              Text(
                'Show me the code.',
                style: TextStyle(
                  color: SiteColors.white,
                  fontWeight: FontWeight.w400,
                  fontSize: sy(60),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
