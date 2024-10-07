import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react'; // Ensure this import is correct

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [product, setProduct] = useState({
        categoryName: '',
        productName: '',
        productImage: '',
        productDescription: '',
        productDetails: ''
    });
    const [categoryData, setCategoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState(product.productDetails); // For JoditEditor
    const editor = useRef(null); // For JoditEditor

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://www.api.shaheenarts.in/api/get-single-product/${id}`);
                if (res.status === 200) {
                    setProduct(res.data.data);
                    setContent(res.data.data.productDetails); // Initialize content for JoditEditor
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to fetch product.");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await axios.get("https://www.api.shaheenarts.in/api/get-all-category"); // Adjust the endpoint if needed
                if (res.status === 200) {
                    setCategoryData(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const getInputData = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            productImage: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('categoryName', product.categoryName);
            formData.append('productName', product.productName);
            formData.append('productDescription', product.productDescription);
            formData.append('productDetails', content);
            if (product.productImage) {
                formData.append('productImage', product.productImage);
            }

            const res = await axios.put(`https://www.api.shaheenarts.in/api/update-product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                toast.success("Product updated successfully!");
                navigate('/all-products'); // Redirect to products list page
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="categoryName" className="form-label">Category</label>
                        <select
                            name='categoryName'
                            className="form-select"
                            id="categoryName"
                            onChange={getInputData}
                            value={product.categoryName}
                        >
                            <option value="">Select Category</option>
                            {categoryData.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            name='productName'
                            className="form-control"
                            id="productName"
                            onChange={getInputData}
                            value={product.productName}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productDescription" className="form-label">Product Description</label>
                        <textarea
                            name='productDescription'
                            className="form-control"
                            id="productDescription"
                            onChange={getInputData}
                            value={product.productDescription}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productDetails" className="form-label">Product Details</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={{}}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => { }}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productImage" className="form-label">Product Image</label>
                        <input
                            type="file"
                            name='productImage'
                            className='form-control'
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Please Wait..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
