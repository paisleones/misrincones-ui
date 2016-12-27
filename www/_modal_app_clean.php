
<style>
    .modal-window .modal-wrapper .modal-close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 9999;
        width: 60px;
        height: 60px;
    }

    video
    {
        background-size: cover;
        object-fit: cover;
    }
</style>
<?php
class ConexionMysqli {

    private $link;

    public function __construct() {
        $this->link = new mysqli("trabajocreativo.com", "root10", "garfield", "misrincones");
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

/* CONEXION BASE DE DATOS */
$miapp_conexion = new ConexionMysqli();

$id = $_GET['id'];

$rows = $miapp_conexion->query_con_result("SELECT * from lugares where id='$id'");
foreach ($rows as $row) {
    @$category = $row['category'];
    @$title = $row['title'];
    @$location = $row['location'];
    @$latitude = $row['latitude'];
    @$longitude = $row['longitude'];
    @$url = $row['url'];
    @$video = $row['video'];
    @$type = $row['type'];
    @$type_icon = $row['type_icon'];
    @$rating = $row['rating'];
    @$gallery = $row['gallery'];
    @$gallery = str_replace('["', "", $gallery);
    @$gallery = str_replace('"]', "", $gallery);
    @$description = $row['description'];
}

$enlace_video = "http://misrincones.trabajocreativo.com/" . $video;
$enlace_foto = "http://misrincones.trabajocreativo.com/" . $gallery;
?>

<div class="modal-window fade_in" style="width: 100%; height: 100%; margin: 0px; background: #fff; display: block; overflow-y: auto;">
    <div class="modal-wrapper" style="width: 100%; height: 100%; margin: 0px; background: #fff;">
        <div class="modal-body" style="width: 100%; height: 100%; margin: 0px; background: #fff;">




            <div class="modal-content" style="padding: 0px; background: #fff;">
                <section style="margin-top: 0px; background: #fff;">




                    <div style="width: 100%; height: 40%; min-height: 240px; background: url(img/loading.svg); background-repeat: no-repeat; background-size: 32px; background-position: center center;">

                        <div id="div_video" style="width: 100%; padding-bottom: 80%; background: #f0f0f0;">

                        </div>

                    </div>

                    <script>
                        jwplayer
                                ("div_video").setup({
                            file: "<?php echo $enlace_video ?>",
                            image: "<?php echo $enlace_foto ?>",
                            width: "100%",
                            height: "100%",
                            skin: "five",
                            stretching: "fill",
                            aspectratio: "16:10",
                            preload: "none",
                            controlbar: "bottom"

                        });
                    </script>


                    <div  style="width: 100%; padding: 20px; padding-bottom: 0px; padding-top: 10px;">

                        <h2 style="padding: 0px; margin: 0px; margin-bottom: 10px; margin-top: 0px;"><?php echo @$title ?></h2>
                        <figure><?php echo @$location ?></figure>
                        <div class="rating" data-rating="<?php echo $rating ?>" style="display: block"></div>
                        <br>
                        <h3></h3>

                        <?php echo @$description ?>
                        <p>

                        <h3></h3>

                        <div class="features">
                            <h2>Detalles</h2>
                            <dl class="lines">
                                <dt>Categoria</dt>
                                <dd><?php echo strtoupper(@$category); ?></dd>
                                <dt>Location</dt>
                                <dd><?php echo @$location ?></dd>
                                <dt>Latitud</dt>
                                <dd><?php echo @$latitude ?></dd>
                                <dt>Longitud</dt>
                                <dd><?php echo @$longitude ?></dd>
                                <dt>Tipo</dt>
                                <dd><?php echo @$type ?></dd>

                            </dl>


                        </div>

                        <div class="features">
                            <h2>Comentarios (0)</h2>

                            <br><br>

                        </div>

                        <h3></h3>

                    </div>

                </section>


                <br><br>




            </div>



        </div>

    </div>
    <div class="modal-background fade_in"></div>
</div>

<script>

    document.getElementById("volver_atras").style.display = "block";


    // Render Rating stars

    rating('.modal-window');

    // Remove modal element form DOM

    $('.modal-window .modal-background, .modal-close').live('click', function (e) {
        $('.modal-window').addClass('fade_out');
        setTimeout(function () {
            $('.modal-window').remove();
            document.getElementById("volver_atras").style.display = "none";
        }, 10);
    });

</script>
