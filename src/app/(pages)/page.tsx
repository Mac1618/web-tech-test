'use client';
import Image from 'next/image';
import Link from 'next/link';

// context
import { useMockupRecords } from '@/context/mockup-context';
import { useEffect, useState } from 'react';

export default function Home() {
	const { records, addMockup } = useMockupRecords();
	const [loading, setLoading] = useState(false);

	const handleAddMockup = () => {
		const mockup = records.length + 1;
		addMockup(mockup);
	};
	const [footer, setFooter] = useState([]);

	useEffect(() => {
		const getFooter = async () => {
			// save new record to database

			const response = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}`, {
				method: 'GET',
				headers: {
					'apikey': `${process.env.NEXT_PUBLIC_DB_API_KEY}`,
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();

			// convert object to array
			const detailsArray: any = Object.values(data[0].details);
			setFooter(detailsArray);
		};

		getFooter();
	}, []);

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

			{/* footer */}
			<footer className="footer">
				<div className="grid-footer">
					{footer.map((title, i) => {
						const [smp] = Object.keys(title);
						const items = Object.values(title)[0];
						return (
							<ul key={i}>
								<li className="title">{smp}</li>

								{Object.values(title).map((text: any, i) => {
									const txt: any = Object.values(text)[i];
									const [t] = Object.keys(txt);
									return (
										<li key={i} className="description">
											{t}
										</li>
									);
								})}
								<li className="price">view more</li>
							</ul>
						);
					})}
				</div>
			</footer>
		</>
	);
}
