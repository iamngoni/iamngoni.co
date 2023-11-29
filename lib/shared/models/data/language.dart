//
//  iamngoni_co
//  language
//
//  Created by Ngonidzashe Mangudya on 29/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

enum Language {
  english('English', 'en'),
  spanish('Spanish', 'es'),
  french('French', 'fr'),
  german('German', 'de'),
  chineseSimplified('Chinese (simplified)', 'zh'),
  chineseTraditional('Chinese (traditional)', 'zh'),
  japanese('Japanese', 'ja'),
  korean('Korean', 'ko'),
  arabic('Arabic', 'ar'),
  italian('Italian', 'it'),
  portuguese('Portuguese', 'pt'),
  russian('Russian', 'ru'),
  dutch('Dutch', 'nl'),
  swedish('Swedish', 'sv'),
  norwegian('Norwegian', 'no'),
  danish('Danish', 'da'),
  finnish('Finnish', 'fi'),
  greek('Greek', 'el'),
  turkish('Turkish', 'tr'),
  hindi('Hindi', 'hi'),
  englishUS('English (US)', 'en'),
  englishUK('English (UK)', 'en'),
  zulu('Zulu', 'zu');

  const Language(this.name, this.code);
  final String name;
  final String code;

  @override
  String toString() => name;
}
