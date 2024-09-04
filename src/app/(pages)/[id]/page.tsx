'use client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// params props type
interface DocumentIdPageProps {
	params: {
		id: string;
		title: string;
		description: string;
		price: string;
	};
}

const DocumentPageId = ({ params }: DocumentIdPageProps) => {
	const searchParams = useSearchParams();

	const paramsId = searchParams.getAll('id');
	console.log('params.id: ', params.id);
	console.log('paramsId[0]: ', paramsId[0], searchParams.get('id'));

	if (parseInt(params.id) > parseInt(paramsId[0]) || parseInt(params.id) <= 0) {
		return <h1>Invalid parameter. No data found!</h1>;
	}

	return (
		<div>
			<h1>Hello</h1>
			<p>Data ID: {params.id}</p>
			{/* Task 1 */}
			<main className="main-container">
				<div className="grid">
					<div className="box">
						<Image
							src="/img.png"
							width={336}
							height={200}
							alt="sample-img"
							className="sample-img"
						/>
						<h4 className="title">{searchParams.getAll('title')}</h4>
						<p className="description">{searchParams.getAll('description')}</p>
						<p className="price">{searchParams.getAll('price')[0]}</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default DocumentPageId;
