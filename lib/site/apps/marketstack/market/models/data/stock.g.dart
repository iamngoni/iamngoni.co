// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'stock.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Stock _$StockFromJson(Map<String, dynamic> json) => Stock(
      name: json['name'] as String,
      symbol: json['symbol'] as String,
      hasIntraDay: json['has_intraday'] as bool,
      hasEod: json['has_eod'] as bool,
      country: json['country'] as String?,
      stockExchange: StockExchange.fromJson(
          json['stock_exchange'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$StockToJson(Stock instance) {
  final val = <String, dynamic>{
    'name': instance.name,
    'symbol': instance.symbol,
    'has_intraday': instance.hasIntraDay,
    'has_eod': instance.hasEod,
  };

  void writeNotNull(String key, dynamic value) {
    if (value != null) {
      val[key] = value;
    }
  }

  writeNotNull('country', instance.country);
  val['stock_exchange'] = instance.stockExchange.toJson();
  return val;
}
