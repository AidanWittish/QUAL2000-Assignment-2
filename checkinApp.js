//This class represents an attendee of an event,
//it has properties for the attendee's name, email, and check-in status.
class Attendee {
  constructor(name, email) {
    this.name = name; //the name of the attendee
    this.email = email; //the email of the attendee, which is used as a unique identifier for registration and check-in
    this.checkedIn = false; //a boolean property that indicates whether the attendee has checked in to the event, initialized to false by default
  }
}

//This class represents an event,
//it has properties for the event's id, name, date, capacity, and a list of attendees.
class Event {
  constructor(id, name, date, capacity = Infinity) {
    //the capacity defaults to Infinity if not provided, allowing for unlimited attendees
    this.id = id; //the unique identifier for the event
    this.name = name; //the name of the event
    this.date = date; //the date of the event
    this.capacity = capacity; //the maximum number of attendees allowed for the event
    this.attendees = []; //an array to hold the attendees registered for the event
  }
}

//This function registers an attendee for a given event
//It checks for valid email format, event capacity,
//and duplicate registrations before adding the attendee to the event's list.
const registerAttendee = (event, name, email) => {
  if (!name || !email) {
    //if the name or email is missing or empty, throw an error
    throw new Error("Name and email are required.");
  }

  if (!email.includes("@")) {
    //if the email does not contain an "@" symbol, it is considered invalid
    throw new Error("Invalid email format.");
  }

  if (event.attendees.length >= event.capacity) {
    //if the number of attendees has reached the event's capacity, it throws an error
    throw new Error("Event capacity reached.");
  }

  const exists = event.attendees.find((a) => a.email === email); //if an attendee with the same email already exists in the event's attendees list, it throws an error
  if (exists) {
    throw new Error("Email already registered.");
  }

  const attendee = new Attendee(name, email);
  event.attendees.push(attendee);
};

//THis function checks in an attendee for a given event by their email.
//It verifies that the attendee is registered before marking them as checked in.
const checkInAttendee = (event, email) => {
  //it searches for the attendee in the event's attendees list using their email as a unique identifier.
  //If the attendee is not found, it throws an error indicating that the attendee is not registered.
  //If the attendee is found, it updates their checkedIn property to true, indicating that they have successfully checked in to the event.
  const attendee = event.attendees.find((a) => a.email === email);

  if (!attendee) {
    throw new Error("Attendee not registered.");
  }

  attendee.checkedIn = true;
};

//This function generates a report for a given event, summarizing the total number of registered attendees,
//the total number of checked-in attendees, and a list of checked-in attendees with their names and emails.
const generateReport = (event) => {
  const totalRegistered = event.attendees.length; //the total number of registered attendees is calculated by getting the length of the event's attendees array.
  const checkedInList = event.attendees.filter((a) => a.checkedIn); //the list of checked-in attendees is created by filtering the event's attendees array to include only those attendees whose checkedIn property is true.
  const totalCheckedIn = checkedInList.length; //the total number of checked-in attendees is calculated by getting the length of the checkedInList array.

  return {
    eventName: event.name,
    totalRegistered,
    totalCheckedIn,
    checkedInAttendees: checkedInList.map((a) => ({
      name: a.name,
      email: a.email,
    })),
  };
};

//This function generates a console report for a given event by calling the generateReport function
const generateConsoleReport = (event) => {
  const report = generateReport(event);

  console.log("Event:", report.eventName);
  console.log("Total Registered:", report.totalRegistered);
  console.log("Total Checked In:", report.totalCheckedIn);
  console.log("Checked-In Attendees:");

  report.checkedInAttendees.forEach((a) => {
    console.log(`- ${a.name} (${a.email})`);
  });
};

module.exports = {
  Event,
  Attendee,
  registerAttendee,
  checkInAttendee,
  generateReport,
  generateConsoleReport,
};
