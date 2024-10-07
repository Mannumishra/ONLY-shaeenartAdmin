import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCategory = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      const res = await axios.get("https://www.api.shaheenarts.in/api/get-all-category");
      if (res.status === 200) {
        setData(res.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, [data.length]);

  const deleteRecord = async (id) => {
    try {
      const res = await axios.delete(
        "https://www.api.shaheenarts.in/api/delete-category/" + id
      );
      console.log(res);
      if (res.status === 200) {
        getApiData();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Category List </h4>
        </div>
        <div className="links">
          <Link to="/add-category" className="add-new">
            Add New <i class="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>

      <div className="filteration">
        <div className="selects">
          {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
        </div>
        <div className="search">
          <label htmlFor="search">Search </label> &nbsp;
          <input type="text" name="search" id="search" />
        </div>
      </div>

      <section className="d-table ">
        <table class="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              {/* <th scope="col">Show in home page</th> */}
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.categoryName}</td>
                <td>
                  <img src={item.categoryImage} />
                </td>
                {/* <td></td> */}
                <td>
                  <Link className="bt edit" to={`/edit-category/${item._id}`}>
                    Edit <i class="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
                <td>
                  <Link
                    className="bt delete"
                    onClick={() => deleteRecord(item._id)}
                  >
                    Delete <i class="fa-solid fa-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllCategory;
