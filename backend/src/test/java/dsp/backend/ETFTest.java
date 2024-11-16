package dsp.backend;

import dsp.backend.service.ETFService;
import dsp.backend.utils.NaverFinanceUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Map;

@SpringBootTest
public class ETFTest {

    private static final Logger logger = LoggerFactory.getLogger(ETFTest.class);

    @Autowired
    private ETFService etfService;

    @Test
    public void testSaveETFInfo() {
        try {
            etfService.saveNaverETFInfo("069500");
            logger.info("ETF 정보가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            logger.error("ETF 정보를 저장하는 데 실패했습니다.", e);
        }
    }

    @Test
    public void testSaveFilteredETFs() {
        try {
            etfService.saveNaverETFs();
            logger.info("Filtered ETF 정보가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            logger.error("Filtered ETF 정보를 저장하는 데 실패했습니다.", e);
        }
    }

    @Test
    public void testSearchETFs() {
        try {
            String[] queries = {"HANARO Fn친환경에너지", "TIMEFOLIO K이노베이션액티브", "RISE 미국장기국채선물인버스(H)"};
            for (String query : queries) {
                Map<String, String> etf = NaverFinanceUtils.searchETFs(query);
                if (etf != null) {
                    logger.info("Query: {}", query);
                    logger.info("Code: {}", etf.get("code"));
                    logger.info("Name: {}", etf.get("name"));
                } else {
                    logger.info("Encoded Query: {}", URLEncoder.encode(query, Charset.forName("EUC-KR").toString()));
                    logger.info("Query: {} - No results found", query);
                }
            }
        } catch (IOException e) {
            logger.error("Error occurred while searching ETFs", e);
        }
    }
}