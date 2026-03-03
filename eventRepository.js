//THis is a note saying that I had heavy AI assistance in writing this code.
//I never like doing this, but I am having a hard time understanding integration testing.
//It was either not do this section, and have most of my assignment missing, or have AI help
//me with the code so I can turn in a mostly completed assignment. I am having a hard time truly
//grasping the concept and I am not sure why. I don't really do well on assignments where I have basically
//free reign with minimal direction

//Truth be told, I don't fully understand this file, but what I have gathered is that since
//I am not using a database for this assignment, I have to save the events to a file in order to test the integration of my functions.

const fs = require("fs");

const FILE_PATH = "./events.json";

// Save events to file
const saveEvents = (events) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2)); //Write the events array to a file in JSON format, with indentation for readability.
};

// Load events from file
const loadEvents = () => {
  if (!fs.existsSync(FILE_PATH)) {
    //if the file does not exist, return an empty array
    return [];
  }

  //Read the contents of the file and parse it as JSON to return the list of events. If the file does not exist, it returns an empty array.
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

module.exports = {
  saveEvents,
  loadEvents,
  FILE_PATH,
};
