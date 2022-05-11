import arc.files.Fi;
import arc.util.Strings;

public class Main{
	public static final int PPM_SCALE = 100;
	public static final int PPM_COLOR = 255;

	public static void main(String[] args){
		Fi fi = new Fi(args[0]);
		double[][] arr = {
				{0.3, 0.7, 0.9},
				{-1, 0.1, 0.6},
				{-1, -1, 0.7}
		};
		writePPM(arr, fi);
	}

	public static void writePPM(double[][] arr, Fi out){
		StringBuilder sb = new StringBuilder();
		int width = arr.length * PPM_SCALE;
		int height = arr.length * PPM_SCALE;
		sb.append(Strings.format("P3\n@ @\n@\n", width, height, PPM_COLOR));
		for(int ni = 0; ni < width; ni++){
			int i = ni / PPM_SCALE;
			for(int nj = 0; nj < height; nj++){
				int j = nj / PPM_SCALE;
				sb.append(color(arr[i][j])).append("\n");
			}
			sb.append("\n");
		}
		out.writeString(sb.toString());
	}

	public static String color(double d){
		int red = 0, green = 0, blue = 0;
		if(d < 0)
			blue = PPM_COLOR / 2 + (int)(Math.random() * PPM_COLOR / 16 - PPM_COLOR / 8);
		else if(d < 0.5)
			green = PPM_COLOR - (int)(PPM_COLOR * d);
		else
			red = (int)(PPM_COLOR * d);
		return Strings.format("@ @ @", red, green, blue);
	}
}
