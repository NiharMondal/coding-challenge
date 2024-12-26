import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = () => {
	const headersList = headers(); // Access request headers
	const userAgent = headersList.get("user-agent") || "No user agent detected";
	return <UserAgent serverUserAgent={userAgent} />;
};

export default UserAgentRoot;
