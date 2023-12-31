import 'dart:developer';
import 'dart:math' show Random;

import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/configs/api_configs.dart';
import '../../../../core/functions/dio_error_to_application_error.dart';
import '../../../../core/models/application_error.dart';
import '../../data/stock.dart';
import '../../data/stock_details.dart';
import '../base/stocks_repository.dart';

@LazySingleton(as: StocksRepository)
class StocksRepositoryImpl implements StocksRepository {
  @override
  Future<Either<ApplicationError, List<Stock>>> getStocks() async {
    try {
      final Response<Map<String, dynamic>> response = await dio.get(
        '${ApiConfigs.baseUrl}/tickers?access_key=${ApiConfigs.apiKey}',
      );
      final Map<String, dynamic> data = response.data!;
      final List<Stock> stocks = (data['data'] as List)
          .map<Stock>((json) => Stock.fromJson(json as Map<String, dynamic>))
          .toList();

      final List<Stock> tenRandomStocks = [];
      final Random random = Random();
      for (int i = 0; i < 10; i++) {
        tenRandomStocks.add(stocks[random.nextInt(stocks.length)]);
      }

      return Right(tenRandomStocks);
    } catch (e, stacktrace) {
      log(e.toString(), stackTrace: stacktrace);
      if (e is DioError) {
        return Left(dioErrorToApplicationError(e));
      }

      return Left(ApplicationError(e.toString()));
    }
  }

  @override
  Future<Either<ApplicationError, StockDetails>> getStockDetails(
    Stock stock, {
    DateTime? from,
    DateTime? to,
  }) async {
    try {
      String url =
          '${ApiConfigs.baseUrl}/tickers/${stock.symbol.toLowerCase()}/eod?access_key=${ApiConfigs.apiKey}';

      if (to != null && from != null) {
        url +=
            "&date_from=${from.year}-${from.month >= 10 ? from.month : '0${from.month}'}-${from.day >= 10 ? from.day : '0${from.day}'}"
            "&date_to=${to.year}-${to.month >= 10 ? to.month : '0${to.month}'}-${to.day >= 10 ? to.day : '0${to.day}'}";
      }

      final Response<Map<String, dynamic>> response = await dio.get(url);
      final Map<String, dynamic> data = response.data!;
      final StockDetails stockDetails =
          StockDetails.fromJson(data['data'] as Map<String, dynamic>);
      return Right(stockDetails);
    } catch (e, stacktrace) {
      log(e.toString(), stackTrace: stacktrace);

      if (e is DioException) {
        return Left(dioErrorToApplicationError(e));
      }

      return Left(ApplicationError(e.toString()));
    }
  }

  final Dio dio = Dio()
    ..interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
      ),
    );
}
