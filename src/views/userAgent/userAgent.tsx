"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { useUserAgentContext } from "@/components/providers/userAgentProvider";
import { useEffect, useState } from "react";
export const UserAgent = ({ serverUserAgent }: { serverUserAgent: string }) => {
	const { userAgent: clientUserAgent } = useUserAgentContext();
	const [userAgent, setUserAgent] = useState<string | null>(serverUserAgent);

	useEffect(() => {
		if (clientUserAgent) {
			setUserAgent(clientUserAgent);
		}
	}, [clientUserAgent]);

	return (
		<div>
			<BackToHome />

			{userAgent ? (
				<div className="flex font-mono font-semibold text-sm">
					<div className="border p-2">UserAgent</div>
					<div className="border p-2">{userAgent}</div>
				</div>
			) : (
				<div>No user agent</div>
			)}
		</div>
	);
};
