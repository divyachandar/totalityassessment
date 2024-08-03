import React from 'react';
import { CartState } from "../context/CartContext";
import SingleProperty from './SingleProperty';
import Filters from './Filters';
import './styles.css';

const Home = () => {
  const { state: { property },
   productState: { sort,byavailableEMI, byRating, searchQuery },} = CartState();
 
  const transformProducts = () => {
    let sortedProducts = property;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byavailableEMI) {
      sortedProducts = sortedProducts.filter((prod) => prod.availableEMI);
    }
  
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.city.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
 

return (
    <div className="home">
        <Filters />
      <div className="propertyContainer">
         {transformProducts().map((eachProperty) => (
                <SingleProperty PropertyDetails={eachProperty} key={eachProperty.id}/>
            ))}
      </div>
    </div>
  );
};

export default Home;