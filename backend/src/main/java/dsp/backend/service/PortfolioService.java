package dsp.backend.service;

import dsp.backend.Entity.Portfolio;
import dsp.backend.Entity.PortfolioId;
import dsp.backend.controller.PortfolioController;
import dsp.backend.repository.PortfolioRepository;
import dsp.backend.repository.UserRepository;
import dsp.backend.repository.ETFRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ETFRepository etfRepository;

    public void addPortfolio(String userId, String etfCode, Integer count) {
        userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 정보"));
        etfRepository.findBySymbol(etfCode).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 정보"));

        PortfolioId portfolioId = new PortfolioId(userId, etfCode);
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElse(null);

        if (portfolio != null) {
            portfolio.setCount(portfolio.getCount() + count);
        } else {
            portfolio = new Portfolio();
            portfolio.setUserId(userId);
            portfolio.setSymbol(etfCode);
            portfolio.setCount(count);
        }

        portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(String userId, String etfCode) {
        userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 정보"));
        etfRepository.findBySymbol(etfCode).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 정보"));

        PortfolioId portfolioId = new PortfolioId(userId, etfCode);
        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 정보"));

        portfolioRepository.delete(portfolio);
    }

    public List<PortfolioController.PortfolioResponse> getPortfolios(String userId) {
        userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("존재하지 않는 정보"));

        List<Portfolio> portfolios = portfolioRepository.findByUserId(userId);
        double totalMoney = portfolios.stream().mapToDouble(p -> p.getCount() * p.getEtf().getCurrentPrice()).sum();

        return portfolios.stream().map(p -> {
            PortfolioController.PortfolioResponse response = new PortfolioController.PortfolioResponse();
            response.setEtfCode(p.getSymbol());
            response.setEtfName(p.getEtf().getLongName());
            response.setCount(p.getCount());
            response.setMoney(p.getCount() * p.getEtf().getCurrentPrice());
            response.setPercent((response.getMoney() / totalMoney) * 100);
            return response;
        }).collect(Collectors.toList());
    }
}
