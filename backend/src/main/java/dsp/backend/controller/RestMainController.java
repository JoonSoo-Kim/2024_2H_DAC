package dsp.backend.controller;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class RestMainController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/api/data")
    public String test() {
        return "Hello React!";
    }

	@GetMapping("/hello")
	public ResponseEntity<String> getHello(@RequestParam(value = "param", required = false, defaultValue = "defaultValue") String param) {
		String url = "http://localhost:8081/api/v1/dags/hello_world_dag/dagRuns/manual__2024-11-13T04:42:34.843005+00:00/taskInstances/hello_task/xcomEntries";
	
		HttpHeaders headers = new HttpHeaders();
		String auth = "admin:admin";
		byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
		String authHeader = "Basic " + new String(encodedAuth);
		headers.set("Authorization", authHeader);
	
		HttpEntity<String> entity = new HttpEntity<>(headers);

		try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            String responseBody = response.getBody();

            // JSON 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode xcomEntriesNode = rootNode.path("xcom_entries");

            // xcom_entries 배열의 내용을 반환
            return new ResponseEntity<>(xcomEntriesNode.toString(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
}