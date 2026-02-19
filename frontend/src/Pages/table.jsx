import React, { useState } from "react";
import data from "../JSON/TableItems.json";
import "../CSS/table.css";



 export const table= () => {

    const [Items, setItems] = useState(data);
    let td = document.createElement('div')
    td.innerHTML =`<div className="Table-Container"> 
 <table>
    <thead>
     <tr>
       <th>Item ID</th>
       <th>Item Name</th>
       <th>Status</th>
       <th>Date Borrowed</th>
       <th>Return Date</th>
     </tr>
    </thead>
    <tbody>
        {Items.map((Item) => (
        <tr>
         <td> {Item.ItemId} </td>
         <td> {Item.ItemName}</td>
         <td> {Item.Status}</td>
         <td> {Item.DateBorrowed}</td>
         <td> {Item.ReturnDate}</td>
       </tr>
        ))}
    </tbody>
 </table>

 </div>`
 return td;
};
