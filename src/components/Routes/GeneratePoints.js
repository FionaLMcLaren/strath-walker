import {Path} from './Path.js';
import {calculateDistance} from "./Distance.js";

//Class used to generate paths that are passed into the google routes api
export class PathGenerator{

    constructor(start, end, points){
        this.sortedPaths = [];
        this.paths = [];
        this.distDict = [];


        //loops through each middle point
         points.forEach((p)=>{
            let visited = new Path(p);
            let distSoFar = calculateDistance(start.getLongitude(), start.getLatitude(), p.getLongitude(), p.getLatitude()); //calculates the distance between the middle point and the start
            this.possPaths(visited, points, distSoFar, end);
         });

        // Concatenate the start and end points to each potential middle route
        this.paths = Object.values(this.distDict).map((middlePoints => {
            return [start, ...middlePoints, end];
        }));
    }


    //calculates all the possible paths recursively
    possPaths(visited, pos, distSoFar, end){
         let v = visited.getPath().slice();
         let sortedV = visited.getNamePath().slice();

         sortedV.sort();  //sorted so that a->b and b->a ae both not added as they are the same route
         sortedV = sortedV.toString();

         if(!(this.sortedPaths.includes(sortedV))){ //if path has not already been added
            this.sortedPaths.push(sortedV);
            this.paths.push(v);

            distSoFar += calculateDistance(visited.getLast().getLongitude(), visited.getLast().getLatitude(), end.getLongitude(), end.getLatitude());
            this.distDict[Math.round(distSoFar)]=v;
         }

        let closest = this.closestPos(visited.getLast(), pos, visited.getNamePath()); //finds the closest position to current position
         if(!(closest[0] === "")){ //if not empty then add node to visited list and recurse
            visited.addNode(closest[0]);
            this.possPaths(visited, pos, (distSoFar + closest[1]), end);
         }

    }


    //finds the closest point to the current point
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

    getPaths(){
        return this.paths.map((path) => { return new Path(path) });
    }


}

