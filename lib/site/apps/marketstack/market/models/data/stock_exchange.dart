import 'package:freezed_annotation/freezed_annotation.dart';

part 'stock_exchange.freezed.dart';
part 'stock_exchange.g.dart';

@freezed
class StockExchange with _$StockExchange {
  const factory StockExchange({
    required String name,
    required String acronym,
    required String mic,
    required String country,
    @JsonKey(name: 'country_code') required String countryCode,
    required String city,
    required String website,
  }) = _StockExchange;

  const StockExchange._();

  factory StockExchange.fromJson(Map<String, dynamic> json) =>
      _$StockExchangeFromJson(json);
}
