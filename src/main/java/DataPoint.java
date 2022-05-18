import java.time.*;

public class DataPoint {
    private double totalPrecipitation;
    private LocalDate[] previousFires;
    private int risk;
    private double[] latLong;

    /**
     * 
     * @param tp Total Precipitation over previous 6 months
     * @param pf array of all previous fires at this location in chronological order
     * @param lat latitude of top left corner of grid square
     * @param lon longitude of top left corner of grid square
     */
    public DataPoint(double tp, LocalDate[] pf, double lat, double lon) {
        totalPrecipitation = tp;
        previousFires = pf;
        latLong = new double[]{lat, lon};
        
    }

    public int getRisk() {
        // TODO: implement regression algorithm using local fields
        return 0;
    }

}

