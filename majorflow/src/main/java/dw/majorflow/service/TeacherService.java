package dw.majorflow.service;

import dw.majorflow.model.Teacher;
import dw.majorflow.model.User;
import dw.majorflow.dto.TeacherDto;
import dw.majorflow.exception.ResourceNotFoundException;
import dw.majorflow.model.Teacher;
import dw.majorflow.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class TeacherService {

    @Autowired
    TeacherRepository teacherRepository;

    public TeacherDto getTeacherById(Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            return toDto(teacher.get());

        } else {
            throw new RuntimeException("Teacher not found with id: " + id);
        }
    }

    private TeacherDto toDto(Teacher teacher) {
        TeacherDto dto = new TeacherDto();
        dto.setTeacherId(teacher.getTeacherId());
        dto.setTeacherName(teacher.getTeacherName());
        return dto;
    }
}