'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// context
import { useMockupRecords } from '@/context/mockup-context';
import { MouseEventHandler, useState } from 'react';

export default function Home() {
	const router = useRouter();
	const { records, addMockup } = useMockupRecords();
	const [loading, setLoading] = useState(false);

	const handleAddMockup = () => {
		const mockup = records.length + 1;
		addMockup(mockup);
	};

	return (
		<>
			{/* Task 2 */}

			{loading ? (
				<button className="btn-1">loading...</button>
			) : (
				<Link
					onClick={handleAddMockup}
					href={{
						pathname: `/${records.length + 1}`,
						query: {
							id: `${records.length + 1}`,
							title: 'Amber Sea',
							description: 'Lorem ipsum dolor sit amet.',
							price: '$100,000',
						},
					}}
					className="btn-1"
				>
					ADD BLOCK
				</Link>
			)}

			{/* Task 1 */}
			<main className="main-container">
				<div className="grid">
					{records.map((item) => (
						<div key={item.id} className="box">
							<Image
								src="/img.png"
								width={336}
								height={200}
								alt="sample-img"
								className="sample-img"
							/>
							<h4 className="title">{item.title}</h4>
							<p className="description">{item.description}</p>
							<p className="price">{item.price}</p>
						</div>
					))}
				</div>
			</main>
		</>
	);
}
