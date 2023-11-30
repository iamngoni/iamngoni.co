import 'dart:developer';

import 'package:bloc/bloc.dart';
import 'package:dartz/dartz.dart';
import 'package:meta/meta.dart';

import '../../../core/models/application_error.dart';
import '../../models/data/stock.dart';
import '../../models/data/stock_details.dart';
import '../../models/repos/base/stocks_repository.dart';

part 'stock_details_event.dart';
part 'stock_details_state.dart';

class StockDetailsBloc extends Bloc<StockDetailsEvent, StockDetailsState> {
  StockDetailsBloc({
    required this.repository,
  }) : super(StockDetailsInitial()) {
    on<LoadStockDetails>((
      LoadStockDetails event,
      Emitter<StockDetailsState> emit,
    ) async {
      try {
        emit(StockDetailsLoading());
        final Either<ApplicationError, StockDetails> response =
            await repository.getStockDetails(
          event.stock,
          from: event.from,
          to: event.to,
        );

        response.fold(
          (l) => emit(StockDetailsException(l)),
          (r) => emit(StockDetailsLoaded(r)),
        );
      } catch (e, stacktrace) {
        log(e.toString(), stackTrace: stacktrace);
        emit(StockDetailsException(ApplicationError(e.toString())));
      }
    });
  }

  final StocksRepository repository;
}
