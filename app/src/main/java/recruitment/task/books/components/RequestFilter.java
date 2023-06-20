package recruitment.task.books.components;

import recruitment.task.books.service.MetricService;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter
public class RequestFilter implements Filter {
    private MetricService metricService;

    public RequestFilter(MetricService metricService) {
        this.metricService = metricService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String req = httpServletRequest.getMethod() + " " + httpServletRequest.getRequestURI();

        filterChain.doFilter(servletRequest, servletResponse);

        int status = ((HttpServletResponse) servletResponse).getStatus();
        metricService.increaseCount(req, status);
    }
}
