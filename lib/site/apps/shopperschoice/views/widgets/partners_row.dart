import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../../../gen/assets.gen.dart';

class PartnersRow extends StatelessWidget {
  const PartnersRow({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return SizedBox(
          width: context.width,
          child: Row(
            children: [
              SizedBox(
                width: sx(10),
              ),
              Expanded(
                child: Image(
                  image: AssetImage(Assets.shopperschoice.images.ok.path),
                ),
              ),
              SizedBox(
                width: sx(40),
              ),
              Expanded(
                child: Image(
                  image:
                      AssetImage(Assets.shopperschoice.images.bonMarche.path),
                ),
              ),
              SizedBox(
                width: sx(40),
              ),
              Expanded(
                child: Image(
                  image:
                      AssetImage(Assets.shopperschoice.images.okmartPng.path),
                ),
              ),
              SizedBox(
                width: sx(10),
              ),
            ],
          ),
        );
      },
    );
  }
}
