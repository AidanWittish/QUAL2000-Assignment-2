//This is another note relating to the one I made in the eventRepository.js file.
//As I mentioned I am having a really hard time grasping how to write integration tests.
//It is likely my fault for not using a database for this and instead that file.
//I had some AI help getting started, but I better understand here what the tests do.
//I'm just not quite sure how it connects to the eventRepo file and how to write that file.

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs"); // Importing the fs module to handle file operations for the integration test

const {
  Event,
  registerAttendee,
  checkInAttendee,
  generateReport,
  generateConsoleReport,
} = require("../checkinApp.js");

const { saveEvents, loadEvents, FILE_PATH } = require("../eventRepository.js");

// Cleanup after each test
test.afterEach(() => {
  if (fs.existsSync(FILE_PATH)) {
    fs.unlinkSync(FILE_PATH);
  }
});

//This test checks the integration of registering an attendee, saving the event to a file,
//and then loading it back to verify that the attendee information is preserved correctly.
test("Integration: Register attendee → stored → retrieved correctly", () => {
  const event = new Event(1, "Integration Event", "2025-12-01", 100);

  registerAttendee(event, "Alice", "alice@email.com");

  saveEvents([event]);

  const loadedEvents = loadEvents();

  assert.strictEqual(loadedEvents.length, 1);
  assert.strictEqual(loadedEvents[0].attendees.length, 1);
  assert.strictEqual(loadedEvents[0].attendees[0].email, "alice@email.com");
});

//this test simulates the full workflow of registering an attendee, checking them in,
//saving the event, and then loading it back to verify that the check-in status is preserved correctly in the generated report.
test("Integration: Register + Check-in → report correct after reload", () => {
  const event = new Event(2, "Workflow Event", "2025-12-02", 100);

  registerAttendee(event, "Bob", "bob@email.com");
  checkInAttendee(event, "bob@email.com");

  saveEvents([event]);

  const loadedEvents = loadEvents();
  const loadedEvent = loadedEvents[0];

  const report = generateReport(loadedEvent);

  assert.strictEqual(report.totalRegistered, 1);
  assert.strictEqual(report.totalCheckedIn, 1);
});

//THis test simulates the entire workflow from event creation to report generation, including multiple attendees and check-ins,
//to ensure that all components of the application work together seamlessly and that the final report reflects the correct state of the event after being saved and loaded.
test("Integration: Full workflow from event creation to report", () => {
  const event = new Event(3, "Full Workflow Event", "2025-12-03", 100);

  registerAttendee(event, "Alice", "alice@email.com");
  registerAttendee(event, "Charlie", "charlie@email.com");

  checkInAttendee(event, "alice@email.com");

  saveEvents([event]);

  const loadedEvents = loadEvents();
  const loadedEvent = loadedEvents[0];

  const report = generateReport(loadedEvent);

  assert.strictEqual(report.totalRegistered, 2);
  assert.strictEqual(report.totalCheckedIn, 1);
  assert.strictEqual(report.checkedInAttendees[0].email, "alice@email.com");
});
