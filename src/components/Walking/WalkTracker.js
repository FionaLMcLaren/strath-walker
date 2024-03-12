import {getPolyline} from "../Routes/PolylineRequest.jsx"
import {Location} from "../Routes/Location.js"
import {Path} from "../Routes/Path.js"

export class WalkTracker {

    constructor(poly, changeDist, changeAngle) {
        this.locationHistory = [];
        this.poly = poly;
        this.points = this.poly.getPath().getPath();
        this.checkpoint = this.poly.getPath().getPath();
        this.initialTime = new Date();
        this.distance = 0;
        this.changeDist = changeDist;
        this.changeAngle = changeAngle;
    }

    addNode(node){
        let end = this.locationHistory[this.locationHistory.length-1];

        if(end){
            this.distance += this.calculateDistance(node["longitude"], node["latitude"], end["longitude"], end["latitude"])
        }

        if(!end || end !== node){
            this.locationHistory.push(node);
        }
        return this.checkAtCheckPoint(node);

    }

    checkAtCheckPoint(node){
        let rangeMaxLat = this.checkpoint[0]["latitude"] + 0.0001;
        let rangeMaxLong = this.checkpoint[0]["longitude"] + 0.0001;
        let rangeMinLat = this.checkpoint[0]["latitude"] - 0.0001;
        let rangeMinLong = this.checkpoint[0]["longitude"] - 0.0001;

        if(node["latitude"]<rangeMaxLat && node["longitude"]<rangeMaxLong && node["latitude"]>rangeMinLat && node["longitude"]>rangeMinLong){
            this.checkpoint.slice(1)
            if(this.checkpoint.length === 0){
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

            if(lineStart === this.checkpoint[0].getPos()){
                return false;
            }

            let lineStartLong = lineStart["longitude"];
            let lineStartLat = lineStart["latitude"];

            let lineEnd = this.poly.getCoordinates()[i+1];
            let lineEndLong = lineEnd["longitude"];
            let lineEndLat = lineEnd["latitude"];


            let dist1 = this.calculateDistance(nodeLong, nodeLat, lineStartLong, lineStartLat);
            let dist2 = this.calculateDistance(lineEndLong, lineEndLat, nodeLong, nodeLat);

            let total = dist1 + dist2;

            let actualDist = this.calculateDistance(lineStartLong, lineStartLat, lineEndLong, lineEndLat);

            let between = (lineStartLong <= nodeLong && nodeLong <= lineEndLong) || (lineStartLong >= nodeLong && nodeLong >= lineEndLong) || (lineStartLat <= nodeLat && nodeLat <= lineEndLat) || (lineStartLat >= nodeLat && nodeLat >= lineEndLat)

            if ((total <= (actualDist + (0.5 * actualDist))) && between){
                let newLine = [node];
                let newCoord = this.poly.getCoordinates().slice(i+1);
                newLine = newLine.concat(newCoord);
                this.poly.setCoords(newLine);
                console.log(dist2);
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

    calculateDistance(startLong, startLat, endLong, endLat){
        let r = 6371000;

        let prevLat = this.convertRadians(startLat);
        let currLat = this.convertRadians(endLat);

        let prevLong = this.convertRadians(startLong);
        let currLong = this.convertRadians(endLong);

        return  2 * r * Math.asin(Math.sqrt(
            Math.pow(Math.sin((currLat-prevLat)/2), 2) +
            Math.cos(prevLat) *
            Math.cos(currLat) *
            Math.pow(Math.sin((currLong-prevLong)/2), 2)));
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


    getPoints(){
        return this.points
    }

    convertRadians(deg){  //simple conversion from degrees to radians
        return deg * Math.PI/180;
    }

    setAngle(startLong, startLat, endLong, endLat){
        let angle = Math.round(Math.atan(Math.abs((startLong-endLong)/(startLat-endLat))) * 180/Math.PI);  //Uses arctan(opp/adj) = angle
        if((endLong > startLong) && (endLat < startLat)){  //Accounting for position of angle E, W and S
            angle = 180-angle;
        }else if((endLong < startLong) && (endLat < startLat)){
            angle = 270-angle;
        }else if((endLong < startLong) && (endLat > startLat)){
            angle = 360-angle;
        }

        let directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
        let arrayPos = (Math.floor((angle+22.5)/45))%8;
        let direction = directions[arrayPos];
        console.log(arrayPos);
        console.log(direction);
        let writtenAngle = angle + "° " + direction;
        this.changeAngle(writtenAngle);
    }

    backHome(){
        this.changeDist();
        this.changeAngle();

        this.checkpoints = [this.checkpoints[this.checkpoints.length - 1]];
        let currLocation = this.locationHistory[this.locationHistory.length -1];
        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"]), this.checkpoints[0]]
        let path = new Path(pathArr);
        let route = getPolyline(path);
        this.poly = route.getPath().getPath();
    }

    reroute(){
        this.changeDist();
        this.changeAngle();

        let currLocation = this.locationHistory[this.locationHistory.length -1];
        let pathArr = [new Location("User Location", currLocation["latitude"], currLocation["longitude"])]
        pathArr.concat(this.checkpoints);
        let path = new Path(pathArr);
        let route = getPolyline(path);
        this.poly = route.getPath().getPath();
    }


}
