package objects;

import java.time.LocalDateTime;

public class Enregistrement {

    private int id;
    private int id_parking;
    private LocalDateTime dateComptage; // Utilisez LocalDateTime pour la date et l'heure

    // --- Champs de capacité globale ---
    private int nbPlacesDisponibles;

    // --- Champs de catégories spécifiques ---
    private int nbPrDispo;
    private int nbPmrDispo;
    private int nbVoituresElectriquesDispo;
    private int nbVeloDispo;
    private int nb2rElDispo;
    private int nbAutopartageDispo;
    private int nb2RmDispo;
    public Enregistrement(int id, int id_parking,
                          LocalDateTime dateComptage, int nbPlacesDisponibles,
                          int nbPrDispo, int nbPmrDispo,
                          int nbVoituresElectriquesDispo,
                          int nbVeloDispo, int nb2rElDispo,
                          int nbAutopartageDispo, int nb2RmDispo) {

        this.id = id;
        this.id_parking = id_parking;
        this.dateComptage = dateComptage;
        this.nbPlacesDisponibles = nbPlacesDisponibles;
        this.nbPrDispo = nbPrDispo;
        this.nbPmrDispo = nbPmrDispo;
        this.nbVoituresElectriquesDispo = nbVoituresElectriquesDispo;
        this.nbVeloDispo = nbVeloDispo;
        this.nb2rElDispo = nb2rElDispo;
        this.nbAutopartageDispo = nbAutopartageDispo;
        this.nb2RmDispo = nb2RmDispo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_parking() {
        return id_parking;
    }

    public void setId_parking(int id_parking) {
        this.id_parking = id_parking;
    }

    public LocalDateTime getDateComptage() {
        return dateComptage;
    }

    public void setDateComptage(LocalDateTime dateComptage) {
        this.dateComptage = dateComptage;
    }

    public int getNbPlacesDisponibles() {
        return nbPlacesDisponibles;
    }

    public void setNbPlacesDisponibles(int nbPlacesDisponibles) {
        this.nbPlacesDisponibles = nbPlacesDisponibles;
    }

    public int getNbPrDispo() {
        return nbPrDispo;
    }

    public void setNbPrDispo(int nbPrDispo) {
        this.nbPrDispo = nbPrDispo;
    }

    public int getNbPmrDispo() {
        return nbPmrDispo;
    }

    public void setNbPmrDispo(int nbPmrDispo) {
        this.nbPmrDispo = nbPmrDispo;
    }

    public int getNbVoituresElectriquesDispo() {
        return nbVoituresElectriquesDispo;
    }

    public void setNbVoituresElectriquesDispo(int nbVoituresElectriquesDispo) {
        this.nbVoituresElectriquesDispo = nbVoituresElectriquesDispo;
    }

    public int getNbVeloDispo() {
        return nbVeloDispo;
    }

    public void setNbVeloDispo(int nbVeloDispo) {
        this.nbVeloDispo = nbVeloDispo;
    }

    public int getNb2rElDispo() {
        return nb2rElDispo;
    }

    public void setNb2rElDispo(int nb2rElDispo) {
        this.nb2rElDispo = nb2rElDispo;
    }

    public int getNbAutopartageDispo() {
        return nbAutopartageDispo;
    }

    public void setNbAutopartageDispo(int nbAutopartageDispo) {
        this.nbAutopartageDispo = nbAutopartageDispo;
    }

    public int getNb2RmDispo() {
        return nb2RmDispo;
    }

    public void setNb2RmDispo(int nb2RmDispo) {
        this.nb2RmDispo = nb2RmDispo;
    }
}
