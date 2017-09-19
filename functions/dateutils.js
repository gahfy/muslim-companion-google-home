class DateUtils {
    /**
     * Converts a Gregorian Date into julian day
     * @param year the year of the gregorian date
     * @param month the month of the gregorian date
     * @param day the day of the gregorian date
     * @return the julian day
     */
    static dateToJulian(year, month, day) {
        year = month  < 3 ? year-1 : year;
        month = month < 3 ? month+12 : month;
        let s = Math.trunc(year/100);
        let b = 2-s+Math.trunc(s/4);
        return Math.trunc(365.25*(year+4716)) + Math.trunc(30.6001*(month+1)) + day + b - 1524;
    }

    /**
     * Returns the Hijri date from a julian day
     * @param julianDay the julian day to convert into hijri
     * @return the hijri date with an integer array (year, month, day)
     */
    static getHijriFromJulianDay(julianDay){
        let year = (30*julianDay - 58442554)/(10631);
        let r2 = julianDay-((10631*year+58442583)/30);
        let month = (11*r2+330)/325;
        let r1 = r2-((325*month-320)/11);
        let day = r1+1;
        return [Math.trunc(year), Math.trunc(month), Math.trunc(day)];
    }
}

module.exports = DateUtils;
