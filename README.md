# Iskaypet Project

The app provides a user-friendly interface for discovering nearby stores on a map. Users can easily identify the distance to each store from their current location, access additional details about the stores, and simulate a check-in process.

## Features

- Perform checkin at specific stores.
- Uses a custom modal for task checkin due to issues with the checkin API.
- Requests and manages geolocation permissions.
- Updates the interface based on geolocation permissions to display the distance to the location.

### Important Notes

- **Carousel Third Party Library:**

  - During module installation, a patch is applied using `patch-package` to address deprecated type issues in the `react-native-snap-carousel` library. This ensures compatibility and resolves any potential conflicts.

- **IPA Generation:**

  - Use the `bundle exec fastlane ios build_ios` command to generate the IPA file. Note that without a paid account in the Apple Developer Console, an Ad-Hoc file cannot be generated for private distribution without being on the App Store.

- **AAB Generation:**

  - Use the `bundle exec fastlane android build_android` command to generate the AAB file for Android.

## Getting Started

Follow these steps to get started with the project:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd checkin-tasks-app`
3. Install dependencies: `npm install` or `yarn install`
4. Run the application: `npm start` or `yarn start`

## Running Tests

The project includes a suite of tests to ensure the reliability and functionality of its features. You can run the tests using the following command:

```bash
yarn test
```
