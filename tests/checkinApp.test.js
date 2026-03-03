//Aidan Wittish
//QUAL2000 Assignment 2

//imports
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  Event,
  Attendee,
  registerAttendee,
  checkInAttendee,
  generateReport,
  generateConsoleReport,
} = require("../checkinApp.js");

test.describe("Testing the functions in checkinApp.js", () => {
  //This tests the registerAttendee function by creating a new event and registering an attendee.
  test("Should register an attendee successfully", () => {
    const event = new Event(1, "Test Event", "2024-12-31", 100);
    registerAttendee(event, "John Doe", "john@email.com");
    assert.strictEqual(event.attendees.length, 1);
    assert.strictEqual(event.attendees[0].name, "John Doe");
    assert.strictEqual(event.attendees[0].email, "john@email.com");
  });

  //This test makes sure that you can't register more attendees than the event's capacity allows.
  test("Should not allow registration when event capacity is reached", () => {
    const event = new Event(1, "Test Event", "2024-12-31", 1);
    registerAttendee(event, "John Doe", "john@email.com");
    assert.throws(() => registerAttendee(event, "Jane Doe", "jane@email.com"));
  });

  //This test makes sure that you can't make a duplicate registration for the same email.
  test("Should not allow duplicate registrations", () => {
    const event = new Event(1, "Test Event", "2024-12-31", 100);
    registerAttendee(event, "John Doe", "john@email.com");
    assert.throws(() => registerAttendee(event, "Jane Doe", "john@email.com"));
  });

  //This tests the checkInAttendee function by creating a new event, registering an attendee, and then checking in that attendee.
  test("Should check in an attendee successfully", () => {
    const event = new Event(2, "Another Event", "2025-01-01", 100);
    registerAttendee(event, "Jane Doe", "jane@example.com");
    checkInAttendee(event, "jane@example.com");
    assert.strictEqual(event.attendees[0].checkedIn, true);
  });

  //This tests the generateReport function by creating a new event, registering multiple attendees, checking in one of them, and then generating a report.
  test("Should generate a report correctly", () => {
    const event = new Event(3, "Report Event", "2025-02-01", 100);
    registerAttendee(event, "Alice Smith", "alice@example.com");
    registerAttendee(event, "Bob Johnson", "bob@example.com");
    checkInAttendee(event, "alice@example.com");
    const report = generateReport(event);
    assert.strictEqual(report.totalRegistered, 2);
    assert.strictEqual(report.totalCheckedIn, 1);
  });

  //This tests the generateConsoleReport function by creating a new event, registering an attendee, and then generating a console report.
  test("Should generate a console report without errors", () => {
    const event = new Event(4, "Console Report Event", "2025-03-01", 100);
    registerAttendee(event, "Charlie Brown", "charlie@example.com");
    generateConsoleReport(event);
  });
});
