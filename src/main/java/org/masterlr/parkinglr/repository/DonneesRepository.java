package org.masterlr.parkinglr.repository;

import org.masterlr.parkinglr.entity.Donnees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface DonneesRepository extends JpaRepository<Donnees, UUID> {

    @Query("SELECT d FROM Donnees d WHERE d.dateComptage BETWEEN :startDate AND :endDate")
    List<Donnees> findByDateComptageRange(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );

    @Query(value = "SELECT TO_CHAR(date_part, 'YYYY-MM-DD') FROM (SELECT DISTINCT DATE(date_comptage) as date_part FROM donnees) as dates ORDER BY date_part DESC", nativeQuery = true)
    List<String> findDistinctDates();
}
