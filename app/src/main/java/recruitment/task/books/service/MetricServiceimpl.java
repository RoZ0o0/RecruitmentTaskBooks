package recruitment.task.books.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MetricServiceimpl implements MetricService{

    private Map<Integer, Integer> statusMetric;

    public MetricServiceimpl() {
        statusMetric = new ConcurrentHashMap<>();
    }

    @Override
    public void increaseCount(String request, int status) {
        Integer statusCount = statusMetric.get(status);
        if (statusCount == null) {
            statusMetric.put(status, 1);
        } else {
            statusMetric.put(status, statusCount + 1);
        }
    }

    @Override
    public Map getMetric() {
        return statusMetric;
    }
}
