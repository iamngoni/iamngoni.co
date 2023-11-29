//
//  iamngoni_co
//  storage
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'dart:developer';

import 'package:injectable/injectable.dart';
import 'package:shared_preferences/shared_preferences.dart';

@singleton
class StorageService {
  static StorageService? _instance;
  static SharedPreferences? _preferences;

  @factoryMethod
  static Future<StorageService> getInstance() async {
    _instance ??= StorageService();

    _preferences ??= await SharedPreferences.getInstance();

    return _instance!;
  }

  void saveToDisk<T>(String key, T content) {
    log('key: $key value: $content');

    if (content is String) {
      _preferences!.setString(key, content);
    }
    if (content is bool) {
      _preferences!.setBool(key, content);
    }
    if (content is int) {
      _preferences!.setInt(key, content);
    }
    if (content is double) {
      _preferences!.setDouble(key, content);
    }
    if (content is List<String>) {
      _preferences!.setStringList(key, content);
    }
  }

  dynamic getFromDisk(String key) {
    final value = _preferences!.get(key);
    log('key: $key value: $value');
    return value;
  }

  void clearDisk() {
    _preferences!.clear();
  }
}
