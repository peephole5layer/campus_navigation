package com.campus_navigation.campus_navigation.service;

import com.campus_navigation.campus_navigation.model.Location;
import com.campus_navigation.campus_navigation.model.Route;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PathfindingService {
    public List<Route> findShortestPath(Location start, Location end, List<Route> allRoutes) {
        // Implement Dijkstra’s Algorithm
        Map<Location, Double> shortestDistances = new HashMap<>();
        Map<Location, Location> previousNodes = new HashMap<>();
        PriorityQueue<Location> queue = new PriorityQueue<>(Comparator.comparing(shortestDistances::get));

        // Initialize distances
        for (Route route : allRoutes) {
            shortestDistances.put(route.getStartLocation(), Double.MAX_VALUE);
            shortestDistances.put(route.getEndLocation(), Double.MAX_VALUE);
        }
        shortestDistances.put(start, 0.0);
        queue.add(start);

        while (!queue.isEmpty()) {
            Location current = queue.poll();
            for (Route route : allRoutes) {
                Location neighbor = route.getEndLocation();
                double newDistance = shortestDistances.get(current) + route.getDistance();
                if (newDistance < shortestDistances.get(neighbor)) {
                    shortestDistances.put(neighbor, newDistance);
                    previousNodes.put(neighbor, current);
                    queue.add(neighbor);
                }
            }
        }

        // Build path
        List<Route> path = new ArrayList<>();
        for (Location at = end; at != null; at = previousNodes.get(at)) {
            Route route = findRoute(previousNodes.get(at), at, allRoutes);
            if (route != null) path.add(route);
        }
        Collections.reverse(path);
        return path;
    }

    private Route findRoute(Location start, Location end, List<Route> routes) {
        return routes.stream().filter(r -> r.getStartLocation().equals(start) && r.getEndLocation().equals(end))
                .findFirst().orElse(null);
    }
}
