//
//  iamngoni_co
//  pulsating_me
//
//  Created by Ngonidzashe Mangudya on 30/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../shared/configs/colors.dart';

class PulsatingMe extends StatefulWidget {
  const PulsatingMe({
    super.key,
  });

  @override
  State<PulsatingMe> createState() => _PulsatingMeState();
}

class _PulsatingMeState extends State<PulsatingMe>
    with SingleTickerProviderStateMixin {
  late AnimationController animationController;
  late Animation<double> animation;

  @override
  void initState() {
    super.initState();
    animationController = AnimationController(
      vsync: this,
      duration: 4.seconds,
    );
    animation = Tween(begin: 1.0, end: 2.0).animate(
      CurvedAnimation(parent: animationController, curve: Curves.easeIn),
    );
    animationController.repeat();
  }

  @override
  void dispose() {
    animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return AnimatedBuilder(
          animation: animation,
          builder: (context, _) {
            return Container(
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
                    color:
                        SiteColors.white.withOpacity((animation.value) * 0.2),
                    spreadRadius: animation.value,
                    blurRadius: animation.value,
                    offset:
                        Offset((animation.value) * 4, (animation.value) * 4),
                    blurStyle: BlurStyle.inner,
                  ),
                  BoxShadow(
                    color:
                        SiteColors.white.withOpacity((animation.value) * 0.2),
                    spreadRadius: animation.value,
                    blurRadius: animation.value,
                    offset:
                        Offset((animation.value) * -4, (animation.value) * -4),
                    blurStyle: BlurStyle.inner,
                  ),
                  BoxShadow(
                    color:
                        SiteColors.white.withOpacity((animation.value) * 0.2),
                    spreadRadius: animation.value,
                    blurRadius: animation.value,
                    offset: Offset(0, (animation.value) * 4),
                    blurStyle: BlurStyle.inner,
                  ),
                  BoxShadow(
                    color:
                        SiteColors.white.withOpacity((animation.value) * 0.2),
                    spreadRadius: animation.value,
                    blurRadius: animation.value,
                    offset: Offset((animation.value) * 4, 0),
                    blurStyle: BlurStyle.inner,
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }
}
