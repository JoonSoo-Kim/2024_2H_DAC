package dsp.backend.repository;

import dsp.backend.Entity.Tendency;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TendencyRepository extends JpaRepository<Tendency, Long> {
    Optional<Tendency> findById(Long id);
}
