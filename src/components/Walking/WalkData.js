// store the data of a previous walk
export class WalkData{
    constructor(startTime, endTime, selectedRoute, distanceWalked, steps, walkedRoutePoints){
        this.startTime = startTime
        this.endTime = endTime
        this.selectedRoute = selectedRoute
        this.distanceWalked = distanceWalked
        this.steps = steps
        this.walkedRoutePoints = walkedRoutePoints
    }

    getStartTime(){
        return this.startTime
    }

    getEndTime(){
        return this.endTime
    }

    getSelectedRoute(){
        return this.selectedRoute
    }

    getDistanceWalked(){
        return this.distanceWalked
    }

    getSteps(){
        return this.steps
    }

    getWalkedRoutePoints(){
        return this.walkedRoutePoints
    }
}
