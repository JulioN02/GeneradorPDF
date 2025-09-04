<?php
// guardarFactura.php
require_once __DIR__ . '/../conexionDB.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit;
}

try {
    // Iniciar transacción
    $pdo->beginTransaction();

    // === Datos de la factura ===
    $nombres     = $_POST['nombres'] ?? '';
    $apellidos   = $_POST['apellidos'] ?? '';
    $celular     = $_POST['celular'] ?? '';
    $correo      = $_POST['correo'] ?? '';
$total_subtotal = isset($_POST['total_subtotal']) ? floatval(str_replace(',', '.', trim($_POST['total_subtotal']))) : 0;
$total_descuento = isset($_POST['total_descuentos']) ? floatval(str_replace(',', '.', trim($_POST['total_descuentos']))) : 0;
$total_final = isset($_POST['total_final']) ? floatval(str_replace(',', '.', trim($_POST['total_final']))) : 0;
    $observacion = $_POST['observacionFactura'] ?? '';

    // Insertar factura
    $stmtFactura = $pdo->prepare("
        INSERT INTO facturas
        (nombres, apellidos, celular, correo, total_subtotal, total_descuento, total_final, observacion, fecha_creacion)
        VALUES (:nombres, :apellidos, :celular, :correo, :subtotal, :descuento, :final, :observacion, NOW())
    ");

    $stmtFactura->execute([
        ':nombres'   => $nombres,
        ':apellidos' => $apellidos,
        ':celular'   => $celular,
        ':correo'    => $correo,
        ':subtotal'  => $total_subtotal,
        ':descuento' => $total_descuento,
        ':final'     => $total_final,
        ':observacion' => $observacion
    ]);

    $factura_id = $pdo->lastInsertId();

    // === Productos ===
    if (!empty($_POST['productos']) && is_array($_POST['productos'])) {
        $stmtProducto = $pdo->prepare("
            INSERT INTO facturaProductos
            (factura_id, producto, cantidad, precio, descuento, observacion)
            VALUES (:factura_id, :producto, :cantidad, :precio, :descuento, :observacion)
        ");

        foreach ($_POST['productos'] as $prod) {
            $stmtProducto->execute([
                ':factura_id' => $factura_id,
                ':producto'   => $prod['nombre'] ?? '',
                ':cantidad'   => $prod['cantidad'] ?? 0,
                ':precio'     => $prod['precio'] ?? 0,
                ':descuento'  => $prod['descuento'] ?? 0,
                ':observacion'=> $prod['observacion'] ?? ''
            ]);
        }
    }

    $pdo->commit();

    echo json_encode(["status" => "success", "id" => $factura_id]);

} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
