package dsp.backend.controller;

import dsp.backend.Entity.Tendency;
import dsp.backend.exception.TendencyNotFoundException;
import dsp.backend.service.TendencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tendency")
public class TendencyController {

    @Autowired
    private TendencyService tendencyService;

    @PostMapping
    public ResponseEntity<Void> createTendency(@RequestBody Map<String, Object> request) {
        String userId = (String) request.get("userId");
        List<String> answers = (List<String>) request.get("answers");
        List<String> reasons = (List<String>) request.get("reasons");

        tendencyService.saveTendency(answers, reasons, userId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Tendency> getTendencyByUserId(@PathVariable String userId) {
        try {
            Tendency tendency = tendencyService.getTendencyByUserId(userId);
            return ResponseEntity.ok(tendency);
        } catch (TendencyNotFoundException e) {
            return ResponseEntity.status(404).body(null);
        }
    }
}
