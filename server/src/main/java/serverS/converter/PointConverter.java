package serverS.converter;

import org.springframework.data.geo.Point;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class PointConverter implements AttributeConverter<Point, Double[]> {
    @Override
    public Double[] convertToDatabaseColumn(Point value) {

        Double[] d = new Double[2];
        if (value == null) return null;
        else{
                d[0] = Double.parseDouble(String.valueOf(value.getX()));
                d[1] = Double.parseDouble(String.valueOf(value.getY()));
                return d;
        }
    }

    @Override
    public Point convertToEntityAttribute(Double[] value) {
        return (value == null ? null : new Point(value[0], value[1]));
    }
}
