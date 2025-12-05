package org.masterlr.parkinglr.repository;

import org.masterlr.parkinglr.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ParkingRepository extends JpaRepository<Parking, UUID> {
    Optional<Parking> findByNom(String nom);
}