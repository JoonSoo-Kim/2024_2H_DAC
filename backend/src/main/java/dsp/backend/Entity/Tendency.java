package dsp.backend.Entity;

import dsp.backend.utils.TendencyEnum;
import jakarta.persistence.*;

@Entity
public class Tendency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int answer1;

    @Column(nullable = false)
    private int answer2;

    @Column(nullable = false)
    private int answer3;

    @Column(nullable = false)
    private int answer4;

    @Column(nullable = false)
    private int answer5;

    @Column(nullable = false)
    private int answer6;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason1;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason2;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason3;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason4;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason5;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason6;

    @Column(nullable = false)
    private double score;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TendencyEnum tendency;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String comment;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAnswer1() {
        return answer1;
    }

    public void setAnswer1(int answer1) {
        this.answer1 = answer1;
    }

    public int getAnswer2() {
        return answer2;
    }

    public void setAnswer2(int answer2) {
        this.answer2 = answer2;
    }

    public int getAnswer3() {
        return answer3;
    }

    public void setAnswer3(int answer3) {
        this.answer3 = answer3;
    }

    public int getAnswer4() {
        return answer4;
    }

    public void setAnswer4(int answer4) {
        this.answer4 = answer4;
    }

    public int getAnswer5() {
        return answer5;
    }

    public void setAnswer5(int answer5) {
        this.answer5 = answer5;
    }

    public int getAnswer6() {
        return answer6;
    }

    public void setAnswer6(int answer6) {
        this.answer6 = answer6;
    }

    public String getReason1() {
        return reason1;
    }

    public void setReason1(String reason1) {
        this.reason1 = reason1;
    }

    public String getReason2() {
        return reason2;
    }

    public void setReason2(String reason2) {
        this.reason2 = reason2;
    }

    public String getReason3() {
        return reason3;
    }

    public void setReason3(String reason3) {
        this.reason3 = reason3;
    }

    public String getReason4() {
        return reason4;
    }

    public void setReason4(String reason4) {
        this.reason4 = reason4;
    }

    public String getReason5() {
        return reason5;
    }

    public void setReason5(String reason5) {
        this.reason5 = reason5;
    }

    public String getReason6() {
        return reason6;
    }

    public void setReason6(String reason6) {
        this.reason6 = reason6;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public TendencyEnum getTendency() {
        return tendency;
    }

    public void setTendency(TendencyEnum tendency) {
        this.tendency = tendency;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
