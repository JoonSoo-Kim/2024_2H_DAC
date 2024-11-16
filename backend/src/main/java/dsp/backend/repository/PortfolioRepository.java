package dsp.backend.repository;

import dsp.backend.Entity.Portfolio;
import dsp.backend.Entity.PortfolioId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, PortfolioId> {
    List<Portfolio> findByUserId(String userId);
}
