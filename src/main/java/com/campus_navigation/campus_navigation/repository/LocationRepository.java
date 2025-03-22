package com.campus_navigation.campus_navigation.repository;

import com.campus_navigation.campus_navigation.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Long> {
}
