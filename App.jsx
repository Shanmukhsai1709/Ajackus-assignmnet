import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import axios from "axios";
import Pagination from "./components/Pagination/Pagination";

function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [formActive, setFormActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Pagination
   */
  const dataPerPage = 4;
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const nPages = Math.ceil(data.length / dataPerPage);

  /**
   * this useEffect hook will run whenever the webapplication is rendered first time and fetch data from API;
   */
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  /**
   * editHandler function edits data of existing user and updates it.
   * @param id
   * @param obj
   */
  const editHandler = (id, obj) => {
    const users = data.map((item) => {
      if (item.id === id) {
        item.name = obj.nameVal,
          item.email = obj.emailVal,
          item.company.bs = obj.deptVal
      }
      return item;
    })
    setData(users);
    alert('User Updated')

    /**
     * axios post request sends the updated list to the backend.
     */
    axios.post('https://jsonplaceholder.typicode.com/users', {
      users
    }).then(() => console.log("OK updated"))
  }

  /**
   * deleteHandler function is used to delete the user from the list
   * @param id 
   */
  const deleteHandler = (id) => {
    const users = data.filter(i => i.id !== id);
    setData(users);
  }

  return (
    <div>
      <Navbar formActive={formActive} setFormActive={setFormActive} />

      {
        !formActive ? (
          <>
            <Table
              data={data}
              currentData={currentData}
              error={error}
              setData={setData}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <Form
            data={data}
            setData={setData}
            setFormActive={setFormActive}
          />
        )
      }


    </div>
  )
}

export default App
