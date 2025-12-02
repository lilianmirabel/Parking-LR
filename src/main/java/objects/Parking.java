package objects;

public class Parking {

    // --- Champs d'identification et de localisation ---
    private int id;
    private String nom;
    private double ylat; // Latitude
    private double xlong; // Longitude
    private double coordX;
    private double coordY;

    // --- Champs de capacité globale ---
    private int nbPlaces;
    // --- Champs de catégories spécifiques ---
    private int nbPr; // Park & Ride
    private int nbPmr; // Personnes à Mobilité Réduite
    private int nbVoituresElectriques;
    private int nbVelo;
    private int nb2rEl; // 2 roues électriques
    private int nbAutopartage;
    private int nb2Rm; // 2 roues motorisés

    public int getNb2Rm() {
        return nb2Rm;
    }

    public void setNb2Rm(int nb2Rm) {
        this.nb2Rm = nb2Rm;
    }

    public int getNbAutopartage() {
        return nbAutopartage;
    }

    public void setNbAutopartage(int nbAutopartage) {
        this.nbAutopartage = nbAutopartage;
    }

    public int getNb2rEl() {
        return nb2rEl;
    }

    public void setNb2rEl(int nb2rEl) {
        this.nb2rEl = nb2rEl;
    }

    public int getNbVelo() {
        return nbVelo;
    }

    public void setNbVelo(int nbVelo) {
        this.nbVelo = nbVelo;
    }

    public int getNbVoituresElectriques() {
        return nbVoituresElectriques;
    }

    public void setNbVoituresElectriques(int nbVoituresElectriques) {
        this.nbVoituresElectriques = nbVoituresElectriques;
    }

    public int getNbPmr() {
        return nbPmr;
    }

    public void setNbPmr(int nbPmr) {
        this.nbPmr = nbPmr;
    }

    public int getNbPr() {
        return nbPr;
    }

    public void setNbPr(int nbPr) {
        this.nbPr = nbPr;
    }

    public int getNbPlaces() {
        return nbPlaces;
    }

    public void setNbPlaces(int nbPlaces) {
        this.nbPlaces = nbPlaces;
    }

    public double getCoordY() {
        return coordY;
    }

    public void setCoordY(double coordY) {
        this.coordY = coordY;
    }

    public double getCoordX() {
        return coordX;
    }

    public void setCoordX(double coordX) {
        this.coordX = coordX;
    }

    public double getXlong() {
        return xlong;
    }

    public void setXlong(double xlong) {
        this.xlong = xlong;
    }

    public double getYlat() {
        return ylat;
    }

    public void setYlat(double ylat) {
        this.ylat = ylat;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Parking(int id, String nom, double ylat, double xlong, double coordX, double coordY,
                   int nbPlaces,
                   int nbPr, int nbPmr,
                   int nbVoituresElectriques,
                   int nbVelo, int nb2rEl,
                   int nbAutopartage, int nb2Rm) {
        this.id = id;
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

}
