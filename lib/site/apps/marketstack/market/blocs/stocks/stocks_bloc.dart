import 'dart:developer';

import 'package:bloc/bloc.dart';
import 'package:dartz/dartz.dart';
import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

import '../../../core/models/application_error.dart';
import '../../models/data/stock.dart';
import '../../models/repos/base/stocks_repository.dart';

part 'stocks_event.dart';
part 'stocks_state.dart';

@injectable
class StocksBloc extends Bloc<StocksEvent, StocksState> {
  StocksBloc({required this.repository}) : super(StocksInitial()) {
    on<LoadStocks>(_loadStocks);
    on<FilterStocks>(_filterStocks);
  }

  Future<void> _loadStocks(
    LoadStocks event,
    Emitter<StocksState> emit,
  ) async {
    try {
      emit(StocksLoading());
      final Either<ApplicationError, List<Stock>> response =
          await repository.getStocks();
      response.fold(
        (l) => emit(StocksException(l)),
        (r) => emit(StocksLoaded(stocks: r)),
      );
    } catch (e, stacktrace) {
      log(e.toString(), stackTrace: stacktrace);
      emit(StocksException(ApplicationError(e.toString())));
    }
  }

  Future<void> _filterStocks(
    FilterStocks event,
    Emitter<StocksState> emit,
  ) async {
    try {
      final List<Stock> filteredStocks = (state as StocksLoaded)
          .stocks
          .where((Stock stock) =>
              stock.name.toLowerCase().contains(event.query.toLowerCase()) ||
              stock.symbol.toLowerCase().contains(event.query.toLowerCase()))
          .toList();
      emit(
        StocksLoaded(
          stocks: (state as StocksLoaded).stocks,
          filteredList: filteredStocks,
        ),
      );
    } catch (e, stacktrace) {
      log(e.toString(), stackTrace: stacktrace);
      emit(StocksException(ApplicationError(e.toString())));
    }
  }

  final StocksRepository repository;
}
