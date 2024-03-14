import {Path} from './Path.js';
import {calculateDistance} from "./Distance.js";

export class PathGenerator{

    constructor(start, end, points){
        this.sortedPaths = []
        this.paths = [];
        this.distDict=[]


         points.forEach((p)=>{
            let visited = new Path(p);
            let distSoFar = calculateDistance(start.getLongitude(), start.getLatitude(), p.getLongitude(), p.getLatitude());
            this.possPaths(visited, points, distSoFar, end);
         });

        // Concatenate the start and end points to each potential middle route
        this.paths = Object.values(this.distDict).map((middlePoints => {
            return [start, ...middlePoints, end];
        }));
    }

    possPaths(visited, pos, distSoFar, end){
         let v = visited.getPath().slice();
         let sortedV = visited.getNamePath().slice();

         sortedV.sort();
         sortedV = sortedV.toString();

         if(!(this.sortedPaths.includes(sortedV))){
            this.sortedPaths.push(sortedV);
            this.paths.push(v);
            distSoFar += calculateDistance(visited.getLast().getLongitude(), visited.getLast().getLatitude(), end.getLongitude());
            this.distDict[Math.round(distSoFar)]=v;
         }

        let closest = this.closestPos(visited.getLast(), pos, visited.getNamePath());
         if(!(closest[0] === "")){
            visited.addNode(closest[0]);
            this.possPaths(visited, pos, (distSoFar + closest[1]), end);
         }

    }


    closestPos(startingPos, positions, visited){
        let min_dist = 1.797693134862315E+308;
        let closest = "";

        positions.forEach((pos)=>{
            if(!(visited.includes(pos.getName()))){
                let dist = calculateDistance(startingPos.getLongitude(), startingPos.getLatitude(), pos.getLongitude(), pos.getLatitude())
                if(dist < min_dist){
                    closest = pos;
                    min_dist = dist;
                }
            }
        })

        return [closest, min_dist];
    }






    convertRadians(deg){  //simple conversion from degrees to radians
        return deg * Math.PI/180;
    }


    getPaths(){
        return this.paths.map((path) => { return new Path(path) });
    }








}

