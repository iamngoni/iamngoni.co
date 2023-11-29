import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:injectable/injectable.dart';

import '../../models/data/language.dart';
import '../../utils/services.dart';

part 'locale_event.dart';
part 'locale_state.dart';

@injectable
class LocaleBloc extends Bloc<LocaleEvent, Language> {
  LocaleBloc() : super(Language.english) {
    on<SwitchLocale>((event, emit) {
      emit(event.language);
      $storage.saveToDisk('locale', event.language.code);
    });
    on<LoadLocale>((event, emit) {
      final locale = $storage.getFromDisk('locale');
      if (locale == null) {
        emit(Language.english);
      } else {
        final Language? language = Language.values.firstWhereOrNull(
          (e) => e.code == locale,
        );
        if (language == null) {
          emit(Language.english);
        } else {
          emit(language);
        }
      }
    });
  }
}
