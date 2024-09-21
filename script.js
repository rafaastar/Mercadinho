document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll(".item");
  const itensCarrinho = document.getElementById("itens-carrinho");
  const totalElemento = document.getElementById("total");

  items.forEach(item => {
    const input = item.querySelector("input[type='number']");
    input.addEventListener("change", atualizarCarrinho);
  });

  function atualizarCarrinho() {
    itensCarrinho.innerHTML = "";
    let totalSoma = 0;

    items.forEach(item => {
      const input = item.querySelector("input[type='number']");
      const quantidade = parseInt(input.value) || 0;
      const preco = parseFloat(item.querySelector(".preco").textContent.replace("R$", "").replace(",", "."));
      const subtotal = quantidade * preco;
      totalSoma += subtotal;

      if (quantidade > 0) {
        const li = document.createElement("li");
        li.textContent = `${item.querySelector("h2").textContent} - R$ ${preco.toFixed(2)} x ${quantidade} = R$ ${subtotal.toFixed(2)}`;
        itensCarrinho.appendChild(li);
      }
    });
    totalElemento.textContent = `R$ ${totalSoma.toFixed(2).replace(".", ",")}`;
  }

  document.getElementById("finalizar-compra").addEventListener("click", function() {
    const totalSoma = parseFloat(totalElemento.textContent.replace("R$", "").replace(",", "."));
    const taxaEntrega = 100.00;
    const totalFinal = totalSoma + taxaEntrega;

    const confirmacao = confirm("O VALOR TOTAL DO SEU PEDIDO É DE R$ " + totalFinal.toFixed(2).replace(".", ",") + " DESEJA PROSSEGUIR COM A COMPRA?");
    if (confirmacao) {
      alert("PEDIDO REALIZADO COM SUCESSO! OBRIGADO PELA PREFERÊNCIA!");
    } else {
      alert("PEDIDO CANCELADO!");
    }
  });
});
