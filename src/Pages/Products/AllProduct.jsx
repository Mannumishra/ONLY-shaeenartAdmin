import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://www.api.shaheenarts.in/api/get-all-products"
        );
        if (res.status === 200) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://www.api.shaheenarts.in/api/delete-product/${productId}`
      );
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Product List</h4>
        </div>
        <div className="links">
          <Link to="/add-product" className="add-new">
            Add New <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>

      <div className="filteration">
        <div className="selects">{/* Filter and sort options */}</div>
        <div className="search">
          <label htmlFor="search">Search </label> &nbsp;
          <input type="text" name="search" id="search" />
        </div>
      </div>

      <section className="d-table">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Category</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Image</th>
                <th scope="col">Product Description</th>
                {/* <th scope="col">Product Details</th> */}
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.categoryName.categoryName}</td>
                  <td>{product.productName}</td>
                  <td>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{product.productDescription}</td>
                  {/* <td dangerouslySetInnerHTML={{ __html: product.productDetails }} /> */}
                  <td>
                    <Link
                      className="bt edit"
                      to={`/edit-product/${product._id}`}
                    >
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="bt delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default AllProduct;
