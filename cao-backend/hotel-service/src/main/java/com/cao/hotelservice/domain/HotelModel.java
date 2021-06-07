package com.cao.hotelservice.domain;

import java.math.BigDecimal;

public class HotelModel {
    private int id;
    private String name;
    private int stars;
    private BigDecimal soloRoomPrice;
    private BigDecimal doubleRoomPrice;
    private BigDecimal tripleRoomPrice;
    private BigDecimal quadrupleRoomPrice;
    private String location;

    public HotelModel() {
    }

    public HotelModel(int id) {
        this.id = id;
    }

    public HotelModel(int id, String name, int stars, BigDecimal soloRoomPrice, BigDecimal doubleRoomPrice, BigDecimal tripleRoomPrice, BigDecimal quadrupleRoomPrice, String location) {
        this.id = id;
        this.name = name;
        this.stars = stars;
        this.soloRoomPrice = soloRoomPrice;
        this.doubleRoomPrice = doubleRoomPrice;
        this.tripleRoomPrice = tripleRoomPrice;
        this.quadrupleRoomPrice = quadrupleRoomPrice;
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

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public BigDecimal getSoloRoomPrice() {
        return soloRoomPrice;
    }

    public void setSoloRoomPrice(BigDecimal soloRoomPrice) {
        this.soloRoomPrice = soloRoomPrice;
    }

    public BigDecimal getDoubleRoomPrice() {
        return doubleRoomPrice;
    }

    public void setDoubleRoomPrice(BigDecimal doubleRoomPrice) {
        this.doubleRoomPrice = doubleRoomPrice;
    }

    public BigDecimal getTripleRoomPrice() {
        return tripleRoomPrice;
    }

    public void setTripleRoomPrice(BigDecimal tripleRoomPrice) {
        this.tripleRoomPrice = tripleRoomPrice;
    }

    public BigDecimal getQuadrupleRoomPrice() {
        return quadrupleRoomPrice;
    }

    public void setQuadrupleRoomPrice(BigDecimal quadrupleRoomPrice) {
        this.quadrupleRoomPrice = quadrupleRoomPrice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
