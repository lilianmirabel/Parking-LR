package org.masterlr.parkinglr.repository;

import org.masterlr.parkinglr.entity.Enregistrement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EnregistrementRepository extends JpaRepository<Enregistrement, UUID> {
    List<Enregistrement> findByParkingId(UUID parkingId);
}