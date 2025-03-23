package com.campus_navigation.campus_navigation.service;

import com.campus_navigation.campus_navigation.model.Route;
import com.campus_navigation.campus_navigation.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }
}
