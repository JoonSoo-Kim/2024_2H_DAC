package dsp.backend.repository;

import dsp.backend.Entity.ETF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ETFRepository extends JpaRepository<ETF, String> {
    Optional<ETF> findBySymbol(String symbol);
    boolean existsBySymbol(String symbol);
    
    List<ETF> findBySymbolIn(List<String> symbols);
    Optional<ETF> findByLongName(String longName);
}