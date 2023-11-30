//
//  iamngoni_co
//  app_preview
//
//  Created by Ngonidzashe Mangudya on 30/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'dart:js' as js;

import 'package:device_frame/device_frame.dart';
import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../gen/assets.gen.dart';
import '../../../shared/configs/colors.dart';
import '../../models/data/project.dart';

class AppPreview extends StatelessWidget {
  const AppPreview({
    required this.project,
    required this.pageController,
    super.key,
  });

  final Project project;
  final PageController pageController;

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Container(
          height: context.height,
          width: context.width,
          padding: EdgeInsets.symmetric(
            horizontal: sx(20),
            vertical: sy(20),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  children: [
                    Expanded(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${project.title} (${project.date.getShortMonth} ${project.date.year})',
                            style: TextStyle(
                              color: SiteColors.white,
                              fontWeight: FontWeight.w700,
                              fontSize: sy(20),
                            ),
                          ),
                          SizedBox(
                            height: sy(20),
                          ),
                          Expanded(
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                horizontal: sx(10),
                                vertical: sy(20),
                              ),
                              decoration: BoxDecoration(
                                color: SiteColors.white,
                                boxShadow: [
                                  BoxShadow(
                                    color: SiteColors.white.withOpacity(0.2),
                                    spreadRadius: 1,
                                    blurRadius: 1,
                                    offset: const Offset(7, 7),
                                  ),
                                ],
                              ),
                              child: SingleChildScrollView(
                                child: Text(
                                  project.description,
                                  style: TextStyle(
                                    color: SiteColors.dark.withOpacity(0.8),
                                    fontWeight: FontWeight.w400,
                                    fontSize: sy(12),
                                  ),
                                  textAlign: TextAlign.justify,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: sy(20),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () {
                            pageController.previousPage(
                              duration: const Duration(milliseconds: 500),
                              curve: Curves.easeInOut,
                            );
                          },
                          child: Container(
                            padding: EdgeInsets.symmetric(
                              horizontal: sx(15),
                              vertical: sy(10),
                            ),
                            decoration: BoxDecoration(
                              color: SiteColors.white,
                              boxShadow: [
                                BoxShadow(
                                  color: SiteColors.white.withOpacity(0.2),
                                  spreadRadius: 1,
                                  blurRadius: 1,
                                  offset: const Offset(7, 7),
                                ),
                              ],
                            ),
                            child: Text(
                              '👈 Previous',
                              style: TextStyle(
                                color: SiteColors.dark,
                                fontWeight: FontWeight.w700,
                                fontSize: sy(10),
                              ),
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () {
                            js.context.callMethod(
                              'open',
                              [project.githubUrl],
                            );
                          },
                          child: ImageIcon(
                            AssetImage(Assets.icons.github.path),
                            color: SiteColors.white,
                            size: sy(30),
                          ),
                        ),
                        GestureDetector(
                          onTap: () {
                            pageController.nextPage(
                              duration: const Duration(milliseconds: 500),
                              curve: Curves.easeInOut,
                            );
                          },
                          child: Container(
                            padding: EdgeInsets.symmetric(
                              horizontal: sx(15),
                              vertical: sy(10),
                            ),
                            decoration: BoxDecoration(
                              color: SiteColors.white,
                              boxShadow: [
                                BoxShadow(
                                  color: SiteColors.white.withOpacity(0.2),
                                  spreadRadius: 1,
                                  blurRadius: 1,
                                  offset: const Offset(7, 7),
                                ),
                              ],
                            ),
                            child: Text(
                              'Next 👉',
                              style: TextStyle(
                                color: SiteColors.dark,
                                fontWeight: FontWeight.w700,
                                fontSize: sy(10),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(
                width: sx(20),
              ),
              Expanded(
                child: DeviceFrame(
                  device: Devices.ios.iPhone13ProMax,
                  screen: project.entryPoint,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
