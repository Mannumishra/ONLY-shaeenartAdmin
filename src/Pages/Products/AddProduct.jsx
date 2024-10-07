import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react'; // Import JoditEditor

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([])
    const getCategoryData = async () => {
        try {
            const res = await axios.get("https://www.api.shaheenarts.in/api/get-all-category")
            if (res.status === 200) {
                setCategoryData(res.data.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [data, setData] = useState({
        categoryName: "",
        productName: "",
        productDescription: "",
        productDetails: "",
        productImage: null
    });
    const [content, setContent] = useState("");

    const editor = useRef(null);

    const getInputData = (e) => {
        const { name, files, value } = e.target;
        if (name === "productImage") {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('categoryName', data.categoryName);
        formData.append('productName', data.productName);
        formData.append('productDescription', data.productDescription);
        formData.append('productDetails', content);
        formData.append('productImage', data.productImage);
        try {
            await axios.post('https://www.api.shaheenarts.in/api/create-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Product added successfully!");
            setData({
                categoryName: "",
                productName: "",
                productDescription: "",
                productDetails: "",
                productImage: null
            });
            setContent("");
        } catch (error) {
            console.log(error)
            toast.error("Failed to add product.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategoryData()
    }, [categoryData.length])
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="categoryName" className="form-label">Category</label>
                        <select name='categoryName' className="form-select" id="categoryName" onChange={getInputData}>
                            <option value="">Select Category</option>
                            {
                                categoryData.map((item, index) =>
                                    <option key={index} value={item._id}>{item.categoryName}</option>  // Use ObjectId here
                                )
                            }
                        </select>

                    </div>

                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" name='productName' className="form-control" id="productName" onChange={getInputData} value={data.productName} />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productDescription" className="form-label">Product Description</label>
                        <textarea name='productDescription' className="form-control" id="productDescription" onChange={getInputData} value={data.productDescription} />
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
                        <input type="file" name='productImage' className='form-control' onChange={getInputData} />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`${isLoading ? 'not-allowed' : 'allowed'}`} disabled={isLoading}>
                            {isLoading ? "Please Wait..." : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
