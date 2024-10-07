import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        categoryName: "",
        categoryImage: null
    });

    const handleChange = (e) => {
        const { name, files, value } = e.target;
        if (name === "categoryImage") {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const validateForm = () => {
        if (!data.categoryName) {
            toast.error("Category Name is required.");
            return false;
        }
        return true;
    };

    const postData = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        const formData = new FormData();
        formData.append("categoryName", data.categoryName);
        if (data.categoryImage) {
            formData.append("categoryImage", data.categoryImage);
        }

        try {
            const response = await axios.post('https://www.api.shaheenarts.in/api/create-category', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success(response.data.message);
                setData({ categoryName: "", categoryImage: null }); // Reset form after success
                navigate("/all-category");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("Network error. Please check your connection.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={postData}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            name='categoryName'
                            className="form-control"
                            id="categoryName"
                            value={data.categoryName}
                            onChange={handleChange}
                            required
                            aria-label="Enter category name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input
                            type="file"
                            name='categoryImage'
                            className="form-control"
                            id="categoryImage"
                            onChange={handleChange}
                            aria-label="Upload category image"
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'} btn btn-primary`}
                            aria-busy={isLoading}
                            aria-label={isLoading ? "Adding category, please wait" : "Add category"}
                        >
                            {isLoading ? "Please Wait..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
