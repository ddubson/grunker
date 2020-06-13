import React from 'react';
import {Navbar, NavbarBrand, Table} from "react-bootstrap";
import moment from "moment";
import {Nyc311DataItem} from "../../grunker-api-ts/src/Nyc311DataItem";
import {useNyc311Service} from "./useNyc311Service";

function App() {
  const items = useNyc311Service();

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
