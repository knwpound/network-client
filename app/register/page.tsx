import RegisterForm from "../ui/RegisterForm";

const RegisterPage = () => {

    return (
        <div className="row justify-content-center align-items-center vh-100">
            <div className="col-11 col-sm-10 col-md-7 col-lg-5">
                <div className="container rounded-4 p-5 text-center bg-white shadow">
                    <h2 className="fw-bold mb-4">Create Account</h2>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;