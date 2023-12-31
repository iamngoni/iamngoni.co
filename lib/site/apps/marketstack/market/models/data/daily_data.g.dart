// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'daily_data.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DailyData _$DailyDataFromJson(Map<String, dynamic> json) => DailyData(
      open: (json['open'] as num).toDouble(),
      high: (json['high'] as num).toDouble(),
      low: (json['low'] as num).toDouble(),
      close: (json['close'] as num).toDouble(),
      volume: (json['volume'] as num).toDouble(),
      adjHigh: (json['adj_high'] as num?)?.toDouble(),
      adjLow: (json['adj_low'] as num?)?.toDouble(),
      adjClose: (json['adj_close'] as num?)?.toDouble(),
      adjOpen: (json['adj_open'] as num?)?.toDouble(),
      adjVolume: (json['adj_volume'] as num?)?.toDouble(),
      splitFactor: (json['split_factor'] as num).toDouble(),
      dividend: (json['dividend'] as num).toDouble(),
      symbol: json['symbol'] as String,
      exchange: json['exchange'] as String,
      date: DateTime.parse(json['date'] as String),
    );

Map<String, dynamic> _$DailyDataToJson(DailyData instance) {
  final val = <String, dynamic>{
    'open': instance.open,
    'high': instance.high,
    'low': instance.low,
    'close': instance.close,
    'volume': instance.volume,
  };

  void writeNotNull(String key, dynamic value) {
    if (value != null) {
      val[key] = value;
    }
  }

  writeNotNull('adj_high', instance.adjHigh);
  writeNotNull('adj_low', instance.adjLow);
  writeNotNull('adj_close', instance.adjClose);
  writeNotNull('adj_open', instance.adjOpen);
  writeNotNull('adj_volume', instance.adjVolume);
  val['split_factor'] = instance.splitFactor;
  val['dividend'] = instance.dividend;
  val['symbol'] = instance.symbol;
  val['exchange'] = instance.exchange;
  val['date'] = instance.date.toIso8601String();
  return val;
}
