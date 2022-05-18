public class DataWrapper {
    private DataPoint[] data;
    private int carry;    

    /**
     * @param carry number of {@link DataPoint DataPoints} before moving to next line
     * @param length length of the array
     * @see DataPoint
     */
    public DataWrapper(int c, int l) {
        data = new DataPoint[l];
        carry = c;
    }

    public void setData(DataPoint dataPoint, int index) {
        data[index] = dataPoint;        
    }

    public DataPoint[] getDataArray() {
        return data;
    }

    public int[][] getRiskArray() {
        int[][] arr = new int[data.length / carry][carry];
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                arr[i][j] = data[i * carry + j].getRisk();
            }
        }
        return arr;
    }
    
}
