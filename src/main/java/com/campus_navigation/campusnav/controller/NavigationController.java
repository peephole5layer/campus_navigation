package com.campus_navigation.campusnav.controller;

import com.campus_navigation.campusnav.model.Location;
import com.campus_navigation.campusnav.model.Path;
import com.campus_navigation.campusnav.service.NavigationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/navigation")
@RequiredArgsConstructor
public class NavigationController {

    private final NavigationService navigationService;

    @GetMapping("/route")
    public List<Location> getRoute(
        @RequestParam("sourceId") Long sourceId,
        @RequestParam("destinationId") Long destinationId
    ){
        return navigationService.findShortestPath(sourceId,destinationId);
    }

    @PostMapping("/location")
    public Location addLocation(@RequestBody Location location){
        return navigationService.addLocation(location);
    }

    @PostMapping("/path")
    public Path addPath(@RequestBody Path path){
        return navigationService.addPath(path);
    }

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        return navigationService.getAllLocations();
    }

}
