//
//  iamngoni_co
//  show_login_bottom_modal
//
//  Created by Ngonidzashe Mangudya on 30/11/2023.
//  Copyright (c) 2023 ModestNerds, Co
//

import 'package:flutter/material.dart';
import 'package:localregex/localregex.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../../../shared/utils/extensions.dart';
import '../../views/pages/home.dart';
import '../../views/pages/sign_up.dart';
import '../../views/widgets/partners_row.dart';
import '../configs/app_colors.dart';
import '../widgets/app_button.dart';

showLoginBottomModal(BuildContext context) {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController mobileNumberController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  showMaterialModalBottomSheet(
    backgroundColor: AppColors.scaffoldWhite,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.only(
        topRight: Radius.circular(20),
        topLeft: Radius.circular(20),
      ),
    ),
    elevation: 2,
    context: context,
    builder: (context) => RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          height:
              MediaQuery.of(context).viewInsets.bottom == 0 ? sy(300) : sy(470),
          decoration: const BoxDecoration(
            color: AppColors.scaffoldWhite,
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(20),
              topLeft: Radius.circular(20),
            ),
          ),
          child: Form(
            key: formKey,
            child: Column(
              children: [
                SizedBox(
                  height: sy(15),
                ),
                const PartnersRow(),
                SizedBox(
                  height: sy(10),
                ),
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: sx(20),
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: sx(20),
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.2),
                        spreadRadius: 1,
                        blurRadius: 1,
                        offset: const Offset(1, 1),
                      ),
                    ],
                  ),
                  child: TextFormField(
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.normal,
                      fontSize: sy(9),
                    ),
                    controller: mobileNumberController,
                    decoration: InputDecoration(
                      hintText: '263771111111',
                      hintStyle: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.normal,
                        fontSize: sy(9),
                      ),
                      labelText: 'Cellphone Number',
                      labelStyle: TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.normal,
                        fontSize: sy(8),
                      ),
                      border: InputBorder.none,
                    ),
                    keyboardType: TextInputType.phone,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (String? mobile) {
                      if (mobile!.isEmpty) {
                        return 'Cellphone number is missing!';
                      }

                      if (!LocalRegex.isZimMobile(mobile)) {
                        return 'Cellphone number is an invalid Zim number!';
                      }

                      return null;
                    },
                  ),
                ),
                SizedBox(
                  height: sy(15),
                ),
                Container(
                  margin: EdgeInsets.symmetric(
                    horizontal: sx(20),
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: sx(20),
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.2),
                        spreadRadius: 1,
                        blurRadius: 1,
                        offset: const Offset(1, 1),
                      ),
                    ],
                  ),
                  child: TextFormField(
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.normal,
                      fontSize: sy(9),
                    ),
                    controller: passwordController,
                    decoration: InputDecoration(
                      hintText: '********',
                      hintStyle: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.normal,
                        fontSize: sy(9),
                      ),
                      labelText: 'Password',
                      labelStyle: TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.normal,
                        fontSize: sy(8),
                      ),
                      border: InputBorder.none,
                      suffixIcon: const Icon(
                        Icons.remove_red_eye_outlined,
                        color: Colors.grey,
                      ),
                    ),
                    keyboardType: TextInputType.text,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (String? password) {
                      if (password!.isEmpty) {
                        return 'Password is missing!';
                      }

                      return null;
                    },
                  ),
                ),
                SizedBox(
                  height: sy(10),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: sx(20),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Forgot Password?',
                        style: TextStyle(
                          color: Colors.black54,
                          fontWeight: FontWeight.w400,
                          fontSize: sy(8),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: sy(10),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: sx(20),
                  ),
                  child: AppButton(
                    buttonText: 'Login',
                    onTap: () => context.goTo(
                      page: const HomePage(),
                    ),
                  ),
                ),
                SizedBox(
                  height: sy(20),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Don't have an account?",
                      style: TextStyle(
                        color: Colors.black54,
                        fontWeight: FontWeight.w400,
                        fontSize: sy(8),
                      ),
                    ),
                    SizedBox(
                      width: sx(5),
                    ),
                    InkWell(
                      onTap: () => context.goTo(
                        page: const SignUpPage(),
                      ),
                      child: Text(
                        'Register / Sign Up',
                        style: TextStyle(
                          color: AppColors.orange,
                          fontWeight: FontWeight.bold,
                          fontSize: sy(8),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    ),
  );
}
