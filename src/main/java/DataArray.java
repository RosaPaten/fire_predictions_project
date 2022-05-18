import java.util.*;

import arc.files.Fi;

public class DataArray extends DataWrapper {

    private HashMap<String, ArrayList<NOAADataPoint>> precipitation;

    public DataArray(int width, int height) {
        super(width, width * height);

        Fi noaaData = new Fi("./Data/NOAA/Data/parsed");
        // TODO: add other data
        System.out.println(parseDly(noaaData.list()[0].readString()));

        for (int i = 0; i < width * height; i++) {
            super.setData(new DataPoint(), i);
        }

    }

    /**
     *  
     * @param dly raw .dly file of a specific data type
     * @return 
     * @see #NOAADataPoint
     */
    private HashMap<String, ArrayList<NOAADataPoint>> parseDly(String dly) {
        String[] lines = dly.split("\n"); // splits file into each line
        HashMap<String, ArrayList<NOAADataPoint>> points = new HashMap<String, ArrayList<NOAADataPoint>>();
        for (int i = 0; i < lines.length; i++) { // for each line
            String line = lines[i];
            if (line == "")
                continue; // skip empty lines 

            String id = line.substring(0, 11);

            if (!points.containsKey(id))
                points.put(id, new ArrayList<NOAADataPoint>());

            NOAADataPoint point = new NOAADataPoint();

            int year = Integer.parseInt(line.substring(11, 15));
            int month = Integer.parseInt(line.substring(15, 17));
            String dataType = line.substring(17, 21);

            String[] data = line.substring(21).split("(?<=\\G.{" + 8 + "})");

            int[] vals = new int[data.length];

            point.id = id;
            point.dataType = dataType;
            point.month = month;
            point.year = year;

            for (int j = 0; j < data.length; j++) {
                vals[j] = Integer.parseInt(data[j].substring(0, 5).trim());
            }

            point.values = vals;

            points.get(id).add(point);
        }
        return points;
    }
}
