<?php
require __DIR__ . '/../vendor/autoload.php';
include '../conexionDB.php';

use Dompdf\Dompdf;
use Dompdf\Options;

if (!isset($_GET['id'])) {
    die("Falta el parámetro ID de factura.");
}

$idFactura = intval($_GET['id']);

// Consultar DB
$stmt = $pdo->prepare("SELECT * FROM facturas WHERE idfacturas = ?");
$stmt->execute([$idFactura]);
$factura = $stmt->fetch(PDO::FETCH_ASSOC);

$stmtProd = $pdo->prepare("SELECT * FROM facturaProductos WHERE factura_id = ?");
$stmtProd->execute([$idFactura]);
$productos = $stmtProd->fetchAll(PDO::FETCH_ASSOC);

if (!$factura) {
    die("Factura no encontrada");
}

// Renderizar plantilla en variable
ob_start();
include __DIR__ . '/../template/facturaTemplate.php';
$html = ob_get_clean();

// Configurar Dompdf
$options = new Options();
$options->set('isRemoteEnabled', true);
$dompdf = new Dompdf($options);

$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Descargar/mostrar
$dompdf->stream("Factura_{$idFactura}.pdf", ["Attachment" => false]);
