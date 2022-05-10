export default (carrinho,imageBase64) => {
  const ano = new Date().getFullYear();
  const dia_mes =
    (new Date().getDate() < 10
      ? '0' + new Date().getDate()
      : new Date().getDate()) +
    '/' +
    (new Date().getMonth() + 1 < 10
      ? '0' + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1);
  const semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");
  const dia_semana = semana[new Date().getDay()];

  var html = '<html><body>';
  html += '<table>';

  carrinho.forEach(product => {
    html += ` <tr>
                <th style="width: 40%;">
                  <h1 style="margin-bottom: 0px;font-family: system-ui;">
                    <img  src="data:image/jpeg;base64,${imageBase64}" style="width: 100%;height: 100%;">
                  </h1>
                </th>
                <th style="color: gray;">
                  <h1 style="margin-bottom: 0px;" ><i>${ano}</i></i></h1>
                  <h6 style="margin: 0;">${dia_semana} ${dia_mes} </h6>
                </th>
              </tr>
              `;
    html += ` <tr>
                <td style="padding-top: 10px;border-bottom: 1px solid;" colspan="2" align="center" ><h3><b>${product.nome}</b></h3></td>
              </tr>`;
  });
  html += '</table>';
  html += '</body></html>';

  return html;
}