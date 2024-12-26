"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter, useSearchParams } from "next/navigation";

export const Products: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null
	);
	const {
		currentPage,
		totalPages,
		paginatedItems: paginatedProducts,
		handlePageChange,
	} = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

	const handleOpenModal = useCallback(
		(product: Product) => {
			setSelectedProduct(product);
			const url = new URL(window.location.href);
			url.searchParams.set("productId", product.id.toString());
			router.push(url.toString());
		},
		[router]
	);

	// Close modal and remove the productId from the URL
	const handleCloseModal = useCallback(() => {
		setSelectedProduct(null);
		const url = new URL(window.location.href);
		url.searchParams.delete("productId");
		router.push(url.toString());
	}, [router]);

	// Check for productId in the query params on load and refresh
	useEffect(() => {
		const productId = searchParams.get("productId");
		if (productId) {
			const product = PRODUCTS_DATA.find((p) => p.id === productId, 10);
			if (product) {
				setSelectedProduct(product);
			}
		}
	}, [searchParams]);

	return (
		<div>
			<BackToHome />
			<ProductList
				products={paginatedProducts}
				onOpenModal={handleOpenModal}
			/>
			<div className="h-4" />
			<PaginationControls
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			{selectedProduct && (
				<ProductModal
					product={selectedProduct}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};
