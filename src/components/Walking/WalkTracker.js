import {getPolyline} from "../Routes/PolylineRequest.jsx"
import {Location} from "../Routes/Location.js"
import {calculateDistance} from "../Routes/Distance.js"
import {Path} from "../Routes/Path.js"
import {readableDuration} from "../Time/TimeFunctions";


//Class used to track walks
export class WalkTracker {

    constructor(changeDist, changeAngle, changeHeading, changePoly, changeGoingHome, changeDestination) {
        this.locationHistory = []; //Array of location history
        this.sentNotif = false; //If a notification has been sent a notification or not
        this.initialTime = new Date();
        this.distance = 0;

        //functions to change states
        this.changeDist = changeDist;
        this.changeAngle = changeAngle;
        this.changeHeading = changeHeading;
        this.changePoly = changePoly;
        this.changeGoingHome = changeGoingHome;
        this.changeDestination = changeDestination;
    }


    setRoute(poly){
        this.poly = poly;
        this.points = JSON.parse(JSON.stringify(this.poly.getPath().getPath())); // stringify -> parse to make clone
        this.pathDist = this.poly.getDistance();

        this.checkpoints = this.poly.getPath().getPath(); //checkpoints of the walk i.e. points the user will visit
        this.checkpoints.shift(); //removes start as a checkpoint
        this.changeDestination(this.checkpoints[0]); //change destination to first checkpoint
    }


    //adds a location to the history
    addNode(node){
        let prev = this.locationHistory[this.locationHistory.length-1]; //gets the latest value in the location history

        if(prev){ //if there is a previous point then add the distance between the 2 points
            this.distance += calculateDistance(node["longitude"], node["latitude"], prev["longitude"], prev["latitude"])
        }

        if(!prev || prev !== node){ //if there is not a previous or the new node is at a different location
            this.locationHistory.push(node);
        }

        return this.checkAtCheckPoint(node);

    }


    //Checks if the user is at the checkpoint
    checkAtCheckPoint(node){
        if(this.atPosition(node["latitude"], node["longitude"], this.checkpoints[0]["latitude"], this.checkpoints[0]["longitude"], 0.001)){
            this.checkpoints.shift(); //if at the checkpoint then remove it from list of checkpoints
            if(this.checkpoints.length === 0){ //if no more checkpoints return true
                return true;
            }else if(this.checkpoints.length === 1){ //if only 1 checkpoint then they are going home
                this.changeGoingHome(true);
            }

            this.changeDestination(this.checkpoints[0]);  //change destination to next checkpoint
            this.poly.changeLeg();  //change leg of the walk
        }

        return false;

    }


    //If user not on the line then check if the user is near te start of the line
    checkAtStartPoint(){
        let node = this.locationHistory[this.locationHistory.length-1];
        let nodeLong = node["longitude"];
        let nodeLat = node["latitude"];
        let lineStartLong = this.poly.getLeg()[0]["longitude"];
        let lineStartLat = this.poly.getLeg()[0]["latitude"];

        if(this.atPosition(nodeLat, nodeLong, lineStartLat, lineStartLong, 0.0005)){ //if at the start of the line
            let lineEndLong = this.poly.getLeg()[1]["longitude"];
            let lineEndLat = this.poly.getLeg()[1]["latitude"];

            let dist = calculateDistance(nodeLong, nodeLat, lineEndLong, lineEndLat);
            this.setDistance(dist);  //set distance and angle
            this.setAngle(lineStartLong, lineStartLat, lineEndLong, lineEndLat);
            return true;
        }

        return false;

    }


    //checks if current position is within a range of the goal position
    atPosition(currLat, currLong, goalLat, goalLong, range){
        let rangeMaxLat = goalLat + range;
        let rangeMaxLong = goalLong + range;
        let rangeMinLat = goalLat - range;
        let rangeMinLong = goalLong - range;

        return(currLat<rangeMaxLat && currLong<rangeMaxLong && currLat>rangeMinLat && currLong>rangeMinLong);
    }


