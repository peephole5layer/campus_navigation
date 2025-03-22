package com.campus_navigation.campus_navigation.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Location startLocation;

    @ManyToOne
    private Location endLocation;

    private double distance;

}
