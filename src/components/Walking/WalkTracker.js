export class WalkTracker {

    constructor(poly, changeDist, changeAngle) {
        this.path = [];
        console.log(poly.getPath());
        this.poly = poly;
        this.checkpoint = this.poly.getPath().getPath();
        this.initalTime = new Date();
        this.distance = 0;
        this.changeDist = changeDist;
        this.changeAngle = changeAngle;
    }

    addNode(node){
        let end = this.path[this.path.length-1];
        console.log(this.path);

        if(end){
            this.distance += this.calculateDistance(node.getLongitude(), node.getLatitude(), end.getLongitude(), end.getLatitude())
        }

        if(!end || end.getPos() !== node.getPos()){
            this.path.push(node);
        }
        return this.checkAtCheckPoint(node);

    }

    checkAtCheckPoint(node){
        console.log(this.checkpoint);
        let rangeMaxLat = this.checkpoint[0].getLatitude() + 0.0001;
        let rangeMaxLong = this.checkpoint[0].getLongitude() + 0.0001;
        let rangeMinLat = this.checkpoint[0].getLatitude() - 0.0001;
        let rangeMinLong = this.checkpoint[0].getLongitude() - 0.0001;

        if(node.getLatitude()<rangeMaxLat && node.getLongitude()<rangeMaxLong && node.getLatitude()>rangeMinLat && node.getLongitude()>rangeMinLong){
            this.checkpoint.slice(1)
            if(this.checkpoint.length === 0){
                return true;
            }
        }

        return false;

    }


    onLine(){
        let node = this.path[this.path.length-1];
        let nodeLong = parseFloat(node.getLongitude()).toFixed(4);
        let nodeLat = parseFloat(node.getLatitude()).toFixed(4);

        for(let i =0; i<this.poly.getCoordinates().length-1; i++){
            let lineStart = this.poly.getCoordinates()[i];

            if(lineStart === this.checkpoint[0].getPos){
                return false;
            }

            let lineStartLong = parseFloat(lineStart["longitude"]).toFixed(4);
            let lineStartLat = parseFloat(lineStart["latitude"]).toFixed(4);

            let lineEnd = this.poly.getCoordinates()[i+1];
            let lineEndLong = parseFloat(lineEnd["longitude"]).toFixed(4);
            let lineEndLat = parseFloat(lineEnd["latitude"]).toFixed(4);


            let dist1 = this.calculateDistance(nodeLong, nodeLat, lineStartLong, lineStartLat);
            let dist2 = this.calculateDistance(lineEndLong, lineEndLat, nodeLong, nodeLat);

            let total = dist1 + dist2;

            let actualDist = this.calculateDistance(lineStartLong, lineStartLat, lineEndLong, lineEndLat);

            let between = (lineStartLong <= nodeLong && nodeLong <= lineEndLong) || (lineStartLong >= nodeLong && nodeLong >= lineEndLong) || (lineStartLat <= nodeLat && nodeLat <= lineEndLat) || (lineStartLat >= nodeLat && nodeLat >= lineEndLat)

            if ((total <= actualDist + (0.2 * actualDist)) && between){
                let newLine = [node.getPos()];
                let newCoord = this.poly.getCoordinates().slice(i+1);
                newLine = newLine.concat(newCoord);
                this.poly.setCoords(newLine);
                this.changeDist(dist2);
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
    getPath(){
        return this.path;
    }

    getTime(){
        return new Date().getTime();
    }

    getStart(){
        return this.initalTime.getTime();
    }

    getDistance(){
        return this.distance;
    }

    convertRadians(deg){  //simple conversion from degrees to radians
        return deg * Math.PI/180;
    }

    setAngle(startLong, startLat, endLong, endLat){
        let opposite = this.calculateDistance(startLong, startLat, startLong, endLat);
        let adjacent = this.calculateDistance(startLong, startLat, endLong, startLat);
        let angle = Math.atan(opposite/adjacent);
        if(endLong > startLong){
            angle += 90
        }else{
            angle += 180
        }
        this.changeAngle(angle);
    }


}
