import {getPolyline} from "../Routes/PolylineRequest.jsx"
import {Location} from "../Routes/Location.js"
import {calculateDistance, convertRadians} from "../Routes/Distance.js"
import {Path} from "../Routes/Path.js"

export class WalkTracker {

    constructor(poly, changeDist, changeAngle, changeHeading, changePoly) {
        this.locationHistory = [];
        this.sentNotif = false;
        this.poly = poly;
        this.points = this.poly.getPath().getPath();
        this.pathDist = this.poly.getDistance();
        this.checkpoints = this.poly.getPath().getPath();
        this.initialTime = new Date();
        this.distance = 0;
        this.changeDist = changeDist;
        this.changeAngle = changeAngle;
        this.changeHeading = changeHeading;
        this.changePoly = changePoly;
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
        let rangeMaxLat = this.checkpoints[0]["latitude"] + 0.0001;
        let rangeMaxLong = this.checkpoints[0]["longitude"] + 0.0001;
        let rangeMinLat = this.checkpoints[0]["latitude"] - 0.0001;
        let rangeMinLong = this.checkpoints[0]["longitude"] - 0.0001;

        if(node["latitude"]<rangeMaxLat && node["longitude"]<rangeMaxLong && node["latitude"]>rangeMinLat && node["longitude"]>rangeMinLong){
            this.checkpoints.slice(1)
            if(this.checkpoints.length === 0){
                return true;
            }
        }

        return false;

    }


    onLine(){
        let node = this.locationHistory[this.locationHistory.length-1];
        let nodeLong = node["longitude"];
        let nodeLat = node["latitude"];

        for(let i =0; i<this.poly.getCoordinates().length-1; i++){
            let lineStart = this.poly.getCoordinates()[i];

            if(lineStart === this.checkpoints[0].getPos()){
                return false;
            }

            let lineStartLong = lineStart["longitude"];
            let lineStartLat = lineStart["latitude"];

            let lineEnd = this.poly.getCoordinates()[i+1];
            let lineEndLong = lineEnd["longitude"];
            let lineEndLat = lineEnd["latitude"];


            let dist1 = calculateDistance(nodeLong, nodeLat, lineStartLong, lineStartLat);
            let dist2 = calculateDistance(lineEndLong, lineEndLat, nodeLong, nodeLat);

            let total = dist1 + dist2;

            let actualDist = calculateDistance(lineStartLong, lineStartLat, lineEndLong, lineEndLat);

            let between = (lineStartLong <= nodeLong && nodeLong <= lineEndLong) || (lineStartLong >= nodeLong && nodeLong >= lineEndLong) || (lineStartLat <= nodeLat && nodeLat <= lineEndLat) || (lineStartLat >= nodeLat && nodeLat >= lineEndLat)

            if ((total <= (actualDist + (0.3 * actualDist))) && between){
                let newLine = [node];
                let newCoord = this.poly.getCoordinates().slice(i+1);
                newLine = newLine.concat(newCoord);
                this.poly.setCoords(newLine);
                let roundedDist = Math.floor(dist2/10) * 10;
                if((dist2%10) > 5){
                    roundedDist += 10;
                }

                this.changeDist(roundedDist);
                this.setAngle(nodeLong, nodeLat, lineEndLong, lineEndLat);
                return true;
            }
        }
        return false;
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
        return this.distance;
    }

    getDuration(){
        return (this.endTime - this.initialTime)/1000;
    }

    getReadableDuration() {
        let time = this.getDuration();
        let minsVal = Math.floor(time / 60);
        let secsVal = time - (minsVal * 60);

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
        this.poly = route.getPath().getPath();
        this.changePoly(route);
    }

    async reroute(){
        this.changeDist();
        this.changeAngle();

        let currLocation = this.locationHistory[this.locationHistory.length -1];
        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"])]
        pathArr = pathArr.concat(this.checkpoints);
        let path = new Path(pathArr);
        let route = await getPolyline(path);
        this.poly = route.getPath().getPath();
        this.changePoly(route);
    }

    checkTime(){
        if(!this.sentNotif){
            let timeDiff = new Date() - this.initialTime
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


}
