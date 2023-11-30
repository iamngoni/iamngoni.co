import 'package:flutter/material.dart';
import 'package:handy_extensions/handy_extensions.dart';
import 'package:localregex/localregex.dart';
import 'package:relative_scale/relative_scale.dart';

import '../../../../../gen/assets.gen.dart';
import '../../../../../shared/utils/extensions.dart';
import '../../core/configs/app_colors.dart';
import '../../core/widgets/app_button.dart';
import '../widgets/partners_row.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  final TextEditingController mobileNumberController = TextEditingController();

  final TextEditingController firstNameController = TextEditingController();

  final TextEditingController lastNameController = TextEditingController();

  final TextEditingController nationalIdController = TextEditingController();

  final TextEditingController emailController = TextEditingController();

  final TextEditingController dateOfBirthController = TextEditingController();

  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return RelativeBuilder(
      builder: (context, height, width, sy, sx) {
        return Scaffold(
          body: SafeArea(
            child: SingleChildScrollView(
              child: Container(
                height: context.height,
                width: context.width,
                padding: EdgeInsets.symmetric(
                  horizontal: sx(20),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Image(
                        image: AssetImage(
                          Assets.shopperschoice.images.shoppersChoiceLogo.path,
                        ),
                        height: sy(35),
                      ),
                    ),
                    SizedBox(
                      height: sy(15),
                    ),
                    const PartnersRow(),
                    SizedBox(
                      height: sy(15),
                    ),
                    Container(
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
                            fontSize: sy(8),
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
                      height: sy(10),
                    ),
                    Row(
                      children: [
                        Expanded(
                          child: Container(
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
                              controller: firstNameController,
                              decoration: InputDecoration(
                                hintText: 'Jokoniya',
                                hintStyle: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.normal,
                                  fontSize: sy(8),
                                ),
                                labelText: 'First Name',
                                labelStyle: TextStyle(
                                  color: Colors.grey,
                                  fontWeight: FontWeight.normal,
                                  fontSize: sy(8),
                                ),
                                border: InputBorder.none,
                              ),
                              keyboardType: TextInputType.phone,
                              autovalidateMode:
                                  AutovalidateMode.onUserInteraction,
                              validator: (String? firstname) {
                                if (firstname!.isEmpty) {
                                  return 'First name is missing!';
                                }

                                return null;
                              },
                            ),
                          ),
                        ),
                        SizedBox(
                          width: sx(20),
                        ),
                        Expanded(
                          child: Container(
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
                              controller: lastNameController,
                              decoration: InputDecoration(
                                hintText: 'Gundamwenda',
                                hintStyle: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.normal,
                                  fontSize: sy(8),
                                ),
                                labelText: 'Last Name',
                                labelStyle: TextStyle(
                                  color: Colors.grey,
                                  fontWeight: FontWeight.normal,
                                  fontSize: sy(8),
                                ),
                                border: InputBorder.none,
                              ),
                              keyboardType: TextInputType.phone,
                              autovalidateMode:
                                  AutovalidateMode.onUserInteraction,
                              validator: (String? lastname) {
                                if (lastname!.isEmpty) {
                                  return 'Last name is missing!';
                                }

                                return null;
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: sy(7),
                    ),
                    Text(
                      'As it appears on your identity documents',
                      style: TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.normal,
                        fontSize: sy(8),
                      ),
                    ),
                    SizedBox(
                      height: sy(7),
                    ),
                    Container(
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
                        controller: nationalIdController,
                        decoration: InputDecoration(
                          hintText: '75-757575 A75',
                          hintStyle: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.normal,
                            fontSize: sy(8),
                          ),
                          labelText: 'National ID',
                          labelStyle: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                            fontSize: sy(8),
                          ),
                          border: InputBorder.none,
                        ),
                        keyboardType: TextInputType.phone,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        validator: (String? id) {
                          if (id!.isEmpty) {
                            return 'National ID is missing!';
                          }

                          if (!LocalRegex.isZimID(id)) {
                            return 'National ID is invalid!';
                          }

                          return null;
                        },
                      ),
                    ),
                    SizedBox(
                      height: sy(10),
                    ),
                    Container(
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
                        controller: emailController,
                        decoration: InputDecoration(
                          hintText: 'name@domain.co.zw',
                          hintStyle: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.normal,
                            fontSize: sy(8),
                          ),
                          labelText: 'Email Address',
                          labelStyle: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                            fontSize: sy(8),
                          ),
                          border: InputBorder.none,
                        ),
                        keyboardType: TextInputType.phone,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        validator: (String? lastname) {
                          if (lastname!.isEmpty) {
                            return 'Last name is missing!';
                          }

                          return null;
                        },
                      ),
                    ),
                    SizedBox(
                      height: sy(10),
                    ),
                    Container(
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
                        controller: dateOfBirthController,
                        decoration: InputDecoration(
                          hintText: 'YYYY-MM-DD',
                          hintStyle: TextStyle(
                            color: Colors.black,
                            fontWeight: FontWeight.normal,
                            fontSize: sy(8),
                          ),
                          labelText: 'Date of Birth',
                          labelStyle: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                            fontSize: sy(8),
                          ),
                          border: InputBorder.none,
                        ),
                        keyboardType: TextInputType.phone,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        validator: (String? dateofbirth) {
                          if (dateofbirth!.isEmpty) {
                            return 'Date of Birth is missing!';
                          }

                          if (!LocalRegex.isDate(dateofbirth)) {
                            return 'Invalid date format! Use YYYY-MM-DD';
                          }

                          return null;
                        },
                      ),
                    ),
                    SizedBox(
                      height: sy(5),
                    ),
                    Text(
                      'As it appears on your identity documents',
                      style: TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.normal,
                        fontSize: sy(8),
                      ),
                    ),
                    SizedBox(
                      height: sy(10),
                    ),
                    const AppButton(
                      buttonText: 'Register / Sign Up',
                    ),
                    SizedBox(
                      height: sy(20),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Have an account?',
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
                          onTap: () => context.goBack(),
                          child: Text(
                            'Login',
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
            ),
          ),
        );
      },
    );
  }
}
