package org.masterlr.parkinglr.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "donnees")
public class Enregistrement {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "parking_id")
    private UUID parkingId;

    @Column(name = "date_comptage")
    private LocalDateTime dateComptage;

    @Column(name = "nb_places_disponible")
    private int nbPlacesDisponibles;

    @Column(name = "nb_pr_dispo")
    private int nbPrDispo;

    @Column(name = "nb_pmr_dispo")
    private int nbPmrDispo;

    @Column(name = "nb_voitures_electriques_dispo")
    private int nbVoituresElectriquesDispo;

    @Column(name = "nb_velo_dispo")
    private int nbVeloDispo;

    @Column(name = "nb_2r_el_dispo")
    private int nb2rElDispo;

    @Column(name = "nb_autopartage_dispo")
    private int nbAutopartageDispo;

    @Column(name = "nb_2_rm_dispo")
    private int nb2RmDispo;

    public Enregistrement() {
    }

    public Enregistrement(UUID parkingId, LocalDateTime dateComptage, int nbPlacesDisponibles,
                          int nbPrDispo, int nbPmrDispo, int nbVoituresElectriquesDispo,
                          int nbVeloDispo, int nb2rElDispo, int nbAutopartageDispo, int nb2RmDispo) {
        this.parkingId = parkingId;
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

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getParkingId() { return parkingId; }
    public void setParkingId(UUID parkingId) { this.parkingId = parkingId; }

    public LocalDateTime getDateComptage() { return dateComptage; }
    public void setDateComptage(LocalDateTime dateComptage) { this.dateComptage = dateComptage; }

    public int getNbPlacesDisponibles() { return nbPlacesDisponibles; }
    public void setNbPlacesDisponibles(int nbPlacesDisponibles) { this.nbPlacesDisponibles = nbPlacesDisponibles; }

    public int getNbPrDispo() { return nbPrDispo; }
    public void setNbPrDispo(int nbPrDispo) { this.nbPrDispo = nbPrDispo; }

    public int getNbPmrDispo() { return nbPmrDispo; }
    public void setNbPmrDispo(int nbPmrDispo) { this.nbPmrDispo = nbPmrDispo; }

    public int getNbVoituresElectriquesDispo() { return nbVoituresElectriquesDispo; }
    public void setNbVoituresElectriquesDispo(int nbVoituresElectriquesDispo) { this.nbVoituresElectriquesDispo = nbVoituresElectriquesDispo; }

    public int getNbVeloDispo() { return nbVeloDispo; }
    public void setNbVeloDispo(int nbVeloDispo) { this.nbVeloDispo = nbVeloDispo; }

    public int getNb2rElDispo() { return nb2rElDispo; }
    public void setNb2rElDispo(int nb2rElDispo) { this.nb2rElDispo = nb2rElDispo; }

    public int getNbAutopartageDispo() { return nbAutopartageDispo; }
    public void setNbAutopartageDispo(int nbAutopartageDispo) { this.nbAutopartageDispo = nbAutopartageDispo; }

    public int getNb2RmDispo() { return nb2RmDispo; }
    public void setNb2RmDispo(int nb2RmDispo) { this.nb2RmDispo = nb2RmDispo; }
}