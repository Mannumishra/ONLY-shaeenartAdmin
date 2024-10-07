import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBanner = () => {
    const [isLoading , setIsLoading] = useState(false)
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" >
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Banner Name</label>
                        <input type="text"  className="form-control" id="title" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="bannerImage" className="form-label">Banner Image</label>
                        <input type="file"  className="form-control" id="bannerImage" />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input"  type="checkbox" name="active" id="active" />
                            <label className="form-check-label" htmlFor="active">
                                Active 
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>{isLoading ? "Please Wait..." : "Add Banner"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddBanner;
