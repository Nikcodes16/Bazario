# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Optimize and shrink React Native Firebase native structures
-keep class io.invertase.firebase.** { *; }
-dontwarn io.invertase.firebase.**

# Strip out unnecessary metadata from Notifee notifications
-keep class io.invertase.notifee.** { *; }
-dontwarn io.invertase.notifee.**

# Remove tracking names and source file lines from the native error logs
-printmapping mapping.txt
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable