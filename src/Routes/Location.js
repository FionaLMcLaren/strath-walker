export class Location{  //class to hold location data. Simply stores the longitude and the longitude

    constructor(name, lat, long) {
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

    getPos(){
        return {latitude: this.latitude, longitude: this.longitude}
    }



}
