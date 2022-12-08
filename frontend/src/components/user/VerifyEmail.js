import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {API} from '../../API'


const VerifyEmail = ({history}) => {
    
    const alert = useAlert();
    
    const { token } = useParams();

    const verifyUser = async (e) => {
        e.preventDefault();
        await API.post(`/api/v1/verifyUser`, {
            token
        }).then((s) => {
            if (s.data.success) {
                alert.success("Email Verified Successfully");
                history.push("/login");
            } else {
                alert.error(s.data.error);
                history.push("/login");
            }
        });
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={verifyUser}>
                        <h1 className="mb-3">Verify Email</h1>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Verify
                    </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default VerifyEmail
