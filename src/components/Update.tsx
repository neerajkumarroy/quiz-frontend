import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import { Modal, Button } from 'react-bootstrap';

interface Product {
  name: string;
  email: string;
  age: number;
  gender: string;
  salary: number;
  _id: string;
}

function Update() {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
  const [productslist, setProductslist] = useState<Product[]>([]);

  // Function to add employee
  const handleAdd = async () => {
    console.log(name, email, age, gender, salary);
    let result = await fetch("http://localhost:7070/create", {
      method: "post",
      body: JSON.stringify({ name, email, age, gender, salary }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    result = await result.json();
    console.log(result);
    // Refresh the product listing after adding
    productListing();
  };

  // Function to fetch product listing
  const productListing = async () => {
    try {
      const result = await fetch("http://localhost:7070/employee");
      if (!result.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await result.json();
      setProductslist(data);
      console.log({ "ProductListing": data });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, maybe show a message to the user
    }
  };

  useEffect(() => {
    productListing();
  }, []);

  // Function to delete a product
  const handleDelete = async (id: string) => {
    try {
      let result = await fetch(`http://localhost:7070/delete/${id}`, {
        method: "delete"
      });
      if (!result.ok) {
        throw new Error('Failed to delete item');
      }
      // Refresh the product listing after deleting
      productListing();
    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle error, maybe show a message to the user
    }
  };

  return (
    <div className='main-div'>
      <input type='text' placeholder='Please enter name' value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type='text' placeholder='Please enter email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <input type='text' placeholder='Please enter age' value={age} onChange={(e) => setAge(e.target.value)}></input>
      <input type='text' placeholder='Please enter gender' value={gender} onChange={(e) => setGender(e.target.value)} ></input>
      <input type='text' placeholder='Please enter salary' value={salary} onChange={(e) => setSalary(e.target.value)}></input>
      <button className='btn btn-primary ms-2px' onClick={handleAdd}>Add</button>
      <div className='list-div'>
        <h1>This Product List</h1>
        <ul>
          <li><strong>S.no</strong></li>
          <li><strong>Name</strong></li>
          <li><strong>Email</strong></li>
          <li><strong>Age</strong></li>
          <li><strong>Gender</strong></li>
          <li><strong>Salary</strong></li>
          <li><strong>Operations</strong></li>
        </ul>
        {
          productslist.map((item, index) => (
            <ul key={index}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.email}</li>
              <li>{item.age}</li>
              <li>{item.gender}</li>
              <li>{item.salary}</li>

              <li><button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
              <Link to="/update">Update</Link>
              </li>
              </ul>
          ))
        }
      </div>
    </div>
  );
}

export default Update;
