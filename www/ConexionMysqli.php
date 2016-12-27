<?php

class ConexionMysqli {

    private $link;

    public function __construct() {
        $this->link = new mysqli("localhost", "root", "garfield", "misrincones");
        if (mysqli_connect_error()) {
            die(mysqli_connect_errno() . mysqli_connect_error());
        }
        $this->link->set_charset('utf8');
        /* QUITAR EN PRODUCCION */
        //$mysqli_driver = new mysqli_driver();
        //$mysqli_driver->report_mode = MYSQLI_REPORT_ALL;
    }

    public function __destruct() {
        $thread_id = $this->link->thread_id;
        $this->link->kill($thread_id);
        $this->link->close();
    }

    public function query_con_result($query) {
        $rows = array();
        $result = $this->link->query($query, MYSQLI_STORE_RESULT);
        if ($result) {
            while ($r = $result->fetch_assoc()) {
                $rows[] = $r;
            }
            $result->free();
        }
        return $rows;
    }

    public function query_sin_result($query) {
        $this->link->query($query, MYSQLI_STORE_RESULT);
    }

    public function evitar_inyeccion($str) {
        return $this->link->real_escape_string($str);
    }

}
