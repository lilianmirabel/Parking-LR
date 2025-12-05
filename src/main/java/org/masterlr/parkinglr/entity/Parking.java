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
    private int nbPlaces;

    @Column(name = "nb_pr")
    private int nbPr;

    @Column(name = "nb_pmr")
    private int nbPmr;

    @Column(name = "nb_voitures_electriques")
    private int nbVoituresElectriques;

    @Column(name = "nb_velo")
    private int nbVelo;

    @Column(name = "nb_2r_el")
    private int nb2rEl;

    @Column(name = "nb_autopartage")
    private int nbAutopartage;

    @Column(name = "nb_2_rm")
    private int nb2Rm;

    public Parking() {
    }

    public Parking(String nom, double ylat, double xlong, double coordX, double coordY,
                   int nbPlaces, int nbPr, int nbPmr, int nbVoituresElectriques,
                   int nbVelo, int nb2rEl, int nbAutopartage, int nb2Rm) {
        this.nom = nom;
        this.ylat = ylat;
        this.xlong = xlong;
        this.coordX = coordX;
        this.coordY = coordY;
        this.nbPlaces = nbPlaces;
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

    public int getNbPlaces() { return nbPlaces; }
    public void setNbPlaces(int nbPlaces) { this.nbPlaces = nbPlaces; }

    public int getNbPr() { return nbPr; }
    public void setNbPr(int nbPr) { this.nbPr = nbPr; }

    public int getNbPmr() { return nbPmr; }
    public void setNbPmr(int nbPmr) { this.nbPmr = nbPmr; }

    public int getNbVoituresElectriques() { return nbVoituresElectriques; }
    public void setNbVoituresElectriques(int nbVoituresElectriques) { this.nbVoituresElectriques = nbVoituresElectriques; }

    public int getNbVelo() { return nbVelo; }
    public void setNbVelo(int nbVelo) { this.nbVelo = nbVelo; }

    public int getNb2rEl() { return nb2rEl; }
    public void setNb2rEl(int nb2rEl) { this.nb2rEl = nb2rEl; }

    public int getNbAutopartage() { return nbAutopartage; }
    public void setNbAutopartage(int nbAutopartage) { this.nbAutopartage = nbAutopartage; }

    public int getNb2Rm() { return nb2Rm; }
    public void setNb2Rm(int nb2Rm) { this.nb2Rm = nb2Rm; }
}