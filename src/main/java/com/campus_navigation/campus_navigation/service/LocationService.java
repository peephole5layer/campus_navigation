package com.campus_navigation.campus_navigation.service;

import com.campus_navigation.campus_navigation.model.Location;
import com.campus_navigation.campus_navigation.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;

    public List<Location> getAllLocations(){
        return locationRepository.findAll();
    }

    public Location addLocation(Location location){
        return locationRepository.save(location);
    }

}
