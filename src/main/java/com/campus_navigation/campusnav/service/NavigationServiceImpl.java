package com.campus_navigation.campusnav.service;

import com.campus_navigation.campusnav.model.Location;
import com.campus_navigation.campusnav.model.Path;
import com.campus_navigation.campusnav.repository.LocationRepository;
import com.campus_navigation.campusnav.repository.PathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.*;

@Service
@RequiredArgsConstructor
public class NavigationServiceImpl implements NavigationService{
    private final LocationRepository locationRepository;
    private final PathRepository pathRepository;

    @Override
    public List<Location> findShortestPath(Long sourceId, Long destinationId) {
        Map<Long, Location> locations = new HashMap<>();
        Map<Long, List<Path>> graph = new HashMap<>();

        // Load all locations and paths
        locationRepository.findAll().forEach(loc -> locations.put(loc.getId(), loc));
        for (Path path : pathRepository.findAll()) {
            graph.computeIfAbsent(path.getSource().getId(), k -> new ArrayList<>()).add(path);
        }

        // Dijkstra's Algorithm
        Map<Long, Double> distances = new HashMap<>();
        Map<Long, Long> previous = new HashMap<>();
        PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingDouble(a -> a[1]));

        for (Long id : locations.keySet()) distances.put(id, Double.MAX_VALUE);
        distances.put(sourceId, 0.0);
        pq.add(new long[]{sourceId, 0});

        while (!pq.isEmpty()) {
            long[] curr = pq.poll();
            long currentId = curr[0];

            if (currentId == destinationId) break;

            if (!graph.containsKey(currentId)) continue;

            for (Path edge : graph.get(currentId)) {
                long neighborId = edge.getDestination().getId();
                double newDist = distances.get(currentId) + edge.getDistance();

                if (newDist < distances.get(neighborId)) {
                    distances.put(neighborId, newDist);
                    previous.put(neighborId, currentId);
                    pq.add(new long[]{neighborId, (long) newDist});
                }
            }
        }

        // Reconstruct path
        LinkedList<Location> path = new LinkedList<>();
        Long step = destinationId;

        while (step != null && previous.containsKey(step)) {
            path.addFirst(locations.get(step));
            step = previous.get(step);
        }

        path.addFirst(locations.get(sourceId));
        return path;
    }

    @Override
    public Location addLocation(Location location){
        return locationRepository.save(location);
    }

    @Override
    public Path addPath(Path path){
        return pathRepository.save(path);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

}
