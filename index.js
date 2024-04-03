async function handleFormSubmit(event){
  event.preventDefault();
  const chocolatedetails={
      candyname: event.target.candyname.value,
      description: event.target.description.value,
      price: event.target.price.value,
      quantity: event.target.quantity.value
  };
  try{const resolve= await axios.post("https://crudcrud.com/api/2d27a255a82a47bc88f5c79a30a80cc5/chocolateshop", 
  chocolatedetails)
  displayshopdetails(resolve.data);
  document.getElementById("candyname").value="";
  document.getElementById("description").value="";
  document.getElementById("price").value="";
  document.getElementById("quantity").value="";
} 
catch(error) {
  console.log(error);
}
  
  }
  window.addEventListener("DOMContentLoaded", async ()=>{
      try{
        const resolve= await axios.get("https://crudcrud.com/api/2d27a255a82a47bc88f5c79a30a80cc5/chocolateshop")
      
          console.log(resolve);
          for(let i=0;i<=resolve.data.length; i++)
          {
              displayshopdetails(resolve.data[i])
          }
      }
      catch(error){
          console.log(error);
      };
  })
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

        updateQuantity(chocolatedetails._id, parseInt(chocolatedetails.quantity) - 1,chocolatedetails.candyname, chocolatedetails.description,chocolatedetails.price);
    });
  
    buybtn2.addEventListener("click", function () {
        updateQuantity(chocolatedetails._id, parseInt(chocolatedetails.quantity) - 2,chocolatedetails.candyname, chocolatedetails.description,chocolatedetails.price);
    });
  
    buybtn3.addEventListener("click", function () {
        updateQuantity(chocolatedetails._id, parseInt(chocolatedetails.quantity) - 3,chocolatedetails.candyname, chocolatedetails.description,chocolatedetails.price);
    });
  }
  
  async function updateQuantity(itemId, newQuantity,CandyTxt, descriptext, pricetxt,chocoItem) {
    if (newQuantity < 0) {
        console.log("quantity below 0");
        return;
    }
  try{
    const response=await axios.put(`https://crudcrud.com/api/2d27a255a82a47bc88f5c79a30a80cc5/chocolateshop/${itemId}`, { 
    quantity:newQuantity,
    candyname:CandyTxt,
    description:descriptext,
    price:pricetxt
  });
        const updatedDetails = response.data;
        chocoItem.textContent = `${updatedDetails.candyname} - ${updatedDetails.description} - $${updatedDetails.price} - ${updatedDetails.quantity}`;
        console.log(response.data);
    }
    
  catch(error){
      console.error(error);
  }
  
}
  