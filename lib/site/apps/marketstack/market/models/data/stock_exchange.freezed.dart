// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'stock_exchange.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

StockExchange _$StockExchangeFromJson(Map<String, dynamic> json) {
  return _StockExchange.fromJson(json);
}

/// @nodoc
mixin _$StockExchange {
  String get name => throw _privateConstructorUsedError;
  String get acronym => throw _privateConstructorUsedError;
  String get mic => throw _privateConstructorUsedError;
  String get country => throw _privateConstructorUsedError;
  @JsonKey(name: 'country_code')
  String get countryCode => throw _privateConstructorUsedError;
  String get city => throw _privateConstructorUsedError;
  String get website => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $StockExchangeCopyWith<StockExchange> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $StockExchangeCopyWith<$Res> {
  factory $StockExchangeCopyWith(
          StockExchange value, $Res Function(StockExchange) then) =
      _$StockExchangeCopyWithImpl<$Res, StockExchange>;
  @useResult
  $Res call(
      {String name,
      String acronym,
      String mic,
      String country,
      @JsonKey(name: 'country_code') String countryCode,
      String city,
      String website});
}

/// @nodoc
class _$StockExchangeCopyWithImpl<$Res, $Val extends StockExchange>
    implements $StockExchangeCopyWith<$Res> {
  _$StockExchangeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? acronym = null,
    Object? mic = null,
    Object? country = null,
    Object? countryCode = null,
    Object? city = null,
    Object? website = null,
  }) {
    return _then(_value.copyWith(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      acronym: null == acronym
          ? _value.acronym
          : acronym // ignore: cast_nullable_to_non_nullable
              as String,
      mic: null == mic
          ? _value.mic
          : mic // ignore: cast_nullable_to_non_nullable
              as String,
      country: null == country
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String,
      countryCode: null == countryCode
          ? _value.countryCode
          : countryCode // ignore: cast_nullable_to_non_nullable
              as String,
      city: null == city
          ? _value.city
          : city // ignore: cast_nullable_to_non_nullable
              as String,
      website: null == website
          ? _value.website
          : website // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$StockExchangeImplCopyWith<$Res>
    implements $StockExchangeCopyWith<$Res> {
  factory _$$StockExchangeImplCopyWith(
          _$StockExchangeImpl value, $Res Function(_$StockExchangeImpl) then) =
      __$$StockExchangeImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String name,
      String acronym,
      String mic,
      String country,
      @JsonKey(name: 'country_code') String countryCode,
      String city,
      String website});
}

/// @nodoc
class __$$StockExchangeImplCopyWithImpl<$Res>
    extends _$StockExchangeCopyWithImpl<$Res, _$StockExchangeImpl>
    implements _$$StockExchangeImplCopyWith<$Res> {
  __$$StockExchangeImplCopyWithImpl(
      _$StockExchangeImpl _value, $Res Function(_$StockExchangeImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? acronym = null,
    Object? mic = null,
    Object? country = null,
    Object? countryCode = null,
    Object? city = null,
    Object? website = null,
  }) {
    return _then(_$StockExchangeImpl(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      acronym: null == acronym
          ? _value.acronym
          : acronym // ignore: cast_nullable_to_non_nullable
              as String,
      mic: null == mic
          ? _value.mic
          : mic // ignore: cast_nullable_to_non_nullable
              as String,
      country: null == country
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String,
      countryCode: null == countryCode
          ? _value.countryCode
          : countryCode // ignore: cast_nullable_to_non_nullable
              as String,
      city: null == city
          ? _value.city
          : city // ignore: cast_nullable_to_non_nullable
              as String,
      website: null == website
          ? _value.website
          : website // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$StockExchangeImpl extends _StockExchange {
  const _$StockExchangeImpl(
      {required this.name,
      required this.acronym,
      required this.mic,
      required this.country,
      @JsonKey(name: 'country_code') required this.countryCode,
      required this.city,
      required this.website})
      : super._();

  factory _$StockExchangeImpl.fromJson(Map<String, dynamic> json) =>
      _$$StockExchangeImplFromJson(json);

  @override
  final String name;
  @override
  final String acronym;
  @override
  final String mic;
  @override
  final String country;
  @override
  @JsonKey(name: 'country_code')
  final String countryCode;
  @override
  final String city;
  @override
  final String website;

  @override
  String toString() {
    return 'StockExchange(name: $name, acronym: $acronym, mic: $mic, country: $country, countryCode: $countryCode, city: $city, website: $website)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$StockExchangeImpl &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.acronym, acronym) || other.acronym == acronym) &&
            (identical(other.mic, mic) || other.mic == mic) &&
            (identical(other.country, country) || other.country == country) &&
            (identical(other.countryCode, countryCode) ||
                other.countryCode == countryCode) &&
            (identical(other.city, city) || other.city == city) &&
            (identical(other.website, website) || other.website == website));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, name, acronym, mic, country, countryCode, city, website);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$StockExchangeImplCopyWith<_$StockExchangeImpl> get copyWith =>
      __$$StockExchangeImplCopyWithImpl<_$StockExchangeImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$StockExchangeImplToJson(
      this,
    );
  }
}

abstract class _StockExchange extends StockExchange {
  const factory _StockExchange(
      {required final String name,
      required final String acronym,
      required final String mic,
      required final String country,
      @JsonKey(name: 'country_code') required final String countryCode,
      required final String city,
      required final String website}) = _$StockExchangeImpl;
  const _StockExchange._() : super._();

  factory _StockExchange.fromJson(Map<String, dynamic> json) =
      _$StockExchangeImpl.fromJson;

  @override
  String get name;
  @override
  String get acronym;
  @override
  String get mic;
  @override
  String get country;
  @override
  @JsonKey(name: 'country_code')
  String get countryCode;
  @override
  String get city;
  @override
  String get website;
  @override
  @JsonKey(ignore: true)
  _$$StockExchangeImplCopyWith<_$StockExchangeImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
