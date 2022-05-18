import arc.struct.IntFloatMap;
import arc.struct.IntIntMap;
import arc.util.Strings;

public class LeastSquares{

	public static final double SMALL_STEP_SIZE = Math.pow(0.5, 40);

	public static double leastSquares(IntFloatMap data){
		double coeff = 1;
		for(IntFloatMap.Entry e: data){
			coeff = e.value / e.key;
			break;
		}
		double stepSize = 1;
		while(stepSize > SMALL_STEP_SIZE){
			System.out.println(Strings.format("StepSize @ coeff @", stepSize, coeff));
			double sumDiff = sumResiduals(data, coeff + stepSize) - sumResiduals(data, coeff - stepSize);
			if(sumDiff != 0)
				if(sumDiff < 0){
					coeff += stepSize;
				}else
					coeff -= stepSize;
			stepSize /= 2;
		}
		return coeff;
	}

	public static double sumResiduals(IntFloatMap data, double coeff){
		double s = 0;
		for(IntFloatMap.Entry e: data)
			s += Math.pow(e.value - (e.key * coeff), 2);
		return s;
	}
}
