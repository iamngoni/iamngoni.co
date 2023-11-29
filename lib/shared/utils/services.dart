//
//  iamngoni_co
//  services
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:dio/dio.dart';

import '../../injection.dart';
import '../services/network.dart';
import '../services/secure_storage.dart';
import '../services/storage.dart';

SecureStorageService get $secureStorage => getIt<SecureStorageService>();

StorageService get $storage => getIt<StorageService>();

Dio get $dio => getIt<Dio>();

NetworkService get $network => getIt<NetworkService>();
