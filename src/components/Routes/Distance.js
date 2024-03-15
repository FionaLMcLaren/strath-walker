export function calculateDistance(startLong, startLat, endLong, endLat){
    let r = 6371000;

    let prevLat = convertRadians(startLat);
    let currLat = convertRadians(endLat);

    let prevLong = convertRadians(startLong);
    let currLong = convertRadians(endLong);

    return  2 * r * Math.asin(Math.sqrt(
        Math.pow(Math.sin((currLat-prevLat)/2), 2) +
        Math.cos(prevLat) *
        Math.cos(currLat) *
        Math.pow(Math.sin((currLong-prevLong)/2), 2)));
}

export function convertRadians(deg){  //simple conversion from degrees to radians
    return deg * Math.PI/180;
}
