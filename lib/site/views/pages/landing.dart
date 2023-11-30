//
//  iamngoni_co
//  landing
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../injection.dart';
import '../../../shared/services/storage.dart';
import '../../../shared/utils/welcome.dart';
import '../../apps/lingua/views/pages/app.dart';
import '../../apps/parkade/parkade/views/pages/parkade.dart';
import '../../models/data/project.dart';
import 'app_preview.dart';
import 'profile.dart';

class LandingPage extends StatefulWidget {
  const LandingPage({super.key});

  @override
  State<LandingPage> createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  final PageController pageController = PageController();

  final List<Project> projects = [
    Project(
      title: 'Project 1: lingua',
      description: '''
                            The "lingua" project is an innovative Flutter application designed to bridge communication gaps by translating words and letters into sign language. This tool stands out as a valuable resource for enhancing accessibility and fostering inclusivity, especially for the deaf and hard-of-hearing community. It functions by interpreting typed or spoken language inputs and converting them into their corresponding sign language gestures, potentially using a graphical or animated interface.
                            
                            This repository is more than just a codebase; it's a step towards inclusive communication. It's particularly beneficial for those learning sign language, educators in special needs sectors, and anyone interested in facilitating better communication with the deaf community. By leveraging the flexibility and cross-platform capabilities of Flutter, this application promises a seamless and user-friendly experience across various devices.
                            
                            Whether you are a developer looking to contribute to a socially impactful project, or someone interested in the intersection of technology and accessibility, "lingua" offers a unique opportunity to explore and expand the horizons of communication technology.
                            ''',
      entryPoint: const LinguaApp(),
      githubUrl: 'https://github.com/iamngoni/lingua',
      date: DateTime(2021, 2, 4),
    ),
    Project(
      title: 'Project 2: parkade',
      description: '''
      The "Parkade" app is a dynamic and user-friendly solution for parking management and navigation. Designed to streamline the parking experience, this application assists users in locating free parking slots in parkades with real-time updates. It not only helps in finding a parking spot but also manages parking tickets efficiently, ensuring a hassle-free parking experience.

Developed using the Very Good CLI, known for promoting maintainable and high-quality code, Parkade stands out for its robust functionality and ease of use. It's an ideal tool for individuals seeking convenient parking solutions and for parking lot operators aiming to optimize their space management and enhance customer satisfaction.

Whether you're a driver tired of the endless search for parking or a business seeking to upgrade your parking management system, Parkade provides an innovative, tech-driven answer to all parking woes.
      ''',
      entryPoint: const ParkadeApp(),
      githubUrl: 'https://github.com/iamngoni/parkade',
      date: DateTime(2023, 4, 13),
    ),
  ];

  @override
  void initState() {
    super.initState();
    FlutterNativeSplash.remove();
    if (getIt<StorageService>().getFromDisk('first_time') == null) {
      final String _ = $welcomeTitles.randomItem();
      final String __ = $welcomeBodies.randomItem();
      // await PushNotifications.showNotification(title, body);
      getIt<StorageService>().saveToDisk('first_time', false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Scaffold(
          body: Container(
            height: context.height,
            width: context.width,
            padding: EdgeInsets.symmetric(
              horizontal: sx(20),
              vertical: sy(20),
            ),
            alignment: Alignment.center,
            child: PageView(
              controller: pageController,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                ProfilePage(
                  pageController: pageController,
                ),
                // create app preview page for each project
                ...projects.map(
                  (project) => AppPreview(
                    pageController: pageController,
                    project: project,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
