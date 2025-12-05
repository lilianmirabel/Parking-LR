package org.masterlr.parkinglr.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "parking")
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nom;

    private double ylat;

    private double xlong;

    @Column(name = "coord_x")
    private double coordX;

    @Column(name = "coord_y")
    private double coordY;

    @Column(name = "nb_places")
    private Integer nbPlaces;

    @Column(name = "nb_places_disponibles")
    private Integer nbPlacesDisponibles;

    @Column(name = "nb_pr")
    private Integer nbPr;

    @Column(name = "nb_pmr")
    private Integer nbPmr;

    @Column(name = "nb_voitures_electriques")
    private Integer nbVoituresElectriques;

    @Column(name = "nb_velo")
    private Integer nbVelo;

    @Column(name = "nb_2r_el")
    private Integer nb2rEl;

    @Column(name = "nb_autopartage")
    private Integer nbAutopartage;

    @Column(name = "nb_2_rm")
    private Integer nb2Rm;

    public Parking() {
    }

    public Parking(String nom, double ylat, double xlong, double coordX, double coordY,
                   Integer nbPlaces, Integer nbPlacesDisponibles, Integer nbPr, Integer nbPmr, Integer nbVoituresElectriques,
                   Integer nbVelo, Integer nb2rEl, Integer nbAutopartage, Integer nb2Rm) {
        this.nom = nom;
        this.ylat = ylat;
        this.xlong = xlong;
        this.coordX = coordX;
        this.coordY = coordY;
        this.nbPlaces = nbPlaces;
        this.nbPlacesDisponibles = nbPlacesDisponibles;
        this.nbPr = nbPr;
        this.nbPmr = nbPmr;
        this.nbVoituresElectriques = nbVoituresElectriques;
        this.nbVelo = nbVelo;
        this.nb2rEl = nb2rEl;
        this.nbAutopartage = nbAutopartage;
        this.nb2Rm = nb2Rm;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

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
}