package com.campus_navigation.campus_navigation.controller;

import com.campus_navigation.campus_navigation.model.Route;
import com.campus_navigation.campus_navigation.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @PostMapping
    public Route addRoute(@RequestBody Route route) {
        return routeService.addRoute(route);
    }
}