    //checks if the user is on the line
    onLine(){
        let node = this.locationHistory[this.locationHistory.length-1];
        let nodeLong = node["longitude"];
        let nodeLat = node["latitude"];

        for(let i =0; i<this.poly.getLeg().length-1; i++){ //loop through coordinates of leg
            let lineStart = this.poly.getLeg()[i];

            let lineStartLong = lineStart["longitude"];
            let lineStartLat = lineStart["latitude"];

            let lineEnd = this.poly.getLeg()[i+1];
            let lineEndLong = lineEnd["longitude"];
            let lineEndLat = lineEnd["latitude"];


            let dist1 = calculateDistance(nodeLong, nodeLat, lineStartLong, lineStartLat);
            let dist2 = calculateDistance(lineEndLong, lineEndLat, nodeLong, nodeLat);

            let total = dist1 + dist2; //gets the total distance of start to current and then current to end

            let actualDist = calculateDistance(lineStartLong, lineStartLat, lineEndLong, lineEndLat);  //gets the actual distance of the line

            //checks either longitude and latitude is within the range
            let between = (lineStartLong <= nodeLong && nodeLong <= lineEndLong) || (lineStartLong >= nodeLong && nodeLong >= lineEndLong) || (lineStartLat <= nodeLat && nodeLat <= lineEndLat) || (lineStartLat >= nodeLat && nodeLat >= lineEndLat)

            if ((total <= (actualDist + (0.1 * actualDist))) && between){  //if the distance is within a range of the actual distance and is between the longitude and latitude
                let newLine = [node];
                let newCoord = this.poly.getLeg().slice(i+1);
                newLine = newLine.concat(newCoord);
                this.poly.setLegCoords(newLine); //replace first coordinate(s) of the line with user position

                this.setDistance(dist2);  //sets the distance and the angle
                this.setAngle(nodeLong, nodeLat, lineEndLong, lineEndLat);
                return true;
            }
        }
        this.checkAtStartPoint(); //if not on line then check if within start point range
    }


    //Sets the distance to the nearest ten
    setDistance(dist){
        let roundedDist = Math.floor(dist/10) * 10;
        if((dist%10) > 5){
            roundedDist += 10;
        }

        this.changeDist(roundedDist);
    }



    //Calculates the angle of the line
    setAngle(startLong, startLat, endLong, endLat){
        let angle = Math.round(Math.atan(Math.abs((startLong-endLong)/(startLat-endLat))) * 180/Math.PI); // arctan(opp/adj) = angle

        if((endLong > startLong) && (endLat <= startLat)){  //Accounting for position of angle E, W and S
            angle = 180-angle;
        }else if((endLong <= startLong) && (endLat < startLat)){
            angle = 180+angle;
        }else if((endLong <= startLong) && (endLat >= startLat)){
            angle = 360-angle;
        }

        let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let arrayPos = (Math.floor((angle+22.5)/45))%8;

        this.changeHeading(directions[arrayPos]);
        this.changeAngle(angle);
    }


    //Reroute to head back to strathclyde
    async goHome(){
        this.changeDist();
        this.changeAngle();

        this.checkpoints = [this.checkpoints[this.checkpoints.length - 1]]; //change checkpoints to just the last one

        let currLocation = this.locationHistory[this.locationHistory.length -1]; //get current location

        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"]), this.checkpoints[0]]
        let path = new Path(pathArr);
        let route = await getPolyline(path); //reroute between current location and end location

        this.poly = route;
        this.changePoly(route);
        this.changeGoingHome(true);
        this.changeDestination(this.checkpoints[0]);
    }


    //reroute to nearest checkpoint
    async reroute(){
        this.changeDist();
        this.changeAngle();

        let currLocation = this.locationHistory[this.locationHistory.length -1];
        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"])]
        pathArr = pathArr.concat(this.checkpoints);
        let path = new Path(pathArr);
        let route = await getPolyline(path); //reroute starting from current location
        this.poly = route;
        this.changePoly(route);

    }

    //checks if not enough time remains to complete walk
    notEnoughTime(){
        const currTime = new Date();
        if(!this.sentNotif && (currTime.getTime()> (this.initialTime.getTime() + 300000))){ //if no notification has been set and 5 minutes has passed

            let timeDiff = (currTime - this.initialTime)/1000;
            let pace = this.calculatePace(timeDiff);
            let roughRemainingDist = this.pathDist - this.distance;

            if((roughRemainingDist/pace)>timeDiff){ //if the rough time remaining is greater than the time difference
                this.sentNotif = true;
                return true;
            }
        }
        return false;
    }



    calculatePace(duration){
        let pace = 0;
        if (duration > 0){ //to stop divide by zero issues
            pace = this.distance/duration;
        }

        return pace;
    }

    clearHistory(){
        this.locationHistory =[];
    }

    stopWalk(){
        this.endTime = new Date();
    }


    //getters

    getLocationHistory(){
        return this.locationHistory;
    }

    getStart(){
        return this.initialTime.getTime();
    }

    getEnd(){
        return this.endTime.getTime();
    }

    getDistance(){
        return Math.round(this.distance);
    }

    getDuration(){
        return Math.round((this.endTime - this.initialTime)/1000);
    }

    getReadableDuration() {
        let time = this.getDuration();
        return readableDuration(time);
    }

    getPoints(){
        return this.points
    }


}
