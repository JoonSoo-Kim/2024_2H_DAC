package dsp.backend.service;

import dsp.backend.utils.CountryEnum;
import dsp.backend.utils.NaverFinanceUtils;
import dsp.backend.utils.YahooFinanceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dsp.backend.repository.ETFRepository;
import dsp.backend.repository.TendencyRepository;
import dsp.backend.repository.UserRepository;
import dsp.backend.Entity.ETF;
import dsp.backend.Entity.Tendency;
import dsp.backend.Entity.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Arrays;
import java.util.Set;
import java.util.HashSet;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class ETFService {

    private static final Logger logger = LoggerFactory.getLogger(ETFService.class);

    @Autowired
    private ETFRepository etfRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TendencyRepository tendencyRepository;

    public Optional<Map<String, Object>> getETFInfo(String symbol) {
        logger.info("Fetching ETF info for symbol: {}", symbol);
        Optional<ETF> etfOptional = etfRepository.findBySymbol(symbol);
        if (etfOptional.isPresent()) {
            ETF etf = etfOptional.get();
            Map<String, Object> etfInfo = new HashMap<>();
            etfInfo.put("symbol", etf.getSymbol());
            etfInfo.put("longName", etf.getLongName());
            double currentPrice = etf.getCurrentPrice();
            double week52High = etf.getWeek52High();
            double week52Low = etf.getWeek52Low();
            double navPrice = etf.getNavPrice();
            if (etf.getCountry() == CountryEnum.USA) {
                currentPrice *= 1395;
                week52High = Math.round(week52High * 1395);
                week52Low = Math.round(week52Low * 1395);
                navPrice = Math.round(navPrice * 1395);
            }
            etfInfo.put("currentPrice", currentPrice);
            etfInfo.put("week52High", week52High);
            etfInfo.put("week52Low", week52Low);
            etfInfo.put("sharesOutstanding", etf.getSharesOutstanding());
            etfInfo.put("benchmark", etf.getBenchmark());
            etfInfo.put("ipoDate", etf.getIpoDate());
            etfInfo.put("expenseRatio", etf.getExpenseRatio());
            etfInfo.put("fundManager", etf.getFundManager());
            etfInfo.put("navPrice", navPrice);
            etfInfo.put("monthChange", etf.getMonthChange());
            etfInfo.put("quarterChange", etf.getQuarterChange());
            etfInfo.put("yearChange", etf.getYearChange());
            etfInfo.put("country", etf.getCountry().name());
            return Optional.of(etfInfo);
        } else {
            return Optional.empty();
        }
    }

    @Transactional
    public void saveNaverETFInfo(String symbol) throws IOException {
        logger.info("Fetching ETF info for symbol: {}", symbol);
        Map<String, Object> etfInfo = NaverFinanceUtils.getETFInfo(symbol);
        CountryEnum country = CountryEnum.KOREA;
        ETF etf = new ETF();
        etf.setSymbol((String) etfInfo.get("symbol"));
        etf.setLongName((String) etfInfo.get("longName"));
        etf.setCurrentPrice((Double) etfInfo.get("currentPrice"));
        etf.setSharesOutstanding((Long) etfInfo.get("sharesOutstanding"));
        etf.setWeek52High((Double) etfInfo.get("week52High"));
        etf.setWeek52Low((Double) etfInfo.get("week52Low"));
        etf.setBenchmark((String) etfInfo.get("benchmark"));
        etf.setIpoDate((String) etfInfo.get("ipoDate"));
        etf.setExpenseRatio(String.valueOf(etfInfo.get("expenseRatio")));
        etf.setFundManager((String) etfInfo.get("fundManager"));
        etf.setNavPrice((Double) etfInfo.get("navPrice"));
        etf.setMonthChange((Double) etfInfo.get("monthChange"));
        etf.setQuarterChange((Double) etfInfo.get("quarterChange"));
        etf.setYearChange((Double) etfInfo.get("yearChange"));
        etf.setCountry(country);
        etfRepository.save(etf);
        logger.info("Saved ETF info for symbol: {}", symbol);
    }

    public List<Map<String, String>> getAllPrice(String symbol) throws IOException {
        Optional<ETF> etfOptional = etfRepository.findBySymbol(symbol);
        
        if (etfOptional.isPresent()) {
            ETF etf = etfOptional.get();
            if (etf.getCountry() == CountryEnum.KOREA) {
                return NaverFinanceUtils.getAllNaverPrice(symbol);
            } 
            else if(etf.getCountry() == CountryEnum.USA) {
                return YahooFinanceUtils.getAllYahooPrice(symbol);
            } else {
                logger.error("Country not supported: {}", etf.getCountry());
                return List.of();
            }
        } else {
            logger.info("ETF not found for symbol: {}", symbol);
            return List.of();
        }
    }

    // 첫 수행 시 DB에 저장된 ETF 정보가 �����는 경우에만 주석 풀고 수행
    // @PostConstruct
    public void saveYahooETFs() {
        List<ETF> etfList = YahooFinanceUtils.getDetailsFromCsv("src\\main\\data\\usa_etfs_info.csv");
        for (ETF etf : etfList) {
            if (!etfRepository.existsBySymbol(etf.getSymbol())) {
                etfRepository.save(etf);
                logger.info("Saved ETF: {}", etf.getSymbol());
            } else {
                logger.info("ETF already exists: {}", etf.getSymbol());
            }
        }
    }

    // 첫 수행 시 DB에 저장된 ETF 정보가 없는 경우에만 주석 풀고 수행
    // @PostConstruct
    public void saveNaverETFs() {
        logger.info("Starting saveFilteredETFs method");

        try {
            // 1. 디렉토리 확인
            File folderKOR = new File("src\\main\\data\\ETF_KOR");
            if (!folderKOR.exists() || !folderKOR.isDirectory()) {
                logger.error("Directory does not exist or is not a directory: {}", folderKOR.getAbsolutePath());
                return;
            }

            // 2. CSV 파일 목록 가져오기 및 정렬
            File[] listOfFilesKOR = folderKOR.listFiles((dir, name) -> name.endsWith(".csv"));
            if (listOfFilesKOR == null) {
                logger.error("No files found in directory: {}", folderKOR.getAbsolutePath());
                return;
            }
            Arrays.sort(listOfFilesKOR, (f1, f2) -> f1.getName().compareTo(f2.getName()));

            // 3. 파일 이름에서 쿼리 추출
            Set<String> queriesKOR = Arrays.stream(listOfFilesKOR)
                                           .map(File::getName)
                                           .collect(Collectors.toSet());

            // 4. 네이버 증권에서 ETF 정보 가져오고 저장하기
            for (String query : queriesKOR){
                Map<String, String> etfTag = NaverFinanceUtils.searchETFs(query);
                Map<String, Object> etfInfo = NaverFinanceUtils.getETFInfo(etfTag.get("symbol"));
                ETF etf = new ETF();
                etf.setSymbol((String) etfInfo.get("symbol"));
                etf.setLongName((String) etfInfo.get("longName"));
                etf.setCurrentPrice((Double) etfInfo.get("currentPrice"));
                etf.setSharesOutstanding((Long) etfInfo.get("sharesOutstanding"));
                etf.setWeek52High((Double) etfInfo.get("week52High"));
                etf.setWeek52Low((Double) etfInfo.get("week52Low"));
                etf.setBenchmark((String) etfInfo.get("benchmark"));
                etf.setIpoDate((String) etfInfo.get("ipoDate"));
                etf.setExpenseRatio(String.valueOf(etfInfo.get("expenseRatio")));
                etf.setFundManager((String) etfInfo.get("fundManager"));
                etf.setNavPrice((Double) etfInfo.get("navPrice"));
                etf.setMonthChange((Double) etfInfo.get("monthChange"));
                etf.setQuarterChange((Double) etfInfo.get("quarterChange"));
                etf.setYearChange((Double) etfInfo.get("yearChange"));
                etf.setCountry(CountryEnum.KOREA);
                etfRepository.save(etf);
                logger.info("Saved ETF info for symbol: {}", etf.getSymbol());
            }  
        } catch(Exception e){
            logger.error("Error occurred while saving filtered ETFs", e);
        }

        logger.info("Completed saveFilteredETFs method");
    }

    public List<Map<String, Object>> getsimpleETFPrices(List<String> symbols) throws IOException {
        List<ETF> etfs = etfRepository.findBySymbolIn(symbols);
        List<Map<String, Object>> etfDetails = new ArrayList<>();
        for (ETF etf : etfs) {
            logger.info("Processing ETF: {}", etf);
            Map<String, Object> etfDetail = new HashMap<>();
            etfDetail.put("symbol", etf.getSymbol());
            etfDetail.put("etfName", etf.getLongName());
            etfDetail.put("etfPrice", etf.getCurrentPrice());
            etfDetail.put("Country", etf.getCountry().name());
            etfDetail.put("fundmanager", etf.getFundManager());

            List<Map<String, String>> priceData;
            if (etf.getCountry() == CountryEnum.KOREA) {
                priceData = NaverFinanceUtils.getAllNaverPrice(etf.getSymbol());
                etfDetail.put("chartPrice", priceData.stream()
                    .skip(Math.max(0, priceData.size() - 36))
                    .map(data -> data.get("price"))
                    .collect(Collectors.toList()));
            } else if (etf.getCountry() == CountryEnum.USA) {
                priceData = YahooFinanceUtils.getAllYahooPrice(etf.getSymbol());
                etfDetail.put("chartPrice", priceData.stream()
                    .skip(Math.max(0, priceData.size() - 11))
                    .map(data -> data.get("price"))
                    .collect(Collectors.toList()));
            }

            etfDetails.add(etfDetail);
        }

        return etfDetails;
    }

    public List<Map<String, Object>> getETFDetails(List<String> symbols) throws IOException {
        logger.info("symbols: {}", symbols);
        List<ETF> etfs = etfRepository.findBySymbolIn(symbols);
        logger.info("Queried symbols: {}", symbols);
        logger.info("Found ETFs: {}", etfs);

        List<Map<String, Object>> etfDetails = new ArrayList<>();
        for (ETF etf : etfs) {
            logger.info("Processing ETF: {}", etf);
            Map<String, Object> etfDetail = new HashMap<>();
            etfDetail.put("symbol", etf.getSymbol());
            etfDetail.put("etfName", etf.getLongName());
            double etfPrice = etf.getCurrentPrice();
            if (etf.getCountry() == CountryEnum.USA) {
                etfPrice = Math.round(etfPrice * 1395);
            }
            etfDetail.put("etfPrice", etfPrice);
            etfDetail.put("Country", etf.getCountry().name());
            etfDetail.put("fundmanager", etf.getFundManager());

            List<Map<String, String>> priceData;
            if (etf.getCountry() == CountryEnum.KOREA) {
                priceData = NaverFinanceUtils.getAllNaverPrice(etf.getSymbol());
                etfDetail.put("chartPrice", priceData.stream()
                    .skip(Math.max(0, priceData.size() - 36))
                    .map(data -> data.get("price"))
                    .collect(Collectors.toList()));
            } else if (etf.getCountry() == CountryEnum.USA) {
                priceData = YahooFinanceUtils.getAllYahooPrice(etf.getSymbol());
                etfDetail.put("chartPrice", priceData.stream()
                    .skip(Math.max(0, priceData.size() - 11))
                    .map(data -> data.get("price"))
                    .collect(Collectors.toList()));
            }

            etfDetails.add(etfDetail);
        }

        return etfDetails;
    }

    public List<Map<String, Object>> getAllETFs() {
        List<ETF> etfs = etfRepository.findAll();
        return etfs.stream()
                   .map(etf -> {
                       Map<String, Object> etfDetails = new HashMap<>();
                       etfDetails.put("symbol", etf.getSymbol());
                       etfDetails.put("longName", etf.getLongName());
                       etfDetails.put("country", etf.getCountry().name());
                       etfDetails.put("currentPrice", etf.getCurrentPrice());
                       return etfDetails;
                   })
                   .collect(Collectors.toList());
    }

    public Map<String, Object> recommendETF(String symbol, String userId) throws IOException {
        User user = userRepository.findByUserId(userId).get();
        ETF etf = etfRepository.findBySymbol(symbol).get();
        double score = 0.0;
        boolean tendencyFound = true;

        if (etf.getCountry() == CountryEnum.KOREA){
            symbol = etf.getLongName();
        }

        try {
            Tendency tendency = tendencyRepository.findById(user.getTendencyIndex()).get();
            score = tendency.getScore();
        } catch (Exception e) {
            logger.info("Tendency not found for user: {}", e);
            tendencyFound = false;
        }

        if (!tendencyFound) {
            return getRecByAirflow(symbol);
        } else{
            return getRecByAirflowWithTendency(symbol, score);
        }
    }

    private Map<String, Object> getRecByAirflow(String symbol) throws IOException{
        RestTemplate restTemplate = new RestTemplate();
            restTemplate.getInterceptors().add(new BasicAuthenticationInterceptor("admin", "admin"));
    
            String dagRunUrl = "http://localhost:8081/api/v1/dags/recommend_dag/dagRuns";
            String xcomUrlTemplate = "http://localhost:8081/api/v1/dags/recommend_dag/dagRuns/{dag_run_id}/taskInstances/recommend_stocks/xcomEntries/recommendation_result";
    
            logger.info("Triggering DAG for symbol: {}", symbol);
    
            // Trigger the DAG
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("conf", Map.of("input_stock", symbol));
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response;
            try {
                response = restTemplate.exchange(dagRunUrl, HttpMethod.POST, requestEntity, Map.class);
            } catch (Exception e) {
                logger.error("Failed to trigger DAG", e);
                throw new IOException("Failed to trigger DAG", e);
            }
    
            // Get the DAG run ID
            String dagRunId = (String) response.getBody().get("dag_run_id");
            logger.info("DAG triggered successfully, DAG run ID: {}", dagRunId);
    
            // Fetch XCom entries
            String xcomUrl = UriComponentsBuilder.fromUriString(xcomUrlTemplate)
                                                 .buildAndExpand(dagRunId)
                                                 .toUriString();
            ResponseEntity<String> xcomResponse;
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> xcomResult = null;
    
            while (xcomResult == null) {
                try {
                    xcomResponse = restTemplate.exchange(xcomUrl, HttpMethod.GET, null, String.class);
                    xcomResult = objectMapper.readValue(xcomResponse.getBody(), Map.class);
                } catch (HttpClientErrorException.NotFound e) {
                    logger.info("XCom entry not found, retrying in 1 second...");
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new IOException("Interrupted while waiting for XCom entry", ie);
                    }
                } catch (Exception e) {
                    logger.error("Failed to fetch XCom entries", e);
                    throw new IOException("Failed to fetch XCom entries", e);
                }
            }
    
            // Extract the value field from the XCom result
            String value = (String) xcomResult.get("value");
            value = value.replace("'", "\""); // Replace single quotes with double quotes
            Map<String, Object> recommendation;
            try {
                recommendation = objectMapper.readValue(value, Map.class);
            } catch (Exception e) {
                logger.error("Failed to parse recommendation value", e);
                throw new IOException("Failed to parse recommendation value", e);
            }
    
            logger.info("Recommendation fetched successfully for symbol: {}", symbol);
            return recommendation;
    }

    private Map<String, Object> getRecByAirflowWithTendency(String symbol, double score) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new BasicAuthenticationInterceptor("admin", "admin"));

        String dagRunUrl = "http://localhost:8081/api/v1/dags/recommend_with_tendency_dag/dagRuns";
        String xcomUrlTemplate = "http://localhost:8081/api/v1/dags/recommend_with_tendency_dag/dagRuns/{dag_run_id}/taskInstances/recommend_tendency/xcomEntries/recommendation_result";

        logger.info("Triggering DAG for symbol: {}", symbol);

        // Trigger the DAG
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> conf = new HashMap<>();
        conf.put("input_stock", symbol);
        conf.put("final_score", score);
        requestBody.put("conf", conf);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response;
        try {
            response = restTemplate.exchange(dagRunUrl, HttpMethod.POST, requestEntity, Map.class);
        } catch (Exception e) {
            logger.error("Failed to trigger DAG", e);
            throw new IOException("Failed to trigger DAG", e);
        }

        // Get the DAG run ID
        String dagRunId = (String) response.getBody().get("dag_run_id");
        logger.info("DAG triggered successfully, DAG run ID: {}", dagRunId);

        // Fetch XCom entries
        String xcomUrl = UriComponentsBuilder.fromUriString(xcomUrlTemplate)
                                             .buildAndExpand(dagRunId)
                                             .toUriString();
        ResponseEntity<String> xcomResponse;
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> xcomResult = null;

        while (xcomResult == null) {
            try {
                xcomResponse = restTemplate.exchange(xcomUrl, HttpMethod.GET, null, String.class);
                xcomResult = objectMapper.readValue(xcomResponse.getBody(), Map.class);
            } catch (HttpClientErrorException.NotFound e) {
                logger.info("XCom entry not found, retrying in 1 second...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new IOException("Interrupted while waiting for XCom entry", ie);
                }
            } catch (Exception e) {
                logger.error("Failed to fetch XCom entries", e);
                throw new IOException("Failed to fetch XCom entries", e);
            }
        }

        // Extract the value field from the XCom result
        String value = (String) xcomResult.get("value");
        value = value.replace("'", "\""); // Replace single quotes with double quotes
        Map<String, Object> recommendation;
        try {
            recommendation = objectMapper.readValue(value, Map.class);
        } catch (Exception e) {
            logger.error("Failed to parse recommendation value", e);
            throw new IOException("Failed to parse recommendation value", e);
        }

        logger.info("Recommendation fetched successfully for symbol: {}", symbol);
        return recommendation;
    }
}