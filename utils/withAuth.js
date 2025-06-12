import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            const user = Cookies.get("user");
            if (!user) {
                router.push("/login"); // Redirect to login page if not authenticated
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
