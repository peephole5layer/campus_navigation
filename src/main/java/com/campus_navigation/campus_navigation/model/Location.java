package com.campus_navigation.campus_navigation.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Location {
    private long id;
    private String name;
    private double latitude;
    private double longitude;
}
