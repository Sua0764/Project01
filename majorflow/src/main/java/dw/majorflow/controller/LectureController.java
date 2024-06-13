package dw.majorflow.controller;

import dw.majorflow.model.Lecture;
import dw.majorflow.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class LectureController {
    LectureService lectureService;

    @Autowired
    public LectureController(LectureService lectureService) {this.lectureService = lectureService; }

    @GetMapping("/lectures")
    public ResponseEntity<List<Lecture>> getAllLectures() {
        return new ResponseEntity<>(lectureService.getAllLectures(), HttpStatus.OK);
    }
}
