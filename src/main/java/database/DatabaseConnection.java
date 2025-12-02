package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class DatabaseConnection {

    // --- Configurations de la Base de Données ---
    private static final String DB_URL = "jdbc:postgresql://postgres:5432/parkinglr";
    private static final String USER = "postgres_user";
    private static final String PASSWORD = "postgres_pass";

    /**
     * Établit et retourne une connexion à la base de données PostgreSQL.
     * @return L'objet Connection si la connexion est réussie, sinon null.
     */
    public static Connection getConnection() {
        Connection connection = null;
        try {
            // 1. Chargement du driver (optionnel avec les versions modernes de JDBC, mais bonne pratique)
            // Class.forName("org.postgresql.Driver");

            System.out.println("Tentative de connexion à la base de données...");

            // 2. Établissement de la connexion
            connection = DriverManager.getConnection(DB_URL, USER, PASSWORD);

            if (connection != null) {
                System.out.println("Connexion à la base de données PostgreSQL établie avec succès!");
            }

        } catch (SQLException e) {
            System.err.println("Échec de la connexion à la base de données!");
            System.err.println("SQLState: " + e.getSQLState());
            System.err.println("Erreur: " + e.getMessage());

        }

        return connection;
    }

    /**
     * Méthode principale pour tester la connexion.
     */
    public static void test(String[] args) {
        Connection conn = getConnection();

        // Assurez-vous de toujours fermer la connexion!
        if (conn != null) {
            try {
                conn.close();
                System.out.println("Connexion fermée.");
            } catch (SQLException e) {
                System.err.println("Erreur lors de la fermeture de la connexion: " + e.getMessage());
            }
        }
    }
}
