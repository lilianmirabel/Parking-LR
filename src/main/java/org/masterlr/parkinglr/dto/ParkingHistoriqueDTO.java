package org.masterlr.parkinglr.dto;

import java.time.LocalDateTime;

public class ParkingHistoriqueDTO {
    private String id;
    private String nom;
    private double ylat;
    private double xlong;
    private double coordX;
    private double coordY;
    private Integer nbPlaces;
    private Integer nbPlacesDisponibles;
    private Integer nbPr;
    private Integer nbPmr;
    private Integer nbVoituresElectriques;
    private Integer nbVelo;
    private Integer nb2rEl;
    private Integer nbAutopartage;
    private Integer nb2Rm;
    private LocalDateTime dateComptage;

    public ParkingHistoriqueDTO() {
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public double getYlat() { return ylat; }
    public void setYlat(double ylat) { this.ylat = ylat; }

    public double getXlong() { return xlong; }
    public void setXlong(double xlong) { this.xlong = xlong; }

    public double getCoordX() { return coordX; }
    public void setCoordX(double coordX) { this.coordX = coordX; }

    public double getCoordY() { return coordY; }
    public void setCoordY(double coordY) { this.coordY = coordY; }

    public Integer getNbPlaces() { return nbPlaces; }
    public void setNbPlaces(Integer nbPlaces) { this.nbPlaces = nbPlaces; }

    public Integer getNbPlacesDisponibles() { return nbPlacesDisponibles; }
    public void setNbPlacesDisponibles(Integer nbPlacesDisponibles) { this.nbPlacesDisponibles = nbPlacesDisponibles; }

    public Integer getNbPr() { return nbPr; }
    public void setNbPr(Integer nbPr) { this.nbPr = nbPr; }

    public Integer getNbPmr() { return nbPmr; }
    public void setNbPmr(Integer nbPmr) { this.nbPmr = nbPmr; }

    public Integer getNbVoituresElectriques() { return nbVoituresElectriques; }
    public void setNbVoituresElectriques(Integer nbVoituresElectriques) { this.nbVoituresElectriques = nbVoituresElectriques; }

    public Integer getNbVelo() { return nbVelo; }
    public void setNbVelo(Integer nbVelo) { this.nbVelo = nbVelo; }

    public Integer getNb2rEl() { return nb2rEl; }
    public void setNb2rEl(Integer nb2rEl) { this.nb2rEl = nb2rEl; }

    public Integer getNbAutopartage() { return nbAutopartage; }
    public void setNbAutopartage(Integer nbAutopartage) { this.nbAutopartage = nbAutopartage; }

    public Integer getNb2Rm() { return nb2Rm; }
    public void setNb2Rm(Integer nb2Rm) { this.nb2Rm = nb2Rm; }

    public LocalDateTime getDateComptage() { return dateComptage; }
    public void setDateComptage(LocalDateTime dateComptage) { this.dateComptage = dateComptage; }
}
