<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura #<?= $factura['idfacturas'] ?></title>
    <style>
        <?php include __DIR__ . '/../assets/factura.css'; ?>
    </style>
</head>
<body>
    <header>
        <div class="empresa">
            <h1>NombreEmpresaEjemplo</h1>
            <p class="slogan">Slogan de ejemplo para la empresa</p>
            <p><b>NIT:</b> 900000000-7</p>
            <p><b>Tel:</b> +57 300 000 0000</p>
        </div>
        <div class="factura-info">
            <h2>Factura #<?= $factura['idfacturas'] ?></h2>
            <p><b>Fecha:</b> <?= date("d/m/Y", strtotime($factura['fecha_creacion'])) ?></p>
        </div>
    </header>

    <section class="cliente">
        <h3>Datos del Cliente</h3>
        <table class="tabla-cliente">
            <tr>
                <td><b>Nombre:</b></td>
                <td><?= $factura['nombres'] ?> <?= $factura['apellidos'] ?></td>
            </tr>
            <tr>
                <td><b>Celular:</b></td>
                <td><?= $factura['celular'] ?></td>
            </tr>
            <?php if (!empty($factura['correo'])): ?>
            <tr>
                <td><b>Correo:</b></td>
                <td><?= $factura['correo'] ?></td>
            </tr>
            <?php endif; ?>
        </table>
    </section>

    <table class="productos">
        <thead>
            <tr>
                <th style="width:5%;">N°</th>
                <th style="width:40%;">Producto</th>
                <th style="width:10%;">Cant.</th>
                <th style="width:15%;">Precio</th>
                <th style="width:15%;">Desc.</th>
                <th style="width:15%;">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($productos as $i => $p): 
                $precio = floatval($p['precio']);
                $cantidad = intval($p['cantidad']);
                $descuento = floatval($p['descuento']);
                $subtotal = ($precio * $cantidad) * (1 - ($descuento / 100));
            ?>
            <tr>
                <td><?= $i + 1 ?></td>
                <td style="text-align:left;"><?= $p['producto'] ?></td>
                <td><?= $cantidad ?></td>
                <td>$<?= number_format($precio, 2) ?></td>
                <td><?= $descuento ?>%</td>
                <td>$<?= number_format($subtotal, 2) ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <section class="totales">
        <table>
            <tr>
                <td><b>Subtotal:</b></td>
                <td>$<?= number_format($factura['total_subtotal'], 2) ?></td>
            </tr>
            <tr>
                <td><b>Total Descuento:</b></td>
                <td class="descuento">- $<?= number_format($factura['total_descuento'], 2) ?></td>
            </tr>
            <tr class="total-final">
                <td><b>Total Final:</b></td>
                <td>$<?= number_format($factura['total_final'], 2) ?></td>
            </tr>
        </table>
    </section>

    <?php if (!empty($factura['observacion'])): ?>
    <section class="observaciones">
        <h3>Observaciones</h3>
        <p><?= $factura['observacion'] ?></p>
    </section>
    <?php endif; ?>

    <footer>
        <p>Gracias por su compra</p>
    </footer>
</body>
</html>
