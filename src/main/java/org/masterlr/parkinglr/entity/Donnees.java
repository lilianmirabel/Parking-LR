package org.masterlr.parkinglr.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "donnees")
public class Donnees {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "parking_id")
    private Parking parking;

    @Column(name = "date_comptage")
    private LocalDateTime dateComptage;

    @Column(name = "nb_places_disponible")
    private Integer nbPlacesDisponible;

    @Column(name = "nb_pr_dispo")
    private Integer nbPrDispo;

    @Column(name = "nb_pmr_dispo")
    private Integer nbPmrDispo;

    @Column(name = "nb_voitures_electriques_dispo")
    private Integer nbVoituresElectriquesDispo;

    @Column(name = "nb_velo_dispo")
    private Integer nbVeloDispo;

    @Column(name = "nb_2r_el_dispo")
    private Integer nb2rElDispo;

    @Column(name = "nb_autopartage_dispo")
    private Integer nbAutopartageDispo;

    @Column(name = "nb_2_rm_dispo")
    private Integer nb2RmDispo;

    public Donnees() {
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Parking getParking() { return parking; }
    public void setParking(Parking parking) { this.parking = parking; }

    public LocalDateTime getDateComptage() { return dateComptage; }
    public void setDateComptage(LocalDateTime dateComptage) { this.dateComptage = dateComptage; }

    public Integer getNbPlacesDisponible() { return nbPlacesDisponible; }
    public void setNbPlacesDisponible(Integer nbPlacesDisponible) { this.nbPlacesDisponible = nbPlacesDisponible; }

    public Integer getNbPrDispo() { return nbPrDispo; }
    public void setNbPrDispo(Integer nbPrDispo) { this.nbPrDispo = nbPrDispo; }

    public Integer getNbPmrDispo() { return nbPmrDispo; }
    public void setNbPmrDispo(Integer nbPmrDispo) { this.nbPmrDispo = nbPmrDispo; }

    public Integer getNbVoituresElectriquesDispo() { return nbVoituresElectriquesDispo; }
    public void setNbVoituresElectriquesDispo(Integer nbVoituresElectriquesDispo) { this.nbVoituresElectriquesDispo = nbVoituresElectriquesDispo; }

    public Integer getNbVeloDispo() { return nbVeloDispo; }
    public void setNbVeloDispo(Integer nbVeloDispo) { this.nbVeloDispo = nbVeloDispo; }

    public Integer getNb2rElDispo() { return nb2rElDispo; }
    public void setNb2rElDispo(Integer nb2rElDispo) { this.nb2rElDispo = nb2rElDispo; }

    public Integer getNbAutopartageDispo() { return nbAutopartageDispo; }
    public void setNbAutopartageDispo(Integer nbAutopartageDispo) { this.nbAutopartageDispo = nbAutopartageDispo; }

    public Integer getNb2RmDispo() { return nb2RmDispo; }
    public void setNb2RmDispo(Integer nb2RmDispo) { this.nb2RmDispo = nb2RmDispo; }
}
