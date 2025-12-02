package database;

import java.time.LocalDateTime;

public class DataParser {

    // --- Champs d'identification et de localisation ---
    private int id;
    private String nom;
    private double ylat; // Latitude
    private double xlong; // Longitude
    private double coordX;
    private double coordY;
    private LocalDateTime dateComptage; // Utilisez LocalDateTime pour la date et l'heure

    // --- Champs de capacité globale ---
    private int nbPlaces;
    private int nbPlacesDisponibles;

    // --- Champs de catégories spécifiques ---
    private int nbPr; // Park & Ride
    private int nbPrDispo;
    private int nbPmr; // Personnes à Mobilité Réduite
    private int nbPmrDispo;
    private int nbVoituresElectriques;
    private int nbVoituresElectriquesDispo;
    private int nbVelo;
    private int nbVeloDispo;
    private int nb2rEl; // 2 roues électriques
    private int nb2rElDispo;
    private int nbAutopartage;
    private int nbAutopartageDispo;
    private int nb2Rm; // 2 roues motorisés
    private int nb2RmDispo;

    // --- Constructeur ---
    // Il est conseillé d'avoir un constructeur complet pour faciliter la création d'objets.
    public DataParser(int id, String nom, double ylat, double xlong, double coordX, double coordY,
                   LocalDateTime dateComptage, int nbPlaces, int nbPlacesDisponibles,
                   int nbPr, int nbPrDispo, int nbPmr, int nbPmrDispo,
                   int nbVoituresElectriques, int nbVoituresElectriquesDispo,
                   int nbVelo, int nbVeloDispo, int nb2rEl, int nb2rElDispo,
                   int nbAutopartage, int nbAutopartageDispo, int nb2Rm, int nb2RmDispo) {

        this.id = id;
        this.nom = nom;
        this.ylat = ylat;
        this.xlong = xlong;
        this.coordX = coordX;
        this.coordY = coordY;
        this.dateComptage = dateComptage;
        this.nbPlaces = nbPlaces;
        this.nbPlacesDisponibles = nbPlacesDisponibles;
        this.nbPr = nbPr;
        this.nbPrDispo = nbPrDispo;
        this.nbPmr = nbPmr;
        this.nbPmrDispo = nbPmrDispo;
        this.nbVoituresElectriques = nbVoituresElectriques;
        this.nbVoituresElectriquesDispo = nbVoituresElectriquesDispo;
        this.nbVelo = nbVelo;
        this.nbVeloDispo = nbVeloDispo;
        this.nb2rEl = nb2rEl;
        this.nb2rElDispo = nb2rElDispo;
        this.nbAutopartage = nbAutopartage;
        this.nbAutopartageDispo = nbAutopartageDispo;
        this.nb2Rm = nb2Rm;
        this.nb2RmDispo = nb2RmDispo;
    }

    // --- Getters et Setters (Omis ici pour la concision, mais nécessaires) ---
    // Vous devez générer tous les getters et setters pour respecter le standard POJO.

    // Exemple d'un getter pour l'ID:
    public int getId() {
        return id;
    }

    // Exemple d'un setter pour l'ID:
    public void setId(int id) {
        this.id = id;
    }

    // Vous pouvez également ajouter une méthode toString() pour faciliter le débogage.
    @Override
    public String toString() {
        return "ParkingData{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", dateComptage=" + dateComptage +
                ", nbPlacesDisponibles=" + nbPlacesDisponibles +
                // ... autres champs
                '}';
    }
}
