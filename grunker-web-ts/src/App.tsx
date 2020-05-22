import React, {useEffect, useState} from 'react';
import {Navbar, NavbarBrand} from "react-bootstrap";
import axios from "axios";

interface Nyc311DataItem {
  unique_key: string;
  agency: string;
  status: string;
  descriptor: string;
  city: string;
}

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/grunker/api/nyc311", {
      timeout: 500000
    })
      .then((response) => response.data)
      .then(items => setItems(items))
  })

  return (
    <>
      <Navbar bg="dark">
        <NavbarBrand>
        </NavbarBrand>
      </Navbar>
      <section>
        {items.map((item: Nyc311DataItem) => <div key={item.unique_key}>[{item.agency}] {item.descriptor}</div>)}
      </section>
    </>
  );
}

export default App;
