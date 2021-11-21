async function allFacultiesDoubtsSlotsMapper (data) {
    const allFacultiesDoubtsSlots = new Map();
    const daysMapping = new Map([
    	["Monday",0],
        ["Tuesday",1],
        ["Wednesday",2],
        ["Thursday",3],
        ["Friday",4],
    ]);
    for(let obj in data) {
        
    	if (allFacultiesDoubtsSlots.has(data[obj]["name"])) {
        	var facultySlots = allFacultiesDoubtsSlots.get(data[obj]["name"]);
            var dayIndex = daysMapping.get(data[obj]["day"]);
            facultySlots[dayIndex]=data[obj]["availableSlots"];
            allFacultiesDoubtsSlots.set(data[obj]["name"],facultySlots);
        } else {
        	var facultySlots=new Array(5);
            var dayIndex = daysMapping.get(data[obj]["day"]);
            facultySlots[dayIndex]=data[obj]["availableSlots"];
        	allFacultiesDoubtsSlots.set(data[obj]["name"],facultySlots);
        }
    }
    return allFacultiesDoubtsSlots;
}

module.exports.getDoubtsSlots = allFacultiesDoubtsSlotsMapper;