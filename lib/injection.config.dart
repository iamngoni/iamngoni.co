// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:get_it/get_it.dart' as _i1;
import 'package:iamngoni_co/shared/services/network.dart' as _i5;
import 'package:iamngoni_co/shared/services/secure_storage.dart' as _i6;
import 'package:iamngoni_co/shared/services/storage.dart' as _i10;
import 'package:iamngoni_co/shared/state/connectivity_status/connectivity_status_bloc.dart'
    as _i3;
import 'package:iamngoni_co/shared/state/locale/locale_bloc.dart' as _i4;
import 'package:iamngoni_co/site/apps/marketstack/market/blocs/stocks/stocks_bloc.dart'
    as _i11;
import 'package:iamngoni_co/site/apps/marketstack/market/models/repos/base/stocks_repository.dart'
    as _i8;
import 'package:iamngoni_co/site/apps/marketstack/market/models/repos/impl/istocks_repository.dart'
    as _i9;
import 'package:iamngoni_co/site/apps/parkade/parkade_slot_selection/blocs/slot_selection/slot_selection_bloc.dart'
    as _i7;
import 'package:injectable/injectable.dart' as _i2;

extension GetItInjectableX on _i1.GetIt {
// initializes the registration of main-scope dependencies inside of GetIt
  _i1.GetIt init({
    String? environment,
    _i2.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i2.GetItHelper(
      this,
      environment,
      environmentFilter,
    );
    gh.factory<_i3.ConnectivityStatusBloc>(() => _i3.ConnectivityStatusBloc());
    gh.factory<_i4.LocaleBloc>(() => _i4.LocaleBloc());
    gh.singletonAsync<_i5.NetworkService>(
        () => _i5.NetworkService.getInstance());
    gh.singletonAsync<_i6.SecureStorageService>(
        () => _i6.SecureStorageService.getInstance());
    gh.factory<_i7.SlotSelectionBloc>(() => _i7.SlotSelectionBloc());
    gh.lazySingleton<_i8.StocksRepository>(() => _i9.StocksRepositoryImpl());
    gh.singletonAsync<_i10.StorageService>(
        () => _i10.StorageService.getInstance());
    gh.factory<_i11.StocksBloc>(
        () => _i11.StocksBloc(repository: gh<_i8.StocksRepository>()));
    return this;
  }
}
