export class Path{

    constructor(node) {
        this.name = [node.getName()];
        this.path = [node];
        this.last = node;
        this.dist = 0;
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

    getDistance(){
        return this.distance;
    }


}
