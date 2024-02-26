export class Location{  //class to hold location data. Simply stores the longitude and the longitude

    constructor(name, long, lat) {
        this.name = name;
        this.longitude = long;
        this.latitude = lat;
    }

    getName(){
        return this.name;
    }

    getLongitude(){
        return this.longitude;
    }

    getLatitude(){
        return this.latitude;
    }



}
