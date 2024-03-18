import {getPolyline} from "../Routes/PolylineRequest.jsx"
import {Location} from "../Routes/Location.js"
import {calculateDistance, convertRadians} from "../Routes/Distance.js"
import {Path} from "../Routes/Path.js"

export class WalkTracker {

    constructor(changeDist, changeAngle, changeHeading, changePoly, changeGoingHome, changeDestination) {
        this.locationHistory = [];
        this.sentNotif = false;
        this.initialTime = new Date();
        this.distance = 0;
        this.changeDist = changeDist;
        this.changeAngle = changeAngle;
        this.changeHeading = changeHeading;
        this.changePoly = changePoly;
        this.changeGoingHome = changeGoingHome;
        this.changeDestination = changeDestination;
    }

    setRoute(poly){
        this.poly = poly;
        this.points = this.poly.getPath().getPath();
        this.pathDist = this.poly.getDistance();
        this.checkpoints = this.poly.getPath().getPath();
        this.checkpoints.shift(); //removes start as a checkpoint
        this.changeDestination(this.checkpoints[0]);
    }

    addNode(node){
        let end = this.locationHistory[this.locationHistory.length-1];

        if(end){
            this.distance += calculateDistance(node["longitude"], node["latitude"], end["longitude"], end["latitude"])
        }

        if(!end || end !== node){
            this.locationHistory.push(node);
        }
        return this.checkAtCheckPoint(node);

    }

    checkAtCheckPoint(node){
        if(this.atPosition(node["latitude"], node["longitude"], this.checkpoints[0]["latitude"], this.checkpoints[0]["longitude"])){
            this.checkpoints.slice(1);
            this.changeDestination(this.checkpoints[0]);
            this.poly.changeLeg();
            if(this.checkpoints.length === 0){
                return true;
            }else if(this.checkpoints.length === 1){
                this.changeGoingHome(true);
            }
        }

        return false;

    }

    checkAtStartPoint(){
        let node = this.locationHistory[this.locationHistory.length-1];
        let nodeLong = node["longitude"];
        let nodeLat = node["latitude"];

        if(this.atPosition(nodeLat, nodeLong, this.poly.getLeg()[0]["latitude"], this.poly.getLeg()[0]["longitude"])){
            let lineEndLong = this.poly.getLeg()[1]["longitude"];
            let lineEndLat = this.poly.getLeg()[1]["latitude"];
            let dist = calculateDistance(nodeLong, nodeLat, lineEndLong, lineEndLat);
            this.setDistance(dist);
            this.setAngle(nodeLong, nodeLat, lineEndLong, lineEndLat);
            console.log("abc");
            return true;
        }

        return false;

    }


    onLine(){
        let node = this.locationHistory[this.locationHistory.length-1];
        let nodeLong = node["longitude"];
        let nodeLat = node["latitude"];
        for(let i =0; i<this.poly.getLeg().length-1; i++){
            let lineStart = this.poly.getLeg()[i];

            let lineStartLong = lineStart["longitude"];
            let lineStartLat = lineStart["latitude"];

            let lineEnd = this.poly.getLeg()[i+1];
            let lineEndLong = lineEnd["longitude"];
            let lineEndLat = lineEnd["latitude"];


            let dist1 = calculateDistance(nodeLong, nodeLat, lineStartLong, lineStartLat);
            let dist2 = calculateDistance(lineEndLong, lineEndLat, nodeLong, nodeLat);

            let total = dist1 + dist2;

            let actualDist = calculateDistance(lineStartLong, lineStartLat, lineEndLong, lineEndLat);

            let between = (lineStartLong <= nodeLong && nodeLong <= lineEndLong) || (lineStartLong >= nodeLong && nodeLong >= lineEndLong) || (lineStartLat <= nodeLat && nodeLat <= lineEndLat) || (lineStartLat >= nodeLat && nodeLat >= lineEndLat)

            if ((total <= (actualDist + (0.1 * actualDist))) && between){
                let newLine = [node];
                let newCoord = this.poly.getLeg().slice(i+1);
                newLine = newLine.concat(newCoord);
                this.poly.setCoords(newLine);
                this.setDistance(dist2);
                this.setAngle(nodeLong, nodeLat, lineEndLong, lineEndLat);
                return true;
            }
        }
        return false;
    }

    setDistance(dist){
        let roundedDist = Math.floor(dist/10) * 10;
        if((dist%10) > 5){
            roundedDist += 10;
        }

        this.changeDist(roundedDist);
    }

    getLocationHistory(){
        return this.locationHistory;
    }


    stopWalk(){
        this.endTime = new Date();
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
        let minsVal = Math.floor(time / 60);
        let secsVal;
        if (minsVal > 0) {
            secsVal = time - (minsVal * 60);
        } else {
            minsVal = 0;
            secsVal=time;
        }

        let mins = minsVal.toString();
        let secs = secsVal.toString();

        return (mins + " min " + secs + " sec");
    }


    getPoints(){
        return this.points
    }


    setAngle(startLong, startLat, endLong, endLat){
        let angle = Math.round(convertRadians(Math.atan(Math.abs((startLong-endLong)/(startLat-endLat)))));  //Uses arctan(opp/adj) = angle
        if((endLong > startLong) && (endLat < startLat)){  //Accounting for position of angle E, W and S
            angle = 180-angle;
        }else if((endLong < startLong) && (endLat < startLat)){
            angle = 270-angle;
        }else if((endLong < startLong) && (endLat > startLat)){
            angle = 360-angle;
        }

        let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let arrayPos = (Math.floor((angle+22.5)/45))%8;
        this.changeHeading(directions[arrayPos]);
        this.changeAngle(angle);
    }

    async goHome(){
        this.changeDist();
        this.changeAngle();

        this.checkpoints = [this.checkpoints[this.checkpoints.length - 1]];
        let currLocation = this.locationHistory[this.locationHistory.length -1];
        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"]), this.checkpoints[0]]
        let path = new Path(pathArr);
        let route = await getPolyline(path);
        this.poly = route;
        this.changePoly(route);
        this.changeGoingHome(true);
        this.changeDestination(this.checkpoints[0]);
    }

    async reroute(){
        this.changeDist();
        this.changeAngle();

        let currLocation = this.locationHistory[this.locationHistory.length -1];
        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"])]
        pathArr = pathArr.concat(this.checkpoints);
        let path = new Path(pathArr);
        let route = await getPolyline(path);
        this.poly = route;
        this.changePoly(route);

    }

    checkTime(){
        const currTime = new Date();
        if(!this.sentNotif && (currTime> (this.initialTime + 300000))){
            let timeDiff = currTime - this.initialTime
            let pace = this.calculatePace(timeDiff);
            let roughRemainingDist = this.pathDist - this.distance;
            if((roughRemainingDist/pace)>timeDiff){
                this.sentNotif = true;
                return true;
            }
        }
        return false;
    }

    calculatePace(duration){
        let pace = 0;
        if (duration > 0){
            pace = this.distance/duration;
        }
        return pace;
    }

    atPosition(currLat, currLong, goalLat, goalLong){
        const range = 0.0005
        let rangeMaxLat = goalLat + range;
        let rangeMaxLong = goalLong + range;
        let rangeMinLat = goalLat - range;
        let rangeMinLong = goalLong - range;

        return(currLat<rangeMaxLat && currLong<rangeMaxLong && currLat>rangeMinLat && currLong>rangeMinLong);
    }

    clearHistory(){
        this.locationHistory =[];
    }


}
