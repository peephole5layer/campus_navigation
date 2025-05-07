package com.campus_navigation.campusnav.service;

import com.campus_navigation.campusnav.model.Location;
import com.campus_navigation.campusnav.model.Path;

import java.util.List;

public interface NavigationService {
    List<Location> findShortestPath(Long sourceId, Long destinationId);

    Location addLocation(Location location);

    Path addPath(Path path);

    List<Location> getAllLocations();
}
