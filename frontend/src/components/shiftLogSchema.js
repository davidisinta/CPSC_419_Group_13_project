// Sample schema for a shift log
const shiftLog =  {
    employeeID: String,
    sessionID: String,
    shiftActivities: [shiftActivities]
}
const shiftActivities = {
    timestamp: Date, // When the activity was logged
    location: String, //e.g "Zone 1", "Zone 2", "Zone 3", "Zone 4"
    cluster: String, //e.g "Berkely", "Morse"
    activityType: String, //e.g "Update toner count", "Update paper count", "Update printer status"
    details: String //e.g "Toner count updated to 10", "Paper count updated to 100", "Printer status updated to 'Offline'"
}