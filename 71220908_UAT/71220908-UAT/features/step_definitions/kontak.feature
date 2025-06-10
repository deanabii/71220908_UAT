Feature: Update Contact Info

  Scenario: Update alamat pengguna
    Given User sudah login ke parabank
    When User membuka halaman Update Contact Info
    And User mengisi form kontak dengan alamat saja
    And User klik tombol update info
    Then Info kontak berhasil diperbarui

  Scenario: Update semua data kontak secara lengkap
    Given User sudah login ke parabank
    When User membuka halaman Update Contact Info
    And User mengisi seluruh form kontak secara lengkap
    And User klik tombol update info
    Then Info kontak berhasil diperbarui

  Scenario: Gagal update jika semua field dikosongkan
    Given User sudah login ke parabank
    When User membuka halaman Update Contact Info
    And User mengosongkan semua field kontak
    And User klik tombol update info
    Then Info kontak gagal diperbarui
