export function calculateDistance(startLong, startLat, endLong, endLat){
    let r = 6371000;

    let prevLat = this.convertRadians(startLat);
    let currLat = this.convertRadians(endLat);

    let prevLong = this.convertRadians(startLong);
    let currLong = this.convertRadians(endLong);

    return  2 * r * Math.asin(Math.sqrt(
        Math.pow(Math.sin((currLat-prevLat)/2), 2) +
        Math.cos(prevLat) *
        Math.cos(currLat) *
        Math.pow(Math.sin((currLong-prevLong)/2), 2)));
}
