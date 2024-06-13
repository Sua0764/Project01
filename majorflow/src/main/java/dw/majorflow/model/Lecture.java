package dw.majorflow.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "lecture")
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long lectureId;

    @Column(name = "lecture_name")
    private String lectureName;

    @Column
    private String category;

    @Column(name = "play_time")
    private int playTime;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}
