import 'package:dartz/dartz.dart';

import '../../../../core/models/application_error.dart';
import '../../data/stock.dart';
import '../../data/stock_details.dart';

abstract class StocksRepository {
  Future<Either<ApplicationError, List<Stock>>> getStocks();
  Future<Either<ApplicationError, StockDetails>> getStockDetails(
    Stock stock, {
    DateTime? from,
    DateTime? to,
  });
}
