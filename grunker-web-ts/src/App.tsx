import React, {useEffect, useState} from 'react';
import {Navbar, NavbarBrand, Table} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

interface Nyc311DataItem {
  unique_key: string;
  created_date: string;
  agency: string;
  status: string;
  descriptor: string;
  city: string;
}

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/grunker/api/nyc311")
      .then((response) => response.data)
      .then(items => setItems(items))
  }, [])

  const renderItem = (item: Nyc311DataItem) => (
    <tr key={item.unique_key}>
      <td>{moment.utc(item.created_date).format("LLLL")}</td>
      <td>{item.agency}</td>
      <td>{item.city}</td>
      <td>{item.descriptor}</td>
      <td>{item.status}</td>
    </tr>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand>
          Grunker
        </NavbarBrand>
      </Navbar>
      <section>
        <Table>
          <thead>
          <tr>
            <th>Created Date</th>
            <th>Agency</th>
            <th>City</th>
            <th>Descriptor</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {items.map(renderItem)}
          </tbody>
        </Table>
      </section>
    </>
  );
}

export default App;
