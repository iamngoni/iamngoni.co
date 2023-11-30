//
//  iamngoni_co
//  project
//
//  Created by Ngonidzashe Mangudya on 30/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';

class Project {
  const Project({
    required this.title,
    required this.description,
    required this.entryPoint,
    required this.githubUrl,
    required this.date,
  });

  final String title;
  final String description;
  final Widget entryPoint;
  final String githubUrl;
  final DateTime date;
}
