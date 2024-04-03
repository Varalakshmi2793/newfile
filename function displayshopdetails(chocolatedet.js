function displayshopdetails(chocolatedetails){
  const chocoItem = document.createElement("li");
  const details = document.createTextNode(`${chocolatedetails.candyname} - ${chocolatedetails.description} - $${chocolatedetails.price} - ${chocolatedetails.quantity}`);
  chocoItem.appendChild(details);

  const buybtn = document.createElement("button");
  buybtn.appendChild(document.createTextNode("buy1"));
  chocoItem.appendChild(buybtn);

  const buybtn2 = document.createElement("button");
  buybtn2.appendChild(document.createTextNode("buy2"));
  chocoItem.appendChild(buybtn2);

  const buybtn3 = document.createElement("button");
  buybtn3.appendChild(document.createTextNode("buy3"));
  chocoItem.appendChild(buybtn3); 

  const chocolist=document.querySelector("ul");
  chocolist.appendChild(chocoItem);

  buybtn.addEventListener("click", function () {
      updateQuantity(chocolatedetails._id, parseInt(chocolatedetails.quantity) - 1);
  });

  buybtn2.addEventListener("click", function () {
      updateQuantity(chocolatedetails._id, parseInt(chocolatedetails.quantity) - 2);
  });

  buybtn3.addEventListener("click", function () {
      updateQuantity(chocolatedetails._id, parseInt(chocolatedetails.quantity) - 3);
  });
}

function updateQuantity(itemId, newQuantity) {
  if (newQuantity < 0) {
      console.log("Cannot reduce quantity below 0.");
      return;
  }

  axios.put(`https://crudcrud.com/api/08737efbfe48485e8dd1f951674b8e51/chocolateshop/${itemId}`, { quantity: newQuantity })
      .then((response) => {
          const updatedDetails = response.data;
          const chocoItem = document.querySelector(`li[data-item-id="${itemId}"]`);
          chocoItem.textContent = `${updatedDetails.candyname} - ${updatedDetails.description} - $${updatedDetails.price} - ${updatedDetails.quantity}`;
          console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
          console.error("Error updating data:", error);
      });
