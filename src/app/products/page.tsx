import { Products } from "@/views/products";
import { Suspense } from "react";
export default function ProductsPage() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Products />
		</Suspense>
	);
}
