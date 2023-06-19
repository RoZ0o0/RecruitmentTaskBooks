package recruitment.task.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import recruitment.task.books.components.RequestFilter;
import recruitment.task.books.service.MetricService;

@SpringBootApplication
public class BooksApplication {
	private final MetricService metricService;

	public BooksApplication(MetricService metricService) {
		this.metricService = metricService;
	}

	public static void main(String[] args) {
		SpringApplication.run(BooksApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<RequestFilter> requestFilter() {
		final FilterRegistrationBean<RequestFilter> registrationBean = new FilterRegistrationBean<>();

		registrationBean.setFilter(new RequestFilter(metricService));
		registrationBean.addUrlPatterns("/*");

		return registrationBean;
	}

}
