import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../../../gen/assets.gen.dart';
import '../../core/configs/app_colors.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Scaffold(
          backgroundColor: AppColors.scaffoldWhite,
          appBar: AppBar(
            backgroundColor: AppColors.scaffoldWhite,
            automaticallyImplyLeading: false,
            title: Text(
              'Promotions Running',
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.w700,
                fontSize: sy(11),
              ),
            ),
          ),
          body: SafeArea(
            child: Container(
              height: context.height,
              width: context.width,
              padding: EdgeInsets.symmetric(
                horizontal: sx(20),
              ),
              child: Column(
                children: [
                  CarouselSlider(
                    options: CarouselOptions(
                      height: sy(130),
                      viewportFraction: 1,
                      autoPlay: true,
                      autoPlayInterval: const Duration(seconds: 5),
                      autoPlayAnimationDuration: const Duration(seconds: 2),
                      enlargeCenterPage: true,
                    ),
                    items: [
                      Assets.shopperschoice.images.banner1.path,
                      Assets.shopperschoice.images.banner2.path,
                      Assets.shopperschoice.images.banner3.path,
                    ].map((_) {
                      return Container(
                        width: context.width,
                        margin: EdgeInsets.symmetric(
                          horizontal: sx(5),
                          vertical: sy(3),
                        ),
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage(_),
                            fit: BoxFit.cover,
                          ),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                      );
                    }).toList(),
                  ),
                  SizedBox(
                    height: sy(20),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Container(
                        height: sy(90),
                        width: sy(90),
                        padding: const EdgeInsets.all(10),
                        alignment: Alignment.bottomLeft,
                        decoration: BoxDecoration(
                          color: AppColors.orange,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                        child: Text(
                          'My\nAccount',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: sy(10),
                          ),
                        ),
                      ),
                      Container(
                        height: sy(90),
                        width: sy(90),
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.orange,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            ImageIcon(
                              AssetImage(Assets
                                  .shopperschoice.icons.tokenization.path),
                              size: sy(40),
                              color: Colors.white,
                            ),
                            SizedBox(
                              height: sy(5),
                            ),
                            Text(
                              'Check\nEntries',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: sy(10),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: sy(10),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Container(
                        height: sy(90),
                        width: sy(90),
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.orange,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            ImageIcon(
                              AssetImage(
                                  Assets.shopperschoice.icons.success.path),
                              size: sy(40),
                              color: Colors.white,
                            ),
                            SizedBox(
                              height: sy(5),
                            ),
                            Text(
                              'Promotion\nPrizes',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: sy(10),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                      Container(
                        height: sy(90),
                        width: sy(90),
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.orange,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            ImageIcon(
                              AssetImage(
                                  Assets.shopperschoice.icons.calendar.path),
                              size: sy(40),
                              color: Colors.white,
                            ),
                            SizedBox(
                              height: sy(5),
                            ),
                            Text(
                              'Draw\nDates',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: sy(10),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: sy(10),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Container(
                        height: sy(90),
                        width: sy(90),
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.orange,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            ImageIcon(
                              AssetImage(
                                Assets.shopperschoice.icons
                                    .termsAndConditionsWhite.path,
                              ),
                              size: sy(40),
                              color: Colors.white,
                            ),
                            SizedBox(
                              height: sy(5),
                            ),
                            Text(
                              'Terms &\nConditions',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: sy(10),
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                      Container(
                        height: sy(90),
                        width: sy(90),
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.orange,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1,
                              blurRadius: 1,
                              offset: const Offset(1, 1),
                            ),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            ImageIcon(
                              AssetImage(Assets.shopperschoice.icons.faq.path),
                              size: sy(40),
                              color: Colors.white,
                            ),
                            SizedBox(
                              height: sy(5),
                            ),
                            Text(
                              'FAQs\n',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: sy(10),
                              ),
                              textAlign: TextAlign.end,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
