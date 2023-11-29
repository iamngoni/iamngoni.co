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
import '../widgets/pulsating_me.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Stack(
          alignment: Alignment.center,
          children: [
            Container(
              height: context.height,
              width: context.width * 0.7,
              padding: EdgeInsets.symmetric(
                horizontal: sx(20),
                vertical: sy(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                          'Backend & Mobile Developer | B.Tech Hons. Software Eng. 👨🏿‍🎓',
                          style: TextStyle(
                            color: SiteColors.dark,
                            fontWeight: FontWeight.w700,
                            fontSize: sy(10),
                          ),
                        ),
                      ),
                      Draggable(
                        data: 'iamngoni',
                        feedback: Container(
                          height: sy(60),
                          width: sy(60),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            image: const DecorationImage(
                              image: AssetImage('assets/images/iamngoni-2.png'),
                              fit: BoxFit.cover,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: SiteColors.white.withOpacity(0.2),
                                spreadRadius: 1,
                                blurRadius: 1,
                                offset: const Offset(4, 4),
                              ),
                            ],
                          ),
                        ),
                        childWhenDragging: Container(
                          height: sy(60),
                          width: sy(60),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            image: DecorationImage(
                              image: const AssetImage(
                                  'assets/images/iamngoni-2.png'),
                              fit: BoxFit.cover,
                              colorFilter: ColorFilter.mode(
                                SiteColors.white.withOpacity(0.2),
                                BlendMode.dstATop,
                              ),
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: SiteColors.white.withOpacity(0.2),
                                spreadRadius: 1,
                                blurRadius: 1,
                                offset: const Offset(4, 4),
                              ),
                            ],
                          ),
                        ),
                        child: const PulsatingMe(),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: sy(10),
                  ),
                  Text(
                    'Talk is cheap.',
                    style: TextStyle(
                      color: SiteColors.white,
                      fontWeight: FontWeight.w500,
                      fontSize: sy(60),
                    ),
                  ),
                  Text(
                    'Show me the code.',
                    style: TextStyle(
                      color: SiteColors.white,
                      fontWeight: FontWeight.w500,
                      fontSize: sy(60),
                    ),
                  ),
                  SizedBox(
                    height: sy(10),
                  ),
                  Text(
                    'I create elegantly straightforward designs and take joy in my '
                    'work. With over five years in the field, my role as a Flutter '
                    'mobile developer has led to the creation of efficient, '
                    'aesthetically pleasing mobile applications, enhancing user '
                    'experiences significantly. Additionally, I possess skills in '
                    'developing robust backend architectures capable of managing '
                    'substantial traffic volumes.',
                    style: TextStyle(
                      color: SiteColors.white.withOpacity(0.8),
                      fontWeight: FontWeight.w400,
                      fontSize: sy(15),
                    ),
                  ),
                  SizedBox(
                    height: sy(30),
                  ),
                  Container(
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
                      'Show me the code 👀',
                      style: TextStyle(
                        color: SiteColors.dark,
                        fontWeight: FontWeight.w700,
                        fontSize: sy(10),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}
