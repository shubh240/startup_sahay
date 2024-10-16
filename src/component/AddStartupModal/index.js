import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as API from '../../utils/api.service';
import { getStartUpDetails } from '../../store/slice/startUpListSlice';
import { useDispatch } from 'react-redux';

const AddStartupModal = ({ showModal, setShowModal, selectedStartUp, isViewMode }) => {
console.log('selectedStartUp, isViewMode :', selectedStartUp);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const dispatch = useDispatch();

    const closeModal = () => {
        setShowModal(false);
        if (selectedStartUp === null) {
            reset();
        }
    };

    const submitForm = async (body) => {
        try {
            if (selectedStartUp) {
                const { code, message, data } = await API.editStartUpList(selectedStartUp.id, body);
            } else {
                const { code, message, data } = await API.addstartUp(body);
            }
            dispatch(getStartUpDetails());
            closeModal();
        } catch (error) {
            console.error('Error adding or updating startup:', error);
        }
    };

    useEffect(() => {
        if (selectedStartUp) {
            setValue('startup_name', selectedStartUp?.startup_name || '');
            setValue('founder_name', selectedStartUp?.founder_name || '');
            setValue('email_address', selectedStartUp?.email_address || '');
            setValue('phone_number', selectedStartUp?.phone_number || '');
            setValue('startup_address', selectedStartUp?.startup_address || '');
            setValue('city', selectedStartUp?.city || '');
            setValue('state', selectedStartUp?.state || '');
            setValue('industry', selectedStartUp?.industry || '');
            setValue('sector', selectedStartUp?.sector || '');
            setValue('business_idea', selectedStartUp?.business_idea || '');
        } else {
            reset();
        }
    }, [selectedStartUp, setValue, reset]);

    return (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{isViewMode ? 'View Startup' : (selectedStartUp ? 'Edit Startup' : 'Add Startup')}</h5>
                        <button type="button" className="btn-close ms-auto" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Startup Name</label>
                                        <input
                                            className="form-control"
                                            {...register('startup_name', {
                                                required: !isViewMode && 'Startup Name is required',
                                                pattern: {
                                                    value: /^\S+.*$/,
                                                    message: 'Whitespace is not allowed at the start'
                                                }
                                            })}
                                            readOnly={isViewMode} // Set field to read-only in view mode
                                        />
                                        {errors.startup_name && <p className="text-danger">{errors.startup_name.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Founder Name</label>
                                        <input
                                            className="form-control"
                                            {...register('founder_name', {
                                                required: !isViewMode && 'Founder Name is required',
                                                pattern: {
                                                    value: /^\S+.*$/,
                                                    message: 'Whitespace is not allowed at the start'
                                                }
                                            })}
                                            readOnly={isViewMode}
                                        />
                                        {errors.founder_name && <p className="text-danger">{errors.founder_name.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            {...register('email_address', {
                                                required: !isViewMode && 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            readOnly={isViewMode}
                                        />
                                        {errors.email_address && <p className="text-danger">{errors.email_address.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register('phone_number', {
                                                required: !isViewMode && 'Phone Number is required',
                                                pattern: {
                                                    value: /^[0-9]{10}$/, // Only digits, exactly 10 digits
                                                    message: 'Phone Number must be exactly 10 digits'
                                                }                                              
                                            })}
                                            readOnly={isViewMode}
                                        />
                                        {errors.phone_number && <p className="text-danger">{errors.phone_number.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Startup Address</label>
                                        <input
                                            className="form-control"
                                            {...register('startup_address', {
                                                required: !isViewMode && 'Address is required',
                                                pattern: {
                                                    value: /^\S+.*$/,
                                                    message: 'Whitespace is not allowed at the start'
                                                }
                                            })}
                                            readOnly={isViewMode}
                                        />
                                        {errors.startup_address && <p className="text-danger">{errors.startup_address.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            className="form-control"
                                            {...register('city', {
                                                required: !isViewMode && 'City is required',
                                                pattern: {
                                                    value: /^\S+.*$/,
                                                    message: 'Whitespace is not allowed at the start'
                                                }
                                            })}
                                            readOnly={isViewMode}
                                        />
                                        {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>State</label>
                                        <input
                                            className="form-control"
                                            {...register('state', {
                                                required: !isViewMode && 'State is required',
                                                pattern: {
                                                    value: /^\S+.*$/,
                                                    message: 'Whitespace is not allowed at the start'
                                                }
                                            })}
                                            readOnly={isViewMode}
                                        />
                                        {errors.state && <p className="text-danger">{errors.state.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <select
                                            className="form-control"
                                            {...register('industry', { required: !isViewMode && 'Industry is required' })}
                                            disabled={isViewMode}
                                        >
                                            <option value="">Select Industry</option>
                                            <option value="IT services">IT services</option>
                                            <option value="Agriculture">Agriculture</option>
                                            <option value="Biotechnologies">Biotechnologies</option>
                                            <option value="Design">Design</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Green Technologies">Green Technologies</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {errors.industry && <p className="text-danger">{errors.industry.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Sector</label>
                                        <select
                                            className="form-control"
                                            {...register('sector', { required: !isViewMode && 'Sector is required' })}
                                            disabled={isViewMode}
                                        >
                                            <option value="">Select Sector</option>
                                            <option value="IT consultancy">IT consultancy</option>
                                            <option value="IT management">IT management</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="Health">Health</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {errors.sector && <p className="text-danger">{errors.sector.message}</p>}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Business Idea</label>
                                        <textarea
                                            className="form-control"
                                            {...register('business_idea', {
                                                required: !isViewMode && 'Business Idea is required',
                                            })}
                                            rows="3"
                                            readOnly={isViewMode}
                                        ></textarea>
                                        {errors.business_idea && <p className="text-danger">{errors.business_idea.message}</p>}
                                    </div>
                                </div>
                            </div>
                            {!isViewMode && (
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStartupModal;
