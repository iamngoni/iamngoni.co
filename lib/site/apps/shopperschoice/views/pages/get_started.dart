import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../../../gen/assets.gen.dart';
import '../../core/configs/app_colors.dart';
import '../../core/modals/show_login_bottom_modal.dart';
import '../widgets/partners_row.dart';

class GetStartedPage extends StatelessWidget {
  const GetStartedPage({super.key});

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(builder: (context, height, width, sy, sx) {
      return Scaffold(
        body: SizedBox(
          height: context.height,
          width: context.width,
          child: Column(
            children: [
              Expanded(
                child: Stack(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: AssetImage(
                              Assets.shopperschoice.images.woman.path),
                          fit: BoxFit.cover,
                        ),
                      ),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(
                          sigmaY: 0.5,
                          sigmaX: 0.5,
                        ),
                        child: Container(
                          color: Colors.black.withOpacity(0.2),
                        ),
                      ),
                    ),
                    AnimatedPositioned(
                      duration: const Duration(milliseconds: 300),
                      left: 0,
                      right: 0,
                      top: MediaQuery.of(context).viewInsets.bottom == 0
                          ? sy(150)
                          : sy(70),
                      height: sy(55),
                      child: Image(
                        image: AssetImage(
                          Assets.shopperschoice.images
                              .shoppersChoiceLogoSplashed.path,
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: sy(30),
                      child: MediaQuery.of(context).viewInsets.bottom == 0
                          ? SizedBox(
                              width: context.width,
                              child: GestureDetector(
                                onTap: () => showLoginBottomModal(context),
                                child: Container(
                                  width: context.width,
                                  padding: EdgeInsets.symmetric(
                                    vertical: sy(12),
                                  ),
                                  margin: EdgeInsets.symmetric(
                                    horizontal: sx(20),
                                  ),
                                  decoration: BoxDecoration(
                                    color: AppColors.orange,
                                    borderRadius: BorderRadius.circular(10),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.grey.withOpacity(0.2),
                                        spreadRadius: 1,
                                        blurRadius: 1,
                                        offset: const Offset(1, 1),
                                      ),
                                    ],
                                  ),
                                  alignment: Alignment.center,
                                  child: Text(
                                    'Get Started',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w500,
                                      fontSize: sy(9),
                                    ),
                                  ),
                                ),
                              ),
                            )
                          : const SizedBox.shrink(),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: sy(10),
              ),
              const PartnersRow(),
              SizedBox(
                height: sy(20),
              ),
            ],
          ),
        ),
      );
    });
  }
}
