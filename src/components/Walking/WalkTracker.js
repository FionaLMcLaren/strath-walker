export class WalkTracker {

    constructor(poly, changePoly) {
        this.path = [];
        this.poly = poly;
        this.changePoly = poly;
        this.initalTime = new Date();
    }

    addNode(node){
        let end = this.path[this.path.length-1];
        console.log(this.path);

        if(!end || end.getPos() !== node.getPos()){
            this.path.push(node);
        }


    }

    onLine(){
        let node = this.path[this.path.length-1];
        let nodeLong = parseFloat(node.getLongitude()).toFixed(4);
        let nodeLat = parseFloat(node.getLatitude()).toFixed(4);

        for(let i =0; i<this.poly.getCoordinates().length-1; i++){
            let lineStart = this.poly.getCoordinates()[i];
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
                let newCoord = this.poly.getCoordinates().splice(i+1);
                newLine = newLine.concat(newCoord);
                this.poly.setCoords(newLine);
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

    convertRadians(deg){  //simple conversion from degrees to radians
        return deg * Math.PI/180;
    }


}
