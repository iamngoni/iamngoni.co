//
//  iamngoni_co
//  app
//
//  Created by Ngonidzashe Mangudya on 30/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../../../shared/configs/colors.dart';
import '../../models/letter.dart';

class LinguaApp extends StatefulWidget {
  const LinguaApp({super.key});

  @override
  State<LinguaApp> createState() => _LinguaAppState();
}

class _LinguaAppState extends State<LinguaApp> {
  final TextEditingController _fieldController = TextEditingController();
  final List<String> _tabs = ['Test Words', 'Favorite'];

  List<String> favourites = [];

  int _index = 0;
  bool _isOpen = false;
  bool shouldPlay = false;

  late Letter _ltr;

  void showUnShowField() {
    setState(() {
      _isOpen = !_isOpen;
    });
  }

  void processWord(String word) {
    setState(() {
      shouldPlay = false;
    });
    final List<Letter> images = [];
    for (int i = 0; i < word.length; i++) {
      final Letter letter = getWordImagePath(word[i]);
      images.add(letter);
    }

    playVideo(images);
  }

  reciteAlphabet() {
    setState(() {
      shouldPlay = false;
    });
    playVideo(Letter.values);
  }

  Letter getWordImagePath(String character) {
    final Letter item = Letter.values
        .where(
          (Letter letter) =>
              letter.letter.toLowerCase() == character.toLowerCase(),
        )
        .first;
    return item;
  }

  Future<void> playVideo(List<Letter> images) async {
    int index = 0;
    final int length = images.length;
    setState(() {
      _ltr = images[index];
      shouldPlay = true;
    });

    index = index + 1;
    while (index < length) {
      await Future.delayed(const Duration(seconds: 1), () {
        setState(() {
          _ltr = images[index];
        });
      });
      index = index + 1;
    }
    _fieldController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Scaffold(
          backgroundColor: Colors.black,
          floatingActionButton: FloatingActionButton(
            backgroundColor: const Color(0xFF032059),
            onPressed: showUnShowField,
            child: Icon(
              Icons.keyboard,
              color: Colors.white,
              size: sy(15),
            ),
          ),
          resizeToAvoidBottomInset: false,
          body: SafeArea(
            child: SingleChildScrollView(
              child: SizedBox(
                height: context.height,
                width: context.width,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Column(
                      children: [
                        SizedBox(
                          height: context.height * 0.6,
                          child: shouldPlay == true
                              ? Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image(
                                      image: AssetImage(_ltr.path),
                                      width: sy(50),
                                      color: Colors.white,
                                    ),
                                    SizedBox(
                                      height: sy(20),
                                    ),
                                    Text(
                                      _ltr.letter.toUpperCase(),
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: sy(20),
                                      ),
                                    ),
                                  ],
                                )
                              : renderNothing(),
                        ),
                        Container(
                          height: context.height * 0.4,
                          width: context.width,
                          color: Colors.white,
                          child: ListView(
                            children: [
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 8,
                                ),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: _tabs.map((tabItem) {
                                    return GestureDetector(
                                      onTap: () {
                                        setState(() {
                                          _index = _tabs.indexOf(tabItem);
                                        });
                                      },
                                      child: Column(
                                        children: [
                                          Text(
                                            tabItem,
                                            style: const TextStyle(
                                              color: Color(0xFF032059),
                                              fontWeight: FontWeight.bold,
                                              fontSize: 18,
                                            ),
                                          ),
                                          Container(
                                            width: context.width * 0.2,
                                            height: 3,
                                            color:
                                                _tabs.indexOf(tabItem) == _index
                                                    ? const Color(0xFF032059)
                                                    : Colors.white,
                                          ),
                                        ],
                                      ),
                                    );
                                  }).toList(),
                                ),
                              ),
                              SizedBox(
                                width: context.width,
                                child: _index == 0
                                    ? Padding(
                                        padding: const EdgeInsets.all(8),
                                        child: testWords(),
                                      )
                                    : Padding(
                                        padding: const EdgeInsets.all(8),
                                        child: favoriteWords(),
                                      ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    if (_isOpen)
                      Positioned(
                        bottom: context.height * 0.45,
                        child: floatingTextField(),
                      )
                    else
                      const SizedBox.shrink(),
                    Positioned(
                      top: 10,
                      left: 20,
                      child: alphabetRecitor(),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget floatingTextField() {
    return PhysicalModel(
      elevation: 5,
      color: Colors.black,
      shadowColor: Colors.white,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 10,
        ),
        width: MediaQuery.of(context).size.width * 0.8,
        decoration: const BoxDecoration(
          color: Colors.white,
        ),
        child: TextField(
          controller: _fieldController,
          decoration: const InputDecoration(
            labelText: 'Word',
            border: InputBorder.none,
          ),
          onSubmitted: (String word) => processWord(
            word.replaceAll(RegExp(r'\s+\b|\b\s'), ''),
          ),
        ),
      ),
    );
  }

  Widget renderNothing() {
    return const SizedBox.shrink();
  }

  Widget alphabetRecitor() {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return GestureDetector(
          onTap: reciteAlphabet,
          child: Container(
            padding: EdgeInsets.symmetric(
              horizontal: sx(5),
              vertical: sy(2),
            ),
            decoration: BoxDecoration(
              color: SiteColors.green,
              boxShadow: [
                BoxShadow(
                  color: SiteColors.white.withOpacity(0.2),
                  spreadRadius: 1,
                  blurRadius: 1,
                  offset: const Offset(4, 4),
                ),
              ],
            ),
            child: Text(
              'Do The Alphabet  (Click Me)',
              style: TextStyle(
                color: SiteColors.dark,
                fontWeight: FontWeight.w700,
                fontSize: sy(10),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget testWords() {
    final List<String> words = [
      'bathroom',
      'come',
      'equality',
      'far',
      'farewell',
      'good',
      'hello',
      'i love you',
      'later',
      'letter',
      'like',
      'no',
      'ok',
      'perfect',
      'question',
      'sign language',
      'stare',
      'stop',
      'what are you doing',
      'wow',
    ];

    return GridView.builder(
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        childAspectRatio: 2,
      ),
      itemCount: words.length,
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () {
            processWord(
              words[index].replaceAll(
                RegExp(r'\s+\b|\b\s'),
                '',
              ),
            );
          },
          onDoubleTap: () {
            favourites.add(words[index]);
          },
          child: Container(
            alignment: Alignment.center,
            height: 10,
            margin: const EdgeInsets.all(5),
            decoration: BoxDecoration(
              color: const Color(
                0xFFF2F3FE,
              ),
              borderRadius: BorderRadius.circular(5),
            ),
            child: Text(
              words[index],
              style: const TextStyle(
                color: Colors.black,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        );
      },
    );
  }

  Widget favoriteWords() {
    return GridView.builder(
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        childAspectRatio: 2,
      ),
      itemCount: favourites.length,
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () {
            processWord(
              favourites[index].replaceAll(
                RegExp(r'\s+\b|\b\s'),
                '',
              ),
            );
          },
          onDoubleTap: () {
            setState(() {
              favourites.removeAt(index);
            });
          },
          child: Container(
            alignment: Alignment.center,
            height: 10,
            margin: const EdgeInsets.all(5),
            decoration: BoxDecoration(
              color: const Color(
                0xFFF2F3FE,
              ),
              borderRadius: BorderRadius.circular(5),
            ),
            child: Text(
              favourites[index],
              style: const TextStyle(
                color: Colors.black,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        );
      },
    );
  }
}
