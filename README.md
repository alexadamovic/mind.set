# mind.set

#### A React Native mobile application to help boost your mood 😊

#### By Alex Adamovic

## Screenshots

![image](/mind.set/assets/logo_screenshot.png) ![image](/mind.set/assets/screenshot2.png) ![image](/mind.set/assets/screenshot3.png)

## Technologies & Frameworks Used

* _TypeScript_
* _JavaScript_
* _React Native_
* _Expo CLI_
* _Firebase / Firestore_
* _Android Studio (for development purposes)_

### Dependencies

* _React Native Elements_
* _React Navigation_
* _OpenAI_
* _dotenv_
* _webpack_

## Description

_mind.set is a platform where users are encouraged to get into a positive frame of mind by logging short entries that require the user to recall and track their own good memories and life events, list positive traits about themselves, and give themselves compliments and words of encouragement. Unlike a typical mental health tracking app, mind.set is all about giving the user encouragement throughout their day by letting them interact with their own self-generated positive content. Everything is personalized because YOU are the one writing content for yourself. Currently, the app can be used in one of two ways: A user will log on to create content when they are so inclined, or the user will log on to randomly retrieve a set of entries that they have previously written when they need a quick mood boost._

_mind.set also serves as a showcase for the possibilities of OpenAI API integration, and how AI could be an effective tool in assisting mental health professionals in the future. At the click of a button, the user is able to make a call to the GPT-3 AI's most advanced engine, DaVinci-002, which takes the set of randomly pulled entries on screen and formulates a cohesvive "pep talk" to give to the user. Although the functionality is very basic, it serves as a demonstration of AI training and the ability to respond to a user on a personal level given proper data._

## Component Navigation Structure

![image](/mind.set/assets/component_navigation.png)

## Setup/Installation Requirements

### Expo CLI Installation

* _enter ```$ _npm install --global expo-cli``` to install Expo globally_
* _[Expo Documentation](https://docs.expo.dev/)_

### Project Installation

* _clone repository from https://github.com/alexadamovic/mind.set_
* _navigate to the ```mind.set``` folder in the main project directory in your terminal/command line_
* _enter ```$ npm install``` to install project dependencies_

### Firebase & Firestore Setup

* _sign up for a free account at [Firebase](https://firebase.google.com/)_
* _navigate to your dashboard and click the icon to "Add project"_
* _follow the steps to create a new project (Google Analytics is optional and will not effect the project function)_
* _further steps will be completed from your project page_

#### Enable Firebase Authentication

* _using the sidebar, click ```Authentication``` under the ```Build``` tab_
* _once on the Authentication page, click the ```Sign-in Method``` navigation at the top_
* _under Sign-in providers click ```Add new provider```_
* _select Email/Password_

#### Firestore Database

* _using the sidebar, click ```Firestore Database``` under the ```Build``` tab_
* _click on the ```Create database``` button_
* _on the popup, make sure that "Start in test mode" is selected before clicking next (this will allow read/write privileges for 30 days)_
* _click ```enable``` on the next popup_

#### Add Firebase to Your Web App

* _on the project overview page, click the button marked ```</>```_
* _give the project a nickname (do not set up hosting)_
* _copy and paste the following block of code provided by firebase that looks lke the code below into a blank text file for later use (note that I have replaced values with generic placeholders):_

```
const firebaseConfig = {
  apiKey: "YOUR-UNIQUE-CREDENTIALS",
  authDomain: "YOUR-PROJECT-NAME.firebaseapp.com",
  projectId: "YOUR-UNIQUE-PROJECT-NAME",
  storageBucket: "YOUR-UNIQUE-URL",
  messagingSenderId: "YOUR-UNIQUE-CREDENTIALS",
  appId: "YOUR-UNIQUE-APPID",
};
```

### OpenAI setup

* _sign up for a free account at [OpenAI](https://openai.com/api/)_
* _on your personal homepage, open your account menu in the upper righthand corner and click on ```View API keys```_
* _copy your current API key and add it to the text document that you stored your firebase configuration information_

### Creating Your .env File

*
