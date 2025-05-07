package com.campus_navigation.campusnav.repository;

import com.campus_navigation.campusnav.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Long> {

}
