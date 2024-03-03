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

            let m1 = this.calculateGradient(nodeLong, nodeLat, lineStartLong, lineStartLat);
            let m2 = this.calculateGradient(lineEndLong, lineEndLat, nodeLong, nodeLat);

            let actualM = this.calculateGradient(lineStartLong, lineStartLat, lineEndLong, lineEndLat);
            //TODO FIX divide by zero issues

            let diff = (Math.abs(m1-m2));
            let diffA1 = (Math.abs(actualM-m2));
            let diffA2 = (Math.abs(m1-actualM));

            let between = (lineStartLong <= nodeLong && nodeLong <= lineEndLong) || (lineStartLong >= nodeLong && nodeLong >= lineEndLong) || (lineStartLat <= nodeLat && nodeLat <= lineEndLat) || (lineStartLat >= nodeLat && nodeLat >= lineEndLat)
            console.log(nodeLong);
            console.log(m2);
            console.log(actualM);
            if (diff < 0.3 && diffA1 < 0.3 && diffA2 < 0.3 && between){
                this.poly.setCoords([node.getPos()]+this.poly.getCoordinates().splice(i+1));
                console.log([node.getPos()]+this.poly.getCoordinates().splice(i+1));
                return true;
            }
        }
        return false;
    }

    calculateGradient(xLong, xLat, yLong, yLat){
        return (xLong-yLong)/(xLat-yLat);
    }

    getPath(){
        return this.path;
    }


}
