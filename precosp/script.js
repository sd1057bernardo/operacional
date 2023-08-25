const DBJson = "https://basedados-7d2a4-default-rtdb.firebaseio.com/Produtos.json";

async function fetchData() {
  try {
    const response = await fetch(DBJson);

    if (!response.ok) {
      throw new Error("Error ao receber valores da API.");
    }

    const data = await response.json();

    // Assuming Firebase data structure is an object with nested products
    if (typeof data === "object" && data !== null) {
      DBase = Object.values(data).filter(product => product && typeof product === "object");
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();
document.getElementById("searchButton").addEventListener("click", () => {
  const receiverNumber = document.getElementById("receiverNumber").value;

  if (!receiverNumber) {
    console.log("Please enter a receiver number.");
    return;
  }

  const matchingProducts = DBase.filter(product => product.EAN === receiverNumber);

  if (matchingProducts.length === 0) {
    window.alert("No products found for the given receiver number.");
  } else {
    const productInfo = matchingProducts.map(product =>
      `${product.DESCRICAO} - EAN: ${product.EAN} - Price: ${product.PRECO}`
    ).join("\n");

    window.alert(`Matching Products:\n\n${productInfo}`);
  }
});