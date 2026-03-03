# QUAL2000 – Assignment 2
Author: Aidan Wittish

## Overview

This project is an Event Check-In System built using Node.js.
It allows users to register attendees, check them in, and generate attendance reports.

## Requirements

* Node.js installed

## Project Files

* `checkinApp.js` – Main application logic
* `eventRepository.js` – File persistence for integration tests
* `checkinApp.test.js` – Unit tests
* `checkinApp.integration.test.js` – Integration tests
* `package.json` – Project configuration

## How to Run the Application

This project does not include a user interface. It is a logic-based application.

If you want to run the main file manually:

node checkinApp.js

## How to Use Your Own Test Code

I included a sample of test code in the bottom of the checkinApp.js file.

If you wish to run some code of your own to test it, it is shown there

## How to Run Tests

This project uses Node’s built-in test runner.

To run all tests:

npm test

Or:

node --test

This will run both:

* Unit tests
* Integration tests
