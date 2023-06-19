package recruitment.task.books.controller;

import org.springframework.web.bind.annotation.*;
import recruitment.task.books.service.MetricService;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/metric")
public class MetricController {
    private final MetricService metricService;

    public MetricController(MetricService metricService) {
        this.metricService = metricService;
    }

    @GetMapping("/getMetric")
    @ResponseBody
    public Map getStatusMetric() {
        return metricService.getMetric();
    }
}
