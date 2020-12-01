# Dico2Cite

A french version of the famous Urban Dictionnary, build with React Native with love

pré installation :
- npm install react-native-cli -g
- npm install npm@latest -g
- npm install pnpm@latest -g

pré requirement :
https://www.mathworks.com/help/supportpkg/android/ug/install-android-sdk-platform-packages-and-sdk-tools.html

Add System Variable : 
JAVA_HOME=jdk
ANDROID_HOME=C:\Users\User\AppData\Local\Android\Sdk
GRADLE_HOME=C:Gradle

Edit System Variable & Users Variable
PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

pré launchement :
- react-native link
- cd android folder and gradle clean
- react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
- npm start -- --reset-cache

au 21/10/2019 est utilisé yarn install et yarn start