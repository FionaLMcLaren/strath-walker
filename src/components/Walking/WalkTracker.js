export class WalkTracker {

    constructor(poly, changePoly, end) {
        this.path = [];
        this.poly = poly;
        this.changePoly = poly;
        this.end = end;
        this.initalTime = new Date();
    }

    addNode(node){
        if(node.getPos() !== this.path.slice(-1).getPos()){
            this.path.push(node);
        }

    }

    onLine(){
        let node = this.path().slice(-1);
        for(let i =0; i<this.poly.getCoordinates().size()-1; i++){
            let lineStartLongitude = this.poly.getCoordinates().slice(i).getLongitude();
            let lineStartLatitude = this.poly.getCoordinates().slice(i).getLatitude();

            let lineEndLongitude = this.poly.getCoordinates().slice(i+1).getLongitude();
            let lineEndLatitude = this.poly.getCoordinates().slice(i+1).getLatitude();

            let m1 = (node.getLongitude()-lineStartLongitude)/(node.getLatitude()-lineStartLatitude);
            let m2 = (lineEndLongitude - node.getLongitude())/(lineEndLatitude - node.getLatitude());
            //TODO FIX divide by zero issues
            if (m1 === m2){
                return true;
            }
        }
        return false;
    }

    getPath(){
        return this.path;
    }


}
