package recruitment.task.books.service;

import java.util.Map;

public interface MetricService {
    void increaseCount(String request, int status);
    Map getMetric();
}
