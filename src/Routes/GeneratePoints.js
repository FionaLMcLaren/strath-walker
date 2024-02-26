import {Path} from '../Routes/Path.js';

export class PathGenerator{

    constructor(start, end, points){
        this.sortedPaths = []
        this.paths = [];
        this.distDict=[]


         points.forEach((p)=>{
            let visited = new Path(p);
            let distSoFar = this.calculateDistance(start, p);
            this.possPaths(visited, points, distSoFar, end);
         });

        this.paths = Object.values(this.distDict);
    }

    possPaths(visited, pos, distSoFar, end){
         let v = visited.getPath().slice();
         let sortedV = visited.getNamePath().slice();

         sortedV.sort();
         sortedV = sortedV.toString();

         if(!(this.sortedPaths.includes(sortedV))){
            this.sortedPaths.push(sortedV);
            this.paths.push(v);
            distSoFar += this.calculateDistance(visited.getLast(), end);
            this.distDict[Math.round(distSoFar)]=v;
         }

        let closest = this.closestPos(visited.getLast(), pos, visited.getNamePath());
         if(!(closest[0] === "")){
            visited.addNode(closest[0]);
            this.possPaths(visited, pos, (distSoFar + closest[1]), end);
         }

    }


    closestPos(startingPos, positions, visited){
        min_dist = 1.797693134862315E+308;
        closest = "";

        positions.forEach((pos)=>{
            if(!(visited.includes(pos.getName()))){
                dist = this.calculateDistance(startingPos, pos)
                if(dist < min_dist){
                    closest = pos;
                    min_dist = dist;
                }
            }
        })

        return [closest, min_dist];
    }


    calculateDistance(start, end){
        let r = 6371000;

        let prevLat = this.convertRadians(start.getLatitude());
        let currLat = this.convertRadians(end.getLatitude());

        let prevLong = this.convertRadians(start.getLongitude());
        let currLong = this.convertRadians(end.getLongitude());

        return  2 * r * Math.asin(Math.sqrt(
            Math.pow(Math.sin((currLat-prevLat)/2), 2) +
            Math.cos(prevLat) *
            Math.cos(currLat) *
            Math.pow(Math.sin((currLong-prevLong)/2), 2)));
    }

    sortPaths(){
        let dictPaths = [];
        this.paths.forEach((path)=>{
            let previous = this.start;
            let distance = 0;
            path.forEach((node)=>{
                distance += this.calculateDistance(previous, node);
            });
            distance += this.calculateDistance(previous, this.end);
            distance = Math.round(distance);
            dictPaths[distance]=path;
        });



        this.paths = Object.values(dictPaths);


    }

    convertRadians(deg){  //simple conversion from degrees to radians
        return deg * Math.PI/180;
    }


    getPaths(){
        return this.paths;
    }








}

