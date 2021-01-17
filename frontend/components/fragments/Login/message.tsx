import LoginStatus from "../../../constants/login.status";

interface IProps {
    loginStatus: LoginStatus;
}

export default function Message({ loginStatus }: IProps) {
    if (loginStatus === LoginStatus.LOGGING_IN) return (
        <div className="alert alert-warning">
            <strong>Logging in!</strong> Please wait...
        </div>
    );
    if (loginStatus === LoginStatus.LOGGED_IN) return (
        <div className="alert alert-success">
            <strong>Login Successful!</strong>
        </div>
    );
    if(loginStatus===LoginStatus.INVALID_USERNAME_OR_PASSWORD) return (
        <div className="alert alert-danger">
            <strong>Invalid Login Credentials</strong>
        </div>
    );
    return <></>;
}