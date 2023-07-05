export const purchaseTemplateHtml = (ticket)=>{
    let productCells = "";
    const products = ticket.products.map(element =>
        `<tr>
            <td>${element.pid.title}</td>
            <td>${element.pid.price}</td>
            <td>${element.quantity}</td>
            <td>$${element.pid.price * element.quantity}</td>
        </tr>`
    )
    
    products.forEach(element => {
        productCells += element.split(',');
    });
return     `
    <div>
        <h1 style="margin: 10px 0">E-Commerce App</h1>
        <hr>
        <h2>Tu compra ${ticket.id.toString()} se encuentra en proceso de preparación</h2>
        <p>Gracias por comprar en e-commerce app, en breve nos comunicaremos...</p>
        <br>
        <h3>Detalle de tu compra</h3>
        <p>Fecha: ${ticket.purchase_datetime}</p>
        <p>Code: ${ticket.code}</p>
        <hr>
        <br>
        <h4 style ="background-color: aliceblue;">Productos</h4>
        <table style="width: 100%;">
            <tr>
                <th style = "text-align: left;">Item</th>
                <th style = "text-align: left;">Price</th>
                <th style = "text-align: left;">Quantity</th>
                <th style = "text-align: left;">Total</th>
            </tr>
            ${productCells}
            <tr style = "margin-top: 15px;">
                <td style = "font-weight: bold;">Total</td>
                <td> </td>
                <td> </td>
                <td style = "font-weight: bold;">$${ticket.amount}</td>
            </tr>
        </table>
    </div>`
 
}

