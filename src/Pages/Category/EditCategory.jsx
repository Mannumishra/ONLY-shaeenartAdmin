import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const { id } = useParams(); // Get category ID from the URL
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null); // For handling file input
    const [existingImageUrl, setExistingImageUrl] = useState(''); // Store the existing image URL
    const [btnLoading, setBtnLoading] = useState(false);

    // Fetch the existing category data when the component loads
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`https://www.api.shaheenarts.in/api/get-single-category/${id}`);
                console.log(response)
                const { categoryName, categoryImage } = response.data.data;
                setCategoryName(categoryName);
                setExistingImageUrl(categoryImage); // Store the existing image URL
            } catch (error) {
                toast.error("Failed to load category data");
                console.error(error);
            }
        };
        fetchCategory();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        try {
            const formData = new FormData();
            formData.append('categoryName', categoryName); // Append category name to the form data
            if (categoryImage) {
                formData.append('categoryImage', categoryImage); // Append the new image if uploaded
            }

            // Send the request to the backend
            const response = await axios.put(`https://www.api.shaheenarts.in/api/update-category/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Category updated successfully!");
            setBtnLoading(false);
            navigate('/all-category'); 
        } catch (error) {
            console.error(error);
            toast.error("Failed to update category");
            setBtnLoading(false);
        }
    };

    // Handle file change (image upload)
    const handleImageChange = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            name='categoryName'
                            className="form-control"
                            id="categoryName"
                            value={categoryName} // Set the value to the fetched category name
                            onChange={(e) => setCategoryName(e.target.value)} // Update the state on change
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input
                            type="file"
                            name='categoryImage'
                            className="form-control"
                            id="categoryImage"
                            onChange={handleImageChange} // Handle image change
                        />
                        {existingImageUrl && (
                            <div className="mt-2">
                                <img src={existingImageUrl} alt="Current Category" width="100" height="100" />
                                <p>Current Image</p>
                            </div>
                        )}
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`btn btn-primary ${btnLoading ? 'not-allowed' : ''}`}
                            disabled={btnLoading}
                        >
                            {btnLoading ? "Please Wait.." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
