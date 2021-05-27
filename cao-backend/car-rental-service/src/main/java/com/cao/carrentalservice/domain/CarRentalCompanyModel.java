package com.cao.carrentalservice.domain;

import java.math.BigDecimal;

public class CarRentalCompanyModel {
    private int id;
    private String name;
    private BigDecimal price;
    private String location;

    public CarRentalCompanyModel() {
    }

    public CarRentalCompanyModel(int id) {
        this.id = id;
    }

    public CarRentalCompanyModel(int id, String name, BigDecimal price, String location) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.location = location;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
