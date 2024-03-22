//Class that stores
export class Path{
    constructor(locationArgs) {

        let node;
        let subNodes;

        // Allow construction from a single Location or list of Locations
        if (Array.isArray(locationArgs)) {
            node = locationArgs[0];
            subNodes = locationArgs.slice(1);
        } else {
            node = locationArgs;
            subNodes = [];
        }

        this.name = [node.getName()];
        this.path = [node];
        this.last = node;
        this.dist = 0;
        for (let subNode of subNodes) {
            this.addNode(subNode);
        }
    }

    addNode(node){
        this.name.push(node.getName());
        this.path.push(node);
        this.last = node;

    }

    getPath(){
        return this.path;
    }

    getFirst() {
        return this.path[0];
    }

    getIntermediates() {
        return this.path.slice(1, this.path.length-1);
    }

    getLast(){
        return this.last;
    }

    getNamePath(){
        return this.name;
    }


    //Gets the name of a route
    getReadableName() {
        const pathName = this.getFirst().getName() + " to " + this.getLast().getName();
        if (this.path.length > 2) {
            const numberOfStops = this.path.length - 2;
            const stopPlural = numberOfStops === 1 ? "stop" : "stops";
            return pathName + " (with " + numberOfStops + " " + stopPlural + ")";
        } else {
            return pathName + " (direct)";
        }
    }


}
